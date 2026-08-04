import type { ReactNode } from "react";

interface AuthLayoutProps {
  // children = 이 껍데기 "안쪽"에 끼워 넣을 내용물.
  // 로그인 폼이 들어올 수도, 회원가입 폼이 들어올 수도 있음
  // — 겉포장(카드/로고)은 같고 속내용만 바뀌는 구조
  children: ReactNode;  
}

// UI-001(로그인)/UI-002(회원가입) 
// — 두 화면 MockUp이 "가운데 정렬된 카드 + 로고 + 폼" 구조로 똑같다.
// 틀만 한 번 만들어두고, 로그인/회원가입 페이지는 틀 안에 폼만 교체하는 방식으로 구현한다.
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    // min-h-screen + flex + items-center/justify-center
    // 화면 전체 높이를 차지하면서, 안의 내용을 세로/가로 정중앙에 둔다.
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa] px-4">
      <div className="w-full max-w-sm rounded-2xl bg-surface p-8 shadow-sm">
        {/* 로고 자리. 목업(UI-001) 맨 위에 있는 "One Page" 그 자리. */}
        <h1 className="mb-8 text-center text-2xl font-bold text-ink">
          One Page  
        </h1>

        {/* 이 부분이 실제 "속내용" — LoginPage, SignupPage, ... 등등 이 부분에 끼워진다. */}
        {children}
      </div>  
    </div>
  );  
}
