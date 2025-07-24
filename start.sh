#!/bin/bash

echo "🚀 启动关系分析器应用..."
echo "📋 项目路径: $(pwd)"
echo "🔗 访问地址: http://localhost:3002"
echo ""

# 安装依赖（如果需要）
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖中..."
    npm install
fi

# 启动开发服务器
echo "🔥 启动服务器..."
npm run dev -- --host 0.0.0.0 --port 3002