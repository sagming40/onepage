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
