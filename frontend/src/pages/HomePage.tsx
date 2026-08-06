import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDiaries } from "../api/diaryApi";
import { EMOTIONS } from "../constants/emotion";
import type { DiaryListItem } from "../types/diary";
import { getErrorMessage } from "../utils/apiError";

export default function HomePage() {
  const navigate = useNavigate();

  // "지금까지 쓴 일기 중 최근 것"들을 담아둘 서랍
  // 처음엔 어떤게 들었는지 모르니 빈 배열로 시작
  const [diaries, setDiaries] = useState<DiaryListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(효과) = "화면이 처음 나타난 직후, 딱 한 번 실행해라"라는 예약
  // 두 번째 인자로 빈 배열([])을 주면 "의존하는 값이 없다" = 최초 1회만 실행
  // 서랍(diaries)을 채우는 일은 "그리는 것"과 무관한 부수적인 효과이기 때문에,
  // return문이 아닌 이 안에서 처리한다.
  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const result = await getDiaries();

        if (result.success) {
          // 판별 유니온 덕에 success가 true인 이 블록 안에서만
          // result.data(=DiaryListResult)에 안전하게 접근할 수 있다.
          setDiaries(result.data.items);
        } else {
          setErrorMessage(result.message);
        }
      } catch (error) {
        setErrorMessage(getErrorMessage(error, "일기 목록을 불러오지 못했습니다."));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiaries();
  }, []);

  const handleLogout = () => {
    // 서랍에서 출입증을 꺼내버리면, 다음 요청부턴 인증이 없는 사람으로 취급함
    // 백엔드에 별도 로그아웃 API가 없으므로(M1 스코프 밖) 클라이언트에서
    // 토큰을 지우는 것만으로 충분하다.
    localStorage.removeItem("accessToken");
    navigate("/login")
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        {/* 상단 바 */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-ink">One Page</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-ink hover:text-danger"
          >
            로그아웃
          </button>  
        </div>

        {/* 감정 선택 영역 */}
        <div className="rounded-2xl bg-surface p-6 shadow-sm">
          <p className="mb-4 text-sm font-medium text-ink">
            오늘 하루는 어떤 감정이었나요?
          </p>

          {/* EMOTIONS 배열을 한 번 순회하면서 버튼 7개를 자동으로 찍어낸다.
              key는 React가 "이 중 누가 누군지" 구분하는 이름표 —
              화면엔 보이지 않지만 반드시 있어야 함 */}
          <div className="flex flex-wrap gap-3">
            {EMOTIONS.map((emotion) => (
              <button
                key={emotion.code}
                onClick={() => navigate(`/diaries/new?emotion=${emotion.code}`)}
                className="flex flex-col items-center gap-1 rounded-xl px-3 py-2 
                           transition-colors hover:bg-[#f1f3f5]"
              >
                <span className="text-2xl">{emotion.emoji}</span>
                <span className="text-xs text-ink">{emotion.label}</span>
              </button>  
            ))}
          </div>       
        </div>

        {/* 최근 작성한 일기 목록 */}
        <div className="rounded-2xl bg-surface p-6 shadow-sm">
          <p className="mb-4 text-sm font-medium text-ink">최근 작성한 일기</p>

          {isLoading && (
            <p className="text-sm text-line">불러오는 중...</p>
          )}

          {errorMessage && (
            <p className="text-sm text-danger">{errorMessage}</p>
          )}

          {/* 로딩도 끝났고 에러도 없는데 배열 길이가 0이면 "실제로 존재하지 않는 것" */}
          {!isLoading && !errorMessage && diaries.length === 0 && (
            <p className="text-sm text-line">
              아직 작성한 일기가 없어요.
            </p>
          )}

          <ul className="flex flex-col gap-2">
            {diaries.map((diary) => (
              <li
                key={diary.id}
                onClick={() => navigate(`/diaries/${diary.id}`)}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-line p-3
                           transition-colors hover:bg-[#f1f3f5]"
              >
                <span className="text-xl">
                  {EMOTIONS.find((e) => e.code === diary.emotion)?.emoji}
                </span>
                <span className="flex-1 text-sm text-ink">
                  {/* title이 null일 수 있으므로(무제목 일기), 대체 문구를 준비 */}
                  {diary.title ?? "제목 없음"}
                </span>
                <span className="text-xs text-ink/60">
                  {/* ISO 문자열을 그대로 보여주면 "2026-08-05T09:12:33.000Z"처럼
                      길고 이상하게 나온다. Date로 한 번 변환하여 날짜만 뽑아낸다. */}
                  {new Date(diary.createdAt).toLocaleDateString("ko-KR")}    
                </span>
              </li>  
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
