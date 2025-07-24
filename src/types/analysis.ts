import type { EmotionProfile } from './conversation';

export interface AnalysisResult {
  id: string;
  conversationId: string;
  timestamp: Date;
  overallScore: {
    healthiness: number; // 1-10
    constructiveness: number; // 1-10
    respectfulness: number; // 1-10
  };
  emotionAnalysis: {
    personA: EmotionProfile;
    personB: EmotionProfile;
  };
  communicationPatterns: CommunicationPattern[];
  keyIssues: Issue[];
  recommendations: Recommendation[];
  summary: string;
}

export interface CommunicationPattern {
  type: CommunicationStyle;
  frequency: number;
  examples: string[];
  impact: 'positive' | 'negative' | 'neutral';
}

export type CommunicationStyle = 
  | '攻击型'
  | '回避型'
  | '被动攻击型'
  | '建设性'
  | '防御型'
  | '批判型'
  | '支持型'
  | '妥协型';

export interface Issue {
  id: string;
  type: IssueType;
  severity: 'low' | 'medium' | 'high';
  description: string;
  surfaceLevel: string;
  deeperNeed: string;
  relatedMessages: string[];
}

export type IssueType = 
  | '价值观冲突'
  | '期待不匹配'
  | '沟通障碍'
  | '情绪失控'
  | '信任问题'
  | '边界问题'
  | '需求未满足'
  | '权力斗争';

export interface Recommendation {
  id: string;
  target: 'A' | 'B' | 'both';
  priority: 'high' | 'medium' | 'low';
  category: RecommendationCategory;
  title: string;
  description: string;
  actionSteps: string[];
  expectedOutcome: string;
}

export type RecommendationCategory = 
  | '沟通技巧'
  | '情绪调节'
  | '倾听技巧'
  | '表达方式'
  | '冲突解决'
  | '关系修复'
  | '个人成长'
  | '边界设定';