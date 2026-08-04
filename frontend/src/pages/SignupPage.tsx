import { useState } from "react";
import { useNavigate, Link } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { signup } from "../api/authApi";
import { getErrorMessage } from "../utils/apiError";

export default function SignupPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 서버로 보내지 않는 값. "방금 친 비밀번호를 한 번 더 확인시키는" 용도라
  // 오직 이 화면 안에서, 위 password와 같은지 대조하는 데에만 쓰인다.
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");


    // 서버에 물어보기 전에, 프론트에서 먼저 걸러낼 수 있는 건 걸러낸다.
    // 굳이 서버까지 왕복(네트워크 요청)할 필요 없는 실수라서 여기서 바로 걸러냄
    if (password !== passwordConfirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return; // 여기서 끝 — 아래 setIsLoading(true)까지 내려가지 않는다.
    }

    setIsLoading(true);

    try {
      const result = await signup({ email, password, nickname });

      if (result.success) {
        // F-001 결과 명세: "회원가입 완료 후 로그인 화면으로 이동"
        // signup 응답엔 토큰이 없으므로(data: null) 자동 로그인은 불가능 —
        // 사용자가 방금 만든 계정으로 직접 로그인하게 유도한다.
        navigate("/login");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "회원가입 중 오류가 발생했습니다."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="nickname"
          label="닉네임"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />

        <Input
          id="email"
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Input
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />

        {errorMessage && (
          <p className="text-sm text-danger">{errorMessage}</p>
        )}

        <Button type="submit" isLoading={isLoading}>
          회원가입
        </Button>

        <div className="flex justify-center text-sm text-ink">
          이미 계정이 있나요?{" "}
          <Link to="/login" className="ml-1 text-primary hover:underline">
            로그인
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
