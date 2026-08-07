import * as diaryService from "./diary.service";
import * as tagRepository from "../repositories/tag.repository";

// DiaryError를 그대로 재사용 — auth.service.ts → diary.service.ts로 이어진
// "error class는 새로 만들지 않고 이어서 쓴다" 패턴을 여기서도 따른다.
import { DiaryError } from "./diary.service";

// 정책 상수는 함수 밖에 따로 빼둔다.
// "tag 5개로 늘려줘" 요청이 오면 숫자 하나만 수정하면 됨
const MAX_TAG_COUNT = 10;
const MAX_TAG_LENGTH = 20;

// ============================================================
// replaceDiaryTags
// tag 교체의 실제 입구. Controller는 이 함수만 호출한다.
// ============================================================
export const replaceDiaryTags = async (params: { diaryId: number; userId: number; tagNames: string[] }) => {
  const { diaryId, userId, tagNames } = params;
  
  // 1. 이 일기가 내 것인가?
  // 존재하지 않거나 다른 사람의 것이면 getDiaryDetail이 자동으로 DiaryError를 던진다.
  // 여기선 그 error를 잡지 않고 그대로 Controller로 흘려보낸다.
  // → "문지기가 이미 검사했다"는 것을 재사용하는 것.
  await diaryService.getDiaryDetail({ diaryId, userId });
  
  // 2. 갯수 제한
  // 화면이 아니라 서버에서도 반드시 막아야 하는 이유:
  // 화면의 제한은 우회 가능하다 (개발자 도구로 API를 직접 호출하면 됨)
  // "서버가 최종 방어선"이라는 원칙
  if (tagNames.length > MAX_TAG_COUNT) {
    throw new DiaryError(
      `태그는 최대 ${MAX_TAG_COUNT}개까지 가능합니다.`,
      "TOO_MANY_TAGS"  
    );
  }

  // 3. 앞뒤 공백 제거 + 빈 문자열 걸러내기
  // "  공부  "와 "공부"가 다른 tag로 취급되면 UX 관점에서 혼란스러울 수 있음.
  // trim()으로 양 끝 공백을 제거하고, 그 결과가 빈 문자열일 경우엔 버린다.
  //  (user가 SpaceBar만 누르고 Enter를 쳤을 경우를 방지)
  const cleaned = tagNames
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

  // 4. 길이 제한
  // Tag.name이 DB에서 VARCHAR(30)이므로, 그보다 타이트하게 20자로 막는다.
  // DB 제한에 딱 맟추면 여유가 없으므로, 여유값을 두는 것이 안전하다.
  const tooLong = cleaned.find((name) => name.length > MAX_TAG_LENGTH);
  if (tooLong) {
    throw new DiaryError(
      `태그는 ${MAX_TAG_LENGTH}자를 넘을 수 없습니다.`,
      "TAG_TOO_LONG"  
    );
  }
  
  // 5. 중복 제거
  // Set = "같은 값은 하나만 남기는 상자"
  // 사용자가 "공부", "공부" 처럼 중복 입력을 했을 경우 하나로 합친다.
  // Set은 array가 아니므로, [...] spread를 사용해 다시 array로 꺼낸다.
  const uniqueNames = [...new Set(cleaned)];

  // 6. Repository에 위임
  return tagRepository.replaceDiaryTags(diaryId, uniqueNames);
};
