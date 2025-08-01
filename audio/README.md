# 🎵 音频文件夹说明

这个文件夹用于存放游戏的音频文件。

## 📁 当前文件

### 背景音乐
- **piano_music.mp3** - 游戏背景音乐（钢琴曲）

## 🔊 音效系统

游戏使用在线音效和备用音效系统：

### 在线音效
- **烹饪音效** - 开始烹饪时播放
- **成功音效** - 成功操作时播放  
- **错误音效** - 错误操作时播放
- **点击音效** - 点击按钮时播放
- **金币音效** - 获得金币时播放

### 备用音效
如果在线音效无法加载，系统会自动使用Web Audio API生成简单的音效：
- 烹饪音效：C音调 (523Hz)
- 成功音效：E音调 (659Hz)
- 错误音效：低音A (220Hz)
- 点击音效：A音调 (440Hz)
- 金币音效：G音调 (784Hz)

## 📝 如何添加自定义音效

如果你想添加自定义音效文件：

1. **准备音效文件**
   - 格式：MP3 或 WAV
   - 大小：建议 100KB 以内
   - 时长：建议 1-3 秒

2. **放入文件夹**
   - 将音效文件放入 `audio/` 文件夹

3. **修改配置**
   - 打开 `js/audio-manager.js`
   - 找到 `preloadSoundEffects()` 函数
   - 修改音效URL为本地文件路径

4. **测试音效**
   - 访问 `test-sound-effects.html` 测试新音效

## 🎯 音效测试

- **测试页面**: `test-sound-effects.html`
- **调试功能**: 实时监控音效加载和播放状态
- **备用方案**: 自动使用Web Audio API生成音效

---

**注意**: 音效系统具有多重备用方案，确保在任何情况下都能提供音频反馈。 