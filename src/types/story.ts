export interface StorySentence {
  id: string;
  speaker?: string;
  en: string;
  annotated: string; // Original text with bracketed Chinese
  zh: string;
}

export interface StoryScene {
  id: number;
  title: string;
  zhTitle: string;
  location: string;
  image: string;
  imageAlt: string;
  summary: string;
  sentences: StorySentence[];
  interactiveType?: 'staff_resizer' | 'ghost_action' | 'judge_directory' | 'cross_out';
}

export interface VocabWord {
  id: string;
  word: string;
  zh: string;
  phonetic: string;
  partOfSpeech: string;
  pastForm?: string;
  image: string;
  imageAlt?: string;
  storyQuote: string;
  exampleEn?: string;
  exampleZh?: string;
  memoryTip?: string;
  tags?: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  zhQuestion?: string;
  image?: string;
  imageAlt?: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
    zhText?: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  quote: string;
}

export interface ClozeItem {
  id: number;
  speaker: string;
  template: string; // e.g. 'The iron pillar began to {blank} until it was the perfect size.'
  targetWord: string;
  image: string;
  zhHint?: string;
  fullEn: string;
  fullZh?: string;
  videoStart?: number;
  videoEnd?: number;
  videoTimeLabel?: string;
}

export interface SentencePracticeItem {
  id: number;
  patternNumber: number;
  pattern: string;
  patternZh?: string;
  zh: string;
  en: string;
  scrambledWords: string[];
  keyVocab: string;
  tip?: string;
}

export interface MoralQuestion {
  id: number;
  title: string;
  storyContext: string;
  storyContextZh?: string;
  image?: string;
  imageAlt?: string;
  question: string;
  questionZh?: string;
  keyConcepts: { word: string; zh: string }[];
  sentenceStarters: string[];
  sampleResponses: {
    perspective: string;
    textEn: string;
    textZh?: string;
  }[];
}
