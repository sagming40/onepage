import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getDiaryDetail, deleteDiary } from "../api/diaryApi";
import { EMOTION_MAP } from "../constants/emotion";
import type { Diary } from "../types/diary";
import { getErrorMessage } from "../utils/apiError";

export default function DiaryDetailPage() {
  const navigate = useNavigate();

  // useParams()는 라우트 경로("/diaries/:id")에 정의된 이름 그대로
  // 객체 키로 꺼내온다. App.tsx에서 이미 ":id"로 표기했기 때문에 여기서도 "id"로 표기
  const { id } = useParams();
  
  const [diary, setDiary] = useState<Diary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // 주소창의 id는 "abc" 같은 것도 들어올 수 있는 문자열
    // Number("abc")눈 NaN이 되는데, NaN으로 API를 호출해도 
    // "diaries/NaN" 요청만 헛되이 서버로 날아간다.
    // 여기서 미리 걸러내면 그 비용(왕복) 자체를 아낄 수 있다.
    const diaryId = Number(id);

    if (!id || Number.isNaN(diaryId)) {
      setErrorMessage("잘못된 주소입니다.");
      setIsLoading(false);
      return;
    }

    const fetchDiary = async () => {
      try {
        const result = await getDiaryDetail(diaryId);

        if (result.success) {
          setDiary(result.data);
        } else {
          // 백엔드에서 404 Error(DIARY_NOT_FOUND)를 준 경우에도 여기로 들어온다.
          // (남의 일기이거나, 삭제된 일기이거나 — 사용자에게는 구분하여 보여주지 않는다.
          //  DEVLOG 결정 기록에 적혀있는 "존재 여부 비노출" 원칙과 같은 맥락)
          setErrorMessage(result.message); 
        }
      } catch (error) {
        setErrorMessage(getErrorMessage(error, "일기를 불러오지 못했습니다."));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiary();
  }, [id]); // id가 바뀌면(다른 일기로 이동하면) 다시 불러온다.

  const handleDelete = async () => {
    if (!diary) return;

    // window.confirm = 브라우저 기본 확인 창. "확인"을 누르면 true, "취소"면 false.
    // 되돌릴 수 없어 보이는 액션(사용자 체감상 영구 삭제) 앞에 한 번더 묻는 안전장치.
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const result = await deleteDiary(diary.id);

      if (result.success) {
        navigate("/");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "삭제에 실패했습니다."));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] p-6">
        <p className="text-sm text-line">불러오는 중...</p>
      </div>
    );
  }

  // diary가 null인 경우 = 에러가 있었거나(잘못된 id, 404 등) 로딩만 끝난 이상 상태.
  // 이 시점 이후로는 diary가 확실히 존재한다고 TypeScript에거 알려주는 효과도 있다.
  // (early return으로 null 가능성을 걷어냈으므로, 아래에서 diary.title 등에
  //  안전하게 접근 가능 — Optional chaining을 반복해서 쓸 필요가 없어진다.)
  if (errorMessage || !diary) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] p-6">
        <p className="text-sm text-danger">{errorMessage || "일기를 찾을 수 없습니다."}</p>
      </div>
    );
  }

  const emotionOption = EMOTION_MAP[diary.emotion];

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <div className="rounded-2xl bg-surface p-6 shadow-sm">
          <p className="text-sm text-ink/60">
            {new Date(diary.createdAt).toLocaleDateString("ko-KR")}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-3xl">{emotionOption.emoji}</span>
            {diary.title && (
              <h1 className="text-xl font-bold text-ink">{diary.title}</h1>
            )}
          </div>

          {/* whitespace-pre-wrap = 사용자가 입력한 줄바꿈(엔터)을 그대로 살려서 보여준다. 
              기본적으로 HTML은 연속된 공백/줄바꿈을 하나로 뭉뚱그려 버리는데,
              일기 본문에서 문단 구분이 사라지지 않도록 이 클래스가 필요하다. */}
          <p className="mt-4 whitespace-pre-wrap text-ink">{diary.content}</p>

          {diary.location && (
            <p className="mt-4 text-sm text-ink/60">📍 {diary.location}</p>
          )}

          {diary.aiSummary && (
            <div className="mt-6 rounded-xl bg-[#f1f3f5] p-4">
              <p className="mb-1 text-sm font-medium text-ink">AI 요약</p>
              <p className="text-sm text-ink">{diary.aiSummary}</p>
            </div> 
          )}    
        </div>

        <div className="flex gap-3">
          {/* 수정 버튼 이번 세션 범위 밖 — DEVLOG 결정 기록에 남기고 M2로 이연 */}
          <button
            type="button"
            onClick={handleDelete}
            className="w-full rounded-lg border border-danger py-2 font-medium text-danger
                       transition-colors hover:bg-danger/10"
          >
            삭제
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full rounded-lg border border-line py-2 font-medium text-ink
                       transition-colors hover:bg-[#f1f3f5]"
          >
            목록으로
          </button>                               
        </div>
      </div>
    </div>
  );
}
