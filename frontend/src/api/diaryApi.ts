import client from "./client";
import type { ApiMessageResponse, ApiResponse } from "../types/api";
import type { CreateDiaryPayload, Diary, DiaryListResult } from "../types/diary";

// 목록 조회는 이번 세션 범위 밖(UI-004/005는 다음 세션)이지만,
// 메인 화면(UI-003)에서 "최근 작성한 일기"를 보여줘야 하므로
// 목록 조회 하나는 지금 작성한다.
export const getDiaries = async () => {
  const response = await client.get<ApiResponse<DiaryListResult>>(
    "/diaries",
  );
  return response.data;  
};

// POST /diaries — 일기 작성
// 백엔드는 성공 시 data에 {id}만 돌려준다. 방금 만든 일기의 번호표.
// 이 번호가 있어야 작성 직후 "/diaries/12" 상세 화면으로 데려갈 수 있다.
//
// 비유: 음식을 주문하면 진동벨 번호를 주는 것. 음식 전체를 그 자리에서
//      전부 주는 것이 아니라, "몇 번으로 찾아가세요"만 알려준다.
export const createDiary = async (payload: CreateDiaryPayload) => {
  const response = await client.post<ApiResponse<{ id: number }>>(
    "/diaries",
    payload,
  );
  return response.data;
};

// GET /diaries/:id — 일기 상세 조회
// 백틱(`)을 써야 ${id}가 실제 숫자로 치환된다. 작은따옴표를 쓰면
// 주소가 그대로 "/diaries/${id}" 문자열이 되어 404 Error가 난다.
export const getDiaryDetail = async (id: number) => {
  const response = await client.get<ApiResponse<Diary>>(`/diaries/${id}`);
  return response.data;
};

// DELETE /diaries/:id — 일기 삭제 (백엔드는 Soft Delete로 처리)
// 응답에 data가 없으므로 위에서 만든 ApiMessageResponse를 쓴다.
export const deleteDiary = async (id: number) => {
  const response = await client.delete<ApiMessageResponse>(`/diaries/${id}`);
  return response.data;
};
