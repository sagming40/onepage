import jwt from "jsonwebtoken";

// .env에 있는 비밀 열쇠. 이게 없으면 토큰 자체를 만들 수 없다.
// 이 열쇠를 아는 사람만 "진짜 우리 서버가 발급한 손목밴드"인지 검증 할 수 있다.
const JWT_SECRET = process.env.JWT_SECRET as string;

// generateAccessToken = userId를 넣어서 손목밴드(토큰)를 하나 찍어내는 것.
// expiresIn: "1h" = 이 손목밴드는 1시간 뒤 자동으로 무효화된다.
// (탈취당해도 피해 시간을 제한하기 위한 안전장치)
export const generateAccessToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, {expiresIn: "1h"});
};

// verifyAccessToken = 손목밴드가 진짜인지, 유효기간이 지나지 않았는지 검사하는 것.
// 위조되었거나 만료가 되었다면 이 함수 자체가 에러를 던진다.
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { userId: number };  
}; 
