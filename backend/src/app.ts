import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import diaryRoutes from "./routes/diary.routes";
import tagRoutes from "./routes/tag.routes";

// express() = 매뉴얼을 적을 빈 노트르 하나 꺼내는 것.
// 이 노트에 "이런 요청이 오면 이렇게 처리해" 규칙을 하나씩 적어나간다.
const app = express();

// ── 미들웨어 ──
// 미들웨어 = 손님이 주방(라우터)에 도착하기 전 거치는 검문소.
// 위에서부터 순서대로 실행되고, 다음 검문소로 넘길지 여기서 멈출지 정한다.

// cors() = "다른 주소(포트)에서 오는 요청도 받아줄게" 허가증.
// React(5173번 포트)와 Express(3000번 포트)는 브라우저 입장에서 '다른 가게'라
// 이게 없으면 브라우저가 보안상 요청을 차단해버린다.
app.use(cors());

// express.json() = 손님이 보낸 편지(JSON body)를 사람이 읽을 수 있게 봉투를 뜯는 작업.
// 이게 없으면 req.body가 항상 undefined로 나온다.
app.use(express.json());

// ── 헬스체크 라우트 ──
// "서버가 살아있는지"만 확인하는 가장 단순한 문. 나중에 배포 후 모니터링에도 씀.
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "서버가 정상적으로 동작 중입니다.",
    data: null,
  });
});

// ── 회원 라우터 연결 ──
// API 명세서 기준 Base URL이 /api이므로, 그 아래에 /auth 접두사로 연결한다.
// 결과적으로 실제 주소는 /api/auth/signup 이 된다.
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/diaries", diaryRoutes);
app.use("/api/diaries", tagRoutes);

// ── 404 처리 ──
// 위의 모든 규칙에 걸리지 않고 여기까지 도달했다는 건, 존재하지 않는 주소로 도착한 것.
// 반드시 라우터들보다 아래에 위치해야 한다 (매뉴얼은 위에서부터 순서대로 읽힌다).
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "요청하신 경로를 찾을 수 없습니다.",
    errorCode: "NOT_FOUND",
  });  
});

// ── 에러 처리 미들웨어 ──
// 매개변수가 4개(err, req, res, next)인 것이 특징. Express가 이 개수로
// "이건 에러 전용 처리기구나"를 구분한다. 하나라도 빠지면 동작 안 함.
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction
  ) => {
    console.error(err.stack); // 개발 중엔 원인 파악용으로 콘솔에 전체 출력
    res.status(500).json({
      success: false,
      message: "서버 내부 오류가 발생했습니다.",
      errorCode: "INTERNAL_SERVER_ERROR",  
    });
  }  
);

// 다른 파일(server.ts)에서 이 매뉴얼을 가져다 쓸 수 있도록 내보낸다.
export default app;
