import { Router } from "express";
import * as diaryController from "../controllers/diary.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// 이 라우터 아래로 들어오는 모든 요청은 인증이 필요하다.
// 하나씩 authMiddleware를 적는 대신, router.use()로 한 번에 걸어둔다.
router.use(authMiddleware);

router.post("/", diaryController.createDiary);
router.get("/", diaryController.getDiaryList);
router.get("/:id", diaryController.getDiaryDetail);
router.put("/:id", diaryController.updateDiary);
router.delete("/:id", diaryController.deleteDiary);

export default router;
