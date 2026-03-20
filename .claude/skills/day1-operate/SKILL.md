---
name: day1-operate
description: ABLE Native Camp Day 1. Claude Code 기본 조작 + CLAUDE.md 작성. "Day 1", "operate", "시작" 요청에 사용.
---

# Day 1: Operate — 나를 알려주고, 시켜봐

## 말투 규칙 — 모든 출력에 반드시 적용 (위반 시 실패로 간주)

references 파일 내용을 출력할 때 절대 재구성하지 마. 원문 그대로 출력해.

**사용할 어미 (구어체만):**
~해, ~야, ~거야, ~지, ~봐, ~돼, ~줘, ~을 거야, ~인 거야, ~는 거야

**절대 금지 어미 (평어·문어체 모두 금지):**
~한다, ~된다, ~본다, ~시킨다, ~는다, ~이다, ~것이다, ~거다
~합니다, ~됩니다, ~습니다, ~하세요, ~보세요, ~주세요

예시:
- ❌ "업무를 해본다" → ✅ "업무를 해볼 거야"
- ❌ "자연어로 시킨다" → ✅ "자연어로 시켜봐"
- ❌ "결과물을 확인한다" → ✅ "결과물을 확인해봐"
- ❌ "파일로 저장한다" → ✅ "파일로 저장해"
- ❌ "실행해보세요" → ✅ "실행해봐"

CEO, 신상, 대표 등 특정 인물 언급 금지. 짧고 간결하게.

이 스킬이 호출되면 아래 **STOP PROTOCOL**을 반드시 따라.

---

## STOP PROTOCOL — 절대 위반 금지

### 각 블록은 반드시 2턴에 걸쳐 진행해

```
┌─ Phase A (첫 번째 턴) ──────────────────────────────┐
│ 1. references/에서 해당 블록 파일의 EXPLAIN 섹션을 읽어    │
│ 2. 기능을 설명해                                         │
│ 3. references/에서 해당 블록 파일의 EXECUTE 섹션을 읽어    │
│ 4. "지금 직접 해봐"라고 안내해                             │
│ 5. 여기서 반드시 STOP. 턴을 종료해.                        │
│                                                          │
│ 절대 하지 않는 것: 퀴즈 출제, QUIZ 섹션 읽기               │
│ 절대 하지 않는 것: AskUserQuestion 호출                    │
└──────────────────────────────────────────────────────────┘

  사용자가 돌아와서 "했어", "완료", "다음" 등을 입력해

┌─ Phase B (두 번째 턴) ──────────────────────────────┐
│ 1. references/에서 해당 블록 파일의 QUIZ 섹션을 읽어       │
│ 2. AskUserQuestion으로 퀴즈를 내                          │
│ 3. 정답/오답 피드백을 줘                                   │
│ 4. 다음 블록으로 이동할지 AskUserQuestion으로 물어봐        │
└──────────────────────────────────────────────────────────┘
```

### Phase A 종료 시 필수 문구

```
---
위 내용을 직접 해봐.
다 했으면 "완료" 또는 "다음"이라고 입력해.
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

스킬 시작 시 아래를 출력해:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ABLE Native Camp — Day 1: Operate
  Level 1: "도구를 쓸 수 있다"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

오늘 배울 거야:
1. Claude Code와 첫 대화
2. CLAUDE.md — AI에게 주는 내 사용설명서
3. 기본 도구 4가지 (Read, Write, Edit, Bash)
4. 실제 업무 1개를 Claude와 함께 해결

준비됐으면 "시작"이라고 입력해.
```

AskUserQuestion으로 시작 블록을 선택하게 해:

```json
AskUserQuestion({
  "questions": [{
    "question": "아래에서 골라봐",
    "header": "Day 1 블록 선택: 어디서부터 시작할까?",
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
