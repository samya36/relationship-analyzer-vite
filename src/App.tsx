import { useState } from 'react';
import Layout from './components/Layout';
import ConversationInput from './components/ConversationInput';
import AnalysisResult from './components/AnalysisResult';
import useStore from './store/useStore';
import type { Message, ConversationData } from './types';
import { createAnalysisService } from './services/analysisService';

type PageType = 'input' | 'analysis' | 'history';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('input');
  const { 
    addConversation, 
    setCurrentAnalysis, 
    setIsAnalyzing, 
    updateConversationAnalysis,
    currentAnalysis,
    isAnalyzing
  } = useStore();

  const handleConversationSubmit = async (
    messages: Message[], 
    participants: { personA: string; personB: string }
  ) => {
    const conversation: ConversationData = {
      id: `conv-${Date.now()}`,
      participants,
      messages,
      timestamp: new Date(),
    };

    addConversation(conversation);
    setIsAnalyzing(true);
    
    try {
      const analysisService = createAnalysisService();
      const analysis = await analysisService.analyzeConversation(conversation);
      
      setCurrentAnalysis(analysis);
      updateConversationAnalysis(conversation.id, analysis);
      setCurrentPage('analysis');
      console.log('分析完成:', analysis);
    } catch (error) {
      console.error('分析失败:', error);
      // 使用更友好的错误提示
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      alert(`分析过程中出现错误: ${errorMessage}\n\n这是一个演示版本，正在使用模拟数据进行分析。`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'input':
        return <ConversationInput onSubmit={handleConversationSubmit} />;
      case 'analysis':
        if (isAnalyzing) {
          return (
            <div className="text-center py-12">
              <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-primary-500 hover:bg-primary-400 transition ease-in-out duration-150">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                正在分析对话内容...
              </div>
            </div>
          );
        }
        
        if (!currentAnalysis) {
          return (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900">暂无分析结果</h2>
              <p className="mt-2 text-gray-600">请先在"对话录入"页面提交对话内容</p>
            </div>
          );
        }
        
        return <AnalysisResult analysis={currentAnalysis} />;
      case 'history':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900">历史记录</h2>
            <p className="mt-2 text-gray-600">历史记录页面开发中...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;