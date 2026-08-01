# 📄 ERD (Entity Relationship Diagram)

> **프로젝트명** : One Page
> **문서 버전** : v1.1
> **작성일** : 2026-08-02
> **변경 이력**
> - v1.1 — 헤더 계층 정리, 인덱스 항목 표로 통합

## 1. ERD 개요

One Page는 사용자의 하루를 하나의 페이지(Page)로 기록하는 감성 다이어리 서비스이다.

사용자는 회원가입 후 일기를 작성할 수 있으며, 사진 · 음악 · 태그 · 위치 · 감정 · AI 요약을 함께 저장할 수 있다.

## 2. ERD

```text
Users
│
├──────< Diaries >──────────────┐
│           │                   │
│           │                   │
│           ├────< Photos       │
│           │                   │
│           ├────< Musics       │
│           │                   │
│           ├────< TimeCapsules │
│           │                   │
│           └────< DiaryTags >────── Tags
│
└──────< AIReports
```

## 3. 테이블 정의

### Users

| 컬럼 | 타입 | 제약조건 |
|------|------|---------|
| id | BIGINT | PK, AUTO_INCREMENT |
| email | VARCHAR(100) | UNIQUE |
| password | VARCHAR(255) | NOT NULL |
| nickname | VARCHAR(30) | UNIQUE |
| profile_image | VARCHAR(255) | NULL |
| created_at | DATETIME | NOT NULL |
| updated_at | DATETIME | NOT NULL |
| deleted_at | DATETIME | NULL |

### Diaries

| 컬럼 | 타입 | 제약조건 |
|------|------|---------|
| id | BIGINT | PK |
| user_id | BIGINT | FK |
| title | VARCHAR(100) | NULL |
| content | TEXT | NOT NULL |
| emotion | ENUM | NOT NULL |
| weather | VARCHAR(30) | NULL |
| temperature | DECIMAL(4,1) | NULL |
| location | VARCHAR(100) | NULL |
| ai_summary | TEXT | NULL |
| created_at | DATETIME | NOT NULL |
| updated_at | DATETIME | NOT NULL |
| deleted_at | DATETIME | NULL |

### Photos

| 컬럼 | 타입 | 제약조건 |
|------|------|---------|
| id | BIGINT | PK |
| diary_id | BIGINT | FK |
| image_url | VARCHAR(255) | NOT NULL |
| sort_order | INT | DEFAULT 1 |
| created_at | DATETIME | NOT NULL |

### Musics

| 컬럼 | 타입 | 제약조건 |
|------|------|---------|
| id | BIGINT | PK |
| diary_id | BIGINT | FK |
| title | VARCHAR(150) | NOT NULL |
| artist | VARCHAR(100) | NULL |
| youtube_url | VARCHAR(255) | NULL |
| spotify_url | VARCHAR(255) | NULL |
| created_at | DATETIME | NOT NULL |

### Tags

| 컬럼 | 타입 | 제약조건 |
|------|------|---------|
| id | BIGINT | PK |
| name | VARCHAR(30) | UNIQUE |

### DiaryTags

다대다(N:M) 관계 테이블

| 컬럼 | 타입 | 제약조건 |
|------|------|---------|
| diary_id | BIGINT | PK, FK |
| tag_id | BIGINT | PK, FK |

### AIReports

| 컬럼 | 타입 | 제약조건 |
|------|------|---------|
| id | BIGINT | PK |
| user_id | BIGINT | FK |
| report_type | ENUM('MONTH','YEAR') | NOT NULL |
| target_year | INT | NOT NULL |
| target_month | INT | NULL |
| content | TEXT | NOT NULL |
| created_at | DATETIME | NOT NULL |

### TimeCapsules

| 컬럼 | 타입 | 제약조건 |
|------|------|---------|
| id | BIGINT | PK |
| diary_id | BIGINT | FK |
| open_at | DATETIME | NOT NULL |
| is_opened | BOOLEAN | DEFAULT FALSE |

## 4. 관계 정의

| 부모 | 자식 | 관계 |
|------|------|------|
| Users | Diaries | 1 : N |
| Diaries | Photos | 1 : N |
| Diaries | Musics | 1 : N |
| Diaries | TimeCapsules | 1 : 0..1 |
| Diaries | DiaryTags | 1 : N |
| Tags | DiaryTags | 1 : N |
| Users | AIReports | 1 : N |

## 5. Emotion ENUM

```sql
HAPPY
CALM
SAD
ANGRY
ANXIOUS
EXCITED
TIRED
```

> 감정별 표시 이모지 및 의미는 [01_project-plan.md](./01_project-plan.md) 참조

## 6. 삭제 정책

| 테이블 | 삭제 방식 |
|---------|----------|
| Users | Soft Delete |
| Diaries | Soft Delete |
| Photos | Hard Delete |
| Musics | Hard Delete |
| DiaryTags | Hard Delete |
| AIReports | Hard Delete |
| TimeCapsules | Hard Delete |

## 7. 인덱스

| 테이블 | 인덱스 |
|---|---|
| Users | UNIQUE(email), UNIQUE(nickname) |
| Diaries | INDEX(user_id), INDEX(created_at), INDEX(emotion) |
| Tags | UNIQUE(name) |
| DiaryTags | INDEX(diary_id), INDEX(tag_id) |
| AIReports | INDEX(user_id) |

## 8. 설계 원칙

- 사용자와 일기는 1:N 관계를 가진다.
- 일기에는 여러 장의 사진을 첨부할 수 있다.
- 하나의 일기에는 여러 개의 태그를 가질 수 있으며, 하나의 태그는 여러 일기에서 사용할 수 있으므로 N:M 관계를 사용한다.
- AI 리포트는 월간 및 연간 데이터를 별도 테이블에 저장하여 재생성 비용을 줄인다.
- 타임캡슐 기능은 일기와 1:1(선택적) 관계를 가진다.
- 모든 주요 테이블은 생성일과 수정일을 기록하며, 사용자와 일기는 Soft Delete를 적용하여 데이터 복구가 가능하도록 설계한다.
