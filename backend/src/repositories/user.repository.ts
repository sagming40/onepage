import prisma from "../config/prisma";

// findByEmail = "이 이메일을 쓰는 사람이 이미 있나?" 하고 창고 대장을 뒤져보는 것.
// 회원가입 시 이메일 중복 체크에 쓰인다.
export const findByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

// findByNickname = 닉네임 중복 체크용, 위와 같은 원리.
export const findByNickname = async (nickname: string) => {
  return prisma.user.findUnique({
    where: { nickname },
  });  
};

// createUser = 새 회원 정보를 창고에 새로 등록하는 것.
// password는 이미 bcrypt로 갈아진(해싱된) 상태로 들어온다고 가정한다.
// (원본 비밀번호를 여기까지 들고 오면 안 됨 — Service 단계에서 미리 해싱해야 함)
export const createUser = async (data: {
  email: string;
  password: string;
  nickname: string;  
}) => {
  return prisma.user.create({
    data,
  });
}

// findById = userId로 사용자 한 명을 찾는 것. JWT 안엔 userId만 들어있어서,
// 실제 사용자 정보(닉네임 등)를 보여주려면 이 함수로 다시 조회해야 한다.
export const findById = async (id: number) => {
  return prisma.user.findUnique({
    where: {id},
  });
};
