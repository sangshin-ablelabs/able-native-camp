# Block 3: 설치 확인 + 첫 대화

## EXPLAIN

여기까지 왔으면 이미 Claude Code가 설치되어 있고, 이 프로젝트 폴더 안에서 실행 중이야.
(웹사이트 시작하기 4단계를 따라왔으면 이미 다 된 거야!)

혹시 아직 안 됐으면 아래만 확인해봐:

| 확인 | 명령어 | OK 사인 |
|------|--------|---------|
| Claude Code 설치됨? | `claude --version` | 버전 번호가 나오면 OK |
| 캠프 폴더 안에 있어? | 지금 이 대화가 되고 있으면 OK | 이미 여기야! |
| 로그인 됐어? | 이 메시지가 보이면 OK | 이미 됐어! |

### Output Style 설정

아직 안 했으면 하나만 해줘:

1. `/output-style` 입력
2. **Explanatory** 선택

> Claude가 뭘 하는지 설명을 같이 해줘서, 배우는 단계에서 제일 좋아.

### (선택) VS Code 확장

VS Code 쓰고 있으면:
```bash
code --install-extension anthropic.claude-code
```

### Mac 꿀팁: 숨겨진 폴더 보기

Mac에서는 `.claude`, `.git` 같은 폴더가 기본으로 안 보여. Claude에게 이렇게 시키면 돼:

```
Finder에서 숨겨진 폴더도 볼 수 있게 설정해줘
```

설정하면 `.claude/skills/` 폴더 안에 지금 배우고 있는 교안이 들어있는 걸 볼 수 있어!

## EXECUTE

이미 다 된 상태일 거야. 확인만 하자:

1. `/output-style` → Explanatory 선택 (아직 안 했으면)
2. 자유롭게 2~3개 질문해봐. 뭐든 괜찮아. 예를 들면:
   - "이 프로젝트 폴더에 뭐가 있어?"
   - "내일 날씨 알려줘" (이건 못 해 — 인터넷 검색은 안 돼)
   - "간단한 자기소개 해줘"

---
다 해봤으면 "완료" 또는 "다음"이라고 말해줘.

## QUIZ

```json
AskUserQuestion({
  "questions": [{
    "question": "아래에서 골라봐",
    "header": "Setup 확인: 설치 확인하고 대화 좀 해봤어?",
    "options": [
      {"label": "다 했어!", "description": "Day 1으로 가자"},
      {"label": "아직 해보는 중", "description": "좀 더 놀아볼게"},
      {"label": "뭔가 안 돼", "description": "도움이 필요해"}
    ],
    "multiSelect": false
  }]
})
```

> "뭔가 안 돼" 선택하면 증상을 물어보고 도와줘. 흔한 문제:
> - 권한 에러 (Mac): 터미널을 관리자 권한으로 재실행
> - `claude` 명령 안 됨: 터미널을 껐다 다시 열어봐
> - Windows 실행 정책 에러: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` 실행 후 재시도
