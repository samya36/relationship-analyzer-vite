export interface Message {
  id: string;
  speaker: 'A' | 'B';
  content: string;
  timestamp: Date;
  emotionScore?: EmotionAnalysis;
}

export interface ConversationData {
  id: string;
  participants: {
    personA: string;
    personB: string;
  };
  messages: Message[];
  timestamp: Date;
  analysisResult?: import('./analysis').AnalysisResult;
}

export interface EmotionAnalysis {
  primary: EmotionType;
  intensity: number; // 1-10
  secondary?: EmotionType;
  triggers?: string[];
}

export type EmotionType = 
  | '愤怒' 
  | '悲伤' 
  | '恐惧' 
  | '快乐' 
  | '厌恶' 
  | '惊讶' 
  | '委屈' 
  | '失望' 
  | '焦虑' 
  | '内疚' 
  | '羞愧' 
  | '嫉妒';

export interface EmotionProfile {
  dominantEmotion: EmotionType;
  emotionProgression: {
    timestamp: Date;
    emotion: EmotionType;
    intensity: number;
  }[];
  overallIntensity: number;
  emotionDistribution: Record<EmotionType, number>;
}