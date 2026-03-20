# Block 2: Microsoft Teams 연결

## EXPLAIN

> ⚠️ **전제 조건**: 이 실습에는 Node.js가 필요해. (npx 명령어를 사용해)
> 터미널에서 `node --version`을 실행해서 설치 여부를 확인해봐.
> 없으면 Day 0 사전 준비 체크리스트를 참고해서 먼저 설치해.

Teams는 ABLE Labs의 메신저야. 채팅, 채널, 파일 공유 다 여기서 해.

MCP로 Teams를 연결하면 Claude가 이런 것들을 할 수 있어:
- 팀/채널 목록 조회
- 채널 메시지 읽기
- 채널에 메시지 보내기
- 1:1/그룹 채팅 메시지 읽기
- 채팅 메시지 보내기
- 나를 멘션한 메시지 확인
- 메시지 검색

### 연결 방법

> **사전 준비**: Teams MCP 서버 파일과 Azure AD 인증 토큰이 필요해. 캠프 진행자가 사전에 배포해.

**Step 1**: 진행자가 배포한 `teams-mcp` 폴더를 내 Documents 아래에 둬.

**Step 2**: `.mcp.json`에 Teams 서버를 추가해:

```json
{
  "mcpServers": {
    "teams-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "teams-mcp-server"],
      "env": {}
    }
  }
}
```

**Step 3**: 처음 실행하면 Microsoft 로그인 화면이 떠. 회사 계정으로 로그인하면 연결 완료.

> 연결이 안 되면 Claude에게 "Teams MCP 연결 도와줘"라고 해봐. 설정 방식은 캠프 진행자가 배포한 가이드를 따라.

### 연결 후 할 수 있는 것

| 명령 | 실행되는 도구 |
|------|-------------|
| "우리 팀 채널 목록 보여줘" | `list_channels` |
| "General 채널 최근 메시지 보여줘" | `get_channel_messages` |
| "채널에 이 내용 올려줘" | `send_channel_message` |
| "나 멘션한 메시지 뭐야" | `get_my_mentions` |
| "팀즈에서 '견적' 검색해줘" | `search_messages` |

### 주의사항

- **메시지 발송 전 반드시 확인해**: Claude가 Teams에 메시지를 보내기 전에 내용을 꼭 확인해
- 한번 보낸 메시지는 전체 채널에 보여. 실수로 이상한 내용 보내면 곤란하지
- 연습할 때는 테스트 채널을 사용해

## EXECUTE

1. Teams MCP가 연결되어 있는지 확인해:
```bash
claude mcp list
```

2. 연결이 되어 있으면 아래를 직접 해봐:
   - "우리 팀 목록 보여줘"
   - "able-native-camp 채널 최근 메시지 보여줘"
   - "나를 멘션한 메시지 있어?"

3. **읽기만 먼저 연습해.** 메시지 보내기는 Block 4(조합)에서 해.

---
위 내용을 직접 실행해봐.
실행이 끝나면 "완료" 또는 "다음"이라고 입력해.

## QUIZ

```json
AskUserQuestion({
  "questions": [{
    "question": "Teams MCP를 사용할 때 가장 주의해야 할 점은?",
    "header": "Block 2 퀴즈",
    "options": [
      {"label": "A. 메시지를 최대한 많이 보내야 해"},
      {"label": "B. 메시지 발송 전 반드시 내용을 확인해야 해"},
      {"label": "C. 항상 영어로 써야 해"},
      {"label": "D. 매번 Teams 앱을 같이 열어놔야 해"}
    ],
    "multiSelect": false
  }]
})
```

정답: B. Claude가 Teams에 메시지를 보내면 전체 채널에 바로 보여. 보내기 전에 내용을 꼭 확인하는 습관이 중요해. AI가 대신 보내는 거지, 책임은 내가 지는 거야.
