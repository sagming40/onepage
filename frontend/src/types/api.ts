// 03_api-spec.md 2절 "공통 응답 형식"을 타입으로 옮긴 것
// 백엔드가 약속한 봉투 모양을 프론트도 똑같이 알고 있어야
// res.data.data를 칠 때 자동완성이 뜬다.

// <T> = 제네릭. "안에 뭐가 들었는지는 나중에 채워넣는 빈칸"
// 택배 상자 규격은 같은데 내용물이 책일 수도 옷일 수도 있는 것과 같다
export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;  
}

export interface ApiFailure {
  success: false;
  message: string;
  errorCode: string;  
}
