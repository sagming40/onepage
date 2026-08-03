import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

// Express의 Request 타입은 원래 req.user라는 필드를 모른다.
// 미들웨어에 직접 끼워넣을 예정이라, 타입 시스템에도 미리 알려야 함.
// 이렇게 기존 타입에 필드를 "확장"하는 문법을 선언 병합(declaration merging)이라 부른다.
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

// authMiddleware = 손목밴드 검사하는 문지기.
// 이 함수를 통과해야만 다음 목적지(컨트롤러)로 갈 수 있다.
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction  
) => {
  // 1) 헤더에서 "Authorization: Bearer {토큰}" 형태를 꺼낸다.
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "인증 토큰이 필요합니다.",
      errorCode: "TOKEN_REQUIRED",  
    });
    return;
  }

  // "Bearer eyJhbGci..." 에서 실제 토큰 부분만 잘라낸다.
  const token = authHeader.split(" ")[1];

  // "Bearer" 뒤에 실제 토큰이 없는 경우("Bearer"만 오거나 공백이 여러 개인 경우)를 방어.
  // noUncheckedIndexAccess 설정 때문에 token은 string | undefined 타입이라,
  // 여기서 undefined를 걸러내야 아래에서 string으로 확정된다.
  if (!token) {
    res.status(401).json({
      success: false,
      message: "인증 토큰 형식이 올바르지 않습니다.",
      errorCode: "INVALID_TOKEN_FORMAT",  
    });
    return;
  } 

  try {
    // 2) 손목밴드가 진짜인지 검증. 위조/만료됐으면 여기서 에러가 던져진다.
    const payload = verifyAccessToken(token);

    // 3) 검증된 userId를 req 객체에 실어서, 다음 목적지(컨트롤러)가 꺼내 쓸 수 있게 한다.
    req.userId = payload.userId;

    // next() = "이 손님은 확인됐으니 다음 문으로 보내라."
    // 이걸 호출하지 않으면 요청이 여기서 영원히 멈춰버린다.
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "유효하지 않거나 만료된 토큰입니다.",
      errorCode: "INVALID_TOKEN",  
    });
  }
};
