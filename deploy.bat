@echo off
echo 🚀 厨房烹饪小游戏 - GitHub Pages 部署脚本
echo ================================================

echo.
echo 📋 请按照以下步骤操作：
echo.
echo 1. 首先在GitHub上创建仓库：
echo    - 访问 https://github.com
echo    - 点击右上角 "+" → "New repository"
echo    - 仓库名称：kitchen-cooking-game
echo    - 选择 "Public"
echo    - 不要勾选 "Add a README file"
echo    - 点击 "Create repository"
echo.
echo 2. 复制仓库地址（HTTPS格式）
echo.
echo 3. 按任意键继续...
pause

set /p REPO_URL="请输入GitHub仓库地址 (例如: https://github.com/用户名/kitchen-cooking-game.git): "

echo.
echo 🔧 初始化Git仓库...
git init
git add .
git commit -m "Initial commit: 厨房烹饪小游戏 v1.0.0"

echo.
echo 📤 推送到GitHub...
git branch -M main
git remote add origin %REPO_URL%
git push -u origin main

echo.
echo ✅ 部署完成！
echo.
echo 📝 接下来需要启用GitHub Pages：
echo 1. 进入GitHub仓库页面
echo 2. 点击 "Settings" 标签
echo 3. 左侧菜单找到 "Pages"
echo 4. Source 选择 "Deploy from a branch"
echo 5. Branch 选择 "main"
echo 6. 点击 "Save"
echo.
echo 🌐 部署完成后，你的游戏网址将是：
echo https://用户名.github.io/kitchen-cooking-game/
echo.
echo 按任意键退出...
pause 