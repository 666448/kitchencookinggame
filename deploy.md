# 🚀 GitHub Pages 部署指南

## 快速部署步骤

### 1. 创建GitHub仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 仓库名称：`kitchen-cooking-game`
4. 选择 "Public"（公开）
5. 不要勾选 "Add a README file"
6. 点击 "Create repository"

### 2. 上传文件

#### 方法一：使用Git命令行
```bash
# 在游戏文件夹中打开命令行
git init
git add .
git commit -m "Initial commit: 厨房烹饪小游戏"
git branch -M main
git remote add origin https://github.com/你的用户名/kitchen-cooking-game.git
git push -u origin main
```

#### 方法二：使用GitHub Desktop
1. 下载并安装 [GitHub Desktop](https://desktop.github.com/)
2. 登录GitHub账号
3. 点击 "Clone a repository from the Internet"
4. 选择刚创建的仓库
5. 将游戏文件复制到仓库文件夹
6. 提交并推送

#### 方法三：网页上传
1. 在GitHub仓库页面点击 "uploading an existing file"
2. 拖拽所有游戏文件到上传区域
3. 添加提交信息："Initial commit: 厨房烹饪小游戏"
4. 点击 "Commit changes"

### 3. 启用GitHub Pages

1. 进入仓库页面
2. 点击 "Settings" 标签
3. 左侧菜单找到 "Pages"
4. Source 选择 "Deploy from a branch"
5. Branch 选择 "main" 或 "master"
6. 点击 "Save"

### 4. 等待部署

- 部署需要几分钟时间
- 部署完成后会显示绿色勾号
- 你的游戏网址：`https://你的用户名.github.io/kitchen-cooking-game/`

## 自定义域名（可选）

1. 在Pages设置中点击 "Custom domain"
2. 输入你的域名（如：`game.yourdomain.com`）
3. 保存设置
4. 在域名提供商处添加CNAME记录

## 更新游戏

每次修改游戏后，只需要：

```bash
git add .
git commit -m "更新游戏内容"
git push
```

GitHub Actions会自动重新部署。

## 常见问题

### Q: 页面显示404错误？
A: 确保仓库是公开的，并且启用了GitHub Pages。

### Q: 游戏无法加载？
A: 检查文件路径是否正确，确保所有文件都已上传。

### Q: 样式显示异常？
A: 检查CSS文件路径，确保相对路径正确。

### Q: 部署很慢？
A: 首次部署需要几分钟，后续更新会更快。

## 分享游戏

部署完成后，你可以：

1. **分享网址**：直接分享GitHub Pages的网址
2. **嵌入网页**：在其他网站中嵌入游戏
3. **二维码**：生成二维码方便手机访问

## 游戏特色

- 🍳 丰富的烹饪系统
- 🎮 黑暗料理随机触发
- 📚 菜品图鉴收集
- 🌍 社交互动功能
- 🏆 排行榜系统

---

**享受分享游戏的乐趣！** 🎉 