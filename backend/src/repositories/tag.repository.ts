import prisma from "../config/prisma";

// ============================================================
// replaceDiaryTags
// "앞으로 이 일기의 태그를 이걸로 해줘" — 통째로 갈아끼우기
//
// 하나씩 추가/삭제하지 않고 통으로 교체하는 이유:
// 화이트보드에 적힌 내용을 전부 지우고 새로 쓰는 것이
// 글자를 하나씩 썼다 지웠다 하는 것보다 결과가 확실하다.
// 중간에 실패해도 어중간한 상태가 남지 않는다. 
// ============================================================
export const replaceDiaryTags = async (
  diaryId: number,
  tagNames: string[]  
) => {
  // $transaction = "이 안의 작업은 전부 성공하거나, 전부 없던 일이 된다"
  // — DB 안전장치 → "둘 다 되거나/둘 다 되지 않거나"
  // 비유 : 은행 송금 — 내 통장에서 5만원 출금 → 상대방 통장에 5만원 입금
  // 이 둘 사이에 정전이 나면? 돈만 증발함. 
  return prisma.$transaction(async (tx) => {
    // ⚠️ 이 블록 안에서는 prisma가 아니라 반드시 tx를 써야 함
    // tx = 이번 거래 전용 창구. prisma를 쓰면 다른 창구로 가버려서
    // 실패했을 때 되돌리기 대상에서 빠진다. (자주 하는 실수)

    // 1. 기존 연결을 전부 끊는다
    // tag 자체를 지우는 게 아니라 '스티커'만 뗀다.
    // tags 테이블의 '공부'는 그대로 남아서 다른 일기들이 재사용한다.
    await tx.diaryTag.deleteMany({
      where: { diaryId },  
    });

    // 2. 새 태그를 하나씩 붙인다
    // for...of 로 하나씩 순서대로 처리한다.
    // 여러 개를 동시에 보내지 않는 이유는 아래 주석 참고
    for (const name of tagNames) {
      await tx.diaryTag.create({
        data: {
          // diaryId를 숫자로 바로 넣는 대신, diary도 "연결" 방식으로 맟춘다.
          // tag 쪽이 connectOrCreate(관계 방식)을 쓰는 이상,
          // diary 쪽도 같은 언어(관계 방식)로 말해야 Prisma가 헷갈리지 않는다.
          diary: { connect: { id: diaryId } },
          // connectOrCreate = "명함첩에서 찾아보고, 없으면 새로 만들어서 연결"
          //   where  → 이 이름의 태그가 이미 있나? (있으면 있는 걸 사용)
          //   create → 없으면 이 내용으로 새로 생성
          //
          // 이 과정을 거치지 않는다면 '공부' 태그가 일기 100개에 100번 중복 저장된다.
          tag: { connectOrCreate: { where: { name }, create: { name } } }, 
        },
      });
    }

    // 3. 최종 결과를 돌려준다
    // include = 스티커만 들고 오면 "5번 태그"라는 숫자뿐이라 화면에 못 쓴다.
    //           연결된 태그의 실제 이름까지 같이 꺼내오라는 뜻.
    return tx.diaryTag.findMany({
      where: { diaryId },
      include: { tag: true },  
    });   
  }); 
};

// ============================================================
// findTagsByDiaryId
// 일기 하나에 붙은 태그 목록만 읽어오기 (조회 전용)
// ============================================================
export const findTagsByDiaryId = async (diaryId: number) => {
  return prisma.diaryTag.findMany({
    where: { diaryId },
    include: { tag: true },
  });  
};
