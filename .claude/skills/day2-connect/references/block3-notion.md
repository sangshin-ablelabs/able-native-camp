# Block 3: Notion 연결

## EXPLAIN

> ⚠️ **전제 조건**: 이 실습에는 Node.js가 필요해. (npx 명령어를 사용해)
> 터미널에서 `node --version`을 실행해서 설치 여부를 확인해봐.
> 없으면 Day 0 사전 준비 체크리스트를 참고해서 먼저 설치해.

Notion은 ABLE Labs의 지식 베이스야. 회의록, 프로젝트 문서, 업무 관리 다 여기 있어.

MCP로 Notion을 연결하면 Claude가 이런 것들을 할 수 있어:
- 페이지/데이터베이스 검색
- 페이지 내용 읽기
- 새 페이지 만들기
- 기존 페이지 수정
- 댓글 달기
- 데이터베이스 쿼리

### 연결 방법

**Step 1: Notion API 키 발급**

1. https://www.notion.so/my-integrations 접속
2. "새 인테그레이션" 클릭
3. 이름 입력: `Claude Code`
4. 워크스페이스 선택 → ABLE Labs
5. 생성 후 **API 키 복사** (ntn_으로 시작하는 문자열)

**Step 2: `.mcp.json`에 추가**

```json
{
  "mcpServers": {
    "notion": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\":\"Bearer ntn_여기에API키붙여넣기\",\"Notion-Version\":\"2022-06-28\"}"
      }
    }
  }
}
```

> `ntn_여기에API키붙여넣기` 부분을 Step 1에서 복사한 API 키로 바꿔.

**Step 3: 페이지 연결 (이게 핵심!)**

API 키를 만들었다고 자동으로 모든 페이지에 접근할 수 있는 게 **아니야**.
접근하고 싶은 페이지/데이터베이스에서 직접 인테그레이션을 연결해야 해:

1. Notion에서 원하는 페이지 열기
2. 우측 상단 `⋯` 클릭
3. "연결" → "Claude Code" 선택

> 이 과정을 잊으면 "페이지를 찾을 수 없습니다" 에러가 나. 가장 흔한 실수야!

### 연결 후 할 수 있는 것

| 명령 | 설명 |
|------|------|
| "노션에서 '주간회의' 검색해줘" | 페이지/DB 검색 |
| "이 페이지 내용 읽어줘" | 페이지 블록 조회 |
| "새 페이지 만들어줘" | 페이지 생성 |
| "이 데이터베이스에서 이번 달 항목 보여줘" | DB 쿼리 |

### 핵심

Notion은 "회사의 기억"이야. MCP로 연결하면 Claude가 회사의 기억을 검색하고, 새로운 기록을 남길 수 있게 돼.

## EXECUTE

1. Notion MCP가 연결되어 있는지 확인해:
```bash
claude mcp list
```

2. 연결이 되어 있으면 아래를 직접 해봐:
   - "노션에서 검색해줘: [자기 팀 관련 키워드]"
   - 검색 결과에서 페이지 하나를 골라 "이 페이지 내용 보여줘"
   - "테스트 페이지 하나 만들어줘. 제목은 '[이름] Day 2 테스트'"

3. 만든 테스트 페이지가 Notion에 실제로 있는지 확인해봐

---
위 내용을 직접 실행해봐.
실행이 끝나면 "완료" 또는 "다음"이라고 입력해.

## QUIZ

```json
AskUserQuestion({
  "questions": [{
    "question": "아래에서 골라봐",
    "header": "Block 3 퀴즈: Notion API 키를 발급한 뒤 반드시 해야 하는 추가 작업은?",
    "options": [
      {"label": "A. Notion 앱을 재시작해"},
      {"label": "B. 접근할 페이지/DB에서 해당 인테그레이션을 '연결'해"},
      {"label": "C. Claude Code를 재설치해"},
      {"label": "D. API 키를 이메일로 공유해"}
    ],
    "multiSelect": false
  }]
})
```

정답: B. Notion API 키를 만들었다고 자동으로 모든 페이지에 접근할 수 있는 게 아니야. 접근하고 싶은 페이지/데이터베이스에서 직접 "연결"을 추가해야 해. (D는 절대 하면 안 돼 — API 키는 비밀번호와 같아)
