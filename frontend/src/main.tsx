import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

// QueryClient = 서버에서 받아온 데이터를 보관하는 창고 관리인.
// 같은 데이터를 두 번 요청하면 창고에서 꺼내주고, 오래되면 다시 받아온다.
const queryClient = new QueryClient();

// Provider = 전기 배선
// 이 안에 들어있는 모든 컴포넌트가 별도 연결 없이 전기를 쓸 수 있게 된다.
// BrowserRouter가 바깥, QueryClientProvider가 안쪽 — 순서는 크게 상관없음
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
