---
name: day4-harness
description: ABLE Native Camp Day 4. 스킬을 엮어 워크플로우를 만들어. "Day 4", "harness", "워크플로우" 요청에 사용.
---

# Day 4: Harness — 스킬을 엮어 워크플로우를 만들어

이 스킬이 호출되면 아래 **STOP PROTOCOL**을 반드시 따라.

---

## STOP PROTOCOL — 절대 위반 금지

### 각 블록은 반드시 2턴에 걸쳐 진행해

```
┌─ Phase A (첫 번째 턴) ──────────────────────────────┐
│ 1. references/에서 해당 블록 파일의 EXPLAIN 섹션을 읽어    │
│ 2. 기능을 설명해                                        │
│ 3. references/에서 해당 블록 파일의 EXECUTE 섹션을 읽어    │
│ 4. "지금 직접 실행해봐"라고 안내해                        │
│ 5. 여기서 반드시 STOP. 턴을 종료해.                       │
│                                                          │
│ 절대 하지 않는 것: 퀴즈 출제, QUIZ 섹션 읽기               │
│ 절대 하지 않는 것: AskUserQuestion 호출                    │
└──────────────────────────────────────────────────────────┘

  사용자가 돌아와서 "했어", "완료", "다음" 등을 입력해

┌─ Phase B (두 번째 턴) ──────────────────────────────┐
│ 1. references/에서 해당 블록 파일의 QUIZ 섹션을 읽어       │
│ 2. AskUserQuestion으로 퀴즈를 출제해                     │
│ 3. 정답/오답 피드백을 줘                                 │
│ 4. 다음 블록으로 이동할지 AskUserQuestion으로 물어봐       │
└──────────────────────────────────────────────────────────┘
```

### Phase A 종료 시 필수 문구

```
---
위 내용을 직접 실행해봐.
실행이 끝나면 "완료" 또는 "다음"이라고 입력해.
```

---

## References 파일 맵

| 블록 | 파일 | 주제 |
|------|------|------|
| Block 0 | `references/block0-what-is-harness.md` | 하네스란 뭐야 |
| Block 1 | `references/block1-ceo-workflow.md` | 데일리 브리핑 워크플로우 데모 |
| Block 2 | `references/block2-design-yours.md` | 내 워크플로우 설계 |
| Block 3 | `references/block3-build-workflow.md` | 워크플로우 직접 만들기 |
| Block 4 | `references/block4-wrap.md` | Day 4 마무리 + 미션 |

---

## 시작

스킬 시작 시 아래를 출력해:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ABLE Native Camp — Day 4: Harness
  Level 4: "스킬을 엮어 시스템을 만들 수 있어"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

오늘 배우는 거:
1. 하네스 = 스킬을 엮어 워크플로우로 만드는 거야
2. 데일리 브리핑 워크플로우 분석
3. 내 업무 흐름 설계
4. 스킬 + MCP를 연결한 실전 워크플로우 구축

개별 스킬은 부품이고, 하네스가 시스템을 만들어.
준비됐으면 "시작"이라고 입력해.
```

AskUserQuestion으로 시작 블록을 선택하게 해:

```json
AskUserQuestion({
  "questions": [{
    "question": "어디서부터 시작할까?",
    "header": "Day 4 블록 선택",
    "options": [
      {"label": "Block 0: 하네스란", "description": "스킬을 엮어 시스템으로 만드는 개념"},
      {"label": "Block 1: 데일리 브리핑 워크플로우", "description": "데일리 브리핑 워크플로우 분석"},
      {"label": "Block 2: 내 워크플로우 설계", "description": "내 업무 흐름 그려보기"},
      {"label": "Block 3: 직접 만들기", "description": "스킬+MCP 연결해서 워크플로우 구축"}
    ],
    "multiSelect": false
  }]
})
```
