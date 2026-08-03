import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// authMiddleware를 라우트 함수보다 먼저 적어두면,
// "문지기를 통과해야만 실제 처리 함수로 간다"는 순서가 만들어진다.
router.get("/me", authMiddleware, userController.getMe);

export default router;
