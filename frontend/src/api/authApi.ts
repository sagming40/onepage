import client from "./client";
import type { ApiResponse } from "../types/api";

// signup 요청에 실어 보낼 몸체
// 서버 auth.controller.ts가 req.body에서 그대로 email/password/nickname을
// 꺼내 쓰므로 필드 이름도 똑같이 맟춰야 한다.
interface SignupPayload {
  email: string;
  password: string;
  nickname: string;  
}

interface LoginPayload {
  email: string;
  password: string;  
}

// 로그인 성공 시 data 안에 들어있는 알맹이 모양
// auth.controller.ts의 `data: { accessToken }` 그대로
interface LoginResult {
  accessToken: string;  
}

// 회원가입 — 성공하면 서버가 data 없이 success/message만 준다.
// 따라서, T에 담을 내용이 마땅치 않은데 이럴 경우 관례로 null을 담는다.
// "상자는 왔는데 안이 비어있다"는 뜻
export const signup = async (payload: SignupPayload) => {
  const response = await client.post<ApiResponse<null>>(
    "/auth/signup",
    payload,
  );
  return response.data;  
};

// 로그인 — 성공하면 data.accessToken이 들어있다.
export const login = async (payload: LoginPayload) => {
  const response = await client.post<ApiResponse<LoginResult>>(
    "/auth/login",
    payload,
  );
  return response.data;  
};
