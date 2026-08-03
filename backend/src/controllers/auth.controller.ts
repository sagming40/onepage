import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { AuthError } from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;
  
  // 최소한의 입력값 검증 — 나중에 validators/ 폴더로 분리 예정.
  // 지금은 "필수값이 아예 없는 경우"만 우선 방어한다.
  if (!email || !password || !nickname) {
    res.status(400).json({
      success: false,
      message: "이메일, 비밀번호, 닉네임은 필수입니다.",
      errorCode: "MISSING_FIELDS",  
    });
    return;
  }

  try {
    await authService.signup(email, password, nickname);

    res.status(201).json({
      success: true,
      message: "회원가입 완료",  
    });
  } catch (error) {
    // Service에서 던진 "예상된 실패"(AuthError)와
    // 진짜 서버 오류(예: DB 연결 끊김)를 구분해서 응답한다.
    if (error instanceof AuthError) {
      res.status(400).json({
        success: false,
        message: error.message,
        errorCode: error.errorCode,
      });
      return;  
    }

    // 여기로 떨어지면 예상치 못한 에러이므로, app.ts의 에러 핸들러로 넘긴다.
    throw error;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "이메일과 비밀번호는 필수입니다.",
      errorCode: "MISSING_FIELDS",
    });
    return;
  }

  try {
    const { accessToken } = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: "로그인 완료",
      data: { accessToken },
    });
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(401).json({
        success: false,
        message: error.message,
        errorCode: error.errorCode,
      });
      return;
    }

    throw error;
  }
};
