// 简化版音频管理器
class AudioManager {
    constructor() {
        this.backgroundMusic = null;
        this.soundEffects = {};
        this.isMusicEnabled = true;
        this.isSoundEnabled = true;
        this.currentVolume = 0.5;
        
        // 从本地存储加载设置
        this.loadSettings();
        
        // 初始化音频
        this.initAudio();
    }
    
    // 加载音频设置
    loadSettings() {
        const savedSettings = localStorage.getItem('audioSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            this.isMusicEnabled = settings.isMusicEnabled !== undefined ? settings.isMusicEnabled : true;
            this.isSoundEnabled = settings.isSoundEnabled !== undefined ? settings.isSoundEnabled : true;
            this.currentVolume = settings.volume !== undefined ? settings.volume : 0.5;
        }
    }
    
    // 保存音频设置
    saveSettings() {
        const settings = {
            isMusicEnabled: this.isMusicEnabled,
            isSoundEnabled: this.isSoundEnabled,
            volume: this.currentVolume
        };
        localStorage.setItem('audioSettings', JSON.stringify(settings));
    }
    
    // 初始化音频
    initAudio() {
        // 创建背景音乐
        this.backgroundMusic = new Audio();
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = this.currentVolume;
        
        // 设置背景音乐源
        this.backgroundMusic.src = this.getBackgroundMusicUrl();
        
        // 预加载音效
        this.preloadSoundEffects();
        
        // 如果音乐已启用，开始播放
        if (this.isMusicEnabled) {
            this.playBackgroundMusic();
        }
    }
    
    // 获取背景音乐URL
    getBackgroundMusicUrl() {
        // 尝试多个可能的文件名
        const possibleFiles = [
            'audio/piano_music.mp3',
            'audio/background_music.mp3',
            'audio/music.mp3',
            'audio/Masque_Jupiter - A little story（纯钢琴）.mp3',
            'audio/Masque_Jupiter%20-%20A%20little%20story%EF%BC%88%E7%BA%AF%E9%92%A2%E7%90%B4%EF%BC%89.mp3'
        ];
        
        // 返回第一个文件名（你可以根据需要修改）
        return possibleFiles[0];
    }
    
    // 预加载音效
    preloadSoundEffects() {
        // 使用简单的音效URL
        const soundEffects = {
            'cooking': 'https://www.soundjay.com/button/button-09a.wav',
            'success': 'https://www.soundjay.com/button/button-10.wav',
            'error': 'https://www.soundjay.com/button/button-11.wav',
            'click': 'https://www.soundjay.com/button/button-09.wav',
            'coin': 'https://www.soundjay.com/button/button-12.wav'
        };
        
        for (const [name, url] of Object.entries(soundEffects)) {
            this.soundEffects[name] = new Audio(url);
            this.soundEffects[name].volume = this.currentVolume * 0.7;
        }
    }
    
    // 播放背景音乐
    playBackgroundMusic() {
        if (this.backgroundMusic && this.isMusicEnabled) {
            this.backgroundMusic.play().catch(error => {
                console.log('背景音乐自动播放失败，需要用户交互:', error);
            });
        }
    }
    
    // 停止背景音乐
    stopBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0;
        }
    }
    
    // 暂停背景音乐
    pauseBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
    }
    
    // 恢复背景音乐
    resumeBackgroundMusic() {
        if (this.backgroundMusic && this.isMusicEnabled) {
            this.backgroundMusic.play().catch(error => {
                console.log('恢复背景音乐失败:', error);
            });
        }
    }
    
    // 播放音效
    playSound(soundName) {
        if (this.soundEffects[soundName] && this.isSoundEnabled) {
            const sound = this.soundEffects[soundName].cloneNode();
            sound.volume = this.currentVolume * 0.7;
            sound.play().catch(error => {
                console.log('播放音效失败:', error);
            });
        }
    }
    
    // 切换音乐开关
    toggleMusic() {
        this.isMusicEnabled = !this.isMusicEnabled;
        if (this.isMusicEnabled) {
            this.playBackgroundMusic();
        } else {
            this.pauseBackgroundMusic();
        }
        this.saveSettings();
        this.updateMusicButton();
    }
    
    // 切换音效开关
    toggleSound() {
        this.isSoundEnabled = !this.isSoundEnabled;
        this.saveSettings();
        this.updateSoundButton();
    }
    
    // 设置音量
    setVolume(volume) {
        this.currentVolume = Math.max(0, Math.min(1, volume));
        
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = this.currentVolume;
        }
        
        for (const sound of Object.values(this.soundEffects)) {
            sound.volume = this.currentVolume * 0.7;
        }
        
        this.saveSettings();
        this.updateVolumeSlider();
    }
    
    // 更新音乐按钮显示
    updateMusicButton() {
        const musicBtn = document.getElementById('music-toggle');
        if (musicBtn) {
            musicBtn.innerHTML = this.isMusicEnabled ? '🔊' : '🔇';
            musicBtn.title = this.isMusicEnabled ? '关闭音乐' : '开启音乐';
        }
    }
    
    // 更新音效按钮显示
    updateSoundButton() {
        const soundBtn = document.getElementById('sound-toggle');
        if (soundBtn) {
            soundBtn.innerHTML = this.isSoundEnabled ? '🔊' : '🔇';
            soundBtn.title = this.isSoundEnabled ? '关闭音效' : '开启音效';
        }
    }
    
    // 更新音量滑块
    updateVolumeSlider() {
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.value = this.currentVolume * 100;
        }
    }
    
    // 创建音频控制界面
    createAudioControls() {
        const audioControls = document.createElement('div');
        audioControls.className = 'audio-controls';
        audioControls.innerHTML = `
            <div class="audio-control-panel">
                <button id="music-toggle" class="audio-btn" title="${this.isMusicEnabled ? '关闭音乐' : '开启音乐'}">
                    ${this.isMusicEnabled ? '🔊' : '🔇'}
                </button>
                <button id="sound-toggle" class="audio-btn" title="${this.isSoundEnabled ? '关闭音效' : '开启音效'}">
                    ${this.isSoundEnabled ? '🔊' : '🔇'}
                </button>
                <div class="volume-control">
                    <input type="range" id="volume-slider" min="0" max="100" value="${this.currentVolume * 100}" 
                           title="音量控制">
                </div>
            </div>
        `;
        
        // 添加事件监听器
        audioControls.querySelector('#music-toggle').addEventListener('click', () => {
            this.toggleMusic();
            this.playSound('click');
        });
        
        audioControls.querySelector('#sound-toggle').addEventListener('click', () => {
            this.toggleSound();
            this.playSound('click');
        });
        
        audioControls.querySelector('#volume-slider').addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });
        
        return audioControls;
    }
    
    // 初始化音频控制界面
    initAudioControls() {
        // 在主菜单添加音频控制
        const mainMenu = document.getElementById('main-menu');
        if (mainMenu) {
            const audioControls = this.createAudioControls();
            mainMenu.appendChild(audioControls);
        }
        
        // 在游戏界面也添加音频控制
        const gamePage = document.getElementById('game');
        if (gamePage) {
            const audioControls = this.createAudioControls();
            gamePage.appendChild(audioControls);
        }
        
        // 更新按钮状态
        this.updateMusicButton();
        this.updateSoundButton();
        this.updateVolumeSlider();
    }
}

// 创建全局音频管理器实例
window.audioManager = new AudioManager(); 