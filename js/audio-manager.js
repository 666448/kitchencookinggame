// 音频管理器
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
        
        // 设置背景音乐源（使用免费的音乐资源）
        this.backgroundMusic.src = this.getBackgroundMusicUrl();
        
        // 预加载音效
        this.preloadSoundEffects();
        
        // 如果音乐已启用，尝试自动播放
        if (this.isMusicEnabled) {
            this.attemptAutoPlay();
        }
    }
    
    // 获取背景音乐URL（使用本地音乐文件）
    getBackgroundMusicUrl() {
        // 使用重命名后的音乐文件
        return 'audio/piano_music.mp3';
    }
    
    // 预加载音效
    preloadSoundEffects() {
        // 使用更可靠的音效URL和本地音效
        const soundEffects = {
            'cooking': 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
            'success': 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
            'error': 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
            'click': 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
            'coin': 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'
        };
        
        // 尝试加载音效，如果失败则使用备用方案
        for (const [name, url] of Object.entries(soundEffects)) {
            this.soundEffects[name] = new Audio();
            this.soundEffects[name].volume = this.currentVolume * 0.7; // 音效音量稍低
            
            // 设置音效源
            this.soundEffects[name].src = url;
            
            // 监听加载错误，使用备用音效
            this.soundEffects[name].addEventListener('error', () => {
                console.log(`音效 ${name} 加载失败，使用备用方案`);
                this.createFallbackSound(name);
            });
            
            // 预加载音效
            this.soundEffects[name].load();
        }
    }
    
    // 创建备用音效（使用Web Audio API生成简单音效）
    createFallbackSound(soundName) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            // 根据音效类型设置不同的音调和持续时间
            let frequency = 440; // 默认A音
            let duration = 0.1;
            
            switch(soundName) {
                case 'cooking':
                    frequency = 523; // C音
                    duration = 0.2;
                    break;
                case 'success':
                    frequency = 659; // E音
                    duration = 0.3;
                    break;
                case 'error':
                    frequency = 220; // 低音A
                    duration = 0.2;
                    break;
                case 'click':
                    frequency = 440; // A音
                    duration = 0.1;
                    break;
                case 'coin':
                    frequency = 784; // G音
                    duration = 0.2;
                    break;
            }
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(this.currentVolume * 0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
            
            // 创建备用音效对象
            this.soundEffects[soundName] = {
                play: () => {
                    this.createFallbackSound(soundName);
                },
                cloneNode: () => this.soundEffects[soundName],
                volume: this.currentVolume * 0.7
            };
            
        } catch (error) {
            console.log(`创建备用音效失败: ${error}`);
            // 如果Web Audio API也不可用，创建空的音效对象
            this.soundEffects[soundName] = {
                play: () => console.log(`播放音效: ${soundName}`),
                cloneNode: () => this.soundEffects[soundName],
                volume: this.currentVolume * 0.7
            };
        }
    }
    
    // 尝试自动播放背景音乐
    attemptAutoPlay() {
        if (this.backgroundMusic && this.isMusicEnabled) {
            // 尝试自动播放
            this.backgroundMusic.play().then(() => {
                console.log('🎵 背景音乐自动播放成功');
            }).catch(error => {
                console.log('🎵 背景音乐自动播放失败，等待用户交互:', error);
                // 监听用户交互事件，一旦有交互就尝试播放
                this.setupAutoPlayOnInteraction();
            });
        }
    }
    
    // 设置用户交互后自动播放
    setupAutoPlayOnInteraction() {
        const playOnInteraction = () => {
            if (this.backgroundMusic && this.isMusicEnabled && this.backgroundMusic.paused) {
                this.backgroundMusic.play().then(() => {
                    console.log('🎵 用户交互后背景音乐开始播放');
                    // 移除事件监听器，避免重复绑定
                    document.removeEventListener('click', playOnInteraction);
                    document.removeEventListener('keydown', playOnInteraction);
                    document.removeEventListener('touchstart', playOnInteraction);
                }).catch(error => {
                    console.log('🎵 用户交互后播放仍然失败:', error);
                });
            }
        };
        
        // 添加多种交互事件监听器
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('keydown', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
    }
    
    // 播放背景音乐
    playBackgroundMusic() {
        if (this.backgroundMusic && this.isMusicEnabled) {
            this.backgroundMusic.play().then(() => {
                console.log('🎵 背景音乐播放成功');
            }).catch(error => {
                console.log('🎵 背景音乐播放失败:', error);
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
        console.log(`🎵 尝试播放音效: ${soundName}, 音效启用: ${this.isSoundEnabled}`);
        
        if (!this.isSoundEnabled) {
            console.log('🎵 音效已禁用，跳过播放');
            return;
        }
        
        if (!this.soundEffects[soundName]) {
            console.log(`🎵 音效 ${soundName} 不存在`);
            return;
        }
        
        try {
            // 检查是否是备用音效对象
            if (this.soundEffects[soundName].play && typeof this.soundEffects[soundName].play === 'function') {
                // 直接调用播放方法（备用音效）
                this.soundEffects[soundName].play();
                console.log(`🎵 播放备用音效: ${soundName}`);
            } else {
                // 标准音频对象，克隆播放
                const sound = this.soundEffects[soundName].cloneNode();
                sound.volume = this.currentVolume * 0.7;
                sound.play().then(() => {
                    console.log(`🎵 音效播放成功: ${soundName}`);
                }).catch(error => {
                    console.log(`🎵 音效播放失败: ${soundName}`, error);
                    // 如果标准音效播放失败，尝试使用备用音效
                    this.createFallbackSound(soundName);
                    this.soundEffects[soundName].play();
                });
            }
        } catch (error) {
            console.log(`🎵 播放音效时发生错误: ${soundName}`, error);
        }
    }
    
    // 切换音乐开关
    toggleMusic() {
        this.isMusicEnabled = !this.isMusicEnabled;
        if (this.isMusicEnabled) {
            this.attemptAutoPlay();
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
        
        // 更新背景音乐音量
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = this.currentVolume;
        }
        
        // 更新音效音量
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
        
        // 确保背景音乐在控制面板初始化后也开始播放
        if (this.isMusicEnabled && this.backgroundMusic && this.backgroundMusic.paused) {
            this.attemptAutoPlay();
        }
    }
}

// 创建全局音频管理器实例
window.audioManager = new AudioManager(); 