import type { InputHTMLAttributes } from "react";

// InputHTMLAttributes<HTMLInputElement> = "<input>이 원래 가질 수 있는
// 모든 속성(value, onChange, placeholder...)을 그대로 모두 물려받는다"는 뜻.
// 새로 추가할 속성은 label, error = 2개
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;   // 입력창 위에 뜨는 이름표
  error?: string;  // 오류가 있다면 빨간 글씨로 아래에 표시, 없다면 자리를 차지 하지 않음  
}

// 로그인/회원가입 화면에서 "이메일 입력창", "비밀번호 입력창"이
// 계속 반복되니까, 그 반복을 하나의 틀로 미리 찍어둔 것.
// 붕어빵 틀만 하나 있으면, 앙금만 바꿔서 여러 개를 찍어낼수 있는 것과 같다.
export default function Input({ label, error, id, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {/* htmlFor와 input의 id를 짝지어야, 라벨을 눌러도 입력창에 커서가 이동한다.
          04_ui-ux-design.md 10절 "명확한 버튼 라벨"과 같은 맥락의 접근성 배려. */}
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>

      {/* {...rest} = value, onChange, types, placeholder 등 
          위에서 받지 않은 나머지 모든 props를 전부 그대로 <input>에 전달
          택배 상자를 열어보지 않고 그대로 다음 사람에게 넘기는 것과 같다. */}
      <input
        id={id}
        {...rest}
        className="rounded-lg border border-line bg-surface px-3 py-2
                   text-ink placeholder:text-line
                   focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* error && (...) = "error가 있으면(truthy) 오른쪽을 보여주고,
          없으면(undefined) 아예 아무것도 렌더링하지 않는다"는 JS 관용구. */}
      {error && <p className="text-sm text-danger">{error}</p>}                                       
    </div>
  )  
}
