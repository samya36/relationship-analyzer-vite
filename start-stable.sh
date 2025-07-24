#!/bin/bash

echo "🚀 关系分析器 - 稳定启动脚本"
echo "================================"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 停止可能存在的进程
echo -e "${YELLOW}🔄 停止现有进程...${NC}"
pkill -f vite 2>/dev/null || true

# 等待进程完全停止
sleep 2

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 安装依赖...${NC}"
    npm install
fi

# 清理端口
echo -e "${YELLOW}🧹 清理端口...${NC}"
lsof -ti:5173 | xargs kill -9 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# 启动服务器
echo -e "${GREEN}🔥 启动服务器...${NC}"
echo -e "${GREEN}📍 访问地址: http://localhost:5173${NC}"
echo -e "${YELLOW}⚠️  保持此终端窗口打开${NC}"
echo "================================"

# 启动开发服务器（前台运行）
npm run dev