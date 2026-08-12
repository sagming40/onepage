import client from "./client";
import type { ApiResponse } from "../types/api";
import type { ReplaceTagsPayload } from "../types/diary";

// PUT /diaries/:id/tags — 태그 전체 교체
// Backend는 성공 시 data에 { tags: string[] }를 돌려준다.
// (연결 스티커 구조가 아니라, 이미 이름만 뽑아서 정리된 배열)
//
// 반환 type을 { tags: string[] }로 명시한 이유
// diaryApi.ts의 createDiary가 { id: number }를 명시한 것과 같은 이치
// "이 API를 호출하면 정확히 이 모양이 온다"를 type으로 못 박아두면
// 나중에 result.data.tags를 사용할 때 자동완성이 되고 오타도 compile단계에서 잡힌다.
export const replaceDiaryTags = async (
  diaryId: number,
  payload: ReplaceTagsPayload,  
) => {
  const response = await client.put<ApiResponse<{ tags: string[] }>>(
    `/diaries/${diaryId}/tags`,
    payload,
  );
  return response.data;   
};
