# Block 5: Day 2 마무리

## EXPLAIN

Day 2에서 배운 것:

```
1. MCP = AI의 손. 연결할수록 할 수 있는 일이 늘어난다
2. 다우오피스 연결 → 이메일 조회, 캘린더 확인
3. Teams 연결 → 메시지 읽기, 채널 공유
4. Notion 연결 → 문서 검색, 페이지 생성
5. 조합의 힘 → 하나의 프롬프트로 3개 도구를 넘나든다
```

### .mcp.json 구조 복습

프로젝트 루트의 `.mcp.json` 하나로 모든 MCP를 관리한다:

```json
{
  "mcpServers": {
    "daouoffice-mcp": { ... },
    "teams-mcp": { ... },
    "notion": { ... }
  }
}
```

### 오늘의 미션

Teams #able-native-camp 채널에 아래를 공유한다:

```
[Day 2 완료]
- 연결한 MCP: [연결한 도구 이름들]
- 해본 것: 오늘의 업무 요약 만들기
- 가장 유용했던 것: [한줄]
```

**미션 핵심**: MCP로 연결한 도구 3개에서 데이터를 조합해서 "오늘의 업무 요약"을 만들어 Teams에 공유한다.

### 추가 MCP (셀프 탐색)

3개 핵심 MCP 외에도 다양한 MCP가 있다. 관심 있으면 직접 연결해본다:
- **PubMed / bioRxiv** — 논문 검색 (연구팀에 유용)
- **OneDrive** — 파일 관리
- **Salesmap CRM** — 영업 데이터
- **Stibee** — 뉴스레터/구독자 관리
- **Gamma** — 프레젠테이션 생성

연결 방법은 동일하다: `claude mcp add` 또는 `.mcp.json`에 추가.

### 내일 예고

Day 3에서는 **스킬(Skill)**을 배운다. 반복되는 업무를 스킬로 만들어서 명령어 하나로 실행한다.

```
Day 3: Automate — 반복 업무를 스킬로 만든다
/day3-automate 로 시작하면 된다.
```

## EXECUTE

1. "오늘의 업무 요약"을 만들어서 Teams #able-native-camp 채널에 공유한다
2. `.mcp.json`에 3개 MCP가 등록되어 있는지 확인한다

---

Day 2: Connect 완료! Level 2 달성.
