# Block 3: 설치 + 첫 실행 + 환경 설정

## EXPLAIN

Claude Code를 설치하고, 첫 실행까지 완료한다.

### 사전 확인 (캠프 시작 전)

아래 명령어를 터미널에서 실행해서 설치 여부를 확인해:

| 확인 항목 | 명령어 | 없으면? |
|----------|--------|--------|
| Git | `git --version` | Mac: `xcode-select --install` / Windows: git-scm.com에서 설치 |
| Node.js | `node --version` | https://nodejs.org 에서 LTS 설치 (Day 2 MCP 연결에 필요) |
| Python3 | `python3 --version` | Mac: `brew install python3` / Windows: python.org에서 설치 (Day 2 다우오피스 연결에 필요) |

### 1. 터미널 열기

| OS | 방법 |
|----|------|
| Mac | `⌘ Command + Space` → "터미널" 검색 → Enter |
| Windows | `Win + R` → `cmd` 입력 → Enter (또는 PowerShell) |

> VS Code 사용자는 VS Code 하단 터미널(`Ctrl + ~`)을 써도 된다.

### 2. 설치

| OS | 명령어 |
|----|--------|
| Mac / Linux | `curl -fsSL https://claude.ai/install.sh \| bash` |
| Windows (PowerShell) | `irm https://claude.ai/install.ps1 \| iex` |

Node.js 불필요. 한 줄이면 끝. 자동 업데이트 내장.

### 3. 설치 확인

```bash
claude --version
```

버전 번호가 나오면 성공.

### 트러블슈팅

| 문제 | 해결 |
|------|------|
| 권한 에러 (Mac) | 터미널을 관리자 권한으로 재실행 |
| 설치 후 `claude` 명령 안 됨 | 터미널을 껐다 다시 열기 |
| Windows 실행 정책 에러 | `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` 실행 후 재시도 |

### 4. 에디터 (선택사항)

Claude Code는 터미널에서 `claude`만 치면 된다. 파일을 눈으로 보면서 작업하고 싶다면 에디터를 설치할 수 있다:

| 에디터 | 특징 | 추천 대상 |
|--------|------|-----------|
| VS Code | Claude Code 확장 지원, 범용적 | 이미 쓰고 있거나, 파일 탐색이 편한 게 좋은 분 |
| Cursor | AI 내장, CC 시너지 | 코드 편집도 할 분 |

> 이 캠프에서는 에디터 없이 터미널에서 `claude`만 쳐도 충분하다. 에디터는 나중에 필요할 때 설치해도 된다.

**VS Code 사용자라면:**
```bash
code --install-extension anthropic.claude-code
```
설치 후 사이드바 Claude 아이콘 클릭 → 채팅 패널에서 바로 사용 가능.

### 5. Anthropic 계정 & 구독

#### 계정 만들기
1. https://claude.ai 접속
2. "Sign up" 클릭 → 이메일 또는 Google 계정으로 가입
3. 이메일 인증 완료

#### Claude 구독 (필수)
Claude Code를 사용하려면 유료 구독이 필요해:
- **Claude Pro** ($20/월) — 개인용, 기본 추천
- **Claude Max** ($100/월) — 헤비 사용자용
- **Claude Teams** ($30/인/월) — 팀 단위 사용

> 회사에서 구독을 제공하는 경우: [진행자가 안내하는 초대 링크]로 참여
> 개인 구독인 경우: claude.ai → Settings → Subscription에서 Pro 선택

#### 첫 실행 + 로그인
터미널에 `claude`를 입력한다. 브라우저가 열리면 로그인하면 구독 상태가 자동 확인된다.
"Subscription required" 메시지가 뜨면 위 절차로 구독을 먼저 완료해.

### 6. Output Style 설정

로그인이 끝나면 Output Style을 설정한다:

1. Claude Code 대화창에 `/output-style` 입력
2. 선택지에서 **Explanatory** 선택

> Explanatory 모드는 Claude가 코드를 작성할 때 왜 그렇게 하는지 설명을 함께 해준다. 배우는 단계에서 가장 적합한 모드다.

### 7. Mac 꿀팁: 숨겨진 폴더 보기

Mac에서는 `.`으로 시작하는 폴더(`.claude`, `.git` 등)가 기본적으로 안 보인다. Claude에게 시키면 된다:

```
Finder에서 .claude, .git 처럼 숨겨진 폴더도 볼 수 있게 설정해줘
```

설정 후 `open ./` 명령으로 Finder를 열어보면 `.claude/skills/` 폴더 안에 지금 배우고 있는 교안이 들어있다!

## EXECUTE

순서대로 실행한다:

1. **터미널 열기** (Mac: `⌘+Space` → 터미널 / VS Code: `Ctrl+~`)
2. **설치**: 위 OS별 명령어 실행
3. **확인**: `claude --version` → 버전 번호 확인
4. **첫 실행**: `claude` 입력 → 로그인
5. **첫 대화**: "안녕, 나는 [이름]이고 [직업]이야. 나한테 인사해줘"
6. **Output Style**: `/output-style` → Explanatory 선택
7. (선택) VS Code 확장 설치: `code --install-extension anthropic.claude-code`

---
위 내용을 직접 실행해보세요.
실행이 끝나면 "완료" 또는 "다음"이라고 입력해주세요.

## QUIZ

```json
AskUserQuestion({
  "questions": [{
    "question": "설치와 첫 대화까지 완료했나요?",
    "header": "Setup 확인",
    "options": [
      {"label": "모두 완료!", "description": "Day 1으로 이동"},
      {"label": "아직 진행 중", "description": "더 시간이 필요함"},
      {"label": "트러블슈팅 필요", "description": "설치나 실행에 문제 발생"}
    ],
    "multiSelect": false
  }]
})
```

> "트러블슈팅 필요" 선택 시 증상을 물어보고, 위 트러블슈팅 표를 기반으로 해결을 도와준다.
