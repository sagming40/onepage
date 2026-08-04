import axios from "axios";

// axios.create() = "매번 똑같이 쓸 설정을 미리 박아둔 전용 우체부"
// 이게 없으면 API를 호출할 때마다 주소/헤더를 수기로 재작성 해야한다.
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // .env에서 읽어옴
  timeout: 10000, // 10초 넘게 답이 없으면 포기 (무한 대기 방지)
  headers: {
    "Content-Type": "application/json",
  },  
});

// ── 요청 인터셉터 ──
// 인터셉터 = 편지가 우체통에 들어가기 직전에 거치는 검문소
// Express의 미들웨어와 똑같은 개념. But 이쪽은 나가는 방향이다.

// 하는 일: 저장해둔 토큰이 있으면 Authorization 헤더에 자동으로 붙여준다.
// 앞으로 API 호출할 때마다 토큰 챙기는 걸 신경 쓰지 않아도 됨.
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // 검문 통과 → 실제 발송
});

// ── 응답 인터셉터 ──
// 이번엔 들어오는 방향의 검문소
// 401(인증 실패)이 오면 = 토큰이 만료됐거나 위조된 것 → 지우고 로그인으로 쫓아낸다.
client.interceptors.response.use(
  (response) => response, // 정상 응답은 그냥 통과
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";  
    }
    // 처리하지 못한 에러는 다시 던져서 호출한 쪽이 알게 한다.
    // 여기서 삼켜버리면 화면에 에러 메시지를 띄우지 못함.
    return Promise.reject(error);
  }  
);

export default client;
