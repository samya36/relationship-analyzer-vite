# 关系分析器故障排除指南

## 🔍 服务器加载失败的解决方案

### 1. 确认服务器状态
```bash
# 检查是否有 Vite 进程在运行
ps aux | grep vite

# 检查端口占用情况
lsof -i :3002
```

### 2. 重新启动服务器
```bash
# 停止所有相关进程
pkill -f vite

# 重新启动
npm run dev -- --port 3002
```

### 3. 清理和重新安装
```bash
# 清理缓存
rm -rf node_modules
rm package-lock.json

# 重新安装依赖
npm install

# 启动服务器
npm run dev
```

### 4. 使用不同端口
```bash
# 尝试不同端口
npm run dev -- --port 3003
npm run dev -- --port 4000
npm run dev -- --port 5000
```

### 5. 检查防火墙设置
确保本地防火墙没有阻止端口访问。

### 6. 手动检查文件
```bash
# 确保所有必要文件存在
ls -la src/
ls -la src/components/
ls -la src/types/
```

## 🌐 浏览器访问问题

1. **清理浏览器缓存**
2. **尝试无痕模式**
3. **检查浏览器控制台错误**
4. **尝试不同浏览器**

## 📱 当前可用的访问地址

根据终端输出，可以尝试访问：
- http://localhost:3002/
- http://172.19.204.75:3002/
- http://26.26.26.1:3002/

## ✅ 验证应用正常工作

一旦服务器启动成功，您应该能够：
1. 看到"CalmBridge AI 关系分析器"标题
2. 在导航栏看到三个选项：对话录入、分析结果、历史记录
3. 能够在对话录入页面输入参与者信息