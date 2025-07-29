// 主入口文件
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍳 厨房烹饪小游戏启动成功！');
    
    // 添加一些额外的样式
    addAdditionalStyles();
    
    // 初始化游戏
    initGame();
});

// 添加额外的样式
function addAdditionalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* 模态框样式 */
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            border-radius: 15px;
            padding: 0;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #eee;
        }

        .modal-header h3 {
            margin: 0;
            color: #667eea;
        }

        .shop-info {
            font-size: 0.9rem;
            color: #666;
            font-weight: 500;
        }

        .shop-info span {
            color: #667eea;
            font-weight: bold;
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #999;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .close-btn:hover {
            color: #667eea;
        }

        .modal-body {
            padding: 20px;
        }

        /* 商店样式 */
        .shop-tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .tab-btn {
            padding: 10px 20px;
            border: 2px solid #667eea;
            background: white;
            color: #667eea;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .tab-btn.active {
            background: #667eea;
            color: white;
        }

        .shop-items {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }

        .shop-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border: 1px solid #eee;
            border-radius: 10px;
            background: white;
        }

        .item-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .item-details {
            display: flex;
            flex-direction: column;
        }

        .item-name {
            font-weight: 500;
            margin-bottom: 5px;
        }

        .item-price {
            font-size: 0.9rem;
            color: #666;
        }

        .item-quality,
        .item-effect {
            font-size: 0.8rem;
            color: #999;
            margin-top: 2px;
        }

        /* 背包样式 */
        .inventory-tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .inventory-items {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }

        .inventory-item {
            display: flex;
            padding: 15px;
            border: 1px solid #eee;
            border-radius: 10px;
            background: white;
        }

        .empty-inventory {
            text-align: center;
            padding: 40px 20px;
            color: #666;
            grid-column: 1 / -1;
        }

        .item-description {
            font-size: 0.8rem;
            color: #666;
            margin-top: 5px;
            font-style: italic;
        }

        /* 空状态样式 */
        .empty-message {
            text-align: center;
            padding: 40px 20px;
            color: #666;
        }

        .empty-message p {
            margin-bottom: 15px;
            font-size: 1.1rem;
        }

        /* 当前玩家高亮 */
        .current-player {
            border: 2px solid #667eea;
            background: rgba(102, 126, 234, 0.1);
        }

        /* 通知样式增强 */
        .notification.error {
            background: #dc3545;
        }

        .notification.warning {
            background: #ffc107;
            color: #333;
        }

        .notification.success {
            background: #28a745;
        }

        /* 美食岛统计 */
        .island-stats {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: #666;
            margin-top: 10px;
        }

        /* 物品数量显示 */
        .item-quantity {
            font-size: 0.8rem;
            color: #666;
            margin-top: 5px;
        }

        /* 响应式优化 */
        @media (max-width: 480px) {
            .shop-items {
                grid-template-columns: 1fr;
            }
            
            .shop-item {
                flex-direction: column;
                gap: 10px;
                text-align: center;
            }
            
            .island-stats {
                flex-direction: column;
                gap: 5px;
            }
        }
    `;
    document.head.appendChild(style);
}

// 初始化游戏
function initGame() {
    // 检查是否有保存的游戏数据
    const savedData = localStorage.getItem('kitchenGameData');
    if (!savedData) {
        // 新玩家，显示欢迎消息
        setTimeout(() => {
            gameLogic.showNotification('欢迎来到厨房烹饪小游戏！点击"开始游戏"开始你的美食之旅吧！', 'success');
        }, 1000);
    } else {
        // 老玩家，显示欢迎回来
        setTimeout(() => {
            gameLogic.showNotification('欢迎回来！继续你的美食之旅吧！', 'success');
        }, 1000);
    }

    // 添加键盘快捷键
    addKeyboardShortcuts();
}

// 添加键盘快捷键
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // ESC键关闭模态框
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal');
            if (modal) {
                modal.remove();
            }
        }

        // 数字键快速切换页面
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    showPage('main-menu');
                    break;
                case '2':
                    e.preventDefault();
                    showPage('game');
                    break;
                case '3':
                    e.preventDefault();
                    showPage('leaderboard');
                    break;
                case '4':
                    e.preventDefault();
                    showPage('social');
                    break;
            }
        }
    });
}



// 导出一些有用的函数供控制台调试使用
window.gameDebug = {
    resetGame: () => {
        localStorage.removeItem('kitchenGameData');
        location.reload();
    },
    addCoins: (amount) => {
        gameLogic.playerData.coins += amount;
        gameLogic.savePlayerData();
        gameLogic.updateUI();
        gameLogic.showNotification(`获得 ${amount} 金币！`, 'success');
    },
    addRecipe: (recipeId) => {
        const recipe = GAME_DATA.recipes.find(r => r.id === recipeId);
        if (recipe && !gameLogic.playerData.inventory.recipes.some(r => r.id === recipeId)) {
            gameLogic.playerData.inventory.recipes.push(recipe);
            gameLogic.savePlayerData();
            gameLogic.showNotification(`获得秘籍：${recipe.name}！`, 'success');
        }
    },
    refreshUI: () => {
        if (window.uiManager) {
            uiManager.refreshAllPages();
        }
    },
    testDishRecognition: () => {
        console.log('=== 测试菜品识别 ===');
        console.log('当前选中的食材:', gameLogic.selectedIngredients);
        console.log('当前选中的调味料:', gameLogic.selectedSeasonings);
        
        // 测试识别菜品
        const dish = gameLogic.identifyDish();
        console.log('识别到的菜品:', dish);
        
        if (dish) {
            console.log('菜品名称:', dish.name);
            console.log('菜品图片:', dish.image);
            console.log('菜品描述:', dish.description);
            console.log('菜品稀有度:', dish.rarity);
        } else {
            console.log('没有识别到匹配的菜品');
        }
    },
            addTestIngredients: () => {
            // 添加一些测试食材
            const testIngredients = [
                { id: 1, name: '土豆', icon: '🥔', price: 5, quality: 1, quantity: 5 },
                { id: 12, name: '牛肉', icon: '🥩', price: 30, quality: 5, quantity: 3 },
                { id: 11, name: '猪肉', icon: '🥩', price: 20, quality: 4, quantity: 3 },
                { id: 9, name: '鸡蛋', icon: '🥚', price: 10, quality: 2, quantity: 5 }
            ];
            
            testIngredients.forEach(ingredient => {
                const existingItem = gameLogic.playerData.inventory.ingredients.find(item => item.id === ingredient.id);
                if (existingItem) {
                    existingItem.quantity += ingredient.quantity;
                } else {
                    gameLogic.playerData.inventory.ingredients.push(ingredient);
                }
            });
            
            gameLogic.savePlayerData();
            if (window.uiManager) {
                uiManager.renderGamePage();
            }
            console.log('已添加测试食材');
        },
        testConsumeIngredients: () => {
            console.log('=== 测试食材消耗 ===');
            console.log('当前选中的食材:', gameLogic.selectedIngredients);
            console.log('当前选中的调味料:', gameLogic.selectedSeasonings);
            console.log('消耗前的背包状态:', gameLogic.playerData.inventory);
            
            gameLogic.consumeIngredients();
            gameLogic.savePlayerData();
            
            console.log('消耗后的背包状态:', gameLogic.playerData.inventory);
            
            if (window.uiManager) {
                uiManager.renderGamePage();
            }
            console.log('UI已更新');
        },

};

 