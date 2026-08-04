import { useState } from "react";
import { useNavigate, Link } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../api/authApi";
import { getErrorMessage } from "../utils/apiError";

export default function LoginPage() {
  // 입력창 값 두 개를 각각의 상태로 따로 관리
  // 서랍 두 칸에 이메일/비밀번호를 각각 넣어두는 것과 같다.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // "지금 서버에 요청을 보내는 중인지"를 나타내는 스위치.
  // true인 동안에는 Button이 알아서 "처리 중..."으로 바뀌고 잠긴다.
  const [isLoading, setIsLoading] = useState(false);

  // 로그인 실패 시 화면에 보여줄 메시지. 성공이면 빈 문자열
  const [errorMessage, setErrorMessage] = useState("");

  // navigate("/")처럼 호출하면 페이지를 코드로 이동시켜주는 함수
  // <a href="/"> 와 다르게, 새로고침 없이 SPA 방식으로 화면만 바뀐다.
  const navigate = useNavigate();

  // <form onSubmit={handleSubmit}>에 연결할 함수
  // e: React.FormEvent = "폼이 제출되었다"는 이벤트 객체
  const handleSubmit = async (e: React.FormEvent) => {
    // 브라우저의 기본 동작(페이지 전체를 새로고침하며 제출)을 막는다.
    // 이 과정이 없다면 로직이 실행되기도 전에 페이지가 날아간다.
    e.preventDefault();

    setErrorMessage(""); // 재시도를 할때 이전 메시지 부터 지운다.
    setIsLoading(true);

    try {
      const result = await login({ email, password });
      
      // ApiResponse는 판별 유니온이라, success를 확인해야
      // TypeScript가 그 아래에서 result.data(성공 시 모양)를 알아본다.
      if (result.success) {
        // 우체부(client.ts)가 앞으로 모든 요청에 이 토큰을 자동으로
        // 붙여줄 수 있도록, 서랍(localStorage)에 넣어둔다.
        localStorage.setItem("accessToken", result.data.accessToken);
        navigate("/"); // 메인 화면으로 이동.
      } else {
        // success: false인 경우 → result는 ApiFailure로 좁혀져서
        // result.errorCode 대신 result.message를 그대로 보여준다.
        setErrorMessage(result.message);
      }
    } catch (error) {
      // 네트워크 자체가 끊겼거나 서버가 아예 뜨지 않은 경우 등, — X
      // 위 result.success 분기로도 잡지 못하는 "진짜 예외" 상황. — X
      // 🛠️ 수정 — 서버가 준 실제 실패 메시지(예: "이메일 또는 비밀번호가 일치하지 않습니다")를
      // 우선 사용하고, 그마저도 못 꺼내면(네트워크 끊김 등) fallback 문구를 쓴다.
      setErrorMessage(getErrorMessage(error, "로그인 중 오류가 발생했습니다."));  
    } finally {
      // 성공하든 실패하든 로딩 스위치는 반드시 꺼줘야 한다.
      // finally = try/catch 어느 쪽으로 빠지든 무조건 실행되는 구간.
      setIsLoading(false);  
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* 에러 메시지는 있을 때만 자리를 차지한다. */}
        {errorMessage && (
          <p className="text-sm text-danger">{errorMessage}</p>  
        )}

        <Button type="submit" isLoading={isLoading}>
          로그인
        </Button>

        <div className="flex justify-center gap-4 text-sm text-ink">
          <Link to="/signup" className="hover:text-primary">
            회원가입
          </Link>
          {/* 비밀번호 찾기는 F-004 프로필 관리 범위 밖(미구현) —
              목업엔 있지만 지금은 링크만 자리 잡아두고 기능은 비워둔다. */}
          <span className="text-line">비밀번호 찾기</span>    
        </div>   
      </form>  
    </AuthLayout>
  );
}
