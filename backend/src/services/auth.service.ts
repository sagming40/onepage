import bcrypt from "bcrypt";
import * as userRepository from "../repositories/user.repository";
import { generateAccessToken } from "../utils/jwt";

// SALT_ROUNDS = 믹서기를 몇 번 돌릴지 정하는 강도.
// 숫자가 높을수록 안전하지만 시간이 더 걸린다. 10이 업계 표준 타협점.
const SALT_ROUNDS = 10;

// 커스텀 에러 클래스 — "왜 실패했는지" 이유를 코드로 구분해서 담아 나른다.
// 그냥 Error를 던지면 컨트롤러가 "이게 이메일 중복 때문인지 서버 오류인지" 구분하지 못함.
export class AuthError extends Error {
  constructor(
    message: string,
    public errorCode: string
  ) {
    super(message);
  }
}

export const signup = async (
  email: string,
  password: string,
  nickname: string  
) => {
  // 1) 이메일 중복 검사
  const existingEmail = await userRepository.findByEmail(email);
  if (existingEmail) {
    throw new AuthError("이미 가입된 이메일입니다.", "EMAIL_DUPLICATED");
  }
  
  // 2) 닉네임 중복 검사
  const existingNickname = await userRepository.findByNickname(nickname);
  if (existingNickname) {
    throw new AuthError("이미 사용 중인 닉네임 입니다.", "NICKNAME_DUPLICATED");
  }

  // 3) 비밀번호 해싱 — 원본 비밀번호는 여기서 끝. 이 뒤로는 해시값만 돌아다닌다.
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // 4) 실제 저장
  const user = await userRepository.createUser({
    email,
    password: hashedPassword,
    nickname,
  });

  return user;
};

export const login = async (email: string, password: string) => {
  // 1) 이메일로 사용자 찾기
  const user = await userRepository.findByEmail(email);
  if (!user) {
    // 보안 관례: "이메일이 없다"와 "비밀번호가 틀렸다"를 구분해서 알려주지 않는다.
    // 구분해서 알려주면 공격자가 "어떤 이메일이 가입되어 있는지"를 역으로 알아낼 수 있다.
    throw new AuthError("이메일 또는 비밀번호가 일치하지 않습니다.", "INVALID_CREDENTIALS");
  }

  // 2) 비밀번호 비교 — 입력값을 다시 갈아서, 저장된 스무디와 같은지 검증
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AuthError("이메일 또는 비밀번호가 일치하지 않습니다.", "INVALID_CREDENTIALS");
  }

  // 3) 손목밴드(토큰) 발급
  const accessToken = generateAccessToken(user.id);

  return { accessToken };
}
