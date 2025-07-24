import React from 'react';
import type { ReactNode } from 'react';
import { Heart, MessageCircle, BarChart3, History } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPage: 'input' | 'analysis' | 'history';
  onPageChange: (page: 'input' | 'analysis' | 'history') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const navItems = [
    { id: 'input', label: '对话录入', icon: MessageCircle },
    { id: 'analysis', label: '分析结果', icon: BarChart3 },
    { id: 'history', label: '历史记录', icon: History },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary-500 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">CalmBridge AI 关系分析器</h1>
            </div>
            <nav className="flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      currentPage === item.id
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;