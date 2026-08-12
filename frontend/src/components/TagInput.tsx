import { useState, type KeyboardEvent } from "react";

interface TagInputProps {
  // "지금 화면에 보여줄 tag 목록"을 부모가 들고 있고, 이 곳에선 전달만 받는다.
  tags: string[];
  // tag가 update/delete될 때 "나 대신 이렇게 바꿔줘"라며 부모에게 부탁하는 함수.
  // TagInput 스스로는 tags를 바꿀 권한이 없다 — 부모가 준 값을 그대로 보여줄 뿐.
  onChange: (tags: string[]) => void;  
}

// tag 개수 제한. Backend의 MAX_TAG_COUNT(10)와 반드시 같은 숫자로 맞춘다.
// 다르면 "화면에서는 5개까지만 되는데 서버는 10개까지 받아준다" 같은 불일치가 생긴다.
const MAX_TAG_COUNT = 10;

export default function TagInput({ tags, onChange }: TagInputProps) {
  // 이 components가 스스로 기억하는 유일한 값 — "지금 입력창에 타이핑 중인 글자"
  // 태그 목록(tags) 자체는 부모의 것이지만, "아직 확정되지 않은 임시 글자"는 이 곳에서만 사용된 후 버려지므로 
  // 굳이 부모에 알릴 필요가 없다.
  const [draft, setDraft] = useState("");
  
  // Enter를 눌렀을 때 draft를 확정 tag로 바꾸는 함수
  // 비유: 택배 주문서에 물건 이름을 적고 "추가" button을 누르는 것과 같다.
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 한글 입력 시 마지막 글자가 조합 중일 때 Enter가 두 번 감지되는 IME 이슈 방지
    // isComposing이 true면 "아직 글자를 조합하는 중"이므로 여기서 걸러야
    // "야근" 입력 후 Enter를 쳤을 때 "야그" + "야근"처럼 중간 글자가 잘못 들어가는 걸 막는다.
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;

    // Enter가 눌렸을 때 form 전체가 submit되는 걸 막는다.
    // (TagInput은 보통 <form> 안, 다른 입력창들과 함께 놓이기 때문)
    e.preventDefault();

    const trimmed = draft.trim();

    // 빈 문자열, 이미 존재하는 tag, 개수 초과 — 셋 다 조용히 무시한다.
    // Backend도 같은 규칙(trim, 중복 제거, 개수 제한)을 갖고 있지만
    // 여기서 미리 막아주면 사용자가 "왜 안 눌리지?" 라며 헷갈릴 일이 줄어든다.
    if (!trimmed || tags.includes(trimmed) || tags.length >= MAX_TAG_COUNT) {
      setDraft("");
      return;  
    }

    // array는 직접 수정(push)하지 않고, "기존 것" + "새 것"으로 array를 만들어 넘긴다.
    // React는 "값이 통째로 바뀌었는지"를 참조(주소) 비교로 판단하는데,
    // tags.push(trimmed)처럼 원본을 직접 건드리면 array 주소가 그대로라
    // React가 "바뀜을 감지하지 못하고" 화면 갱신을 건너뛸 수 있다.
    onChange([...tags, trimmed]);
    setDraft("");
  };

  // tag 하나를 목록에서 빼는 함수. 알약(pill) 옆의 x 버튼이 이걸 호출한다.
  const handleRemove = (target: string) => {
    // filter = "이 조건을 통과하는 것만 남기고 나머지는 버린다"
    // target과 다른 것들만 남기면, 결과적으로 target 하나만 사라진 새 array가 된다.
    onChange(tags.filter((tag) => tag !== target));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-line
                    bg-surface p-2">
      {/* 알약 모양을 tag 하나하나를 보여준다. key는 tag 이름 자체를 사용한다 — 
          Service에서 이미 중복 제거를 하기 때문에 이름이 곧 고유값이 된다. */}
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 rounded-full bg-[#f1f3f5] px-3 py-1
                     text-sm text-ink"
        >
          #{tag}
          <button
            type="button"
            onClick={() => handleRemove(tag)}
            className="text-ink/40 hover:text-danger"
            aria-label={`${tag} 태그 삭제`}
          >
            ×
          </button>     
        </span>                 
      ))}

      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          tags.length >= MAX_TAG_COUNT ? "최대 개수에 도달했습니다" : "태그 입력 후 Enter"  
        }
        disabled={tags.length >= MAX_TAG_COUNT}
        className="flex-1 min-w-[120px] border-none bg-transparent text-sm text-ink
                   outline-none placeholder:text-ink/40 disabled:cursor-not-allowed"
      />                                   
    </div>
  );
}
