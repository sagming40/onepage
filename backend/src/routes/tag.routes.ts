import { Router } from "express";
import * as tagController from "../controllers/tag.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

// PUT = "이 자원을 통째로 이것으로 교체하라"는 뜻의 HTTP method.
// POST(새로 만들기)나 PATCH(부분 수정)가 아닌 PUT을 쓰는 이유는
// "전체 교체"라는 이번 설계와 의미상 정확히 맞아떨어지기 때문.
router.put("/:id/tags", tagController.replaceDiaryTags);

export default router;
