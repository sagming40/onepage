# 📄 개발 가이드 (Architecture & Development Guide)

> **프로젝트명** : One Page
> **문서 버전** : v2.3
> **작성일** : 2026-08-02
> **변경 이력**
> - v2.0 — 아키텍처 + 개발환경/폴더구조 통합
> - v2.1 — 헤더 계층 정리
> - v2.2 — DEVLOG 연동 (구조 트리 · 커밋 컨벤션 · M0 작업목록)
> - v2.3 — 4.2 Front-end 구조에 constants/ 폴더 추가 (감정 코드 등 상수 데이터 관리)

## 1. 시스템 개요

One Page는 사용자의 하루 기록을 저장하고, AI를 활용하여 기록을 분석하는 Full Stack Web Application이다.

전체 시스템은 다음 구조로 구성한다.

- React 기반 Client Application
- Node.js + Express 기반 REST API Server
- MariaDB 기반 데이터 저장소
- AI Service 연동
- Docker 기반 배포 환경

## 2. 전체 아키텍처

```text
                    사용자
                      │
                      ▼
              ┌──────────────┐
              │    Browser   │
              │ React Client │
              └──────────────┘
                      │
                      │ HTTPS
                      ▼
              ┌──────────────┐
              │    Nginx     │
              │ Reverse Proxy│
              └──────────────┘
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
 ┌────────────────┐      ┌────────────────┐
 │ Node.js Server │      │ Static Files   │
 │ Express API    │      │ React Build    │
 └────────────────┘      └────────────────┘
          │
          │ Prisma ORM
          ▼
 ┌────────────────┐
 │    MariaDB     │
 │   Database     │
 └────────────────┘
          │
          ▼
 ┌────────────────┐
 │  AI Service    │
 │ Ollama/OpenAI  │
 └────────────────┘
```

## 3. 개발 환경

### 3.1 OS 및 실행 환경

| 구분 | 환경 |
|---|---|
| 개발 환경 | Windows 11 |
| 배포 환경 | Linux Ubuntu |
| Container | Docker |

### 3.2 Front-end

| 항목 | 기술 | 버전 |
|---|---|---|
| Runtime | Node.js | v24.x |
| Framework | React | v19.x |
| Language | TypeScript | v5.x |
| Build Tool | Vite | v7.x |
| Styling | Tailwind CSS | |
| State Management | TanStack Query | |
| Routing | React Router | |
| Animation | Framer Motion | |
| Package Manager | npm | |

### 3.3 Back-end

| 항목 | 기술 | 버전 |
|---|---|---|
| Runtime | Node.js | v24.x |
| Framework | Express | v5.x |
| Language | TypeScript | |
| ORM | Prisma | v6.x |
| Authentication | JWT | |
| File Upload | Multer | |

### 3.4 Database

| 항목 | 기술 | 버전 |
|---|---|---|
| Database | MariaDB | 12.x |
| ORM | Prisma | v6.x |

### 3.5 AI

| 항목 | 기술 |
|---|---|
| Local LLM | Ollama |
| Cloud AI | OpenAI API |

### 3.6 개발 도구

| 도구 | 용도 |
|---|---|
| Visual Studio Code | 코드 작성 |
| Git | 버전 관리 |
| GitHub | Repository 관리 |
| Postman | API 테스트 |
| DBeaver | Database 관리 |
| Docker Desktop | Container 관리 |

## 4. 프로젝트 구조

### 4.1 전체 구조

```text
OnePage/
│
├── frontend/
├── backend/
├── docs/
│
├── docker-compose.yml
├── ROADMAP.md
├── DEVLOG.md
├── README.md
└── .gitignore
```

### 4.2 Front-end 구조

```text
frontend/
│
├── public/
│
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── stores/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
└── vite.config.ts
```

| 폴더 | 역할 | 예시 |
|---|---|---|
| api/ | Backend API 통신 관리 | `authApi.ts`, `diaryApi.ts`, `aiApi.ts` |
| assets/ | 정적 파일 (이미지, 아이콘, 폰트) | — |
| components/ | 재사용 가능한 UI 컴포넌트 | `Button`, `Modal`, `DiaryCard`, `EmotionPicker` |
| constants/ | 고정된 상수 데이터 관리 | `emotion.ts` (감정 코드-이모지-라벨 매핑) |
| hooks/ | Custom Hook (비즈니스 로직 분리) | `useAuth()`, `useDiary()`, `useUpload()` |
| layouts/ | 공통 레이아웃 | `MainLayout`, `AuthLayout` |
| pages/ | 페이지 단위 컴포넌트 | `LoginPage`, `HomePage`, `DiaryPage`, `ReportPage` |
| stores/ | 전역 상태 관리 | `userStore`, `themeStore` |
| types/ | TypeScript 타입 정의 | `User.ts`, `Diary.ts` |
| utils/ | 공통 함수 | `dateFormatter`, `validation` |

### 4.3 Back-end 구조

```text
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── middlewares/
│   ├── validators/
│   ├── utils/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── app.ts
│   └── server.ts
│
├── uploads/
├── package.json
└── .env
```

| 폴더 | 역할 | 예시 |
|---|---|---|
| config/ | 환경 설정 관리 | — |
| controllers/ | HTTP 요청 처리 (Request 수신 → Service 호출 → Response 반환) | `DiaryController`, `UserController` |
| services/ | 비즈니스 로직 처리 | `DiaryService`, `AIService`, `AuthService` |
| repositories/ | Database 접근 담당 | `DiaryRepository`, `UserRepository` |
| routes/ | API URL 관리 | `auth.routes.ts`, `diary.routes.ts` |
| middlewares/ | 공통 요청 처리 | `authMiddleware`, `errorMiddleware` |
| validators/ | 입력값 검증 | `signupValidator`, `diaryValidator` |
| prisma/ | Database Schema 및 Migration 관리 | `schema.prisma` |
| uploads/ | 업로드된 이미지 저장소 | — |

## 5. Back-end Layer 구조

| Layer | 역할 | 예시 |
|---|---|---|
| Controller | HTTP Request 처리 및 Response 반환 | `POST /diaries` 요청을 받아 Service 호출 |
| Service | 핵심 비즈니스 로직 처리 | 일기 생성, AI 요청, 권한 검증 |
| Repository | Database 접근 담당 | 데이터 조회 / 저장 / 수정 |
| Middleware | 공통 처리 | JWT 인증, Error Handling, Request Logging |

## 6. Database Architecture

```text
Application
      │
Prisma Client
      │
   MariaDB
      │
   Tables
(users, diaries, photos,
 musics, tags, diary_tags,
 ai_reports, time_capsules)
```

> 테이블 상세 정의는 [02_erd.md](./02_erd.md) 참조

## 7. AI Architecture

### 처리 흐름

```text
사용자 작성
    ↓
Diary 저장
    ↓
AI 요청
    ↓
Prompt 생성
    ↓
LLM 처리
    ↓
Summary 저장
    ↓
사용자 화면 출력
```

### AI 기능

| 기능 | 입력 | 출력 |
|---|---|---|
| Daily Summary | 일기 내용 | 하루 요약 문장 |
| Report Generator | 월간 / 연간 기록 데이터 | 회고 문장 |

## 8. 인증 구조

### JWT Authentication

```text
Login
 ↓
Server 인증
 ↓
Access Token 발급
 ↓
Client 저장
 ↓
API 요청
 ↓
Middleware 검증
```

### Token 구성

| Token | 용도 | 특징 |
|---|---|---|
| Access Token | API 요청 인증 | 짧은 만료 시간 |
| Refresh Token | Access Token 재발급 | 서버 저장 |

## 9. 파일 처리 구조

```text
User
 ↓
React FormData
 ↓
Express Multer
 ↓
File Storage
 ↓
URL 저장
 ↓
MariaDB
```

## 10. 환경 변수 관리

**Backend** `.env`

```env
DATABASE_URL=
JWT_SECRET=
AI_API_KEY=
PORT=
```

**Frontend** `.env`

```env
VITE_API_URL=
```

> `.env` 파일은 반드시 `.gitignore`에 포함하며, `.env.example`을 별도로 관리한다.

## 11. 실행 방법

### Local Development

1. MariaDB 실행
2. Backend 실행
3. Frontend 실행
4. Browser 접속

### Docker Environment

**구성**

```text
docker-compose.yml
│
├── frontend
├── backend
└── mariadb
```

**실행 / 종료**

```bash
docker-compose up -d
docker-compose down
```

## 12. 배포 아키텍처

### Docker Container 구성

```text
                Docker
                  │
     ┌────────────┼────────────┐
     ▼            ▼            ▼
  Nginx       Backend       MariaDB
              Node.js
                  │
                  ▼
              AI Service
```

### CI/CD 구조

```text
Developer
   │
Git Push
   │
GitHub Repository
   │
GitHub Actions
   │
Build & Test
   │
Docker Image 생성
   │
Server Deploy
```

### 환경 분리

| 환경 | 구성 | 용도 |
|---|---|---|
| Development | localhost | 개발 및 테스트 |
| Production | Docker Container / HTTPS / Domain | 실서비스 |

## 13. Git 전략

### Branch 전략

```text
main
 │
develop
 │
├── feature/auth
├── feature/diary
├── feature/ai
└── feature/deploy
```

| Branch | 용도 |
|---|---|
| main | 배포 가능한 안정 버전 |
| develop | 개발 통합 |
| feature/* | 기능 단위 개발 |

### Commit Convention

형식 · `type: message`

| Type | 설명 |
|---|---|
| feat | 기능 추가 |
| fix | 버그 수정 |
| refactor | 코드 개선 |
| docs | 문서 수정 |
| test | 테스트 |
| chore | 설정 변경 |

> 마일스톤 완료 시점엔 `docs: update devlog for M{n}` 커밋으로 [DEVLOG.md](../DEVLOG.md) 갱신을 함께 남긴다.

**예시**

```text
feat: add diary create api
fix: resolve jwt refresh issue
docs: update ERD document
refactor: improve diary service
```

## 14. 설계 원칙

### 관심사의 분리

- Frontend와 Backend 분리
- UI와 비즈니스 로직 분리
- Controller와 Service 분리
- Database 접근 계층 분리

### 유지보수성

- 명확한 폴더 구조
- 타입 기반 개발
- 공통 모듈화
- 환경 변수 관리
- API 표준화

### 확장성

- AI Provider 변경 가능 구조
- Storage 변경 가능 구조
- Docker 기반 배포

## 15. 향후 확장 계획

- AWS S3 이미지 저장
- Redis Cache 적용
- WebSocket 실시간 알림
- Kubernetes 기반 배포
- Mobile Application 개발
- Microservice Architecture
- AI 모델 Fine-tuning
