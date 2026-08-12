import { Request, Response } from "express";
import * as tagService from "../services/tag.service";
import { DiaryError } from "../services/diary.service";

// replaceDiaryTags = PUT /diaries/:id/tags
export const replaceDiaryTags = async (req: Request, res: Response) => {
  const diaryId = Number(req.params.id);
  const { tags } = req.body;
  
  // tags가 아예 없거나, array가 아니면 바로 막는다.
  // (Service까지 보내지 않고 Controller 단에서 "형식"만 먼저 체크)
  if (!Array.isArray(tags)) {
    res.status(400).json({
      success: false,
      message: "tags는 배열이어야 합니다.",
      errorCode: "INVALID_TAGS_FORMAT",  
    });
    return;
  }

  try {
    const result = await tagService.replaceDiaryTags({
      diaryId,
      userId: req.userId!, // authMiddleware를 거쳤으므로 무조건 존재
      tagNames: tags,  
    });

    res.status(200).json({
      success: true,
      message: "태그 저장 완료",
      // result는 DiaryTag[] (각 항목에 tag: {id, name} 포함)라서
      // 화면이 바로 쓰기 편하게 이름만 뽑아서 array로 넘긴다.
      data: { tags: result.map((item) => item.tag.name) },  
    });
  } catch (error) {
    if (error instanceof DiaryError) {
      // Service에서 던진 에러 종류에 따라 상태 코드를 다르게 준다.
      //   DIARY_NOT_FOUND    → 404 (존재하지 않거나 다른 사람의 것)
      //   TOO_MANY_TAGS 등   → 400 (요청 자체가 잘못됨)
      const status = error.errorCode === "DIARY_NOT_FOUND" ? 404 : 400;
      res.status(status).json({
        success: false,
        message: error.message,
        errorCode: error.errorCode,
      });
      return;   
    }

    // 예상 못 한 error는 삼키지 않고 app.ts의 error handler로 넘긴다.
    throw error;
  }
};
