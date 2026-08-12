import prisma from "../config/prisma";
import { Emotion, Prisma } from "@prisma/client";

// Soft Delete 공통 조건.
// "휴지통에 들어가지 않은 것만" 조회 함수마다 매번 수기 작성을 하게 되면
// 언젠간 한 군데를 빼먹게 되므로 상수로 빼둔다.
const notDeleted = { deletedAt: null };

// createDiary = 창고에 새 상자를 하나 들여놓는 것.
// userId는 req.body가 아니라 JWT에서 온 값이 들어와야 함.
// (body로 받으면 "남의 이름으로 일기 쓰기"가 가능하게 되어버림)
export const createDiary = async (data: {
  userId: number;
  title?: string | null;
  content: string;
  emotion: Emotion;
  location?: string | null;  
}) => {
  return prisma.diary.create({ data }); 
};

// findManyByUserId = 창고에서 내 상자만, 그것도 한 페이지 분량만 꺼내오기.
// skip = 앞에서 몇 개를 건너뛸지 / take = 거기서 몇 개를 집어올지
export const findManyByUserId = async (params: {
  userId: number;
  skip: number;
  take: number;
  startDate?: Date;
  endDate?: Date;  
}) => {
  const { userId, skip, take, startDate, endDate } = params;
  
  // where 조건을 미리 변수로 빼는 이유
  // 아래에서 목록 조회와 전체 개수 세기에 '똑같은 조건'을 써야 하는데,
  // 두 번을 따로 쓰게 되면 나중에 한 쪽만 고쳐져서 개수가 맞지 않는 사고가 난다.
  const where: Prisma.DiaryWhereInput = {
    userId,
    ...notDeleted,
    // 년/월 필터가 들어왔을 때만 날짜 범위 조건을 얹는다.
    // gte(이상) ~ lt(미만) 조합인 이유는 8월 31일 23:59:59까지 놓치지 않기 위함.
    ...(startDate && endDate
      ? { createdAt: { gte: startDate, lt: endDate } }
      : {}),
  };

  // $transaction = 창고에 두 가지를 물어볼 때 왔다갔다 두 번 하지 않고
  // "이거랑 이거 한꺼번에 알려줘" 하고 한 번에 처리하는 것.
  const [items, total] = await prisma.$transaction([
    prisma.diary.findMany({
      where,
      orderBy: { createdAt: "desc" }, // 최신순
      skip,
      take,
      // select = 상자를 통째로 들고 오지 않고 라벨만 읽어오기.
      // 목록 화면엔 본문(content)이 필요 없음
      select: {
        id: true,
        title: true,
        emotion: true,
        createdAt: true,
      },  
    }),
    prisma.diary.count({ where }), // 전체가 몇 개인지 (페이지 수 계산용)
  ]);

  return { items, total };
};

// findById = 일기 한 개를 통째로 꺼내오기.
// ⚠️ findUnique가 아니라 findFirst를 쓰는 이유:
// findUnique의 where에는 '유일한 값(id, email 등)'만 넣을 수 있어서
// deletedAt 같은 추가 조건을 함께 걸 수 없다. findFirst는 조건을 자유롭게 건다.
export const findById = async (id: number) => {
  return prisma.diary.findFirst({
    where: { id, ...notDeleted },
    // include = 상자를 열 때 "라벨(diaryTags)도 같이 꺼내라" 라고 지시하는 것
    // diaryTags 하나만 include하게 되면 { tagId: 2 } 처럼 숫자만 딸려온다.
    // 그 안의 tag까지 한 번 더 include해야 실제 이름("공부")까지 따라온다.
    // → include를 중첩해서 쓰는 이유: 스티커(diaryTags)만 보면 몇 번 label인지 모르고,
    //   label장(tag)까지 봐야 "공부"라는 실제 글자를 알 수 있다.
    include: {
      diaryTags: {
        include: { tag: true },
      },
    },
  });  
};

// updateDiary = 상자 내용물 갈아끼우기
// data에 없는 필드는 건드리지 않으므로, 제목만 보내면 제목만 바뀐다.
export const updateDiary = async (
  id: number,
  data: {
    title?: string | null;
    content?: string;
    emotion?: Emotion;
    location?: string | null;
  }  
) => {
  return prisma.diary.update({
    where: { id },
    data, 
  });   
};

// softDeleteDiary = 상자를 태우는 게 아니라 '휴지통' 스티커를 붙이는 것.
// delete가 아니라 update인 게 핵심. 데이터는 그대로 남는다.
export const softDeleteDiary = async (id: number) => {
  return prisma.diary.update({
    where: { id },
    data: { deletedAt: new Date() },
  });  
};
