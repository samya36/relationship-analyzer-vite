import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Button from './Button';
import Card from './Card';
import type { Message } from '../types';

interface ConversationInputProps {
  onSubmit: (messages: Message[], participants: { personA: string; personB: string }) => void;
}

const ConversationInput: React.FC<ConversationInputProps> = ({ onSubmit }) => {
  const [participants, setParticipants] = useState({
    personA: '',
    personB: '',
  });

  const [messages, setMessages] = useState<Omit<Message, 'id'>[]>([
    {
      speaker: 'A',
      content: '',
      timestamp: new Date(),
    },
  ]);

  const addMessage = () => {
    setMessages([
      ...messages,
      {
        speaker: messages.length % 2 === 0 ? 'A' : 'B',
        content: '',
        timestamp: new Date(),
      },
    ]);
  };

  const updateMessage = (index: number, content: string) => {
    const updatedMessages = [...messages];
    updatedMessages[index].content = content;
    setMessages(updatedMessages);
  };

  const updateSpeaker = (index: number, speaker: 'A' | 'B') => {
    const updatedMessages = [...messages];
    updatedMessages[index].speaker = speaker;
    setMessages(updatedMessages);
  };

  const removeMessage = (index: number) => {
    if (messages.length > 1) {
      setMessages(messages.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    const validMessages = messages.filter(m => m.content.trim());
    if (validMessages.length === 0) {
      alert('请至少输入一条对话内容');
      return;
    }
    if (!participants.personA.trim() || !participants.personB.trim()) {
      alert('请输入双方的称呼');
      return;
    }

    const messagesWithIds: Message[] = validMessages.map((msg, index) => ({
      ...msg,
      id: `msg-${Date.now()}-${index}`,
    }));

    onSubmit(messagesWithIds, participants);
  };

  return (
    <div className="space-y-6">
      <Card title="参与者信息" subtitle="请输入对话双方的称呼">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              人物 A
            </label>
            <input
              type="text"
              value={participants.personA}
              onChange={(e) => setParticipants({ ...participants, personA: e.target.value })}
              placeholder="例如：小明、老公、女朋友"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              人物 B
            </label>
            <input
              type="text"
              value={participants.personB}
              onChange={(e) => setParticipants({ ...participants, personB: e.target.value })}
              placeholder="例如：小红、老婆、男朋友"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </Card>

      <Card title="对话内容" subtitle="按照时间顺序录入对话">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex items-start pt-2">
                <select
                  value={message.speaker}
                  onChange={(e) => updateSpeaker(index, e.target.value as 'A' | 'B')}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="A">
                    {participants.personA || '人物 A'}
                  </option>
                  <option value="B">
                    {participants.personB || '人物 B'}
                  </option>
                </select>
              </div>
              <div className="flex-1">
                <textarea
                  value={message.content}
                  onChange={(e) => updateMessage(index, e.target.value)}
                  placeholder="输入对话内容..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex items-start pt-2">
                <button
                  onClick={() => removeMessage(index)}
                  disabled={messages.length === 1}
                  className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between">
          <Button
            onClick={addMessage}
            variant="outline"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            添加对话
          </Button>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          size="lg"
          disabled={messages.every(m => !m.content.trim()) || !participants.personA || !participants.personB}
        >
          开始分析
        </Button>
      </div>
    </div>
  );
};

export default ConversationInput;