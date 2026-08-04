// 03_api-spec.md GET /users/me 응답 기준
export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImage: string | null;  
}
