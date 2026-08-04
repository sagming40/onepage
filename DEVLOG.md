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
| **현재 위치** | M1 진행 중 — Backend 전부 완료, Frontend는 "React 프로젝트 구성"만 완료 |
| **완료** | Prisma 스키마 및 마이그레이션 · Express 서버 · 회원가입/로그인 API · JWT 인증 · 일기 CRUD 4종 · React+Vite+Tailwind 스캐폴딩 · axios 인스턴스 · 라우터(로그인/회원가입/메인 껍데기) |
| **다음 작업** | 로그인/회원가입/메인 화면 실제 UI 구현 (`04_ui-ux-design.md` UI-001~003 기준) — M1 Frontend 나머지 3항목 |

**환경 요약**

- Node.js v24.15.0 / npm 11.12.1 / MariaDB 12.2.2
- DB · `onepage`, 테이블 9개
- Prisma **6.x 고정** · TypeScript **5.9.2 고정** (Backend) · Vite v8.x / React 19 / Tailwind CSS v4 (Frontend)
- Repository · `sagming40/onepage` (Public) · `main`에 PR #1, #2, #3 병합 완료, 관련 feature 브랜치 전부 삭제
- 데스크탑/노트북 듀얼 환경 — 각자 로컬 MariaDB 사용, 작업 전후 반드시 `git pull`/`push`

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

## 2026-08-02 (오후 11) — M1 진행: Prisma 스키마 정의 및 초기 마이그레이션

**관련 마일스톤** · M1 (MVP 개발) → 진행 중

**한 일**

- `schema.prisma`에 02_erd.md 기준 모델 8종 정의 (User, Diary, Photo, Music, Tag, DiaryTag, AiReport, TimeCapsule)
- Emotion(7종) / ReportType(2종) enum 추가, 인덱스 및 Soft Delete 필드 반영
- PK 타입 BIGINT → INT로 결정 (JSON 직렬화 문제 회피 — 결정 기록 참조)
- `schema.prisma` 위치를 05_dev-guide.md 원안대로 `src/prisma/`에 유지, `package.json`에 `prisma.schema` 경로 지정
- `npx prisma migrate dev --name init` 실행 → 테이블 9개 생성 확인 (HeidiSQL 검증)

**막혔던 점 / 트러블슈팅**

- `@map("created_at)` 따옴표 누락, `diary_tag` 테이블명 오타(복수형 누락) → `prisma validate`로 커밋 전 사전 발견
- `package.json#prisma` 설정 방식이 Prisma 7부터 deprecated라는 warn 확인 — 6.x 고정이라 현재는 무해, 7.x 전환 시 `prisma.config.ts`로 이전 필요
  - 교훈: `prisma validate`는 DB를 안 건드리는 무료 리허설이라, `migrate dev` 전에 항상 먼저 돌려볼 것

**다음에 할 일**

- Express 서버 뼈대(`app.ts`, `server.ts`) 작성

## 2026-08-03 (오전 1 ~ 3) — M1 진행: Express 서버 뼈대 구축

**관련 마일스톤** · M1 (MVP 개발) → 진행 중

**한 일**

- `app.ts`/`server.ts` 분리 (Express 인스턴스 정의와 리스닝 로직 분리)
- CORS, `express.json()` 미들웨어 적용
- API 명세서 공통 응답 형식(`success`/`message`/`data`) 규칙 반영
- 헬스체크 라우트(`/api/health`), 404 핸들러, 에러 핸들러 구현

**막혔던 점 / 트러블슈팅**

- **TypeScript 7.x + ts-node 비호환** — `npx ts-node-dev` 실행 시 `Cannot read properties of undefined (reading 'fileExists')` 에러. TS7이 컴파일러 API를 완전히 교체한 신규 아키텍처라 ts-node가 아직 미지원 (`TypeStrong/ts-node#2174`) → **TypeScript 5.9.2로 다운그레이드** (결정 기록 참조)
- **`tsconfig.json` module 설정 충돌** — `"module": "nodenext"` + `"verbatimModuleSyntax": true` 조합이 `package.json`의 `"type": "commonjs"`와 모순되어 `import`/`export` 자체가 컴파일 에러(TS1295) → `module: "commonjs"`, `verbatimModuleSyntax: false`로 수정
- **`esModuleInterop` 미설정** — `import express from "express"`처럼 CommonJS 패키지를 ESM 방식으로 default import 하면서 TS1259 에러 → `esModuleInterop: true` 추가
  - 교훈: 위 세 가지는 전부 "CommonJS 프로젝트면 관련 설정을 전부 CommonJS 방향으로 통일해야 한다"는 하나의 원인에서 갈라져 나온 증상이었음

**다음에 할 일**

- 회원가입/로그인 API 구현

## 2026-08-03 (오후 2 ~ 5) — M1 완료: 회원 인증(회원가입/로그인/JWT) 구현 및 PR #1 병합

**관련 마일스톤** · M1 (MVP 개발) → 진행 중 (Backend 인증 파트 완료)

**한 일**

- Repository/Service/Controller 계층 분리 적용 (`user.repository.ts`, `auth.service.ts`, `auth.controller.ts`)
- bcrypt 기반 비밀번호 해싱(SALT_ROUNDS 10), 회원가입 API (이메일/닉네임 중복 검사)
- 로그인 API — JWT accessToken 발급, "이메일 없음"과 "비밀번호 틀림"을 동일 에러로 통일해 이메일 존재 여부 비노출
- JWT 발급/검증 유틸(`utils/jwt.ts`) 분리, 인증 미들웨어(`auth.middleware.ts`) 구현
- `GET /users/me`로 미들웨어 동작 검증 (토큰 있음/없음/위조 3가지 케이스 모두 통과)
- `feature/express-setup` 브랜치 → PR #1 생성 → `main` 병합, 로컬/원격 브랜치 정리
- 노트북 환경에서도 동일 작업 이어감 (로컬 MariaDB에 마이그레이션 재적용, 듀얼 환경 워크플로 확립)

**막혔던 점 / 트러블슈팅**

- `auth.service.ts`의 `errorCode` 타입을 `String`(대문자, 객체 래퍼)으로 잘못 선언 → `string`(소문자, 원시 타입)으로 수정
- `auth.controller.ts`에 자동완성 오작동으로 무관한 `import { access } from "fs"`가 끼어듦 → 삭제
- `noUncheckedIndexedAccess` 설정 때문에 `authHeader.split(" ")[1]`의 타입이 `string | undefined`로 추론되어 `verifyAccessToken` 인자 타입 에러 → `if (!token) return` 방어 코드로 타입 좁히기(narrowing) 처리
- `app.ts` 에러 핸들러에 `mesaage`, `INTERVAL_SERVER_ERROR` 오타 방치돼있던 것 발견 및 수정 (500 에러 응답에서만 드러나 뒤늦게 발견됨)
- Windows PowerShell에서 `curl`이 `Invoke-WebRequest`의 별칭이라 진짜 curl과 헤더 문법이 달라 혼선 → `Invoke-RestMethod` 사용으로 통일
  - 교훈: 평소 안 쓰이는 코드 경로(에러 핸들러 등)의 오타는 실제로 그 경로를 타봐야만 발견됨. 방어 로직도 최소 한 번은 의도적으로 실패시켜서 검증할 것

**다음에 할 일**

- `feature/diary-crud` 브랜치 생성
- 일기 작성/조회/수정/삭제 API 구현

## 2026-08-03 ~ 2026-08-04(오후 7 ~ 자정 이후) — M1 진행: 일기 CRUD 4종 구현 및 검증

**관련 마일스톤** · M1 (MVP 개발) → 진행 중 (Diary CRUD 완료)

**한 일**

- Repository/Service/Controller/Routes 4계층 분리 적용 (`diary.repository.ts`, `diary.service.ts`, `diary.controller.ts`, `diary.routes.ts`)
- Soft Delete 조회 조건(`deletedAt: null`)을 상수로 분리해 모든 조회 함수에 일관 적용
- 목록 조회에 `select`로 필요한 컬럼만 조회하도록 최적화 (본문 미포함)
- 상세/수정/삭제 시 "존재하지 않음"과 "내 것이 아님"을 동일한 404(`DIARY_NOT_FOUND`)로 응답하도록 구현 (사유는 결정 기록 참조)
- `feature/diary-api` 브랜치에서 진행, `app.ts`에 `/api/diaries` 라우터 연결
- Invoke-RestMethod로 CRUD 4종 + Soft Delete 후 목록 미노출 + 삭제된 일기 상세조회 시 404 확인까지 실전 검증 완료
- PR #2 생성 → main 병합

**막혔던 점 / 트러블슈팅**

- **자동완성 오작동으로 무관한 import 재발** — `diary.repository.ts`에 `import { it } from "node:test"`, `diary.service.ts`에 `import { error, table } from "console"`가 각각 끼어듦. auth.controller.ts 때와 동일한 패턴 → 지금부터 파일 작성 후 import 줄부터 먼저 훑어보는 습관 들이기로 함
- **`exactOptionalPropertyTypes` 관련 타입 에러 반복 발생** — Repository/Service 사이에 optional 필드(`location?`, `startDate?`, `year?` 등)의 "칸 자체가 없음"과 "칸은 있는데 undefined"를 TS가 엄격히 구분함. 조건부 스프레드(`...(value !== undefined ? { value } : {})`) 패턴으로 매번 해결
  - 교훈: 이 프로젝트 tsconfig가 `exactOptionalPropertyTypes: true`이므로, Service→Repository처럼 계층 간 optional 필드를 넘길 땐 항상 이 패턴을 우선 고려할 것
- **`Math.cell` 오타** — `Math.ceil`을 잘못 타이핑. 단순 오타였지만 `tsc`가 정확히 잡아냄
- **`npm run dev` 실행 시 `Missing script: "dev"` 에러** — `package.json`에 `dev` 스크립트가 애초에 등록되어 있지 않았음. `"dev": "ts-node-dev --respawn --transpile-only src/server.ts"` 추가로 해결
  - 교훈: 새 환경(데스크탑)에서 처음 서버를 켤 때는 `package.json`의 `scripts` 목록부터 확인할 것
- **PowerShell `Invoke-RestMethod`의 `-Body`로 한글 전송 시 DB에 물음표(`??`)로 저장됨** — MariaDB 쪽 `character_set_*`은 전부 `utf8mb4`로 정상이었으나, PowerShell이 문자열을 HTTP 바디로 변환하는 과정에서 시스템 기본 코드페이지로 인코딩해 실제로 깨진 바이트가 전송됨. `[System.Text.Encoding]::UTF8.GetBytes($json)`로 명시적으로 UTF-8 바이트를 만들어 전송하고 `-ContentType "application/json; charset=utf-8"`을 지정해 해결
  - 교훈: 클라이언트 도구(PowerShell)와 서버(Express/MariaDB) 양쪽 다 UTF-8이어도, 그 사이를 잇는 전송 단계에서 깨질 수 있다. 인코딩 문제는 항상 "어느 구간"에서 깨졌는지 구간별로 좁혀가며 확인해야 함
- **HeidiSQL에 찍힌 시간이 실제 한국 시각과 9시간 차이남** — 버그 아님. Prisma `DateTime`은 UTC로 저장하는 게 표준이라, HeidiSQL이 변환 없이 UTC 그대로 표시한 것. 화면 표시(Frontend)에서 KST 변환은 추후 처리 예정

**다음에 할 일**

- Frontend 초기 구조 착수 (React 프로젝트 구성)

## 2026-08-04(오전 10 ~ 오후 1) — M1 진행: Frontend 초기 구조(React 프로젝트 구성) 완료 및 PR #3 병합

**관련 마일스톤** · M1 (MVP 개발) → 진행 중 (Frontend "React 프로젝트 구성" 완료, 화면 3종은 다음 세션)

**한 일**

- Vite + React 19 + TypeScript 프로젝트 스캐폴딩 (ESLint 선택, Tailwind CSS v4는 별도 설치)
- Tailwind CSS v4 설정 — `@tailwindcss/vite` 플러그인 방식, `04_ui-ux-design.md` 컬러 가이드를 `@theme`에 토큰으로 등록
- react-router / axios / TanStack Query 설치, `05_dev-guide.md` 기준 `src` 하위 폴더 구조 생성 (빈 폴더는 `.gitkeep`으로 추적)
- 공통 응답 타입(`ApiSuccess`/`ApiFailure`, 판별 유니온) 및 `User` 타입 정의
- axios 인스턴스(`api/client.ts`) 구현 — 요청 인터셉터(accessToken 자동 첨부), 응답 인터셉터(401 시 토큰 삭제 후 로그인 이동)
- 로그인/회원가입/메인 페이지는 라우팅 검증용 **껍데기**만 구현 (실제 UI는 다음 세션), 라우터 연결(404 폴백 포함)
- 헬스체크 호출로 백엔드 연동 검증
- `feature/frontend-setup` 브랜치에서 진행 → PR #3 생성 → `main` 병합, 브랜치 정리

**막혔던 점 / 트러블슈팅**

- **Vite `create-vite` 실행 시 `frontend` 디렉터리가 비어있지 않다는 경고** — M0 단계에서 빈 폴더 추적용으로 넣어둔 `.gitkeep` 하나만 있던 것으로 확인 후 `Remove existing files and continue`로 진행
- **Tailwind CSS v4 설치 방식이 v3와 완전히 다름** — `tailwind.config.js` + `content` 배열 방식(v3)은 v4에서 조용히 아무 효과도 없음. `@tailwindcss/vite` 플러그인 + `index.css`의 `@import "tailwindcss"` + `@theme` 블록 방식(v4)으로 전환
  - 교훈: 에러 없이 조용히 안 먹는 유형이 제일 늦게 발견됨. 최신 버전일수록 학습 자료가 구버전 문법을 설명하고 있을 가능성을 의심할 것
- **Tailwind가 안 먹는 것처럼 보였던 문제** — 실제 원인은 Tailwind가 아니라, `App.css`를 삭제한 뒤에도 `App.tsx`가 그 안의 커스텀 클래스(`hero`, `counter` 등)를 그대로 참조하고 있었던 것. 변수 두 개(App.css 삭제 + Tailwind 설정)가 동시에 걸려 원인 판별이 안 됐음 → `App.tsx`를 최소 재현 코드로 교체해 Tailwind 자체는 정상 작동함을 확인
  - 교훈: 여러 변수가 동시에 바뀐 상태에서 증상이 나오면, 최소 재현(minimal reproduction)으로 하나씩 분리해서 검증할 것
- **자동완성 오작동으로 무관한 import 재발** — `client.ts`에 `import { config } from "process"`가 끼어듦 (Backend 세션에서도 동일 패턴 2회 발생, 이번이 3번째)
  - 교훈: 일회성 실수가 아니라 반복 패턴. 흔한 변수명(`config`, `error`, `data` 등) 타이핑 시 자동완성 팝업의 import 제안을 항상 한 번 더 확인할 것
- VS Code CSS 언어 서비스가 `@theme`를 표준 CSS 문법으로 인식 못 해 `Unknown at rule` 경고 표시 — 실제 빌드에는 영향 없는 에디터 표시 문제로 확인 (Tailwind CSS IntelliSense 확장 설치로 해소 가능, 추후 진행)

**다음에 할 일**

- 로그인/회원가입/메인 화면 실제 UI 구현 (`04_ui-ux-design.md` UI-001~003 목업 기준) — M1 Frontend 나머지 3항목

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

<details>
<summary><b>2026-08-02 · PK 타입을 BIGINT 대신 INT로 정한 이유</b></summary>

02_erd.md 원안은 모든 PK를 BIGINT로 설계했으나, Prisma가 BIGINT 컬럼을 TypeScript `BigInt` 타입으로 매핑하면서 문제 발생.

`BigInt`는 JavaScript 표준 `JSON.stringify()`로 직렬화가 안 됨 (`TypeError: Do not know how to serialize a BigInt`). Express에서 `res.json()`으로 응답하는 순간 전부 에러가 나는 구조라, M1 API 구현 단계에서 반드시 마주칠 문제였음.

**판단** · 개인 다이어리 서비스 특성상 레코드 수가 INT 범위(약 21억)를 넘길 가능성이 없음(하루 1건 기준 580만 년 분량). BigInt 직렬화 처리를 배우는 것보다 Express/JWT 같은 M1 핵심 개념에 시간을 쓰는 게 학습 우선순위에 맞다고 판단.

향후 레코드 규모가 실제로 문제가 되면 그때 BigInt + 직렬화 전략으로 마이그레이션 검토.

</details>

<details>
<summary><b>2026-08-02 · schema.prisma를 src/prisma/로 유지한 이유</b></summary>

`npx prisma init` 기본 위치는 `backend/prisma/`이지만, 05_dev-guide.md 설계상 Backend 내부 코드는 전부 `src/` 하위에 위치시키는 원칙이었음.

Prisma CLI는 기본적으로 `prisma/schema.prisma`만 인식하므로, `package.json`에 `"prisma": { "schema": "src/prisma/schema.prisma" }` 설정을 추가해 위치를 지정함.

</details>

<details>
<summary><b>2026-08-02 · TypeScript를 7.x가 아닌 5.9.2로 고정한 이유</b></summary>

package.json에 typescript@^7.0.2가 설치되어 있었으나, `npx ts-node-dev` 실행 시
`TypeError: Cannot read properties of undefined (reading 'fileExists')` 에러 발생.

원인 확인 결과, TypeScript 7은 기존 컴파일러 API를 완전히 교체한 신규 아키텍처(네이티브 컴파일러)이며,
ts-node가 아직 이를 지원하지 않는 것으로 확인됨(TypeStrong/ts-node GitHub Issue #2174).

Prisma 6.x 고정 결정과 동일한 논리로, 학습 단계에서 최신 버전을 쫓다가
생태계 호환성 문제에 시간을 쓰는 것보다 안정 버전에서 개념을 먼저 익히는 것을 우선함.

typescript@5.9.2, @types/node@24로 다운그레이드. tsconfig.json도 CommonJS 기준으로
`module: "commonjs"`, `esModuleInterop: true`, `verbatimModuleSyntax: false`로 정리.

</details>

<details>
<summary><b>2026-08-03 · 일기 조회/수정/삭제 실패 시 403 대신 404로 통일한 이유</b></summary>

당초 API 명세서(HTTP 상태 코드 섹션)엔 403(권한 없음)과 404(데이터 없음)이 별개로 정의되어 있었으나, 실제 구현 시 403을 쓰지 않고 404로 통일하기로 결정함.

**판단 근거** · 남의 일기 ID로 조회를 시도했을 때 403을 반환하면 "그 ID의 일기가 존재는 한다"는 사실 자체가 노출된다. 로그인 API에서 "이메일 없음"과 "비밀번호 틀림"을 동일한 에러로 통일했던 것과 같은 논리 — 일기는 사생활 정보이므로 존재 여부 자체를 감추는 것이 맞다고 판단.

`diary.service.ts`의 `getDiaryDetail`에서 "존재하지 않음"과 "존재하지만 내 것이 아님" 두 경우 모두 동일한 에러 메시지·코드(`DIARY_NOT_FOUND`)로 던지도록 구현함.

</details>

<details>
<summary><b>2026-08-04 · 토큰 저장 위치 — localStorage (M1) → M5에서 재검토</b></summary>

`localStorage`는 XSS 공격에 노출될 수 있어 완벽한 방식은 아니지만, httpOnly 쿠키 방식은 refresh 엔드포인트 구현과 CORS `credentials` 설정이 추가로 필요해 MVP 단계에서 배울 게 배로 늘어난다.

**판단** · 학습 곡선을 고려해 M1은 `localStorage`로 진행하고, M5 "Token 관리 개선" 항목에서 쿠키 방식으로 전환하는 것으로 결정.

</details>

## 기타 메모

> 특정 마일스톤에 속하지 않는 잡다한 기록.
