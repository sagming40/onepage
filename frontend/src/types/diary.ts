// 감정 코드 7종
// backend의 Prisma enum Emotion과 토씨 하나 틀리면 안됨
// 다르게 작성이 된 경우, 화면은 멀쩡하나 한참 뒤에 서버가 400 에러를 터뜨림 → 사고를 미연에 방지
export type Emotion =
  | "HAPPY"
  | "CALM"
  | "SAD"
  | "ANGRY"
  | "ANXIOUS"
  | "EXCITED"
  | "TIRED";

// 목록 조회(GET /diaries)에서 한 건이 생긴 모양.
// 목록엔 본문(content) 내용이 보여지지 않으니 여기에도 없는것이 정상.
// 비유: 서점 매대에 단순히 책이 올려져 있는 그 자체의 상태 ─ 내용은 책을 펼쳐야 볼 수 있음.
export interface DiaryListItem {
  id: number;
  title: string | null;
  emotion: Emotion;
  createdAt: string; // 서버는 ISO 문자열로 반환한다. Date 객체 X  
}

// 상세 조회(GET /diaries/:id) ─ 본문 포함
// extends = "목록 조회 내용 전부 가져오고, 거기에 내(extends)가 몇 가지 더 추가할게"
export interface Diary extends DiaryListItem {
  content: string;
  location: string | null;
  aiSummary: string | null;
  updatedAt: string;
  // 상세 조회에서만 내려오는 필드
  // Backend의 getDiaryDetail이 diaryTags를 tags: string[]로 가공하여 넘기므로
  // 이 곳도 이름/타입을 1:1로 맟춘다. ("공부"처럼 이름만 있는 배열)
  tags: string[];  
}

// GET /diaries 응답의 data 안에 실제로 들어있는 모양.
// diary.service.ts의 getDiaryList 반환값과 1:1로 맟춤.
// 우체국 소포에 비유하면: items = 소포 안에 든 물건들,
// total/page/totalPages = 택배 송장에 적힌 "전체 몇 개 중 몇 번째" 정보.
export interface DiaryListResult {
  items: DiaryListItem[];
  total: number;
  page: number;
  totalPages: number;  
}

// 일기를 만들 때 서버로 "보내는" 방식
// 위쪽 Diary/DiaryListItem은 전부 서버가 "주는" 방식이었지만, 이건 반대 방향 이다.
// 비유: Diary/DiaryListItem이 '배송받은 물건 목록'이라면, 여긴 '주문서 양식'
//
// ⚠️ title/location에 ?(옵셔널)를 쓰지 않고 | null로 간 이유:
// tsconfig의 exactOptionalPropertyTypes가 켜져 있으면
// "칸이 아예 없음"과 "칸은 있는데 undefined"를 엄격히 구분해서
// 백엔드 세션 때처럼 조건부 스프레드를 계속 써야 한다.
// 백엔드도 title ?? null / location ?? null로 받고 있으니
// 프론트에서 처음부터 null로 맞춰 보내면 양쪽이 깔끔하게 일치한다.  
export interface CreateDiaryPayload {
  title: string | null;
  content: string;
  emotion: Emotion;
  location: string | null;
}

// PUT /diaries/:id/tags 요청 시 서버로 보내는 모양
// Backend가 { tags: string[] } 형태를 기대하므로 그대로 맟춘다.
export interface ReplaceTagsPayload {
  tags: string[];
}
