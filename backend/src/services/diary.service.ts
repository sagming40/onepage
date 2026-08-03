import * as diaryRepository from "../repositories/diary.repository";
import { Emotion } from "@prisma/client";

// AuthError를 그대로 흉내낸 DiaryError.
// auth.service.ts에서 이미 검증된 패턴이라 새로 고민할 필요 없이 재사용한다.
export class DiaryError extends Error {
  errorCode: string;
  
  constructor(message: string, errorCode: string) {
    super(message);
    this.errorCode = errorCode;
    this.name = "DiaryError";
  }
}

// createDiary = 새 일기 한 편을 만드는 것.
// 여기선 권한 검증이 필요 없음 — 직접 작성하는 나의 일기
export const createDiary = async (params: {
  userId: number;
  title?: string | null;
  content: string;
  emotion: Emotion;
  location?: string | null;  
}) => {
  return diaryRepository.createDiary(params);  
};

// getDiaryList = 목록 조회 + 페이지네이션 계산까지 여기서 끝냄.
// Controller는 "page, size를 받아서 그대로 넘기기"만 하고,
// "몇 번째부터 몇 개를 꺼낼지" 계산하는 건 비즈니스 로직이라 Service 몫.
export const getDiaryList = async (params: {
  userId: number;
  page: number;
  size: number;
  year?: number;
  month?: number;  
}) => {
  const { userId, page, size, year, month } = params; 
  
  // skip 계산 예시: 1페이지(1번)는 0개 건너뛰기, 2페이지는 size개 건너뛰기.
  const skip = (page - 1) * size;

  // year만 있고 month가 없으면 "그 해 전체", 둘 다 있으면 "그 달만".
  let startDate: Date | undefined;
  let endDate: Date | undefined;

  if (year && month) {
    startDate = new Date(year, month - 1, 1); // JS Date는 월이 0부터 시작(1월=0)
    endDate = new Date(year, month, 1); // 다음 달 1일 = 이번 달의 끝
  } else if (year) {
    startDate = new Date(year, 0, 1);
    endDate = new Date(year + 1, 0, 1);
  }

  const { items, total } = await diaryRepository.findManyByUserId({
    userId,
    skip,
    take: size,
    // startDate/endDate가 둘 다 있을 때만 그 키 자체를 아예 만들어 버린다.
    // 없으면 키 자체가 생기지 않으니 "칸이 없는" 상태가 되어 타입이 맞는다.
    ...(startDate && endDate ? { startDate, endDate } : {}), 
  });

  return {
    items,
    total,
    page,
    totalPages: Math.ceil(total / size),
  };
};

// getDiaryDetail = 상세 조회 + 권한 검증이 함께 있는, 핵심 함수.
export const getDiaryDetail = async (params: {
  diaryId: number;
  userId: number;  
}) => {
  const { diaryId, userId } = params;
  
  const diary = await diaryRepository.findById(diaryId);

  // 1차 방어: 애초에 존재하지 않거나 이미 삭제된 경우.
  if (!diary) {
    throw new DiaryError("일기를 찾을 수 없습니다.", "DIARY_NOT_FOUND");
  }
  
  // 2차 방어: 존재는 하지만 내 것이 아닌 경우.
  // ⚠️ 여기서 일부러 에러 메시지와 코드를 위와 동일하게 맟춤.
  // 다르게 응답하면 "존재는 하지만 내 것이 아니다"라는 걸 상대가 알아챌 수 있음
  if (diary.userId !== userId) {
    throw new DiaryError("일기를 찾을 수 없습니다.", "DIARY_NOT_FOUND");
  }

  return diary;
};

// updateDiary = 수정도 상세 조회와 같은 권한 검증을 거친다.
// 내부적으로 getDiaryDetail을 재사용 — 검증 로직을 두번 쓰지 않기 위해.
export const updateDiary = async (params: {
  diaryId: number;
  userId: number;
  data: {
    title?: string | null;
    content?: string;
    emotion?: Emotion;
    location?: string | null;
  };
}) => {
  const { diaryId, userId, data } = params;
  
  // 존재 + 권한 확인을 여기서 먼저 통과해야 아래로 내려간다.
  await getDiaryDetail({ diaryId, userId });

  return diaryRepository.updateDiary(diaryId, data);
};

// deleteDiary = 삭제도 동일하게 검증 → 실행 순서.
export const deleteDiary = async (params: {
  diaryId: number;
  userId: number;  
}) => {
  const { diaryId, userId } = params;
  
  await getDiaryDetail({ diaryId, userId });

  return diaryRepository.softDeleteDiary(diaryId);
}
