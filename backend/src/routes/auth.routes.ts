import { Router } from "express";
import * as authController from "../controllers/auth.controller";

// Router() = "회원 관련 요청만 따로 모아두는 작은 접수대"
// app.ts의 메인 접수대는 이 작은 접수대들을 그냥 특정 주소 아래에 연결만 해준다.
const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);  // ⭐ 추가

export default router;
