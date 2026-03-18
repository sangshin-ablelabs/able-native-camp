# Block 0: 첫 대화

## EXPLAIN

Claude Code는 터미널에서 실행하는 AI 도구다. 채팅창이 아니라 터미널이다.

왜 터미널인가?
- 파일을 직접 읽고 쓸 수 있다
- 명령어를 실행할 수 있다
- 내 컴퓨터의 모든 도구에 접근할 수 있다

채팅 AI는 "대화만" 한다. Claude Code는 "대화하면서 실행"한다.

### 실행 방법

```bash
# 터미널(또는 VS Code 터미널)을 연다
claude
```

이것만 치면 된다. Claude가 인사한다.

### 첫 대화 예시

아무거나 시켜봐:
- "안녕, 나는 [이름]이야. ABLE Labs [팀]에서 일해"
- "오늘 날짜 알려줘"
- "이 폴더에 어떤 파일이 있는지 보여줘"

## EXECUTE

1. 터미널을 연다
2. `claude` 를 입력한다
3. 아무 말이나 걸어본다 — 자기소개, 간단한 질문, 뭐든 좋다
4. 3번 이상 대화를 주고받아본다

---
위 내용을 직접 실행해보세요.
실행이 끝나면 "완료" 또는 "다음"이라고 입력해주세요.

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

정답: B. Claude Code는 터미널에서 실행되기 때문에 파일을 직접 읽고, 쓰고, 명령어를 실행할 수 있다. 채팅 AI는 대화만 가능하지만, Claude Code는 "대화하면서 실행"한다.
