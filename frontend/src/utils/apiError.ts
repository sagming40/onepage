import axios from "axios";
import type { ApiFailure } from "../types/api";

// 서버가 400/401 같은 에러 상태코드로 응답하면, axios는 그걸
// "성공"이 아니라 자동으로 예외(catch)로 던져버린다.
// 그 바람에 서버가 애써 만들어준 진짜 실패 메시지(message)가
// catch 블록 안에서 사라지고, 우리가 박아둔 뭉뚱그린 문구만 보이는 문제가 있었다.
//
// 이 함수는 "반송된 편지 봉투"를 다시 열어서, 안에 든
// 진짜 메시지를 꺼내오는 역할. 봉투 자체가 이상하면(네트워크 끊김 등)
// fallback(두 번째 인자)을 대신 돌려준다.
export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError<ApiFailure>(error) && error.response?.data?.message) {
    return error.response.data.message;
  }
  return fallback;  
};
