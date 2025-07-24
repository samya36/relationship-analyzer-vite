import React from 'react';
import type { AnalysisResult } from '../types';
import Card from './Card';
import { 
  AlertCircle, 
  Lightbulb
} from 'lucide-react';
import { 
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell
} from 'recharts';

interface AnalysisResultProps {
  analysis: AnalysisResult;
}

const EMOTION_COLORS: Record<string, string> = {
  '愤怒': '#ef4444',
  '悲伤': '#3b82f6',
  '恐惧': '#8b5cf6',
  '快乐': '#10b981',
  '厌恶': '#f59e0b',
  '惊讶': '#ec4899',
  '委屈': '#6366f1',
  '失望': '#6b7280',
  '焦虑': '#f97316',
  '内疚': '#84cc16',
  '羞愧': '#a855f7',
  '嫉妒': '#14b8a6',
};

const AnalysisResultComponent: React.FC<AnalysisResultProps> = ({ analysis }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const emotionDataA = Object.entries(analysis.emotionAnalysis.personA.emotionDistribution)
    .map(([emotion, value]) => ({ name: emotion, value }))
    .filter(item => item.value > 0);

  const emotionDataB = Object.entries(analysis.emotionAnalysis.personB.emotionDistribution)
    .map(([emotion, value]) => ({ name: emotion, value }))
    .filter(item => item.value > 0);

  return (
    <div className="space-y-6">
      {/* 总体评分 */}
      <Card title="关系健康度评分" subtitle="基于对话内容的综合评估">
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(analysis.overallScore.healthiness)}`}>
              {analysis.overallScore.healthiness}/10
            </div>
            <div className="text-sm text-gray-600 mt-1">健康度</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(analysis.overallScore.constructiveness)}`}>
              {analysis.overallScore.constructiveness}/10
            </div>
            <div className="text-sm text-gray-600 mt-1">建设性</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(analysis.overallScore.respectfulness)}`}>
              {analysis.overallScore.respectfulness}/10
            </div>
            <div className="text-sm text-gray-600 mt-1">尊重度</div>
          </div>
        </div>
      </Card>

      {/* 情绪分析 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="人物 A 情绪分析">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">主导情绪</span>
              <span className="font-medium">{analysis.emotionAnalysis.personA.dominantEmotion}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">情绪强度</span>
              <span className="font-medium">{analysis.emotionAnalysis.personA.overallIntensity}/10</span>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={emotionDataA}
                  cx="50%"
                  cy="45%"
                  labelLine={false}
                  label={({ percent }) => {
                    const percentageNum = ((percent || 0) * 100);
                    return percentageNum > 8 ? `${percentageNum.toFixed(0)}%` : '';
                  }}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {emotionDataA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={EMOTION_COLORS[entry.name] || '#8884d8'} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${((value as number) || 0).toFixed(1)}%`, name]}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => `${value}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="人物 B 情绪分析">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">主导情绪</span>
              <span className="font-medium">{analysis.emotionAnalysis.personB.dominantEmotion}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">情绪强度</span>
              <span className="font-medium">{analysis.emotionAnalysis.personB.overallIntensity}/10</span>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={emotionDataB}
                  cx="50%"
                  cy="45%"
                  labelLine={false}
                  label={({ percent }) => {
                    const percentageNum = ((percent || 0) * 100);
                    return percentageNum > 8 ? `${percentageNum.toFixed(0)}%` : '';
                  }}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {emotionDataB.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={EMOTION_COLORS[entry.name] || '#8884d8'} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${((value as number) || 0).toFixed(1)}%`, name]}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => `${value}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 沟通模式 */}
      <Card title="沟通模式分析" subtitle="识别到的主要沟通模式">
        <div className="space-y-4">
          {analysis.communicationPatterns.map((pattern, index) => (
            <div key={index} className="border-l-4 border-gray-200 pl-4 py-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{pattern.type}</h4>
                <span className={`text-sm ${
                  pattern.impact === 'positive' ? 'text-green-600' : 
                  pattern.impact === 'negative' ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {pattern.impact === 'positive' ? '积极影响' : 
                   pattern.impact === 'negative' ? '消极影响' : 
                   '中性影响'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">出现频率: {pattern.frequency}次</p>
              {pattern.examples.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">示例:</p>
                  <ul className="mt-1 space-y-1">
                    {pattern.examples.map((example, idx) => (
                      <li key={idx} className="text-sm text-gray-600 italic">"{example}"</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* 核心问题 */}
      <Card title="核心问题分析" subtitle="对话中反映的深层问题">
        <div className="space-y-4">
          {analysis.keyIssues.map((issue) => (
            <div key={issue.id} className={`border rounded-lg p-4 ${
              issue.severity === 'high' ? 'border-red-200 bg-red-50' :
              issue.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' :
              'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-start">
                <AlertCircle className={`h-5 w-5 mt-0.5 mr-2 ${
                  issue.severity === 'high' ? 'text-red-600' :
                  issue.severity === 'medium' ? 'text-yellow-600' :
                  'text-gray-600'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{issue.type}</h4>
                  <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm"><span className="font-medium">表面问题:</span> {issue.surfaceLevel}</p>
                    <p className="text-sm"><span className="font-medium">深层需求:</span> {issue.deeperNeed}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 改善建议 */}
      <Card title="改善建议" subtitle="基于分析结果的具体行动建议">
        <div className="space-y-4">
          {analysis.recommendations.map((rec) => (
            <div key={rec.id} className="border rounded-lg p-4">
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {rec.priority === 'high' ? '高优先级' :
                       rec.priority === 'medium' ? '中优先级' :
                       '低优先级'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700">行动步骤:</p>
                      <ol className="mt-1 space-y-1">
                        {rec.actionSteps.map((step, idx) => (
                          <li key={idx} className="text-sm text-gray-600">
                            {idx + 1}. {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">预期效果:</p>
                      <p className="text-sm text-gray-600">{rec.expectedOutcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 总结 */}
      <Card title="分析总结">
        <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
      </Card>
    </div>
  );
};

export default AnalysisResultComponent;