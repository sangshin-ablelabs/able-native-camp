# Block 1: 다우오피스 연결 (이메일 + 캘린더)

## EXPLAIN

> ⚠️ **전제 조건**: 이 실습에는 Python3가 필요하다.
> 터미널에서 `python3 --version`을 실행해서 설치 여부를 확인해.
> 없으면 Day 0 사전 준비 체크리스트를 참고해서 먼저 설치해.

ABLE Labs는 다우오피스를 쓴다. 이메일과 캘린더가 여기에 있다.

MCP로 다우오피스를 연결하면 Claude가 이런 것들을 할 수 있다:
- 최근 이메일 확인
- 이메일 검색 (제목, 발신자)
- 이메일 본문 읽기
- 오늘/이번 주 일정 조회
- 일정 키워드 검색

### 연결 방법

> **사전 준비**: 다우오피스 MCP 서버 파일과 `.env` 설정이 필요하다. 캠프 진행자가 사전에 배포한다.

**Step 1**: 진행자가 배포한 `daouoffice-mcp` 폴더를 내 Documents 아래에 둔다.

**Step 2**: `.mcp.json` 파일에 다우오피스 서버를 추가한다:

```json
{
  "mcpServers": {
    "daouoffice-mcp": {
      "type": "stdio",
      "command": "python3",
      "args": ["/Users/[내아이디]/Documents/Claude/daouoffice-mcp/server.py"],
      "env": {}
    }
  }
}
```

`[내아이디]` 부분을 본인 Mac 사용자명으로 바꾼다. 모르면 터미널에서 `whoami`를 입력하면 나온다.

**Step 3**: 서버 폴더 안의 `.env` 파일에 내 다우오피스 계정을 설정한다:
```
DAOU_EMAIL=내이메일@ablelabs.io
DAOU_PASSWORD=내비밀번호
```

> 💡 **가장 쉬운 방법**: Claude에게 "다우오피스 MCP 연결해줘"라고 하면 Claude가 `.mcp.json`을 만들어준다. 위 과정을 직접 하지 않아도 대화로 진행할 수 있다.

### 연결 후 할 수 있는 것

| 명령 | 실행되는 도구 |
|------|-------------|
| "오늘 온 메일 보여줘" | `daou_email_recent` |
| "삼성바이오에서 온 메일 찾아줘" | `daou_email_search` |
| "이 메일 본문 읽어줘" | `daou_email_read` |
| "오늘 일정 뭐야" | `daou_calendar_today` |
| "이번 주 일정 보여줘" | `daou_calendar_week` |
| "KAIST 미팅 일정 찾아줘" | `daou_calendar_search` |

### 핵심

자연어로 말하면 된다. "다우오피스 열어서 이메일 탭 들어가서..." 이런 거 안 해도 된다.
그냥 "오늘 메일 뭐 왔어?" 하면 Claude가 알아서 조회한다.

## EXECUTE

1. 다우오피스 MCP가 연결되어 있는지 확인한다:
```bash
claude mcp list
```

2. 연결이 안 되어 있으면 위 연결 방법을 따라 설정한다. 막히면 Claude에게 "다우오피스 MCP 연결 도와줘"라고 한다

3. 연결이 되어 있으면 아래를 직접 해본다:
   - "오늘 온 메일 보여줘"
   - "오늘 일정 뭐야"
   - 메일 하나를 골라서 "이 메일 본문 읽어줘"

4. 결과를 확인하고, 실제로 다우오피스와 동일한 내용인지 대조해본다

---
위 내용을 직접 실행해보세요.
실행이 끝나면 "완료" 또는 "다음"이라고 입력해주세요.

## QUIZ

```json
AskUserQuestion({
  "questions": [{
    "question": "다우오피스 MCP를 연결한 후, 이메일을 확인하려면 어떻게 해야 할까?",
    "header": "Block 1 퀴즈",
    "options": [
      {"label": "A. 다우오피스 웹사이트에 로그인해서 직접 확인한다"},
      {"label": "B. Claude에게 '오늘 메일 뭐 왔어?'라고 자연어로 말한다"},
      {"label": "C. daou_email_recent 명령어를 직접 입력한다"},
      {"label": "D. IMAP 프로토콜 코드를 작성한다"}
    ],
    "multiSelect": false
  }]
})
```

정답: B. MCP가 연결되면 자연어로 말하는 것만으로 충분하다. Claude가 알아서 적절한 도구(daou_email_recent 등)를 호출한다. 도구 이름을 외울 필요 없다.
