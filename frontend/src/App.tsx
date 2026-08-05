import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Routes/Route = 건물 안내판.
// 백엔드의 app.use("/api/diaries", diaryRoutes)와 완전히 같은 발상이다.
// "이 주소로 오면 이 화면을 보여줘"
export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* * = 위 어디에도 걸리지 않은 나머지 전부. 
          백엔드 app.ts의 404 핸들러와 같은 자리. 반드시 맨 아래. */}
      <Route path="*" element={<div className="p-8">페이지를 찾을 수 없습니다.</div>} />    
    </Routes>
  );
}
