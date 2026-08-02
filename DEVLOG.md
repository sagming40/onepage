# 📝 One Page — DEVLOG

> 세션별 개발 회고 및 트러블슈팅 기록

이 문서는 [ROADMAP.md](./ROADMAP.md)처럼 "계획"을 담는 곳이 아니라, **실제로 각 세션에서 무슨 일이 있었는지**를 기록하는 곳이다.

막혔던 지점, 해결한 방법, 다음에 참고할 만한 실수 등을 가감 없이 남긴다.

## 작성 규칙

- 세션(하루 작업 단위) 종료 시 또는 마일스톤 완료 시 기록
- **오래된 항목이 위, 최신 항목이 아래로** 오도록 시간순 정렬
- 형식 · 날짜 / 관련 마일스톤 / 한 일 / 막혔던 점 / 다음에 할 일
- 설계 판단이나 "왜 이렇게 했는지"는 [결정 기록](#결정-기록)에 따로 남긴다

## 📍 현재 상태

> 새 세션 시작 시 여기부터 읽을 것. 마일스톤 종료마다 이 블록만 갈아끼운다.

| 항목 | 내용 |
|---|---|
| **현재 위치** | M0 완료 → M1 착수 직전 |
| **완료** | 기획 문서 7종 · Git Repository · 개발 환경 구성 |
| **다음 작업** | `schema.prisma`에 02_erd.md 모델 정의 → `npx prisma migrate dev` |

**환경 요약**

- Node.js v24.15.0 / npm 11.12.1 / MariaDB 12.2.2
- DB · `onepage` (utf8mb4_unicode_ci), 테이블 0개 (아직 마이그레이션 전)
- Prisma **6.x 고정** — 7.x는 설정 방식이 다름 ([결정 기록](#결정-기록) 참조)
- Repository · `sagming40/onepage` (Public)

<details>
<summary><b>새 항목 템플릿 (펼쳐서 복사)</b></summary>

```markdown
## YYYY-MM-DD — M? 진행/완료: 한 줄 요약

**관련 마일스톤** · M? (마일스톤 이름) → 진행 중 / 완료

**한 일**

-
-

**막혔던 점 / 트러블슈팅**

- 증상 → 원인 → 해결
- 교훈:

**다음에 할 일**

-
```

</details>

## 2026-08-02 (오전) — M0 진행: 기획 문서 작성 및 통합 정리

**관련 마일스톤** · M0 (프로젝트 준비 및 설계) → 진행 중

**한 일**

- 서비스 컨셉 확정 — "AI가 요약해주는 개인용 감성 다이어리"
- 기획 문서 초안 9종 작성 (요구사항 / 기능명세 / ERD / API / 아키텍처 / UI-UX / 마일스톤 / 개발환경 / README)
- 문서 9종 → **7종으로 통합**
  - 요구사항 + 기능명세 → `01_project-plan.md`
  - 아키텍처 + 개발환경/폴더구조 → `05_dev-guide.md`
- 문서 전반 구조 정리 — h1 남발(문서당 9~41개) → 문서당 1개, 불필요한 `---` 구분선 제거, 한 줄짜리 섹션을 볼드 라벨로 대체
  - 내용 삭제 없이 전체 2,892줄 → 2,135줄 (26% 감소)
- 파일명 영문 kebab-case 전환 (`01_기획서.md` → `01_project-plan.md` 등), 내부 상호 링크 15곳 일괄 수정
- API 엔드포인트 요약표(25개) 신설, JWT 필요 엔드포인트에 🔒 표기 도입
- 문서별 버전 태그 + 변경 이력 헤더 도입

**막혔던 점 / 트러블슈팅**

- 같은 내용이 여러 문서에 흩어져 있었음 — 기술 스택 표 4곳, 프로젝트 소개 4곳, Git 브랜치/커밋 컨벤션 2곳(내용 완전 동일), 폴더 구조 트리 2곳
  - 한 곳만 고치면 나머지가 조용히 거짓말이 되는 상태였음
  - → "개발 중 계속 열어보는 문서(ERD/API/UI)는 분리 유지, 한 번 쓰고 마는 문서는 통합" 기준으로 정리
- **감정 정의가 문서마다 달랐음** — 기획서엔 5종(😊😌😢😡😰), ERD ENUM엔 7종(EXCITED, TIRED 추가). 그대로 뒀으면 프론트에서 이모지 매핑할 때 DB엔 있는데 화면엔 없는 값이 생겼을 것 → ERD 기준 7종으로 통일, 코드-이모지-의미 매핑표를 기획서에 신설
- API 명세서의 JSON 예시가 표준 포맷이 아니어서 Postman에 복붙 시 어색했음 → 정규 포맷으로 정리
- 파일명 변경 시 내부 링크가 전부 깨질 뻔함 → VS Code 전체 찾기-바꾸기(`Ctrl+Shift+H`)로 일괄 처리 후 grep으로 잔재 검수
- 문서 3종이 CRLF 줄바꿈이었음(Windows 작성) → LF로 통일. 추후 Docker/Linux 배포 시 셸 스크립트에서 `bad interpreter` 유발 가능
  - 교훈: `git config --global core.autocrlf true` 를 Repository 생성 시 함께 설정할 것

**다음에 할 일**

- M0 마무리 — Git Repository 생성, `.gitignore` 작성, 개발 환경 구성 (Node.js / MariaDB / Prisma)
- M1 착수 — Express 서버 뼈대, Prisma 스키마 정의

## 2026-08-02 (오후) — M0 완료: Git Repository 및 개발 환경 구성

**관련 마일스톤** · M0 (프로젝트 준비 및 설계) → 완료

**한 일**

- 로컬 Git 저장소 초기화 → GitHub 원격 저장소(`sagming40/onepage`, Public) 연결 및 push
- `.gitignore` 작성 (node_modules, .env, uploads, dist 등 제외)
- 설치 환경 버전 확인 — Node.js v24.15.0 / npm 11.12.1 / MariaDB 12.2.2
- MariaDB에 `onepage` 데이터베이스 생성 (utf8mb4 / utf8mb4_unicode_ci)
- Backend 패키지 설치
  - 런타임 · express@5, @prisma/client, bcrypt, jsonwebtoken, multer, cors, dotenv
  - 개발용 · typescript, @types/*, ts-node-dev, prisma
- `tsconfig.json` 생성, Prisma 초기화 (`--datasource-provider mysql`)
- `backend/src` 하위 폴더 뼈대 생성 (config, controllers, services, repositories, routes, middlewares, validators, utils) — `.gitkeep`으로 빈 폴더 Git 추적
- `prisma db pull`로 DB 연결 검증 완료
- `05_dev-guide.md` 버전 정보 실제 설치값으로 갱신 (Node v22→v24, MariaDB 11→12)

**막혔던 점 / 트러블슈팅**

- `mariadb --version`이 `CommandNotFoundException` → 설치는 됐으나 PATH 미등록이 원인. 시스템 환경변수 Path에 `C:\Program Files\MariaDB 12.2\bin` 추가 후 **터미널 재시작**으로 해결
  - 교훈: PATH는 터미널 시작 시 한 번 읽으므로, 수정 후 기존 터미널에선 반영 안 됨
- **`npx prisma init`이 Prisma 7 기준으로 동작** — `prisma.config.ts` + `.claude/` `.windsurf/` `.agents/` skills 폴더까지 생성됨. Prisma 7부터 `schema.prisma`의 `url = env(...)`가 막히고 드라이버 어댑터 방식으로 변경됨
  - → 학습 목적상 Prisma **6.x로 다운그레이드** 결정 ([결정 기록](#결정-기록) 참조)
- 다운그레이드 후 재실행 시 `A folder called prisma already exists` 에러 → `npm uninstall`은 패키지만 지우고 생성된 파일은 남김. `prisma/`, `prisma.config.ts` 수동 삭제 후 해결
- **`.env`가 PostgreSQL 템플릿 값(`prisma+postgres://...`)으로 남아있었음** — Prisma가 `DATABASE_URL`이 이미 존재하면 덮어쓰지 않는 정책(`warn Prisma would have added DATABASE_URL but it already exists`) 때문. 수동으로 전체 교체
  - 교훈: 경고(warn) 메시지를 흘려보내지 말 것. "안 했다"는 알림이 곧 "직접 해야 한다"는 뜻
- `prisma.config.ts` 삭제 후 `tsconfig.json`에 `No inputs were found` 경고 → `.ts` 파일이 하나도 없어서 뜨는 정보성 메시지. `src/` 아래 실제 코드 생기면 자동 해소
- `prisma db pull` 실행 시 `P4001 The introspected database was empty` → **에러가 아니라 정상**. 접속은 성공했고 테이블이 아직 없을 뿐. `db pull`은 DB→코드 방향이라 빈 DB에선 가져올 게 없음
  - 교훈: 에러 메시지 중 접속 성공 로그(`Datasource "db": MySQL database "onepage" at "localhost:3306"`)를 먼저 확인하면 연결 문제인지 데이터 문제인지 구분됨

**다음에 할 일**

- M1 착수 — `schema.prisma`에 02_erd.md 기준 모델 8종 정의
- `npx prisma migrate dev`로 실제 테이블 생성
- Express 서버 뼈대(`app.ts`, `server.ts`) 작성

## 결정 기록

> 왜 그렇게 했는지에 대한 기록. 나중에 "이거 왜 이렇게 했더라?" 할 때 근거가 되는 곳.

<details>
<summary><b>2026-08-02 · 문서를 9개에서 7개로 통합한 기준</b></summary>

문서 개수를 줄이는 것 자체가 목적이 아니라, **문서의 성격**을 기준으로 나눴다.

- **개발 중 수십 번 열어보는 문서** — ERD, API 명세서, UI/UX 설계서
  - "이 컬럼 타입 뭐였지?", "이 엔드포인트 응답이 뭐지?" 하고 수시로 참조
  - 다른 문서와 합치면 스크롤 지옥이 되므로 **분리 유지**
- **방향 잡을 때만 여는 문서** — 요구사항, 기능명세, 아키텍처, 개발환경
  - 한 번 쓰고 거의 안 봄 → **통합해도 손해 없음**

ROADMAP은 문서라기보다 체크리스트 성격이라 `docs/` 밖 루트에 유지했다.

</details>

<details>
<summary><b>2026-08-02 · API 명세서를 수기 관리하기로 한 이유 (당분간)</b></summary>

코드를 짜다 보면 실제 응답 형식은 반드시 명세서와 어긋나게 된다. 그때마다 문서를 안 고치면 명세서가 오히려 방해물이 된다.

장기적으로는 Swagger(OpenAPI) 자동 생성으로 넘어가는 게 맞다고 판단했으나, 아직 코드가 한 줄도 없는 시점이라 도입 시점을 **M1 완료 이후**로 미룬다.

그때까지는 수기 관리하되, 실제 구현과 어긋난 부분이 생기면 이 DEVLOG에 기록해두고 문서 정리 단계에서 일괄 반영한다.

</details>

<details>
<summary><b>2026-08-02 · Prisma를 최신 7.x가 아닌 6.x로 고정한 이유</b></summary>

`npx prisma init` 실행 시 Prisma 7이 설치되며 아래 변경사항이 확인됨.

- `schema.prisma`의 `datasource { url = env("DATABASE_URL") }` 문법 **폐기**
- DB 주소가 두 곳으로 분리 — CLI용(`prisma.config.ts`)과 런타임용(드라이버 어댑터)
- 런타임 연결에 `@prisma/adapter-*` 별도 설치 및 코드 내 명시적 연결 필요

**판단** · 이 프로젝트의 목적은 "ORM으로 DB와 코드를 연결하는 개념 습득"이지 "Prisma 7의 신규 아키텍처 학습"이 아니다. 개념과 신규 문법을 동시에 배우면 에러 발생 시 원인이 개념 문제인지 버전 문제인지 구분되지 않아 디버깅 비용이 커진다.

따라서 **M1~M2에서 ORM 기본기를 익힌 뒤, 이후 7.x 업그레이드를 별도 과제로 진행**하기로 한다. 그때는 "무엇이 왜 바뀌었는지" 비교하며 배울 수 있어 학습 효율이 더 높다.

`package.json`에 `prisma@6`, `@prisma/client@6`으로 고정되어 있으므로 임의 업그레이드 주의.

</details>

## 기타 메모

> 특정 마일스톤에 속하지 않는 잡다한 기록.
