import type { ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;  
}

// 건물 입구에 서 있는 경비원 ─ 출입증이 없으면 들어가지 못하게 막은 후 로그인 화면으로 돌려보냄
// AuthLayout ─ 겉모양 틀 / ProtectedRoute ─ 출입 여부를 판단하는 문지기 
// 성격이 완전 달라 layouts가 아닌 components에 둔다.
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("accessToken");
  
  if (!token) {
    // <Navigate>는 useNavigate()의 "렌더링 중 바로 사용 가능한" 버전
    // replace = 브라우저 뒤로가기를 눌러도 이 보호된 페이지로 다시 돌어오지 않게 한다.
    // → 기록 자체를 남기지 않고 덮어씀
    return <Navigate to="/login" replace />
  }

  // 출입증이 있으면 원래 보여줘야 할 화면(children)을 그대로 통과시킨다.
  return children;
}
