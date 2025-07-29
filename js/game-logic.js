// 游戏逻辑核心类
class GameLogic {
    constructor() {
        this.playerData = this.loadPlayerData();
        this.selectedIngredients = [];
        this.selectedSeasonings = [];
        this.selectedCookingMethod = null;
    }

    // 加载玩家数据
    loadPlayerData() {
        const savedData = localStorage.getItem('kitchenGameData');
        if (savedData) {
            try {
                const playerData = JSON.parse(savedData);
                // 确保新字段存在
                if (!playerData.discoveredDishes) {
                    playerData.discoveredDishes = [];
                }
                if (!playerData.likedPlayers) {
                    playerData.likedPlayers = [];
                }
                return playerData;
            } catch (error) {
                console.error('加载玩家数据失败:', error);
                return { ...INITIAL_PLAYER_DATA };
            }
        }
        return { ...INITIAL_PLAYER_DATA };
    }

    // 保存玩家数据
    savePlayerData() {
        localStorage.setItem('kitchenGameData', JSON.stringify(this.playerData));
    }

    // 购买食材
    buyIngredient(ingredientId) {
        const ingredient = GAME_DATA.ingredients.find(item => item.id === ingredientId);
        if (!ingredient) return false;

        if (this.playerData.coins >= ingredient.price) {
            this.playerData.coins -= ingredient.price;
            
            // 添加到背包
            const existingItem = this.playerData.inventory.ingredients.find(item => item.id === ingredientId);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                this.playerData.inventory.ingredients.push({
                    ...ingredient,
                    quantity: 1
                });
            }
            
            this.savePlayerData();
            this.updateUI();
            this.showNotification(`成功购买 ${ingredient.name}！`);
            return true;
        } else {
            this.showNotification('金币不足！', 'error');
            return false;
        }
    }

    // 购买调味料
    buySeasoning(seasoningId) {
        const seasoning = GAME_DATA.seasonings.find(item => item.id === seasoningId);
        if (!seasoning) return false;

        if (this.playerData.coins >= seasoning.price) {
            this.playerData.coins -= seasoning.price;
            
            // 添加到背包
            const existingItem = this.playerData.inventory.seasonings.find(item => item.id === seasoningId);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                this.playerData.inventory.seasonings.push({
                    ...seasoning,
                    quantity: 1
                });
            }
            
            this.savePlayerData();
            this.updateUI();
            this.showNotification(`成功购买 ${seasoning.name}！`);
            return true;
        } else {
            this.showNotification('金币不足！', 'error');
            return false;
        }
    }

    // 选择食材
    selectIngredient(ingredientId) {
        const index = this.selectedIngredients.indexOf(ingredientId);
        if (index > -1) {
            this.selectedIngredients.splice(index, 1);
        } else {
            if (this.selectedIngredients.length < 3) {
                this.selectedIngredients.push(ingredientId);
            } else {
                this.showNotification('最多只能选择3种食材！', 'warning');
            }
        }
        this.updateSelectionUI();
    }

    // 选择调味料
    selectSeasoning(seasoningId) {
        const index = this.selectedSeasonings.indexOf(seasoningId);
        if (index > -1) {
            this.selectedSeasonings.splice(index, 1);
        } else {
            if (this.selectedSeasonings.length < 2) {
                this.selectedSeasonings.push(seasoningId);
            } else {
                this.showNotification('最多只能选择2种调味料！', 'warning');
            }
        }
        this.updateSelectionUI();
    }

    // 开始烹饪
    startCooking() {
        if (this.selectedIngredients.length === 0) {
            this.showNotification('请至少选择一种食材！', 'warning');
            return;
        }

        if (this.selectedSeasonings.length === 0) {
            this.showNotification('请至少选择一种调味料！', 'warning');
            return;
        }

        // 显示烹饪动画
        this.showCookingAnimation();

        // 根据烹饪方式调整时间
        const cookingMethod = GAME_DATA.cookingMethods.find(item => item.id === this.selectedCookingMethod);
        let cookingTime = 2000; // 默认2秒
        
        if (cookingMethod) {
            // 根据难度调整时间：难度越高，时间越短（因为玩家更熟练）
            switch(cookingMethod.difficulty) {
                case 1: cookingTime = 1800; break; // 简单烹饪：1.8秒
                case 2: cookingTime = 1500; break; // 中等烹饪：1.5秒
                case 3: cookingTime = 1200; break; // 困难烹饪：1.2秒
            }
        }

        // 模拟烹饪时间
        const self = this; // 保存this引用
        setTimeout(() => {
            const result = self.calculateCookingResult();
            self.showCookingResult(result);
        }, cookingTime);
    }

    // 计算烹饪结果
    calculateCookingResult() {
        // 基础分数
        let baseScore = 50;

        // 食材质量加成
        const selectedIngredientData = this.selectedIngredients.map(id => {
            // 先从游戏数据中查找
            let ingredient = GAME_DATA.ingredients.find(item => item.id === id);
            
            // 如果没找到，从玩家背包中查找（处理测试食材等自定义食材）
            if (!ingredient) {
                ingredient = this.playerData.inventory.ingredients.find(item => item.id === id);
            }
            
            return ingredient;
        }).filter(item => item); // 过滤掉undefined值
        
        if (selectedIngredientData.length > 0) {
            const avgQuality = selectedIngredientData.reduce((sum, item) => sum + (item.quality || 1), 0) / selectedIngredientData.length;
            baseScore += avgQuality * 10;
        }

        // 调味料效果加成
        const selectedSeasoningData = this.selectedSeasonings.map(id => {
            // 先从游戏数据中查找
            let seasoning = GAME_DATA.seasonings.find(item => item.id === id);
            
            // 如果没找到，从玩家背包中查找
            if (!seasoning) {
                seasoning = this.playerData.inventory.seasonings.find(item => item.id === id);
            }
            
            return seasoning;
        }).filter(item => item); // 过滤掉undefined值
        
        if (selectedSeasoningData.length > 0) {
            const seasoningBonus = selectedSeasoningData.reduce((sum, item) => sum + (item.effect || 1), 0) * 2;
            baseScore += seasoningBonus;
        }

        // 烹饪方式加成
        const cookingMethod = GAME_DATA.cookingMethods.find(item => item.id === this.selectedCookingMethod);
        if (cookingMethod) {
            baseScore *= cookingMethod.bonus;
        }

        // 秘籍加成
        const recipeBonus = this.calculateRecipeBonus();
        baseScore *= (1 + recipeBonus);

        // 识别菜品
        const discoveredDish = this.identifyDish();
        
        // 如果识别到菜品，给予额外加成
        if (discoveredDish) {
            const rarityBonus = RARITY_CONFIG[discoveredDish.rarity].bonus;
            baseScore *= rarityBonus;
        }

        // 随机因素 (±10分)
        const randomFactor = (Math.random() - 0.5) * 20;
        baseScore += randomFactor;

        // 确保分数在0-100之间
        const finalScore = Math.max(0, Math.min(100, Math.round(baseScore)));

        // 计算金币奖励
        let coinsEarned = 0;
        if (finalScore >= 80) {
            coinsEarned = Math.floor(finalScore * 2);
        } else if (finalScore >= 60) {
            coinsEarned = Math.floor(finalScore * 1.5);
        } else if (finalScore >= 40) {
            coinsEarned = Math.floor(finalScore);
        } else {
            coinsEarned = -Math.floor((40 - finalScore) * 2); // 扣金币
        }

        return {
            score: finalScore,
            coinsEarned: coinsEarned,
            ingredients: selectedIngredientData,
            seasonings: selectedSeasoningData,
            cookingMethod: cookingMethod,
            discoveredDish: discoveredDish
        };
    }

    // 识别菜品
    identifyDish() {
        const selectedIngredientIds = [...this.selectedIngredients].sort();
        console.log('选中的食材ID:', selectedIngredientIds);

        // 45%概率触发黑暗料理
        const darkChance = Math.random();
        if (darkChance < 0.45) {
            console.log('触发黑暗料理！概率:', darkChance);
            return this.identifyDarkDish(selectedIngredientIds);
        }

        // 查找匹配的正常菜品配方（只根据食材判定）
        const matchedDish = DISH_RECIPES.find(dish => {
            const dishIngredients = [...dish.ingredients].sort();
            console.log(`检查菜品 ${dish.name}:`, dishIngredients);
            
            // 只检查食材是否完全匹配
            const isMatch = JSON.stringify(dishIngredients) === JSON.stringify(selectedIngredientIds);
            if (isMatch) {
                console.log('找到匹配的菜品:', dish.name);
            }
            return isMatch;
        });

        console.log('最终匹配的菜品:', matchedDish);
        return matchedDish || null;
    }

    // 识别黑暗料理
    identifyDarkDish(selectedIngredientIds) {
        // 根据食材数量选择对应的黑暗料理
        const ingredientCount = selectedIngredientIds.length;
        
        // 筛选适合的黑暗料理
        const suitableDarkDishes = DARK_DISHES.filter(dish => {
            const dishIngredientCount = dish.ingredients.length;
            // 食材数量相近的黑暗料理
            return Math.abs(dishIngredientCount - ingredientCount) <= 1;
        });

        if (suitableDarkDishes.length > 0) {
            // 随机选择一个合适的黑暗料理
            const randomIndex = Math.floor(Math.random() * suitableDarkDishes.length);
            const darkDish = suitableDarkDishes[randomIndex];
            console.log('生成黑暗料理:', darkDish.name);
            return darkDish;
        }

        // 如果没有合适的黑暗料理，生成一个通用的
        const genericDarkDish = {
            id: 999,
            name: '黑暗料理：神秘料理',
            icon: '💀',
            image: '❓💀',
            description: '这是一道神秘的黑暗料理，散发着不祥的气息...',
            ingredients: selectedIngredientIds,
            seasonings: this.selectedSeasonings,
            cookingMethod: this.selectedCookingMethod,
            difficulty: 1,
            score: Math.floor(Math.random() * 20) + 10,
            rarity: 'dark',
            effect: 'mystery'
        };

        console.log('生成通用黑暗料理:', genericDarkDish.name);
        return genericDarkDish;
    }

    // 计算秘籍加成
    calculateRecipeBonus() {
        let bonus = 0;
        this.playerData.inventory.recipes.forEach(recipe => {
            if (recipe.effect === 'general_bonus') {
                bonus += 0.1;
            } else if (recipe.effect === 'seasoning_bonus') {
                bonus += 0.5;
            }
        });
        return bonus;
    }

    // 处理烹饪结果
    processCookingResult(result) {
        console.log('=== 开始处理烹饪结果 ===');
        console.log('当前选中的食材:', this.selectedIngredients);
        console.log('当前选中的调味料:', this.selectedSeasonings);
        
        // 更新金币
        this.playerData.coins += result.coinsEarned;

        // 更新最高分
        if (result.score > this.playerData.maxScore) {
            this.playerData.maxScore = result.score;
        }

        // 计算经验值
        const expGained = Math.floor(result.score * 0.5);
        this.playerData.experience += expGained;

        // 检查等级提升
        this.checkLevelUp();

        // 处理菜品发现
        if (result.discoveredDish) {
            this.discoverDish(result.discoveredDish);
        }

        // 消耗食材和调味料（在显示结果之前）
        console.log('准备消耗食材...');
        this.consumeIngredients();

        // 保存数据
        console.log('保存数据...');
        this.savePlayerData();
        
        // 立即更新UI
        console.log('更新UI...');
        this.updateUI();
        
        console.log('=== 烹饪结果处理完成 ===');
    }

    // 发现新菜品
    discoverDish(dish) {
        // 检查是否已经发现过这个菜品
        const alreadyDiscovered = this.playerData.discoveredDishes.some(d => d.id === dish.id);
        
        if (!alreadyDiscovered) {
            // 添加到已发现菜品列表
            this.playerData.discoveredDishes.push({
                id: dish.id,
                name: dish.name,
                image: dish.image,
                description: dish.description,
                rarity: dish.rarity,
                discoveredAt: new Date().toISOString()
            });
            
            // 显示发现通知
            const rarityInfo = RARITY_CONFIG[dish.rarity];
            const notificationType = dish.rarity === 'dark' ? 'error' : 'success';
            const emoji = dish.rarity === 'dark' ? '💀' : '🎉';
            this.showNotification(`${emoji} 发现${dish.rarity === 'dark' ? '黑暗料理' : '新菜品'}：${dish.name}！(${rarityInfo.name})`, notificationType);
        }
    }

    // 检查等级提升
    checkLevelUp() {
        const currentLevel = this.playerData.level;
        const currentExp = this.playerData.experience;
        
        for (let level = currentLevel + 1; level <= 20; level++) {
            if (LEVEL_EXP[level] && currentExp >= LEVEL_EXP[level]) {
                this.playerData.level = level;
                this.showNotification(`恭喜升级到 ${level} 级！`, 'success');
            } else {
                break;
            }
        }
    }

    // 消耗食材和调味料
    consumeIngredients() {
        console.log('开始消耗食材和调味料...');
        console.log('选中的食材:', this.selectedIngredients);
        console.log('选中的调味料:', this.selectedSeasonings);
        
        // 消耗食材
        this.selectedIngredients.forEach(ingredientId => {
            const item = this.playerData.inventory.ingredients.find(item => item.id === ingredientId);
            console.log(`消耗食材 ID ${ingredientId}:`, item);
            
            if (item && item.quantity > 1) {
                item.quantity--;
                console.log(`食材 ${item.name} 数量减少到 ${item.quantity}`);
            } else if (item && item.quantity === 1) {
                const index = this.playerData.inventory.ingredients.indexOf(item);
                this.playerData.inventory.ingredients.splice(index, 1);
                console.log(`食材 ${item.name} 已用完，从背包中移除`);
            }
        });

        // 消耗调味料
        this.selectedSeasonings.forEach(seasoningId => {
            const item = this.playerData.inventory.seasonings.find(item => item.id === seasoningId);
            console.log(`消耗调味料 ID ${seasoningId}:`, item);
            
            if (item && item.quantity > 1) {
                item.quantity--;
                console.log(`调味料 ${item.name} 数量减少到 ${item.quantity}`);
            } else if (item && item.quantity === 1) {
                const index = this.playerData.inventory.seasonings.indexOf(item);
                this.playerData.inventory.seasonings.splice(index, 1);
                console.log(`调味料 ${item.name} 已用完，从背包中移除`);
            }
        });
        
        console.log('消耗完成，当前背包状态:', this.playerData.inventory);
    }

    // 点赞玩家
    likePlayer(playerId) {
        if (!this.playerData.likedPlayers.includes(playerId)) {
            this.playerData.likedPlayers.push(playerId);
            this.savePlayerData();
            
            // 有机会获得秘籍
            if (Math.random() < 0.1) { // 10%概率
                this.giveRandomRecipe();
            }
            
            this.showNotification('点赞成功！', 'success');
        } else {
            this.showNotification('已经点过赞了！', 'warning');
        }
    }

    // 给予随机秘籍
    giveRandomRecipe() {
        const availableRecipes = GAME_DATA.recipes.filter(recipe => 
            !this.playerData.inventory.recipes.some(playerRecipe => playerRecipe.id === recipe.id)
        );
        
        if (availableRecipes.length > 0) {
            const randomRecipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
            this.playerData.inventory.recipes.push(randomRecipe);
            this.savePlayerData();
            this.showNotification(`获得秘籍：${randomRecipe.name}！`, 'success');
        }
    }

    // 重置烹饪选择
    resetCooking() {
        try {
            // 清除超时保护
            if (this.cookingTimeout) {
                clearTimeout(this.cookingTimeout);
                this.cookingTimeout = null;
            }
            
            // 重置选择
            this.selectedIngredients = [];
            this.selectedSeasonings = [];
            this.selectedCookingMethod = null;
            
            // 更新UI
            this.updateSelectionUI();
            this.hideCookingResult();
            
        } catch (error) {
            console.error('重置烹饪时出错:', error);
        }
    }

    // 显示通知
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // 更新UI
    updateUI() {
        // 更新玩家信息显示
        const levelElement = document.getElementById('player-level');
        const coinsElement = document.getElementById('player-coins');
        
        if (levelElement) levelElement.textContent = this.playerData.level;
        if (coinsElement) coinsElement.textContent = this.playerData.coins;
        
        // 强制刷新背包显示
        if (window.uiManager) {
            window.uiManager.forceRefreshInventory();
        }
    }

    // 更新选择UI
    updateSelectionUI() {
        // 更新食材选择状态
        document.querySelectorAll('#ingredients-grid .item-card').forEach(card => {
            const ingredientId = parseInt(card.dataset.id);
            if (this.selectedIngredients.includes(ingredientId)) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });

        // 更新调味料选择状态
        document.querySelectorAll('#seasonings-grid .item-card').forEach(card => {
            const seasoningId = parseInt(card.dataset.id);
            if (this.selectedSeasonings.includes(seasoningId)) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    }

    // 显示烹饪动画
    showCookingAnimation() {
        try {
            const cookingArea = document.querySelector('.cooking-area');
            const cookingAnimation = document.getElementById('cooking-animation');
            const startButton = document.getElementById('start-cooking');
            
            if (cookingArea) cookingArea.style.display = 'none';
            if (cookingAnimation) cookingAnimation.style.display = 'block';
            if (startButton) startButton.disabled = true;
            
            // 添加超时保护，防止动画卡住
            this.cookingTimeout = setTimeout(() => {
                this.forceShowCookingResult();
            }, 5000); // 5秒超时保护
            
        } catch (error) {
            console.error('显示烹饪动画时出错:', error);
            this.forceShowCookingResult();
        }
    }

    // 显示烹饪结果
    showCookingResult(result) {
        try {
            // 清除超时保护
            if (this.cookingTimeout) {
                clearTimeout(this.cookingTimeout);
                this.cookingTimeout = null;
            }
            
            const cookingAnimation = document.getElementById('cooking-animation');
            const cookingScore = document.getElementById('cooking-score');
            const coinsEarned = document.getElementById('coins-earned');
            const resultElement = document.getElementById('cooking-result');
            const dishInfo = document.getElementById('dish-info');
            
            if (cookingAnimation) cookingAnimation.style.display = 'none';
            if (cookingScore) cookingScore.textContent = result.score;
            if (coinsEarned) coinsEarned.textContent = result.coinsEarned;
            
            // 显示菜品信息
            if (result.discoveredDish && dishInfo) {
                const rarityInfo = RARITY_CONFIG[result.discoveredDish.rarity];
                dishInfo.innerHTML = `
                    <div class="dish-display">
                        <div class="dish-image">${result.discoveredDish.image}</div>
                        <div class="dish-details">
                            <h4>${result.discoveredDish.name}</h4>
                            <p class="dish-description">${result.discoveredDish.description}</p>
                            <span class="dish-rarity" style="color: ${rarityInfo.color};">${rarityInfo.name}</span>
                        </div>
                    </div>
                `;
                dishInfo.style.display = 'block';
            } else if (dishInfo) {
                dishInfo.style.display = 'none';
            }
            
            if (resultElement) resultElement.style.display = 'block';
            
            // 处理结果
            this.processCookingResult(result);
            
        } catch (error) {
            console.error('显示烹饪结果时出错:', error);
            this.forceShowCookingResult();
        }
    }
    
    // 强制显示烹饪结果（超时保护）
    forceShowCookingResult() {
        try {
            // 清除超时保护
            if (this.cookingTimeout) {
                clearTimeout(this.cookingTimeout);
                this.cookingTimeout = null;
            }
            
            // 计算结果
            const result = this.calculateCookingResult();
            
            // 强制显示结果
            const cookingAnimation = document.getElementById('cooking-animation');
            const cookingArea = document.querySelector('.cooking-area');
            const startButton = document.getElementById('start-cooking');
            
            if (cookingAnimation) cookingAnimation.style.display = 'none';
            if (cookingArea) cookingArea.style.display = 'block';
            if (startButton) startButton.disabled = false;
            
            // 显示结果
            this.showCookingResult(result);
            
        } catch (error) {
            console.error('强制显示烹饪结果时出错:', error);
            // 最后的备用方案：只重置界面显示，不清空选择
            this.hideCookingResult();
        }
    }

    // 隐藏烹饪结果
    hideCookingResult() {
        document.getElementById('cooking-result').style.display = 'none';
        document.querySelector('.cooking-area').style.display = 'block';
        document.getElementById('start-cooking').disabled = false;
    }
}

// 创建全局游戏逻辑实例
const gameLogic = new GameLogic(); 