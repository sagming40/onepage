# 📖 One Page

> 당신의 하루를 한 페이지로 기록합니다.

**One Page**는 하루의 순간을 기록하고, AI를 활용해 기억을 정리하는 감성 다이어리 웹 서비스입니다.

사진, 음악, 감정, 위치와 함께 하루를 저장하고 시간이 지난 후 과거의 기록을 다시 돌아볼 수 있습니다.

## ✨ 프로젝트 소개

SNS는 타인에게 보여주기 위한 기록이 중심입니다.

하지만 One Page는 **나 자신을 위한 기록**에 집중합니다.

하루를 하나의 페이지로 남기고, 오늘의 감정 · 사진 · 음악 · 장소 · 생각을 기록합니다.

AI는 사용자의 기록을 분석하여 하루의 의미를 정리하고, 시간이 지난 후 다시 추억을 돌아볼 수 있도록 도와줍니다.

## 📌 주요 기능

| 기능 | 설명 |
|---|---|
| 🔐 회원 관리 | 회원가입 / 로그인 / JWT 인증 / 프로필 관리 |
| 📖 하루 기록 | 제목 · 내용 · 감정 · 사진 · 음악 · 위치 · 태그 |
| 🤖 AI 하루 요약 | 작성 내용을 자연스러운 문장으로 요약 |
| ✍️ AI 제목 추천 | 내용 기반 제목 자동 생성 |
| 📈 AI 리포트 | 월간 / 연간 감정 변화 · 기록 패턴 · 주요 키워드 |
| 🕰 타임캡슐 | 특정 날짜까지 기록 잠금 |
| 📊 기록 통계 | 총 기록 수 · 연속 기록 · 감정 비율 · 자주 사용한 키워드 |

> 기능 상세 정의는 [기획서](./docs/01_project-plan.md) 참조

## 🛠 Tech Stack

| 구분 | 기술 |
|---|---|
| Front-end | React · TypeScript · Vite · Tailwind CSS · TanStack Query · React Router · Framer Motion |
| Back-end | Node.js · Express · TypeScript · Prisma · JWT · Multer |
| Database | MariaDB |
| AI | Ollama (Local LLM) · OpenAI API |
| Infra | Docker · Nginx · GitHub Actions |

## 🏗 Architecture

```text
                 User
                  │
                  ▼
            React Client
                  │
                  ▼
               Nginx
                  │
                  ▼
          Node.js Express
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
    MariaDB             AI Service
    Prisma              Ollama/OpenAI
```

> 상세 아키텍처는 [개발 가이드](./docs/05_dev-guide.md) 참조

## 📂 프로젝트 구조

```text
OnePage
│
├── frontend/
├── backend/
│
├── docs/
│   ├── 01_project-plan.md
│   ├── 02_erd.md
│   ├── 03_api-spec.md
│   ├── 04_ui-ux-design.md
│   └── 05_dev-guide.md
│
├── docker-compose.yml
├── ROADMAP.md
├── DEVLOG.md
└── README.md
```

## 🚀 실행 방법

### 1. Repository Clone

```bash
git clone https://github.com/example/one-page.git
```

### 2. Backend 실행

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend 실행

```bash
cd frontend
npm install
npm run dev
```

### 4. Docker 실행

```bash
docker-compose up
```

## ⚙ Environment

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

## 📚 Documentation

| 문서 | 설명 |
|---|---|
| [01_project-plan](./docs/01_project-plan.md) | 요구사항 · 기능 명세 · 릴리즈 계획 |
| [02_erd](./docs/02_erd.md) | 데이터베이스 설계 |
| [03_api-spec](./docs/03_api-spec.md) | REST API 구조 |
| [04_ui-ux-design](./docs/04_ui-ux-design.md) | 화면 설계 |
| [05_dev-guide](./docs/05_dev-guide.md) | 아키텍처 · 개발 환경 · 폴더 구조 · Git 전략 |
| [ROADMAP](./ROADMAP.md) | 개발 단계 및 일정 |
| [DEVLOG](./DEVLOG.md) | 세션별 개발 기록 · 트러블슈팅 |

## 🔥 Troubleshooting

개발 과정에서 발생한 문제와 해결 과정은 아래 항목으로 관리합니다.

예정:

- JWT 인증 문제
- CORS 문제
- AI 응답 속도 개선
- 이미지 저장 방식 개선
- Docker 배포 문제

## 🌱 Future Improvements

- Google OAuth 로그인
- AWS S3 이미지 저장
- Redis Cache 적용
- WebSocket 실시간 알림
- Mobile Application
- AI 음성 일기
- AI 감정 분석 고도화

## 👨‍💻 Developer

**사공민규(sagming40)** · [GitHub](https://github.com/sagming40)

## 📄 License

This project is licensed under the MIT License.
