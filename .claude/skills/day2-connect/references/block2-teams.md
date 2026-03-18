# Block 2: Microsoft Teams 연결

## EXPLAIN

Teams는 ABLE Labs의 메신저다. 채팅, 채널, 파일 공유 다 여기서 한다.

MCP로 Teams를 연결하면 Claude가 이런 것들을 할 수 있다:
- 팀/채널 목록 조회
- 채널 메시지 읽기
- 채널에 메시지 보내기
- 1:1/그룹 채팅 메시지 읽기
- 채팅 메시지 보내기
- 나를 멘션한 메시지 확인
- 메시지 검색

### 연결 방법

Teams MCP도 `.mcp.json`에 추가한다:

```json
{
  "mcpServers": {
    "teams-mcp": {
      "command": "npx",
      "args": ["-y", "@anthropic/teams-mcp"],
      "env": {
        "TEAMS_TOKEN": "토큰값"
      }
    }
  }
}
```

또는 CLI로:
```bash
claude mcp add teams-mcp -- npx -y @anthropic/teams-mcp
```

(실제 설정은 캠프 진행자가 안내하는 방식을 따른다)

### 연결 후 할 수 있는 것

| 명령 | 실행되는 도구 |
|------|-------------|
| "우리 팀 채널 목록 보여줘" | `list_channels` |
| "General 채널 최근 메시지 보여줘" | `get_channel_messages` |
| "채널에 이 내용 올려줘" | `send_channel_message` |
| "나 멘션한 메시지 뭐야" | `get_my_mentions` |
| "팀즈에서 '견적' 검색해줘" | `search_messages` |

### 주의사항

- **메시지 발송 전 반드시 확인**: Claude가 Teams에 메시지를 보내기 전에 내용을 꼭 확인한다
- 한번 보낸 메시지는 전체 채널에 보인다. 실수로 이상한 내용 보내면 곤란하다
- 연습할 때는 테스트 채널을 사용한다

## EXECUTE

1. Teams MCP가 연결되어 있는지 확인한다:
```bash
claude mcp list
```

2. 연결이 되어 있으면 아래를 직접 해본다:
   - "우리 팀 목록 보여줘"
   - "able-native-camp 채널 최근 메시지 보여줘"
   - "나를 멘션한 메시지 있어?"

3. **읽기만 먼저 연습한다.** 메시지 보내기는 Block 4(조합)에서 한다.

---
위 내용을 직접 실행해보세요.
실행이 끝나면 "완료" 또는 "다음"이라고 입력해주세요.

## QUIZ

```json
AskUserQuestion({
  "questions": [{
    "question": "Teams MCP를 사용할 때 가장 주의해야 할 점은?",
    "header": "Block 2 퀴즈",
    "options": [
      {"label": "A. 메시지를 최대한 많이 보내야 한다"},
      {"label": "B. 메시지 발송 전 반드시 내용을 확인해야 한다"},
      {"label": "C. 항상 영어로 써야 한다"},
      {"label": "D. 매번 Teams 앱을 같이 열어놔야 한다"}
    ],
    "multiSelect": false
  }]
})
```

정답: B. Claude가 Teams에 메시지를 보내면 전체 채널에 바로 보인다. 보내기 전에 내용을 꼭 확인하는 습관이 중요하다. AI가 대신 보내는 거지, 책임은 내가 지는 거다.
