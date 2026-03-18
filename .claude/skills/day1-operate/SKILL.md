---
name: day1-operate
description: ABLE Native Camp Day 1. Claude Code 기본 조작 + CLAUDE.md 작성. "Day 1", "operate", "시작" 요청에 사용.
---

# Day 1: Operate — 나를 알려주고, 시켜봐

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
| Block 0 | `references/block0-first-chat.md` | 터미널 열기 + 첫 대화 |
| Block 1 | `references/block1-claude-md.md` | CLAUDE.md 작성 |
| Block 2 | `references/block2-tools.md` | Read/Write/Edit/Bash 기본 도구 |
| Block 3 | `references/block3-real-task.md` | 실제 업무 1개 해보기 |
| Block 4 | `references/block4-wrap.md` | Day 1 마무리 + 미션 |

---

## 시작

스킬 시작 시 아래를 출력한다:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ABLE Native Camp — Day 1: Operate
  Level 1: "도구를 쓸 수 있다"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

오늘 배우는 것:
1. Claude Code와 첫 대화
2. CLAUDE.md — AI에게 주는 내 사용설명서
3. 기본 도구 4가지 (Read, Write, Edit, Bash)
4. 실제 업무 1개를 Claude와 함께 해결

준비됐으면 "시작"이라고 입력해.
```

AskUserQuestion으로 시작 블록을 선택하게 한다:

```json
AskUserQuestion({
  "questions": [{
    "question": "어디서부터 시작할까?",
    "header": "Day 1 블록 선택",
    "options": [
      {"label": "Block 0: 첫 대화", "description": "터미널에서 Claude Code 실행"},
      {"label": "Block 1: CLAUDE.md", "description": "AI에게 나를 알려주기"},
      {"label": "Block 2: 기본 도구", "description": "Read/Write/Edit/Bash"},
      {"label": "Block 3: 실전", "description": "실제 업무 1개 해보기"}
    ],
    "multiSelect": false
  }]
})
```
