require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || 'able-native-camp-admin';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');

// ─── Data 디렉토리 초기화 ───
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(path.join(DATA_DIR, 'tokens.json'))) fs.writeFileSync(path.join(DATA_DIR, 'tokens.json'), '{}');
if (!fs.existsSync(path.join(DATA_DIR, 'usage.json'))) fs.writeFileSync(path.join(DATA_DIR, 'usage.json'), '{"submissions":{}}');

// ─── Middleware ───
app.set('trust proxy', 1);
app.use(express.json());

// 민감 디렉토리/파일 접근 차단
app.use((req, res, next) => {
  const p = decodeURIComponent(req.path).toLowerCase();
  const blocked = ['/data', '/.env', '/scripts', '/.git', '/package', '/server.js', '/node_modules'];
  if (blocked.some(b => p.startsWith(b))) {
    return res.status(404).send('Not found');
  }
  next();
});
app.use(express.static(path.join(__dirname), { extensions: ['html'], dotfiles: 'deny' }));

// ─── Data Helpers ───
function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8')); }
  catch { return null; }
}

function writeJSON(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

function getTokens() { return readJSON('tokens.json') || {}; }
function getUsage() { return readJSON('usage.json') || { submissions: {} }; }

// ─── Auth: Bearer token → user ───
function authenticateToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const token = auth.slice(7).trim();
  const tokens = getTokens();
  const user = tokens[token];
  if (!user) return res.status(401).json({ error: 'invalid token' });
  req.user = user;
  req.token = token;
  next();
}

// ─── Admin auth ───
function authenticateAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${ADMIN_KEY}`) {
    return res.status(401).json({ error: 'admin unauthorized' });
  }
  next();
}

// ═══════════════════════════════════════════
// POST /api/usage/submit — Hook에서 usage 수신
// ═══════════════════════════════════════════
app.post('/api/usage/submit', authenticateToken, (req, res) => {
  try {
    const { session_id, date, input_tokens, output_tokens,
            cache_creation_tokens, cache_read_tokens,
            total_tokens, total_cost, models_used } = req.body;

    if (!session_id || !date) {
      return res.status(400).json({ error: 'session_id and date required' });
    }

    // 숫자 필드 검증
    const numFields = { input_tokens, output_tokens, cache_creation_tokens, cache_read_tokens, total_tokens, total_cost };
    for (const [key, val] of Object.entries(numFields)) {
      if (val !== undefined && (typeof val !== 'number' || val < 0 || isNaN(val))) {
        return res.status(400).json({ error: `${key} must be a non-negative number` });
      }
    }

    const usage = getUsage();

    // Dedup by session_id
    if (usage.submissions[session_id]) {
      return res.status(409).json({ error: 'duplicate' });
    }

    usage.submissions[session_id] = {
      username: req.user.username,
      displayName: req.user.displayName,
      email: req.user.email,
      date,
      input_tokens: input_tokens || 0,
      output_tokens: output_tokens || 0,
      cache_creation_tokens: cache_creation_tokens || 0,
      cache_read_tokens: cache_read_tokens || 0,
      total_tokens: total_tokens || 0,
      total_cost: total_cost || 0,
      models_used: models_used || [],
      submitted_at: new Date().toISOString(),
    };

    writeJSON('usage.json', usage);
    res.json({ ok: true });
  } catch (err) {
    console.error('Usage submit error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════
// GET /api/leaderboard — 집계 데이터
// ═══════════════════════════════════════════
app.get('/api/leaderboard', (req, res) => {
  try {
    const usage = getUsage();
    const tokens = getTokens();
    const submissions = Object.values(usage.submissions);

    // 유저별 집계
    const userMap = {}; // username -> aggregated data

    // 등록된 전체 유저 초기화 (사용량 0이어도 리더보드에 표시)
    Object.values(tokens).forEach(u => {
      userMap[u.username] = {
        id: u.username,
        name: u.displayName,
        email: u.email,
        totalCost: 0,
        totalTokens: 0,
        totalInput: 0,
        totalOutput: 0,
        activeDays: 0,
        dailyCost: {},
      };
    });

    // submissions 집계
    submissions.forEach(s => {
      if (!userMap[s.username]) {
        userMap[s.username] = {
          id: s.username,
          name: s.displayName,
          email: s.email,
          totalCost: 0,
          totalTokens: 0,
          totalInput: 0,
          totalOutput: 0,
          activeDays: 0,
          dailyCost: {},
        };
      }

      const u = userMap[s.username];
      u.totalCost += s.total_cost || 0;
      u.totalTokens += s.total_tokens || 0;
      u.totalInput += s.input_tokens || 0;
      u.totalOutput += s.output_tokens || 0;

      if (!u.dailyCost[s.date]) {
        u.dailyCost[s.date] = { cost: 0, tokens: 0 };
      }
      u.dailyCost[s.date].cost += s.total_cost || 0;
      u.dailyCost[s.date].tokens += s.total_tokens || 0;
    });

    // activeDays 계산 + cost 반올림
    Object.values(userMap).forEach(u => {
      u.activeDays = Object.keys(u.dailyCost).length;
      u.totalCost = Math.round(u.totalCost * 100) / 100;
      Object.keys(u.dailyCost).forEach(d => {
        u.dailyCost[d].cost = Math.round(u.dailyCost[d].cost * 100) / 100;
      });
    });

    const members = Object.values(userMap).sort((a, b) => b.totalCost - a.totalCost);

    res.json({
      organization: 'ABLE Native Camp',
      updatedAt: new Date().toISOString(),
      members,
    });
  } catch (err) {
    console.error('Leaderboard error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════
// GET /api/hook-script — Self-update용 스크립트 제공
// ═══════════════════════════════════════════
app.get('/api/hook-script', (req, res) => {
  const scriptPath = path.join(__dirname, 'scripts', 'report-usage.js');
  if (!fs.existsSync(scriptPath)) {
    return res.status(404).send('Not found');
  }
  res.type('text/javascript').send(fs.readFileSync(scriptPath, 'utf8'));
});

// ═══════════════════════════════════════════
// POST /api/register — 참가자 토큰 발급 (Admin)
// ═══════════════════════════════════════════
app.post('/api/register', authenticateAdmin, (req, res) => {
  try {
    const { username, displayName, email } = req.body;
    if (!username || !displayName) {
      return res.status(400).json({ error: 'username and displayName required' });
    }

    const tokens = getTokens();

    // 이미 등록된 username 확인
    const existing = Object.entries(tokens).find(([, v]) => v.username === username);
    if (existing) {
      return res.json({ token: existing[0], user: existing[1], message: 'already registered' });
    }

    const token = 'ainc_' + crypto.randomBytes(24).toString('hex');
    tokens[token] = { username, displayName, email: email || '', registeredAt: new Date().toISOString() };
    writeJSON('tokens.json', tokens);

    res.json({ token, user: tokens[token] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════
// POST /api/self-register — 참가자 셀프 등록 (MS 로그인 후)
// ═══════════════════════════════════════════
app.post('/api/self-register', (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'name and email required' });
    }

    const tokens = getTokens();

    // 이미 등록된 email 확인 → 기존 토큰 반환
    const existing = Object.entries(tokens).find(([, v]) => v.email === email);
    if (existing) {
      return res.json({ token: existing[0], user: existing[1], registered: false });
    }

    // username: email의 @ 앞 부분
    const username = email.split('@')[0];
    const token = 'ainc_' + crypto.randomBytes(24).toString('hex');
    tokens[token] = {
      username,
      displayName: name,
      email,
      registeredAt: new Date().toISOString(),
    };
    writeJSON('tokens.json', tokens);

    res.json({ token, user: tokens[token], registered: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════
// GET /api/participants — 등록된 참가자 목록 (Admin)
// ═══════════════════════════════════════════
app.get('/api/participants', authenticateAdmin, (req, res) => {
  const tokens = getTokens();
  const participants = Object.entries(tokens).map(([token, user]) => ({
    token: token.slice(0, 10) + '...',
    ...user,
  }));
  res.json(participants);
});

// ═══════════════════════════════════════════
// GET /api/install — 참가자 설치 스크립트
// ═══════════════════════════════════════════
app.get('/api/install', (req, res) => {
  const serverUrl = req.query.url || `${req.protocol}://${req.get('host')}`;
  const script = `#!/bin/bash
# ABLE Native Camp — Hook 설치 스크립트
set -e

TOKEN="\${1:?Usage: curl -sL SERVER/api/install | bash -s -- YOUR_TOKEN}"
API_URL="${serverUrl}"
CONFIG_DIR="$HOME/.config/ainc"

echo "🏕️ ABLE Native Camp Hook 설치 중..."

# 1. 디렉토리 생성
mkdir -p "$CONFIG_DIR"

# 2. 토큰 + URL 저장
echo -n "$TOKEN" > "$CONFIG_DIR/token"
chmod 600 "$CONFIG_DIR/token"
echo -n "$API_URL" > "$CONFIG_DIR/api_url"

# 3. Hook 스크립트 다운로드
curl -sL "$API_URL/api/hook-script" -o "$CONFIG_DIR/report-usage.js"

# 4. Claude Code settings.json에 Stop hook 추가
SETTINGS_FILE="$HOME/.claude/settings.json"
mkdir -p "$HOME/.claude"

if [ -f "$SETTINGS_FILE" ]; then
  # 이미 ainc hook이 있으면 스킵
  if grep -q "ainc/report-usage" "$SETTINGS_FILE" 2>/dev/null; then
    echo "✅ Hook already configured"
  else
    # jq로 hook 추가 (jq 없으면 수동 안내)
    if command -v jq &>/dev/null; then
      jq '.hooks.Stop = (.hooks.Stop // []) + [{"matcher":".*","hooks":[{"type":"command","command":"node ~/.config/ainc/report-usage.js"}]}]' "$SETTINGS_FILE" > "$SETTINGS_FILE.tmp" && mv "$SETTINGS_FILE.tmp" "$SETTINGS_FILE"
      echo "✅ Hook added to settings.json"
    else
      echo "⚠️  jq not found. 수동으로 ~/.claude/settings.json에 추가해줘:"
      echo '  "hooks": { "Stop": [{ "matcher": ".*", "hooks": [{ "type": "command", "command": "node ~/.config/ainc/report-usage.js" }] }] }'
    fi
  fi
else
  # 새로 생성
  cat > "$SETTINGS_FILE" << 'SETTINGSEOF'
{
  "hooks": {
    "Stop": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.config/ainc/report-usage.js"
          }
        ]
      }
    ]
  }
}
SETTINGSEOF
  echo "✅ settings.json created with hook"
fi

echo ""
echo "🎉 설치 완료!"
echo "  Config: $CONFIG_DIR"
echo "  Server: $API_URL"
echo "  이제 Claude Code 세션 종료 시 자동으로 사용량이 기록돼!"
`;
  res.type('text/plain').send(script);
});

// ═══════════════════════════════════════════
// Skills Hub API — data/skills.json
// ═══════════════════════════════════════════
const SKILLS_FILE = 'skills.json';
if (!fs.existsSync(path.join(DATA_DIR, SKILLS_FILE))) {
  writeJSON(SKILLS_FILE, []);
}

function getSkills() { return readJSON(SKILLS_FILE) || []; }

// GET /api/skills — 전체 스킬 목록
app.get('/api/skills', (req, res) => {
  try {
    res.json(getSkills());
  } catch (err) {
    console.error('Skills GET error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/skills — 스킬 등록
app.post('/api/skills', (req, res) => {
  try {
    const { name, author, desc, skillmd } = req.body;
    if (!name || !author) {
      return res.status(400).json({ error: 'name and author required' });
    }
    const skills = getSkills();
    const newSkill = {
      id: 'skill-' + Date.now(),
      name,
      author,
      desc: desc || '',
      skillmd: skillmd || '',
      likes: 0,
      date: new Date().toISOString().split('T')[0],
    };
    skills.push(newSkill);
    writeJSON(SKILLS_FILE, skills);
    res.json(newSkill);
  } catch (err) {
    console.error('Skills POST error:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/skills/:id — 스킬 수정
app.put('/api/skills/:id', (req, res) => {
  try {
    const skills = getSkills();
    const idx = skills.findIndex(s => s.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'skill not found' });
    const { name, author, desc, skillmd } = req.body;
    if (name !== undefined) skills[idx].name = name;
    if (author !== undefined) skills[idx].author = author;
    if (desc !== undefined) skills[idx].desc = desc;
    if (skillmd !== undefined) skills[idx].skillmd = skillmd;
    writeJSON(SKILLS_FILE, skills);
    res.json(skills[idx]);
  } catch (err) {
    console.error('Skills PUT error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/skills/:id — 스킬 삭제
app.delete('/api/skills/:id', (req, res) => {
  try {
    const skills = getSkills();
    const idx = skills.findIndex(s => s.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'skill not found' });
    skills.splice(idx, 1);
    writeJSON(SKILLS_FILE, skills);
    res.json({ ok: true });
  } catch (err) {
    console.error('Skills DELETE error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/skills/:id/like — 좋아요 토글
app.post('/api/skills/:id/like', (req, res) => {
  try {
    const skills = getSkills();
    const s = skills.find(x => x.id === req.params.id);
    if (!s) return res.status(404).json({ error: 'skill not found' });
    s.likes = (s.likes || 0) + 1;
    writeJSON(SKILLS_FILE, skills);
    res.json(s);
  } catch (err) {
    console.error('Skills LIKE error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── Start ───
app.listen(PORT, () => {
  console.log(`ABLE Native Camp server running on http://localhost:${PORT}`);
});
