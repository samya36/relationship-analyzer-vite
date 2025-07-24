import type { ConversationData, AnalysisResult, EmotionType, CommunicationStyle, IssueType, RecommendationCategory } from '../types';

export class AnalysisService {
  constructor(_apiKey: string) {
    // API密钥保留供未来使用
  }

  async analyzeConversation(conversation: ConversationData): Promise<AnalysisResult> {
    try {
      // 实际部署时会集成真实API
      return this.mockAnalysis(conversation);
    } catch (error) {
      console.error('分析失败:', error);
      throw error;
    }
  }

  private mockAnalysis(conversation: ConversationData): AnalysisResult {
    return {
      id: `analysis-${Date.now()}`,
      conversationId: conversation.id,
      timestamp: new Date(),
      overallScore: {
        healthiness: 6,
        constructiveness: 5,
        respectfulness: 4,
      },
      emotionAnalysis: {
        personA: {
          dominantEmotion: '愤怒' as EmotionType,
          emotionProgression: [],
          overallIntensity: 7,
          emotionDistribution: {
            '愤怒': 40,
            '悲伤': 20,
            '恐惧': 15,
            '快乐': 0,
            '厌恶': 25,
            '惊讶': 0,
            '委屈': 0,
            '失望': 0,
            '焦虑': 0,
            '内疚': 0,
            '羞愧': 0,
            '嫉妒': 0,
          },
        },
        personB: {
          dominantEmotion: '内疚' as EmotionType,
          emotionProgression: [],
          overallIntensity: 6,
          emotionDistribution: {
            '愤怒': 0,
            '悲伤': 45,
            '恐惧': 0,
            '快乐': 0,
            '厌恶': 0,
            '惊讶': 25,
            '委屈': 0,
            '失望': 30,
            '焦虑': 0,
            '内疚': 0,
            '羞愧': 0,
            '嫉妒': 0,
          },
        },
      },
      communicationPatterns: [
        {
          type: '防御性沟通' as CommunicationStyle,
          frequency: 8,
          examples: ['反驳', '解释', '转移话题'],
          impact: 'negative' as const,
        },
      ],
      keyIssues: [
        {
          id: 'issue-1',
          type: '沟通障碍' as IssueType,
          severity: 'high',
          description: '缺乏有效的情感表达和倾听技巧',
          surfaceLevel: '双方经常争吵',
          deeperNeed: '被理解和被尊重的需要',
          relatedMessages: ['第1条消息', '第3条消息'],
        },
      ],
      recommendations: [
        {
          id: 'rec-1',
          category: '沟通技巧' as RecommendationCategory,
          priority: 'high',
          target: 'both',
          title: '学习"我"语句表达',
          description: '使用"我感到..."而不是"你总是..."的表达方式',
          actionSteps: [
            '当感到不满时，先深呼吸冷静下来',
            '用"我感到..."开头表达自己的感受',
            '说明具体的行为和影响，而不是评判对方的人格',
          ],
          expectedOutcome: '减少防御性反应，增进相互理解',
        },
      ],
      summary: '这段对话反映出双方在沟通中存在一些常见的模式问题。主要表现为防御性和批判性的交流方式。',
    };
  }
}

export const createAnalysisService = (apiKey?: string) => {
  const defaultKey = import.meta.env?.VITE_CLAUDE_API_KEY || 'demo-key';
  return new AnalysisService(apiKey || defaultKey);
}; 