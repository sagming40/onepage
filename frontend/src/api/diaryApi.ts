import client from "./client";
import type { ApiResponse } from "../types/api";
import type { DiaryListResult } from "../types/diary";

// 목록 조회는 이번 세션 범위 밖(UI-004/005는 다음 세션)이지만,
// 메인 화면(UI-003)에서 "최근 작성한 일기"를 보여줘야 하므로
// 목록 조회 하나는 지금 작성한다.
export const getDiaries = async () => {
  const response = await client.get<ApiResponse<DiaryListResult>>(
    "/diaries",
  );
  return response.data;  
};
