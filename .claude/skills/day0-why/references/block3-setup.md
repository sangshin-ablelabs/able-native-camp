# Block 3: 설치하고 첫 대화해보자

## EXPLAIN

### 사전 확인

아래 명령어를 터미널에서 실행해서 확인해봐:

| 확인 항목 | 명령어 | 없으면? |
|----------|--------|--------|
| Git | `git --version` | Mac: `xcode-select --install` / Windows: git-scm.com에서 설치 |
| Node.js | `node --version` | https://nodejs.org 에서 LTS 설치 (Day 2 MCP 연결에 필요) |
| Python3 | `python3 --version` | Mac: `brew install python3` / Windows: python.org에서 설치 (Day 2 다우오피스 연결에 필요) |

지금 당장 없어도 괜찮아. Day 0은 Claude Code 설치만 하면 돼. Node.js랑 Python3는 Day 2 전까지 설치하면 돼.

### 1. 터미널 열기

| OS | 방법 |
|----|------|
| Mac | `⌘ Command + Space` → "터미널" 검색 → Enter |
| Windows | `Win + X` → "Windows PowerShell" 선택 |

> VS Code 쓰고 있으면 `Ctrl + ~` 로 내장 터미널 열어도 돼.

### 2. Claude Code 설치

| OS | 명령어 |
|----|--------|
| Mac / Linux | `curl -fsSL https://claude.ai/install.sh \| bash` |
| Windows (PowerShell) | `irm https://claude.ai/install.ps1 \| iex` |

한 줄이면 끝이야.

### 3. 설치 확인

```bash
claude --version
```

버전 번호가 나오면 성공!

### 트러블슈팅

| 문제 | 해결 |
|------|------|
| 권한 에러 (Mac) | 터미널을 관리자 권한으로 재실행 |
| `claude` 명령 안 됨 | 터미널을 껐다 다시 열어봐 |
| Windows 실행 정책 에러 | `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` 실행 후 재시도 |

### 4. Anthropic 계정 & 구독

Claude Code를 쓰려면 Anthropic 계정이랑 유료 구독이 필요해.

**계정 만들기:**
1. https://claude.ai 접속
2. "Sign up" 클릭 → 이메일 또는 Google 계정으로 가입
3. 이메일 인증 완료

**구독 (필수):**
- **Claude Pro** ($20/월) — 개인용, 기본 추천
- **Claude Max** ($100/월) — 많이 쓰는 사람용
- **Claude Teams** ($30/인/월) — 팀 단위

> 회사에서 구독을 제공하는 경우: 진행자가 안내하는 초대 링크로 참여하면 돼.
> 개인 구독인 경우: claude.ai → Settings → Subscription에서 Pro 선택.

### 5. 첫 실행 + 로그인

터미널에 `claude` 입력하면 브라우저가 열려. Anthropic 계정으로 로그인하면 돼.
"Subscription required" 메시지가 뜨면 위에서 구독을 먼저 완료해.

### 6. Output Style 설정

로그인이 끝나면:

1. Claude Code 대화창에 `/output-style` 입력
2. **Explanatory** 선택

> Explanatory 모드는 Claude가 뭘 하는지 설명을 같이 해줘. 배우는 단계에서 제일 좋아.

### 7. (선택) VS Code 확장 설치

VS Code 쓰고 있으면:
```bash
code --install-extension anthropic.claude-code
```
설치 후 사이드바에서 Claude 아이콘 클릭하면 바로 쓸 수 있어.

### Mac 꿀팁: 숨겨진 폴더 보기

Mac에서는 `.claude`, `.git` 같은 폴더가 기본으로 안 보여. Claude에게 이렇게 시키면 돼:

```
Finder에서 숨겨진 폴더도 볼 수 있게 설정해줘
```

설정하면 `.claude/skills/` 폴더 안에 지금 배우고 있는 교안이 들어있는 걸 볼 수 있어!

## EXECUTE

순서대로 해봐:

1. **터미널 열기** (Mac: `⌘+Space` → 터미널 / VS Code: `Ctrl+~`)
2. **설치**: 위 OS별 명령어 실행
3. **확인**: `claude --version` → 버전 번호 나오면 성공
4. **첫 실행**: `claude` 입력 → 브라우저에서 로그인
5. **첫 대화**: "안녕, 나는 [이름]이고 [직업]이야. 나한테 인사해줘"
6. **Output Style**: `/output-style` → Explanatory 선택
7. (선택) VS Code 확장: `code --install-extension anthropic.claude-code`

---
다 끝나면 "완료" 또는 "다음"이라고 말해줘.

## QUIZ

```json
AskUserQuestion({
  "questions": [{
    "question": "설치하고 첫 대화까지 해봤어?",
    "header": "Setup 확인",
    "options": [
      {"label": "다 했어!", "description": "Day 1으로 가자"},
      {"label": "아직 하는 중", "description": "좀 더 시간 필요해"},
      {"label": "뭔가 안 돼", "description": "도움이 필요해"}
    ],
    "multiSelect": false
  }]
})
```

> "뭔가 안 돼" 선택하면 증상을 물어보고, 위 트러블슈팅 표를 기반으로 도와줘.
