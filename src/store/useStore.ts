import { create } from 'zustand';
import type { ConversationData, AnalysisResult } from '../types';

interface AppState {
  conversations: ConversationData[];
  currentConversation: ConversationData | null;
  currentAnalysis: AnalysisResult | null;
  isAnalyzing: boolean;
  
  addConversation: (conversation: ConversationData) => void;
  setCurrentConversation: (conversation: ConversationData | null) => void;
  setCurrentAnalysis: (analysis: AnalysisResult | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  updateConversationAnalysis: (conversationId: string, analysis: AnalysisResult) => void;
}

const useStore = create<AppState>((set) => ({
  conversations: [],
  currentConversation: null,
  currentAnalysis: null,
  isAnalyzing: false,

  addConversation: (conversation) =>
    set((state) => ({
      conversations: [...state.conversations, conversation],
      currentConversation: conversation,
    })),

  setCurrentConversation: (conversation) =>
    set({ currentConversation: conversation }),

  setCurrentAnalysis: (analysis) =>
    set({ currentAnalysis: analysis }),

  setIsAnalyzing: (isAnalyzing) =>
    set({ isAnalyzing }),

  updateConversationAnalysis: (conversationId, analysis) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? { ...conv, analysisResult: analysis }
          : conv
      ),
    })),
}));

export default useStore;