import "dotenv/config"; // .env 파일 내용을 process.env에 로드 (가장 먼저 실행되어야 함)
import app from "./app";

// .env에 PORT가 없을 경우를 대비한 기본값 3000
const PORT = process.env.PORT || 3000;

// listen() = 실제로 가게 문을 열고 "영업 시작" 후 손님을 받기 시작하는 것.
// app.ts에 적어둔 매뉴얼은 여기서 listen이 호출되기 전까진 그냥 종이 위의 글자일 뿐이다.
app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다 🚀`);  
});
