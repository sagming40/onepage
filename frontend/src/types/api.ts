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

// success 필드 값(true/false)만 보고 TS가 자동으로
// "이건 ApiSuccess" / "이건 ApiFailure"를 구분해준다.
// 봉투에 찍힌 도장(success)만 보고 내용물 타입을 알아챈다.  
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

// 성공했다는 것만 알린 후, 싣고 나를 짐(data)은 없는 응답.
// 예: DELETE /diaries/:id — "삭제했다" 한마디면 끝이라 돌려줄 물건이 없다.
// 비유: 택배 기사에게 "수거 완료" 라는 문자만 보내는 상황
//      보낼땐 상자가 있었지만, 돌아올 땐 확인 문자만 온다.
export type ApiMessageResponse =
  | { success: true; message: string }
  | ApiFailure; 
