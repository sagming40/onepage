# 📅 ROADMAP

> **프로젝트명** : One Page
> **문서 버전** : v2.4
> **변경 이력**
> - v2.0 — Git 전략 / Commit Convention 항목을 [개발 가이드](./docs/05_dev-guide.md)로 이관
> - v2.1 — 헤더 계층 정리
> - v2.2 — DEVLOG 연동 (구조 트리 · 커밋 컨벤션 · M0 작업목록)
> - v2.3 — M0 완료 처리
> - v2.4 — M1 Backend 인증 파트 완료 처리 (Express 서버/Prisma 마이그레이션/회원 API/JWT)
> - v2.5 — M1 Diary CRUD 완료 처리

## 1. 개발 단계

```text
Planning
   ↓
MVP Development
   ↓
Feature Expansion
   ↓
AI Integration
   ↓
Deployment
   ↓
Optimization
```

## 2. Milestone Overview

| 단계 | 목표 | 상태 |
|---|---|---|
| [Milestone 0](#milestone-0--프로젝트-준비-및-설계) | 프로젝트 준비 및 설계 | ✅ 완료 |
| [Milestone 1](#milestone-1--mvp-개발) | MVP 개발 | 🔄 진행 중 |
| [Milestone 2](#milestone-2--핵심-기능-확장) | 핵심 기능 확장 | ⏳ 예정 |
| [Milestone 3](#milestone-3--ai-기능-개발) | AI 기능 개발 | ⏳ 예정 |
| [Milestone 4](#milestone-4--배포-환경-구축) | 배포 환경 구축 | ⏳ 예정 |
| [Milestone 5](#milestone-5--최적화-및-개선) | 최적화 및 개선 | ⏳ 예정 |

## 3. 개발 우선순위

| 우선순위 | 항목 |
|---|---|
| Priority 1 (필수) | 회원 인증 · 일기 CRUD · Database 설계 · API 구현 |
| Priority 2 (중요) | 이미지 업로드 · 검색 · 통계 · AI 요약 |
| Priority 3 (확장) | 타임캡슐 · AI 리포트 · 실시간 알림 · 모바일 앱 |

## 4. 예상 일정

| 기간 | 작업 |
|---|---|
| Week 1 | 기획 및 설계 |
| Week 2~4 | Backend / Database 개발 |
| Week 5~6 | Frontend 개발 |
| Week 7 | AI 기능 개발 |
| Week 8 | 테스트 및 배포 |
| Week 9 | 개선 및 문서화 |

## 5. 최종 완료 목표

- Full Stack 웹 서비스 구현
- MariaDB 기반 데이터 설계
- REST API 구축
- AI 기능 적용
- Docker 배포 경험 확보
- GitHub 기반 프로젝트 관리

---

## Milestone 0 — 프로젝트 준비 및 설계

**목표** · 서비스 방향과 개발 환경을 정의한다.

### 작업 목록

- [x] 프로젝트 기획
- [x] 요구사항 정의
- [x] 기능 명세 작성
- [x] ERD 설계
- [x] API 설계
- [x] UI/UX 설계
- [x] DEVLOG 작성 규칙 수립
- [x] Git Repository 생성
- [x] 개발 환경 구성

### 완료 기준

- [x] 프로젝트 문서 작성 완료
- [x] Backend 초기 구조 생성
- [x] Database 설계 완료 (문서) · `onepage` DB 생성 완료
- [ ] Frontend 초기 구조 생성 → M1에서 진행

## Milestone 1 — MVP 개발

**목표** · 서비스의 기본 흐름을 완성한다.

### 작업 목록

**Backend**

- [x] MariaDB 연결 (M0에서 선행 완료)
- [x] Prisma 설정 (M0에서 선행 완료 · 6.x 고정)
- [x] Prisma 스키마 작성 (02_erd.md 기준)
- [x] 마이그레이션 실행 (테이블 생성)
- [x] Express 서버 구축
- [x] 회원 API 구현
- [x] JWT 인증 구현

**Frontend**

- [ ] React 프로젝트 구성
- [ ] 로그인 화면
- [ ] 회원가입 화면
- [ ] 메인 화면

**Diary**

- [x] 일기 작성
- [x] 일기 조회
- [x] 일기 수정
- [x] 일기 삭제

### 완료 기준

사용자가 아래 흐름을 정상적으로 수행 가능

```text
회원가입 → 로그인 → 일기 작성 → 작성한 일기 조회
```

## Milestone 2 — 핵심 기능 확장

**목표** · 사용자가 기록을 풍부하게 남길 수 있도록 기능 확장

### 작업 목록

**기록 기능**

- [ ] 사진 업로드
- [ ] 음악 기록
- [ ] 위치 기록
- [ ] 태그 기능

**검색**

- [ ] 제목 검색
- [ ] 내용 검색
- [ ] 태그 검색

**통계**

- [ ] 총 기록 수
- [ ] 작성 패턴
- [ ] 감정 통계

### 완료 기준

사용자가 자신의 기록을 다양한 방식으로 관리 가능

## Milestone 3 — AI 기능 개발

**목표** · AI를 활용하여 기록 경험 향상

### 작업 목록

**AI 하루 요약**

- [ ] Prompt 설계
- [ ] LLM 연결
- [ ] 결과 저장

**AI 제목 추천**

- [ ] 제목 생성 기능

**AI 리포트**

- [ ] 월간 분석
- [ ] 연간 회고 생성

### 완료 기준

사용자의 기록 데이터를 기반으로 AI 결과 제공 가능

## Milestone 4 — 배포 환경 구축

**목표** · 실제 서비스 형태로 실행 가능한 환경 구축

### 작업 목록

**Docker**

- [ ] Frontend Dockerfile 작성
- [ ] Backend Dockerfile 작성
- [ ] Docker Compose 구성

**Server**

- [ ] Linux 환경 구성
- [ ] Nginx 설정
- [ ] HTTPS 적용

**CI/CD**

- [ ] GitHub Actions 구성
- [ ] 자동 빌드
- [ ] 자동 배포

### 완료 기준

외부 환경에서 서비스 접근 가능

## Milestone 5 — 최적화 및 개선

**목표** · 서비스 품질 개선

### 작업 목록

**성능 개선**

- [ ] API 응답 시간 측정
- [ ] Database Index 개선
- [ ] 이미지 최적화

**보안 강화**

- [ ] 입력값 검증
- [ ] Rate Limit 적용
- [ ] Token 관리 개선

**UX 개선**

- [ ] 애니메이션 추가
- [ ] 모바일 반응형 개선
- [ ] 다크모드 개선

### 완료 기준

안정적인 서비스 운영 가능 상태
