import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // 로딩 중엔 버튼을 눌러도 반응이 있으면 안된다. (중복 제출 방지)
  // "로그인" 버튼 클릭이 두 번 연속 입력되어 회원가입이 중복 되는 사고를 미연에 방지
  isLoading?: boolean;  
}

export default function Button({
  children,
  isLoading,
  disabled,
  ...rest  
}: ButtonProps) {
  return (
    <button
      // "누가 일부러 껐거나(disabled)" OR "지금 로딩 중이거나"
      // 둘 중 하나만 True여도 버튼이 눌리지 않게 잠금.
      disabled={disabled || isLoading}
      {...rest}
      className="w-full rounded-lg bg-primary py-2 font-medium text-white
                 transition-opacity hover:opacity-90
                 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {/* children = <Button>로그인</Button>처럼 태크 사이에 쓴 글자.
          로딩 중엔 그 글자를 잠깐 "처리 중..."으로 바꿔치기. */}
      {isLoading ? "처리 중..." : children}      
    </button>             
  );  
}
