import { Request, Response } from "express";
import * as diaryService from "../services/diary.service";
import { DiaryError } from "../services/diary.service";
import { Emotion } from "@prisma/client";

// createDiary = POST /diaries
export const createDiary = async (req: Request, res: Response) => {
  const { title, content, emotion, location } = req.body;
  
  // 필수값만 우선 방어. 세밀한 검증(emotion이 진짜 ENUM 값인지 등)은
  // 추후 validators/ 폴더로 분리 예정.
  if (!content || !emotion) {
    res.status(400).json({
      success: false,
      message: "내용과 감정은 필수입니다.",
      errorCode: "MISSING_FIELDS",  
    });
    return;
  }

  const diary = await diaryService.createDiary({
    userId: req.userId!, // authMiddleware를 거쳤으므로 무조건 존재
    title: title ?? null,
    content,
    emotion: emotion as Emotion,
    location: location ?? null,
  });

  res.status(201).json({
    success: true,
    message: "일기 작성 완료",
    data: { id: diary.id },
  });
};

// getDiaryList = GET /diaries
export const getDiaryList = async (req: Request, res: Response) => {
  // 쿼리 파라미터는 전부 문자열로 들어오므로, 숫자가 필요한 건 Number()로 변환.
  // 값이 없으면 Number(undefined) = NaN이 되는데, 그건 아래에서 기본값으로 방어.
  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 10;
  const year = req.query.year ? Number(req.query.year) : undefined;
  const month = req.query.month ? Number(req.query.month) : undefined;

  const result = await diaryService.getDiaryList({
    userId: req.userId!,
    page,
    size,
    // year/month 값이 있을 때만 그 키 자체를 만든다.
    // 없으면 아예 "진열대가 없는" 상태가 되어 타입이 맞는다.
    ...(year !== undefined ? { year } : {}),
    ...(month !== undefined ? { month } : {}),
  });
  
  res.status(200).json({
    success: true,
    message: "조회 성공",
    data: result,
  });
};

// getDiaryDetail = GET /diaries/:id
export const getDiaryDetail = async (req: Request, res: Response) => {
  const diaryId = Number(req.params.id);  

  try {
    const diary = await diaryService.getDiaryDetail({
      diaryId,
      userId: req.userId!,  
    });

    res.status(200).json({
      success: true,
      message: "조회 성공",
      data: diary,  
    });
  } catch (error) {
    if (error instanceof DiaryError) {
      res.status(404).json({
        success: false,
        message: error.message,
        errorCode: error.errorCode,
      });
      return;
    }

    // 예상하지 못한 에러는 여기서 삼키지 않고 app.ts의 에러 핸들러로 넘긴다.
    throw error;
  }
};

// updateDiary = PUT /diaries/:id
export const updateDiary = async (req: Request, res: Response) => {
  const diaryId = Number(req.params.id);
  const { title, content, emotion, location } = req.body;
  
  try {
    const diary = await diaryService.updateDiary({
      diaryId,
      userId: req.userId!,
      data: { title, content, emotion, location },  
    });

    res.status(200).json({
      success: true,
      message: "일기 수정 완료",
      data: diary,  
    });
  } catch (error) {
    if (error instanceof DiaryError) {
      res.status(404).json({
        success: false,
        message: error.message,
        errorCode: error.errorCode,
      });
      return;  
    }

    throw error;
  }
};

// deleteDiary = DELETE /diaries/:id
export const deleteDiary = async (req: Request, res: Response) => {
  const diaryId = Number(req.params.id);
  
  try {
    await diaryService.deleteDiary({
      diaryId,
      userId: req.userId!,  
    });

    res.status(200).json({
      success: true,
      message: "일기 삭제 완료",  
    });
  } catch (error) {
    if (error instanceof DiaryError) {
      res.status(404).json({
        success: false,
        message: error.message,
        errorCode: error.errorCode,
      });
      return;  
    }

    throw error;
  }
};
