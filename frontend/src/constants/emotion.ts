import type { Emotion } from "../types/diary";

export interface EmotionOption {
  code: Emotion;   // DB에 실제 저장되는 값
  emoji: string;   // 실제 눈에 보이는 그림
  label: string;   // 실제 눈에 보이는 글자  
}

// 화면에 출력할 순서 그대로 array로 나열한다.
// array로 나열하게 되면 map 한 번만으로 버튼 7개가 자동 생성됨.
// (긍정 → 중립 → 부정 순서. 사용자 입장에서 감정을 고를 때 자연스레 왼쪽부터 시선이 흐르게 된다고 가정)
export const EMOTIONS: EmotionOption[] = [
  { code: "HAPPY",   emoji: "😊", label: "행복"},  
  { code: "CALM",    emoji: "😌", label: "평온"},  
  { code: "EXCITED", emoji: "🤩", label: "신남"},  
  { code: "TIRED",   emoji: "😪", label: "지침"},  
  { code: "SAD",     emoji: "😢", label: "슬픔"},  
  { code: "ANXIOUS", emoji: "😰", label: "불안"},  
  { code: "ANGRY",   emoji: "😡", label: "화남"},  
];

// "HAPPY"라는 코드만 들고 있을 때 emoji를 한 번에 꺼내는 index.
// array가 책을 처음부터 한 장씩 넘기며 찾는 거라면, EMOTION_MAP은 책 맨 뒷페이지의 '찾아보기' 페이지
// 해당 코드만 알면 바로 점프해서 꺼낼 수 있음.
//
// .map()은 그 찾아보기 페이지를 만들기 전에 배열 모양을 [code, option] 짝으로 바꿔주는 중간 변환 단계.
//
// Object.fromEntries = [키, 값] 짝들을 객체로 조립하는 함수
// as Record<...>는 TypeScript에게 "감정 7종이 모두 들어있다"는 것을 보증한다는 뜻.
// (fromEntries는 반환 타입을 느슨하게 추론하므로 확실하게 단언이 필요함)
export const EMOTION_MAP = Object.fromEntries(
  EMOTIONS.map((e) => [e.code, e]),  
) as Record<Emotion, EmotionOption>;
