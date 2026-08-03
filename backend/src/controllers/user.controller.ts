import { Request, Response } from "express";
import * as userRepository from "../repositories/user.repository";

export const getMe = async (req: Request, res: Response) => {
  // authMiddleware를 통과했다면 req.userId가 이미 채워져 있는 상태.
  const user = await userRepository.findById(req.userId!);
  
  if (!user) {
    res.status(404).json({
      success: false,
      message: "사용자를 찾을 수 없습니다.",
      errorCode: "USER_NOT_FOUND",  
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "조회 성공",
    data: {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      profileImage: user.profileImage,  
    },
  });
};
