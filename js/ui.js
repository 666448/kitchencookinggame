// UI管理类
class UIManager {
    constructor() {
        this.currentPage = 'main-menu';
        this.init();
    }

    // 初始化UI
    init() {
        this.bindEvents();
        this.renderGamePage();
        this.renderLeaderboard();
        this.renderSocialPage();
        gameLogic.updateUI();
    }

    // 绑定事件
    bindEvents() {
        // 烹饪方式选择
        const cookingMethodSelect = document.getElementById('cooking-method');
        if (cookingMethodSelect) {
            cookingMethodSelect.addEventListener('change', (e) => {
                gameLogic.selectedCookingMethod = e.target.value;
            });
        }
    }

    // 页面切换
    showPage(pageName) {
        // 隐藏所有页面
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // 显示目标页面
        const targetPage = document.getElementById(pageName);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageName;
        }

        // 更新UI
        gameLogic.updateUI();
        
        // 根据页面类型刷新内容
        if (pageName === 'game') {
            this.renderGamePage();
        } else if (pageName === 'cookbook') {
            this.renderCookbookPage();
        }
    }

    // 渲染游戏页面
    renderGamePage() {
        this.renderIngredientsGrid();
        this.renderSeasoningsGrid();
        // 确保选中状态正确显示
        gameLogic.updateSelectionUI();
    }

    // 强制刷新背包显示
    forceRefreshInventory() {
        console.log('强制刷新背包显示...');
        this.renderIngredientsGrid();
        this.renderSeasoningsGrid();
        console.log('背包刷新完成');
    }

    // 渲染食材网格
    renderIngredientsGrid() {
        const grid = document.getElementById('ingredients-grid');
        if (!grid) {
            return;
        }

        grid.innerHTML = '';

        // 显示背包中的食材
        gameLogic.playerData.inventory.ingredients.forEach((item, index) => {
            const card = this.createItemCard(item, 'ingredient');
            grid.appendChild(card);
        });

        // 如果没有食材，显示提示
        if (gameLogic.playerData.inventory.ingredients.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message';
            emptyMessage.innerHTML = `
                <p>背包中没有食材</p>
                <p>点击右上角"商店"按钮购买食材</p>
            `;
            grid.appendChild(emptyMessage);
        }
    }

    // 渲染调味料网格
    renderSeasoningsGrid() {
        const grid = document.getElementById('seasonings-grid');
        if (!grid) return;

        grid.innerHTML = '';

        // 显示背包中的调味料
        gameLogic.playerData.inventory.seasonings.forEach(item => {
            const card = this.createItemCard(item, 'seasoning');
            grid.appendChild(card);
        });

        // 如果没有调味料，显示提示
        if (gameLogic.playerData.inventory.seasonings.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message';
            emptyMessage.innerHTML = `
                <p>背包中没有调味料</p>
                <p>点击右上角"商店"按钮购买调味料</p>
            `;
            grid.appendChild(emptyMessage);
        }
    }

    // 创建物品卡片
    createItemCard(item, type) {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.dataset.id = item.id;

        const quantity = item.quantity || 1;
        
        card.innerHTML = `
            <span class="item-icon">${item.icon}</span>
            <div class="item-name">${item.name}</div>
            <div class="item-quantity">数量: ${quantity}</div>
        `;

        // 检查是否被选中
        if (type === 'ingredient' && gameLogic.selectedIngredients.includes(item.id)) {
            card.classList.add('selected');
        } else if (type === 'seasoning' && gameLogic.selectedSeasonings.includes(item.id)) {
            card.classList.add('selected');
        }

        // 添加点击事件
        card.addEventListener('click', () => {
            if (type === 'ingredient') {
                gameLogic.selectIngredient(item.id);
            } else if (type === 'seasoning') {
                gameLogic.selectSeasoning(item.id);
            }
        });

        return card;
    }

    // 显示商店
    showShop() {
        // 创建商店模态框
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🛒 食材商店</h3>
                    <div class="shop-info">
                        <span>当前金币: <span id="shop-coins">${gameLogic.playerData.coins}</span></span>
                    </div>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="shop-tabs">
                        <button class="tab-btn active" onclick="uiManager.switchShopTab('ingredients')">🥬 食材</button>
                        <button class="tab-btn" onclick="uiManager.switchShopTab('seasonings')">🧂 调味料</button>
                    </div>
                    <div id="shop-items" class="shop-items">
                        ${this.renderShopItems('ingredients')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // 切换商店标签
    switchShopTab(tab) {
        // 更新标签状态
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // 更新商品列表
        const shopItems = document.getElementById('shop-items');
        shopItems.innerHTML = this.renderShopItems(tab);
    }

    // 渲染商店商品
    renderShopItems(type) {
        const items = type === 'ingredients' ? GAME_DATA.ingredients : GAME_DATA.seasonings;
        
        return items.map(item => {
            const canAfford = gameLogic.playerData.coins >= item.price;
            const buttonClass = canAfford ? 'btn btn-primary' : 'btn btn-secondary';
            const buttonText = canAfford ? '购买' : '金币不足';
            
            return `
                <div class="shop-item">
                    <div class="item-info">
                        <span class="item-icon">${item.icon}</span>
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            <div class="item-price">💰 ${item.price} 金币</div>
                            ${type === 'ingredients' ? `<div class="item-quality">品质: ${item.quality}⭐</div>` : `<div class="item-effect">效果: ${item.effect}⭐</div>`}
                        </div>
                    </div>
                    <button class="${buttonClass}" onclick="buyItem(${item.id}, '${type}')" ${!canAfford ? 'disabled' : ''}>
                        ${buttonText}
                    </button>
                </div>
            `;
        }).join('');
    }

    // 渲染排行榜
    renderLeaderboard() {
        const list = document.getElementById('leaderboard-list');
        if (!list) return;

        // 添加当前玩家到排行榜数据中
        const allPlayers = [...GAME_DATA.leaderboardData];
        if (gameLogic.playerData.maxScore > 0) {
            allPlayers.push({
                id: 'current',
                name: '我',
                level: gameLogic.playerData.level,
                coins: gameLogic.playerData.coins,
                maxScore: gameLogic.playerData.maxScore,
                avatar: '👤'
            });
        }

        // 按等级排序
        allPlayers.sort((a, b) => b.level - a.level);

        list.innerHTML = allPlayers.map((player, index) => {
            const rank = index + 1;
            const isCurrentPlayer = player.id === 'current';
            const rankClass = rank <= 3 ? `rank-${rank}` : '';
            const currentPlayerClass = isCurrentPlayer ? 'current-player' : '';

            return `
                <div class="leaderboard-item ${rankClass} ${currentPlayerClass}">
                    <div class="rank-number">${rank}</div>
                    <div class="player-avatar">${player.avatar}</div>
                    <div class="player-info-detail">
                        <div class="player-name">${player.name}</div>
                        <div class="player-stats">
                            等级: ${player.level} | 金币: ${player.coins} | 最高分: ${player.maxScore}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 筛选排行榜
    filterLeaderboard(type) {
        // 更新按钮状态
        document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        const list = document.getElementById('leaderboard-list');
        if (!list) return;

        // 添加当前玩家到排行榜数据中
        const allPlayers = [...GAME_DATA.leaderboardData];
        if (gameLogic.playerData.maxScore > 0) {
            allPlayers.push({
                id: 'current',
                name: '我',
                level: gameLogic.playerData.level,
                coins: gameLogic.playerData.coins,
                maxScore: gameLogic.playerData.maxScore,
                avatar: '👤'
            });
        }

        // 根据类型排序
        switch (type) {
            case 'level':
                allPlayers.sort((a, b) => b.level - a.level);
                break;
            case 'coins':
                allPlayers.sort((a, b) => b.coins - a.coins);
                break;
            case 'score':
                allPlayers.sort((a, b) => b.maxScore - a.maxScore);
                break;
        }

        list.innerHTML = allPlayers.map((player, index) => {
            const rank = index + 1;
            const isCurrentPlayer = player.id === 'current';
            const rankClass = rank <= 3 ? `rank-${rank}` : '';
            const currentPlayerClass = isCurrentPlayer ? 'current-player' : '';

            return `
                <div class="leaderboard-item ${rankClass} ${currentPlayerClass}">
                    <div class="rank-number">${rank}</div>
                    <div class="player-avatar">${player.avatar}</div>
                    <div class="player-info-detail">
                        <div class="player-name">${player.name}</div>
                        <div class="player-stats">
                            等级: ${player.level} | 金币: ${player.coins} | 最高分: ${player.maxScore}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 渲染社交页面
    renderSocialPage() {
        const container = document.getElementById('islands-container');
        if (!container) return;

        container.innerHTML = GAME_DATA.islands.map(island => `
            <div class="island-card">
                <div class="island-header">
                    <span class="island-icon">${island.icon}</span>
                    <h3 class="island-name">${island.name}</h3>
                </div>
                <p class="island-description">${island.description}</p>
                <div class="players-grid">
                    ${island.players.map(player => `
                        <div class="player-avatar-small ${gameLogic.playerData.likedPlayers.includes(player.id) ? 'liked' : ''}" 
                             onclick="gameLogic.likePlayer(${player.id}); this.classList.toggle('liked');">
                            ${player.avatar}
                        </div>
                    `).join('')}
                </div>
                <div class="island-stats">
                    <span>👥 ${island.players.length} 位厨师</span>
                    <span>❤️ ${island.players.reduce((sum, p) => sum + p.likes, 0)} 总点赞</span>
                </div>
            </div>
        `).join('');
    }

    // 显示背包
    showInventory() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>📦 背包</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="inventory-tabs">
                        <button class="tab-btn active" onclick="uiManager.switchInventoryTab('ingredients')">🥬 食材</button>
                        <button class="tab-btn" onclick="uiManager.switchInventoryTab('seasonings')">🧂 调味料</button>
                        <button class="tab-btn" onclick="uiManager.switchInventoryTab('recipes')">📚 秘籍</button>
                    </div>
                    <div id="inventory-items" class="inventory-items">
                        ${this.renderInventoryItems('ingredients')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // 切换背包标签
    switchInventoryTab(tab) {
        // 更新标签状态
        document.querySelectorAll('.inventory-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // 更新物品列表
        const inventoryItems = document.getElementById('inventory-items');
        inventoryItems.innerHTML = this.renderInventoryItems(tab);
    }

    // 渲染背包物品
    renderInventoryItems(type) {
        let items = [];
        let title = '';
        
        switch(type) {
            case 'ingredients':
                items = gameLogic.playerData.inventory.ingredients;
                title = '食材';
                break;
            case 'seasonings':
                items = gameLogic.playerData.inventory.seasonings;
                title = '调味料';
                break;
            case 'recipes':
                items = gameLogic.playerData.inventory.recipes;
                title = '秘籍';
                break;
        }

        if (items.length === 0) {
            return `<div class="empty-inventory">
                <p>背包中没有${title}</p>
                ${type !== 'recipes' ? '<p>去商店购买一些吧！</p>' : '<p>在世界交友中点赞其他玩家有机会获得秘籍！</p>'}
            </div>`;
        }

        return items.map(item => `
            <div class="inventory-item">
                <div class="item-info">
                    <span class="item-icon">${item.icon}</span>
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        ${item.quantity ? `<div class="item-quantity">数量: ${item.quantity}</div>` : ''}
                        ${item.quality ? `<div class="item-quality">品质: ${item.quality}⭐</div>` : ''}
                        ${item.effect ? `<div class="item-effect">效果: ${item.effect}⭐</div>` : ''}
                        ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 刷新所有页面
    refreshAllPages() {
        this.renderGamePage();
        this.renderLeaderboard();
        this.renderSocialPage();
        this.renderCookbookPage();
        gameLogic.updateUI();
    }

    // 渲染菜品图鉴页面
    renderCookbookPage() {
        this.updateCookbookStats();
        this.renderDishesGrid();
    }

    // 更新图鉴统计
    updateCookbookStats() {
        const discoveredCount = document.getElementById('discovered-count');
        const totalDishes = document.getElementById('total-dishes');
        const completionRate = document.getElementById('completion-rate');

        const totalDishCount = DISH_RECIPES.length + DARK_DISHES.length;
        if (discoveredCount) discoveredCount.textContent = gameLogic.playerData.discoveredDishes.length;
        if (totalDishes) totalDishes.textContent = totalDishCount;
        if (completionRate) {
            const rate = Math.round((gameLogic.playerData.discoveredDishes.length / totalDishCount) * 100);
            completionRate.textContent = `${rate}%`;
        }
    }

    // 渲染菜品网格
    renderDishesGrid(filter = 'all') {
        const grid = document.getElementById('dishes-grid');
        if (!grid) return;

        grid.innerHTML = '';

        // 合并所有菜品（正常菜品 + 黑暗料理）
        const allDishes = [...DISH_RECIPES, ...DARK_DISHES];

        allDishes.forEach(dish => {
            // 检查是否已发现
            const isDiscovered = gameLogic.playerData.discoveredDishes.some(d => d.id === dish.id);
            
            // 过滤显示
            if (filter !== 'all' && dish.rarity !== filter) {
                return;
            }

            const rarityInfo = RARITY_CONFIG[dish.rarity];
            const card = document.createElement('div');
            card.className = `dish-card ${isDiscovered ? 'discovered' : 'undiscovered'}`;
            if (dish.rarity === 'dark') {
                card.setAttribute('data-rarity', 'dark');
            }
            
            // 获取食材和调味料名称
            const ingredientNames = dish.ingredients.map(id => {
                const ingredient = GAME_DATA.ingredients.find(i => i.id === id);
                return ingredient ? ingredient.name : `食材${id}`;
            });
            
            const seasoningNames = dish.seasonings.map(id => {
                const seasoning = GAME_DATA.seasonings.find(s => s.id === id);
                return seasoning ? seasoning.name : `调味料${id}`;
            });

            // 获取烹饪方式名称
            const cookingMethod = GAME_DATA.cookingMethods.find(m => m.id === dish.cookingMethod);
            const cookingMethodName = cookingMethod ? cookingMethod.name : dish.cookingMethod;

            card.innerHTML = `
                <div class="dish-card-lock">🔒</div>
                <div class="dish-card-header">
                    <div class="dish-card-image">${dish.image}</div>
                    <div class="dish-card-info">
                        <h4>${isDiscovered ? dish.name : '???'}</h4>
                        <span class="dish-card-rarity" style="background-color: ${rarityInfo.color};">${rarityInfo.name}</span>
                    </div>
                </div>
                <div class="dish-card-description">
                    ${isDiscovered ? dish.description : '尚未发现此菜品，使用指定食材即可解锁！'}
                </div>
                ${isDiscovered ? `
                    <div class="dish-card-ingredients">
                        <strong>必需食材:</strong> ${ingredientNames.map(name => `<span class="ingredient-tag">${name}</span>`).join('')}
                    </div>
                    <div class="dish-card-ingredients">
                        <strong>推荐调味料:</strong> ${seasoningNames.map(name => `<span class="ingredient-tag">${name}</span>`).join('')}
                    </div>
                    <div class="dish-card-cooking">
                        <div class="dish-card-difficulty">
                            <span>难度:</span>
                            ${'★'.repeat(dish.difficulty)}
                        </div>
                        <div class="dish-card-score">
                            评分: ${dish.score}
                        </div>
                    </div>
                    <div class="dish-card-cooking">
                        <span>推荐烹饪方式: ${cookingMethodName}</span>
                    </div>
                    <div class="dish-card-tip">
                        <small>💡 提示：只要使用指定食材即可解锁菜品，调味料和烹饪方式可自由选择</small>
                    </div>
                ` : ''}
            `;
            
            grid.appendChild(card);
        });
    }
}

// 创建全局UI管理器实例
const uiManager = new UIManager();

// 全局函数，供HTML调用
function showPage(pageName) {
    uiManager.showPage(pageName);
}

function startCooking() {
    gameLogic.startCooking();
}

function resetCooking() {
    gameLogic.resetCooking();
}

function filterLeaderboard(type) {
    uiManager.filterLeaderboard(type);
}

function filterDishes(type) {
    // 更新过滤按钮状态
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // 重新渲染菜品网格
    uiManager.renderDishesGrid(type);
}

// 购买物品函数
function buyItem(itemId, type) {
    console.log(`🛒 开始购买: ${type} ID: ${itemId}`);
    
    let success = false;
    if (type === 'ingredients') {
        success = gameLogic.buyIngredient(itemId);
    } else if (type === 'seasonings') {
        success = gameLogic.buySeasoning(itemId);
    }
    
    console.log(`购买结果: ${success}`);
    
    if (success) {
        console.log('✅ 购买成功，开始更新UI...');
        
        // 更新商店中的金币显示
        const shopCoinsElement = document.getElementById('shop-coins');
        if (shopCoinsElement) {
            shopCoinsElement.textContent = gameLogic.playerData.coins;
            console.log('💰 更新商店金币显示');
        }
        
        // 立即刷新游戏页面
        if (window.uiManager) {
            console.log('🔄 立即刷新游戏页面...');
            uiManager.renderGamePage();
            
            // 强制更新选择状态
            gameLogic.updateSelectionUI();
            
            // 检查是否在游戏页面，如果是则强制刷新
            if (document.getElementById('game').classList.contains('active')) {
                console.log('🎮 在游戏页面，强制刷新显示');
                uiManager.renderIngredientsGrid();
                uiManager.renderSeasoningsGrid();
            }
        }
        
        // 延迟刷新一次，确保显示
        setTimeout(() => {
            if (window.uiManager) {
                console.log('⏰ 延迟刷新游戏页面...');
                uiManager.renderGamePage();
            }
        }, 100);
        
        // 更新商店商品显示（重新渲染按钮状态）
        const shopItemsElement = document.getElementById('shop-items');
        if (shopItemsElement) {
            const currentTab = document.querySelector('.shop-tabs .tab-btn.active');
            const currentType = currentTab.textContent.includes('食材') ? 'ingredients' : 'seasonings';
            shopItemsElement.innerHTML = uiManager.renderShopItems(currentType);
            console.log('🛍️ 更新商店商品显示');
        }
        
        console.log('✅ UI更新完成');
    } else {
        console.log('❌ 购买失败');
    }
} 