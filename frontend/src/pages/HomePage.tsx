import { useEffect, useState } from "react";
import client from "../api/client";

export default function HomePage() {
  // useState = 컴포넌트가 들고 있는 메모지.
  // 이 값이 바뀌면 React가 알아서 화면을 다시 그린다.
  const [status, setStatus] = useState("확인 중...");
  
  // useEffect = "화면이 그려진 직후에 이것도 좀 해줘" 라는 요청.
  // 두 번째 인자 []는 "처음 한 번만" 이라는 뜻. 빼먹으면 무한 반복 된다.
  useEffect(() => {
    client
      .get("/health")
      .then((res) => setStatus(res.data.message))
      .catch(() => setStatus("❌ 백엔드 연결 실패"));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-primary">One Page</h1>
      <p className="mt-4 text-ink">{status}</p>  
    </div>
  );
}
