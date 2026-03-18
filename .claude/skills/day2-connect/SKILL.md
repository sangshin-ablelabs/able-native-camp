---
name: day2-connect
description: ABLE Native Camp Day 2. MCP로 업무 도구(다우오피스, Teams, Notion) 연결. "Day 2", "connect", "MCP", "연결" 요청에 사용.
---

# Day 2: Connect — 업무 도구와 AI를 연결한다

이 스킬이 호출되면 아래 **STOP PROTOCOL**을 반드시 따른다.

---

## STOP PROTOCOL — 절대 위반 금지

### 각 블록은 반드시 2턴에 걸쳐 진행한다

```
┌─ Phase A (첫 번째 턴) ──────────────────────────────┐
│ 1. references/에서 해당 블록 파일의 EXPLAIN 섹션을 읽는다    │
│ 2. 기능을 설명한다                                        │
│ 3. references/에서 해당 블록 파일의 EXECUTE 섹션을 읽는다    │
│ 4. "지금 직접 실행해보세요"라고 안내한다                     │
│ 5. 여기서 반드시 STOP. 턴을 종료한다.                       │
│                                                          │
│ 절대 하지 않는 것: 퀴즈 출제, QUIZ 섹션 읽기               │
│ 절대 하지 않는 것: AskUserQuestion 호출                    │
└──────────────────────────────────────────────────────────┘

  사용자가 돌아와서 "했어", "완료", "다음" 등을 입력한다

┌─ Phase B (두 번째 턴) ──────────────────────────────┐
│ 1. references/에서 해당 블록 파일의 QUIZ 섹션을 읽는다       │
│ 2. AskUserQuestion으로 퀴즈를 출제한다                     │
│ 3. 정답/오답 피드백을 준다                                 │
│ 4. 다음 블록으로 이동할지 AskUserQuestion으로 묻는다         │
└──────────────────────────────────────────────────────────┘
```

### Phase A 종료 시 필수 문구

```
---
위 내용을 직접 실행해보세요.
실행이 끝나면 "완료" 또는 "다음"이라고 입력해주세요.
```

---

## References 파일 맵

| 블록 | 파일 | 주제 |
|------|------|------|
| Block 0 | `references/block0-what-is-mcp.md` | MCP가 뭔지 이해하기 |
| Block 1 | `references/block1-daouoffice.md` | 다우오피스 연결 (이메일 + 캘린더) |
| Block 2 | `references/block2-teams.md` | Microsoft Teams 연결 |
| Block 3 | `references/block3-notion.md` | Notion 연결 |
| Block 4 | `references/block4-combine.md` | 3개 MCP 조합 — 오늘의 업무 요약 |
| Block 5 | `references/block5-wrap.md` | Day 2 마무리 + 미션 |

---

## 시작

스킬 시작 시 아래를 출력한다:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ABLE Native Camp — Day 2: Connect
  Level 2: 업무 도구와 AI를 연결한다
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

오늘 배우는 것:
1. MCP란 무엇인가 — AI의 손
2. 다우오피스 연결 (이메일 + 캘린더)
3. Microsoft Teams 연결
4. Notion 연결
5. 3개를 조합해서 "오늘의 업무 요약" 만들기

준비됐으면 "시작"이라고 입력해.
```

AskUserQuestion으로 시작 블록을 선택하게 한다:

```json
AskUserQuestion({
  "questions": [{
    "question": "어디서부터 시작할까?",
    "header": "Day 2 블록 선택",
    "options": [
      {"label": "Block 0: MCP 개념", "description": "MCP가 뭔지, 왜 필요한지"},
      {"label": "Block 1: 다우오피스", "description": "이메일 + 캘린더 연결"},
      {"label": "Block 2: Teams", "description": "Microsoft Teams 연결"},
      {"label": "Block 3: Notion", "description": "Notion 연결"},
      {"label": "Block 4: 조합", "description": "3개 MCP로 업무 요약 만들기"}
    ],
    "multiSelect": false
  }]
})
```
