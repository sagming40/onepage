import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// defineconfig  = Vite한테 주는 "작업 지시서"
// plugins 배열   = 빌드 과정에 끼워넣을 부가 작업들
//   react()       → JSX 문법을 브라우저가 읽을 수 있는 JS로 번역
//   tailwindcss() → CSS 파일을 훑어서 실제로 쓰인 클래스만 골라 스타일 생성
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
