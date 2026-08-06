# 📄 API 명세서 (API Specification)

> **프로젝트명** : One Page
> **문서 버전** : v1.4
> **작성일** : 2026-08-02
> **변경 이력**
> - v1.1 — 헤더 계층 정리, 엔드포인트 요약표 추가, JSON 예시 포맷 정리
> - v1.2 — 일기 조회/수정/삭제 실패 시 403 대신 404 반환하도록 정정 (사유는 DEVLOG 결정 기록 참조)
> - v1.3 — 로그인 응답을 공통 포맷으로 수정, refreshToken 필드 삭제(M1 스코프 제외) / GET 일기 목록 응답을 실제 구현(items/total/page/totalPages)에 맞게 수정
> - v1.4 — 일기 작성/상세 조회 응답을 실제 구현(공통 응답 포맷으로 감싸는 형태)에 맞게 수정

## 1. 기본 정보

### Base URL

| 환경 | URL |
|---|---|
| 개발 | `http://localhost:3000/api` |
| 운영 | `https://api.onepage.com/api` |

### HTTP Method

| Method | 설명 |
|--------|------|
| GET | 데이터 조회 |
| POST | 데이터 생성 |
| PUT | 데이터 수정 |
| DELETE | 데이터 삭제 |

### 인증 방식

JWT 인증이 필요한 API는 아래 헤더를 포함한다.

```http
Authorization: Bearer {access_token}
```

본 문서에서 🔒 표시가 있는 엔드포인트는 JWT 인증이 필요하다.

## 2. 공통 응답 형식

**성공 응답**

```json
{
  "success": true,
  "message": "요청 성공",
  "data": {}
}
```

**실패 응답**

```json
{
  "success": false,
  "message": "오류 메시지",
  "errorCode": "USER_NOT_FOUND"
}
```

## 3. 엔드포인트 요약

| 분류 | Method | Endpoint | 설명 | 인증 |
|---|---|---|---|:---:|
| 회원 | POST | `/auth/signup` | 회원가입 | |
| 회원 | POST | `/auth/login` | 로그인 | |
| 회원 | POST | `/auth/logout` | 로그아웃 | 🔒 |
| 회원 | GET | `/users/me` | 내 정보 조회 | 🔒 |
| 회원 | PUT | `/users/me` | 회원 정보 수정 | 🔒 |
| 일기 | POST | `/diaries` | 일기 작성 | 🔒 |
| 일기 | GET | `/diaries` | 일기 목록 조회 | 🔒 |
| 일기 | GET | `/diaries/{id}` | 일기 상세 조회 | 🔒 |
| 일기 | PUT | `/diaries/{id}` | 일기 수정 | 🔒 |
| 일기 | DELETE | `/diaries/{id}` | 일기 삭제 | 🔒 |
| 사진 | POST | `/diaries/{id}/photos` | 사진 업로드 | 🔒 |
| 사진 | DELETE | `/photos/{id}` | 사진 삭제 | 🔒 |
| 음악 | POST | `/diaries/{id}/music` | 음악 등록 | 🔒 |
| 음악 | DELETE | `/music/{id}` | 음악 삭제 | 🔒 |
| 태그 | POST | `/diaries/{id}/tags` | 태그 추가 | 🔒 |
| 태그 | DELETE | `/diaries/{id}/tags/{tagId}` | 태그 제거 | 🔒 |
| 검색 | GET | `/search` | 일기 검색 | 🔒 |
| AI | POST | `/ai/summary/{diaryId}` | AI 하루 요약 생성 | 🔒 |
| AI | POST | `/ai/title/{diaryId}` | AI 제목 생성 | 🔒 |
| AI | GET | `/ai/reports/monthly` | 월간 리포트 조회 | 🔒 |
| AI | GET | `/ai/reports/yearly` | 연간 리포트 조회 | 🔒 |
| 통계 | GET | `/statistics` | 사용자 통계 조회 | 🔒 |
| 타임캡슐 | POST | `/capsules` | 타임캡슐 생성 | 🔒 |
| 타임캡슐 | GET | `/capsules` | 타임캡슐 목록 조회 | 🔒 |
| 타임캡슐 | GET | `/capsules/{id}` | 타임캡슐 조회 | 🔒 |

## 4. 회원 API

### POST /auth/signup — 회원가입

**Request**

```json
{
  "email": "user@test.com",
  "password": "password123",
  "nickname": "mingyu"
}
```

**Response**

```json
{
  "success": true,
  "message": "회원가입 완료"
}
```

### POST /auth/login — 로그인

**Request**

```json
{
  "email": "user@test.com",
  "password": "password123"
}
```

**Response**

```json
{
  "success": true,
  "message": "로그인 완료",
  "data": {
    "accessToken": "jwt_token"
  }
}
```

### POST /auth/logout — 로그아웃 🔒

**Response**

```json
{
  "message": "로그아웃 완료"
}
```

### GET /users/me — 내 정보 조회 🔒

**Response**

```json
{
  "id": 1,
  "email": "user@test.com",
  "nickname": "mingyu",
  "profileImage": null
}
```

### PUT /users/me — 회원 정보 수정 🔒

**Request**

```json
{
  "nickname": "newName"
}
```

## 5. 일기 API

### POST /diaries — 일기 작성 🔒

**Request**

```json
{
  "title": "새로운 시작",
  "content": "오늘 React 공부를 했다.",
  "emotion": "HAPPY",
  "location": "인천"
}
```

**Response**

```json
{
  "success": true,
  "message": "일기 작성 완료",
  "data": {
    "id": 1
  }
}
```

### GET /diaries — 일기 목록 조회 🔒

**Query Parameters**

| Parameter | 설명 |
|-----------|------|
| page | 페이지 |
| size | 개수 |
| year | 년도 |
| month | 월 |

**Response**

```json
{
  "success": true,
  "message": "조회 성공",
  "data": {
    "items": [
      {
        "id": 1,
        "title": "새로운 시작",
        "emotion": "HAPPY",
        "createdAt": "2026-08-02"
      }
    ],
    "total": 1,
    "page": 1,
    "totalPages": 1
  }
}
```

### GET /diaries/{id} — 일기 상세 조회 🔒

**Response**

```json
{
  "success": true,
  "message": "조회 성공",
  "data": {
    "id": 1,
    "title": "새로운 시작",
    "content": "오늘 React 공부를 했다.",
    "emotion": "HAPPY",
    "location": "인천",
    "aiSummary": "새로운 것을 배우며 성장한 하루",
    "createdAt": "2026-08-02",
    "updatedAt": "2026-08-02"
  }
}
```

**Error Response** · 존재하지 않거나 본인 소유가 아닌 경우 동일하게 404 처리 (사유는 DEVLOG 결정 기록 참조)

```json
{
  "success": false,
  "message": "일기를 찾을 수 없습니다.",
  "errorCode": "DIARY_NOT_FOUND"
}
```

### PUT /diaries/{id} — 일기 수정 🔒

**Request**

```json
{
  "title": "수정된 제목",
  "content": "수정된 내용"
}
```

**Error Response** · 404 처리는 상세 조회와 동일 (`DIARY_NOT_FOUND`)

### DELETE /diaries/{id} — 일기 삭제 🔒

Soft Delete로 처리한다.

**Error Response** · 404 처리는 상세 조회와 동일 (`DIARY_NOT_FOUND`)

## 6. 사진 API

### POST /diaries/{id}/photos — 사진 업로드 🔒

**Content-Type** · `multipart/form-data`

**Request**

```text
file=image.jpg
```

**Response**

```json
{
  "imageUrl": "/uploads/image.jpg"
}
```

### DELETE /photos/{id} — 사진 삭제 🔒

## 7. 음악 API

### POST /diaries/{id}/music — 음악 등록 🔒

**Request**

```json
{
  "title": "밤편지",
  "artist": "아이유",
  "youtubeUrl": "https://youtube.com"
}
```

### DELETE /music/{id} — 음악 삭제 🔒

## 8. 태그 API

### POST /diaries/{id}/tags — 태그 추가 🔒

**Request**

```json
{
  "tag": "공부"
}
```

### DELETE /diaries/{id}/tags/{tagId} — 태그 제거 🔒

## 9. 검색 API

### GET /search — 일기 검색 🔒

**Query** · `keyword=공부`

**Response**

```json
{
  "results": [
    {
      "id": 1,
      "title": "공부 기록"
    }
  ]
}
```

## 10. AI API

### POST /ai/summary/{diaryId} — AI 하루 요약 생성 🔒

일기 내용을 AI 모델에게 전달하여 요약을 생성한다.

**Response**

```json
{
  "summary": "배움을 통해 성장한 하루였습니다."
}
```

### POST /ai/title/{diaryId} — AI 제목 생성 🔒

### GET /ai/reports/monthly — 월간 AI 리포트 조회 🔒

**Query** · `year=2026&month=8`

### GET /ai/reports/yearly — 연간 AI 리포트 조회 🔒

**Query** · `year=2026`

## 11. 통계 API

### GET /statistics — 사용자 통계 조회 🔒

**Response**

```json
{
  "totalDiary": 365,
  "streak": 30,
  "emotionRate": {
    "HAPPY": 70,
    "SAD": 10
  }
}
```

## 12. 타임캡슐 API

### POST /capsules — 타임캡슐 생성 🔒

**Request**

```json
{
  "diaryId": 1,
  "openAt": "2027-08-02"
}
```

### GET /capsules — 타임캡슐 목록 조회 🔒

### GET /capsules/{id} — 타임캡슐 조회 🔒

`openAt` 이전에는 접근할 수 없다.

## 13. HTTP 상태 코드

| Code | 설명 |
|------|------|
| 200 | 성공 |
| 201 | 생성 성공 |
| 400 | 잘못된 요청 |
| 401 | 인증 실패 |
| 403 | 권한 없음 |
| 404 | 데이터 없음 |
| 500 | 서버 오류 |

## 14. API 설계 원칙

- RESTful API 설계를 따른다.
- URL은 명사 형태로 작성한다.
- 인증이 필요한 API는 JWT 검증을 수행한다.
- 모든 응답은 JSON 형식을 사용한다.
- 에러 발생 시 명확한 Error Code를 반환한다.
- Controller와 Service 계층을 분리하여 유지보수성을 확보한다.
