import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { createDiary } from "../api/diaryApi";
import { EMOTIONS, EMOTION_MAP } from "../constants/emotion";
import type { Emotion } from "../types/diary";
import { getErrorMessage } from "../utils/apiError";
import Input from "../components/Input";
import Button from "../components/Button";

// 쿼리스트링에서 꺼낸 값은 "문자열"일 뿐 Emotion 타입이라는 보장이 없다.
// value is Emotion = "이 함수가 true를 반환하면, 그 값은 실제로 Emotion이다" 라고
// TypeScript에게 알려주는 타입 가드(type guard) 문법.
//
// 비유: "book" 택배 상자 안에 열어보기 전까지는 책이 들어있다는 보장이 없다.
// 직접 열어서 확인(EMOTION_MAP에 그 코드가 실제로 있는지)해야 안심할 수 있다.
const isValidEmotion = (value: string | null): value is Emotion =>
  value !== null && value in EMOTION_MAP;

export default function DiaryWritePage() {
  const navigate = useNavigate();
  
  // useSearchParams = 주소창의 "?emotion=HAPPY" 부분을 읽는 훅
  // 백엔드에서 req.query를 읽던 것과 똑같은 발상의 프론트 버전
  const [searchParams] = useSearchParams();
  const emotionParam = searchParams.get("emotion");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");

  // useState(() => ...) 처럼 화살표 함수를 넘기면 "지연 초기화 (lazy initializer)"
  // 컴포넌트가 처음 태어날 때마다 딱 한 번만 이 함수를 실행하여 초깃값을 정한다.
  // 매 렌더링마다 다시 검사할 필요가 없는 값이라 이렇게 사용한다.
  const [emotion, setEmotion] = useState<Emotion | null>(() =>
    isValidEmotion(emotionParam) ? emotionParam : null,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // 서버에 요청을 보내기 전에 프론트에서 먼저 걸러낸다.
    // 백엔드 diary.controller.ts의 "!content || !emotion" 방어와 같은 이유 —
    // 서버에서도 검증을 하지만, 왕복(round trip) 한 번의 비용을 아낄 수 있다.
    if (!content.trim()) {
      setErrorMessage("내용을 입력해주세요.");
      return;  
    }
    if (!emotion) {
      setErrorMessage("오늘의 감정을 선택해주세요.");
      return;  
    }

    setIsLoading(true);

    try {
      const result = await createDiary({
        // trim() 결과가 빈 문자열일 경우 "쓰다가 지운 것"과 "아예 쓰지 않은 것"을 구분하지 않고
        // null로 통일 — 서버 저장 방식과 맟추기 위함.
        title: title.trim() === "" ? null : title.trim(),
        content: content.trim(),
        emotion,
        location: location.trim() === "" ? null : location.trim(),
      });
      
      if (result.success) {
        // 방금 만든 일기의 번호(id)로 곧장 상세 화면으로 이동
        // "저장 완료" 토스트는 04_ui-ux-design.md 9절에 있는 내용이지만
        // M1 범위에선 일단 페이지 이동으로 결과를 확인하는 것으로 구현
        navigate(`/diaries/${result.data.id}`); 
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "일기 저장에 실패했습니다."));  
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <h1 className="text-xl font-bold text-ink">오늘의 페이지</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl bg-surface p-6 shadow-sm"
        >
          <Input
            id="title"
            label="오늘의 제목 (선택)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />   

          {/* textarea는 Input 컴포넌트로 감싸지 않는다. 
              Input은 <input> 전용 틀이라 <textarea>에는 맞지 않는다.
              추후 재사용 빈도가 늘면 그때 Textarea 컴포넌트로 분리해도 된다. */}
          <div className="flex flex-col gap-1">
            <label htmlFor="content" className="text-sm font-medium text-ink">
              오늘 하루는 어땠나요?  
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="rounded-lg border border-line bg-surface px-3
                         text-ink placeholder:text-line
                         focus:outline-none focus:ring-2 focus:ring-primary"
            />             
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-ink">감정</p>
            <div className="flex flex-wrap gap-3">
              {EMOTIONS.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => setEmotion(option.code)}
                  className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-colors ${
                    emotion === option.code
                      ? "bg-primary/10 ring-2 ring-primary"
                      : "hover:bg-[#f1f3f5]"
                  }`}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-xs text-ink">{option.label}</span>
                </button>  
              ))}  
            </div>
          </div>

          <Input
            id="location"
            label="위치 (선택)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {errorMessage && (
            <p className="text-sm text-danger">{errorMessage}</p>
          )}

          <div className="flex gap-3">
            <Button type="submit" isLoading={isLoading}>
              저장  
            </Button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full rounded-lg border border-line py-2 font-medium text-ink
                         transition-colors hover:bg-[#f1f3f5]"
            >
              취소
            </button>             
          </div>           
        </form>  
      </div>  
    </div>
  );
}
