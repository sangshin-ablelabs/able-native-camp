# ABLE Native Camp

> Operate → Connect → Automate → Harness → Delegate → Sustain
> 6단계를 거치면, 일하는 방식이 영구적으로 바뀐다.

에이블러를 위한 Claude Code 실전 캠프. AI Native Camp를 Fork하고 ABLE Labs CEO의 실전 노하우를 녹였다.

## 누구를 위한 캠프인가

- 에이블러 전원 (27명). 직군 무관.
- 코드를 몰라도 된다. 터미널만 열 수 있으면 된다.
- 개발자도 환영. 레벨이 다를 뿐 배울 건 같다.

## Step 0: Claude Code 설치

### 사전 확인

| 항목 | 조건 |
|------|------|
| **OS** | macOS 10.15+, Ubuntu 20.04+, Windows 10+ (WSL 필요) |
| **RAM** | 4GB 이상 |
| **네트워크** | 인터넷 연결 필수 |
| **계정** | Claude Pro, Max, Teams, Enterprise 중 하나 |

### 설치 방법

[https://claude.ai](https://claude.ai) 에 접속해서 대화창에 입력:

```
Claude Code 설치하는 방법 알려줘
```

Claude가 환경에 맞는 설치 방법을 단계별로 안내한다. 그대로 따라하면 된다.

<details>
<summary>설치 명령어 직접 보기 (참고용)</summary>

**macOS / Linux / WSL:**

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

</details>

### 설치 확인

```
claude
```

Claude가 인사하면 성공.

## Step 1: 스킬 설치

```bash
npx skills add able-labs/able-native-camp --agent claude-code --yes
```

> 설치 후 Claude Code에서 `/day0-why` 로 시작.

## 레벨 구조

```
Level 1: Operate    (Day 1)  도구를 쓸 수 있다
Level 2: Connect    (Day 2)  업무 도구와 AI를 연결한다
Level 3: Automate   (Day 3)  반복 업무를 스킬로 만든다
Level 4: Harness    (Day 4)  스킬들을 엮어 워크플로우를 만든다
Level 5: Delegate   (Day 5)  에이전트에게 위임한다
Level 6: Sustain    (Day 6)  복리로 성장하는 환경을 만든다
```

## 커리큘럼

| Day | Skill | 주제 |
|-----|-------|------|
| 0 | `day0-why` | CEO 킥오프: 왜 해야 하는가 |
| 1 | `day1-operate` | 첫 대화 + CLAUDE.md + 기본 도구 |
| 2 | `day2-connect` | MCP로 다우오피스·팀즈·노션 연결 |
| 3 | `day3-automate` | 자기 업무 스킬 만들기 |
| 4 | `day4-harness` | 스킬 연결 = 워크플로우 (하네스 엔지니어링) |
| 5 | `day5-delegate` | 에이전트/서브에이전트에게 위임 |
| 6 | `day6-sustain` | Memory + 루틴 + 스킬 공유회 |

## 원본

[AI Native Camp](https://github.com/ai-native-camp/camp-2) by Delta Society를 Fork하여 ABLE Labs 맞춤형으로 재설계했다.

## 캠프가 끝나면

수료가 아니라 시작이다. 만든 스킬은 조직 공용 라이브러리에 등록되고, 에이블러 전원이 쓴다.
