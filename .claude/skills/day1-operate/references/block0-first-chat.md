# Block 0: 첫 대화

## EXPLAIN

Claude Code는 터미널에서 실행하는 AI 도구야. 채팅창이 아니라 터미널이야.

왜 터미널이냐면:
- 파일을 직접 읽고 쓸 수 있어
- 명령어를 실행할 수 있어
- 내 컴퓨터의 모든 도구에 접근할 수 있어

채팅 AI는 "대화만" 해. Claude Code는 "대화하면서 실행"해.

### 실행 방법 — 2가지

**방법 1: 터미널**
```bash
claude
```
이것만 치면 돼. Claude가 인사해.

**방법 2: VS Code**
VS Code를 쓰고 있으면 Claude Code 확장을 설치하면 에디터 안에서 바로 쓸 수 있어.
- 사이드바 Claude 아이콘 클릭 → 채팅 패널 열림
- 파일을 눈으로 보면서 AI와 대화할 수 있어서 더 편해
- 코드를 드래그해서 선택 → 채팅에 자동으로 컨텍스트 전달

> 둘 다 같은 Claude Code야. 터미널이든 VS Code든, 편한 걸로 쓰면 돼.

### 첫 대화 예시

아무거나 시켜봐:
- "안녕, 나는 [이름]이야. ABLE Labs [팀]에서 일해"
- "오늘 날짜 알려줘"
- "이 폴더에 어떤 파일이 있는지 보여줘"

### 핵심 마인드셋

**모르면 Claude에게 물어봐.** 기능을 외울 필요 없어. "이거 어떻게 해?" 하면 Claude가 알려줘. 이 캠프 내내 이 원칙이 적용돼.

## EXECUTE

1. 터미널 또는 VS Code에서 Claude Code를 열어
2. `claude`를 입력해 (VS Code는 사이드바 아이콘 클릭)
3. 아무 말이나 걸어봐 — 자기소개, 간단한 질문, 뭐든 좋아
4. 3번 이상 대화를 주고받아봐
5. (선택) "Claude Code에서 MCP가 뭐야?" 같은 질문도 해봐 — Claude가 자기 기능도 설명해줘

---
위 내용을 직접 해봐.
다 했으면 "완료" 또는 "다음"이라고 입력해.

## QUIZ

```json
AskUserQuestion({
  "questions": [{
    "question": "Claude Code와 일반 ChatGPT/Claude 웹의 가장 큰 차이는 뭘까?",
    "header": "Block 0 퀴즈",
    "options": [
      {"label": "A. 더 똑똑하다"},
      {"label": "B. 내 컴퓨터의 파일을 직접 읽고 쓸 수 있다"},
      {"label": "C. 무료다"},
      {"label": "D. 한국어를 더 잘한다"}
    ],
    "multiSelect": false
  }]
})
```

정답: B. Claude Code는 터미널에서 실행되니까 파일을 직접 읽고, 쓰고, 명령어를 실행할 수 있어. 채팅 AI는 대화만 가능하지만, Claude Code는 "대화하면서 실행"하지. 그리고 기억해 — 모르는 게 있으면 Claude에게 물어보면 돼!
