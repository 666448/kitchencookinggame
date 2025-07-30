# 🚀 GitHub部署详细指南

## 📋 部署前准备

### 1. 安装Git
1. **下载Git**：
   - 访问：https://git-scm.com/download/win
   - 点击 "Click here to download" 下载Windows版本
   - 运行下载的安装程序

2. **安装设置**：
   - 使用默认设置即可
   - 一路点击 "Next"
   - 最后点击 "Install"

3. **验证安装**：
   - 安装完成后，重新打开PowerShell
   - 输入：`git --version`
   - 如果显示版本号，说明安装成功

### 2. 创建GitHub账户（如果还没有）
1. 访问：https://github.com
2. 点击 "Sign up"
3. 填写用户名、邮箱和密码
4. 完成验证步骤

## 🎯 部署步骤

### 第一步：创建GitHub仓库

1. **登录GitHub**：
   - 访问 https://github.com
   - 使用你的账户登录

2. **创建新仓库**：
   - 点击右上角 "+" 图标
   - 选择 "New repository"

3. **设置仓库信息**：
   - **Repository name**: `kitchen-cooking-game`
   - **Description**: `厨房烹饪小游戏 - 一个有趣的HTML5游戏`
   - **Visibility**: 选择 "Public"
   - **不要勾选** "Add a README file"
   - **不要勾选** "Add .gitignore"
   - **不要勾选** "Choose a license"

4. **创建仓库**：
   - 点击 "Create repository"

### 第二步：获取仓库地址

创建完成后，你会看到仓库页面。复制HTTPS地址：
```
https://github.com/你的用户名/kitchen-cooking-game.git
```

### 第三步：使用自动部署脚本

1. **运行部署脚本**：
   - 在你的游戏文件夹中双击 `deploy.bat`
   - 或者在PowerShell中运行：`.\deploy.bat`

2. **输入仓库地址**：
   - 脚本会提示你输入GitHub仓库地址
   - 粘贴你刚才复制的地址

3. **等待部署完成**：
   - 脚本会自动执行所有Git命令
   - 等待提示"部署完成"

### 第四步：启用GitHub Pages

1. **进入仓库设置**：
   - 在GitHub仓库页面
   - 点击 "Settings" 标签

2. **找到Pages设置**：
   - 左侧菜单找到 "Pages"
   - 点击进入Pages设置

3. **配置Pages**：
   - **Source**: 选择 "Deploy from a branch"
   - **Branch**: 选择 "main"
   - **Folder**: 选择 "/ (root)"
   - 点击 "Save"

4. **等待部署**：
   - GitHub会自动构建你的网站
   - 通常需要1-2分钟

### 第五步：访问你的游戏

部署完成后，你的游戏网址将是：
```
https://你的用户名.github.io/kitchen-cooking-game/
```

## 🔧 手动部署（如果自动脚本失败）

如果自动部署脚本出现问题，可以手动执行以下命令：

### 1. 初始化Git仓库
```bash
git init
```

### 2. 添加所有文件
```bash
git add .
```

### 3. 提交更改
```bash
git commit -m "Initial commit: 厨房烹饪小游戏 v1.0.0"
```

### 4. 添加远程仓库
```bash
git remote add origin https://github.com/你的用户名/kitchen-cooking-game.git
```

### 5. 推送到GitHub
```bash
git branch -M main
git push -u origin main
```

## 📁 需要上传的文件

确保以下文件都已包含在项目中：

### 核心文件
- `index.html` - 主游戏页面
- `js/` 文件夹 - 所有JavaScript文件
- `styles/` 文件夹 - 所有CSS文件
- `audio/` 文件夹 - 音频文件

### 测试页面
- `test-music.html` - 音乐测试
- `test-sound-effects.html` - 音效测试
- `test-autoplay.html` - 自动播放测试
- `test-position.html` - 位置测试

### 文档文件
- `README.md` - 项目说明
- `音乐使用指南.md` - 音乐使用说明
- `GitHub部署详细指南.md` - 本指南

## 🎮 游戏功能验证

部署完成后，请验证以下功能：

### 1. 基本功能
- ✅ 游戏正常加载
- ✅ 背景音乐自动播放
- ✅ 音效正常工作
- ✅ 音频控制面板显示

### 2. 音频功能
- ✅ 背景音乐循环播放
- ✅ 烹饪音效触发
- ✅ 成功/错误音效
- ✅ 音量调节功能

### 3. 游戏功能
- ✅ 食材选择
- ✅ 烹饪过程
- ✅ 评分系统
- ✅ 金币奖励

## 🐛 常见问题解决

### 问题1：Git命令未找到
**解决方案**：重新安装Git，确保安装时选择"Add to PATH"选项

### 问题2：推送失败
**解决方案**：
```bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的邮箱"
```

### 问题3：GitHub Pages不显示
**解决方案**：
- 检查仓库是否为Public
- 确认文件路径正确
- 等待几分钟让GitHub完成构建

### 问题4：音频无法播放
**解决方案**：
- 检查浏览器是否允许自动播放
- 点击页面任意位置激活音频
- 检查音频文件路径

## 📞 获取帮助

如果遇到问题：
1. 检查浏览器控制台错误信息
2. 查看GitHub仓库的Actions标签
3. 确认所有文件都已正确上传

---

**恭喜！你的厨房烹饪小游戏现在已经部署到GitHub Pages了！** 🎉 