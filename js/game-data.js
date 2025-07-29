// 游戏数据配置
const GAME_DATA = {
    // 食材数据
    ingredients: [
        { id: 1, name: '土豆', icon: '🥔', price: 5, quality: 1 },
        { id: 2, name: '胡萝卜', icon: '🥕', price: 3, quality: 1 },
        { id: 3, name: '洋葱', icon: '🧅', price: 2, quality: 1 },
        { id: 4, name: '西红柿', icon: '🍅', price: 4, quality: 2 },
        { id: 5, name: '青椒', icon: '🫑', price: 3, quality: 1 },
        { id: 6, name: '茄子', icon: '🍆', price: 6, quality: 2 },
        { id: 7, name: '白菜', icon: '🥬', price: 2, quality: 1 },
        { id: 8, name: '豆腐', icon: '🧈', price: 8, quality: 3 },
        { id: 9, name: '鸡蛋', icon: '🥚', price: 10, quality: 2 },
        { id: 10, name: '鸡肉', icon: '🍗', price: 15, quality: 3 },
        { id: 11, name: '猪肉', icon: '🥩', price: 20, quality: 4 },
        { id: 12, name: '牛肉', icon: '🥩', price: 30, quality: 5 },
        { id: 13, name: '虾仁', icon: '🦐', price: 25, quality: 4 },
        { id: 14, name: '鱼片', icon: '🐟', price: 18, quality: 3 },
        { id: 15, name: '蘑菇', icon: '🍄', price: 7, quality: 2 }
    ],

    // 调味料数据
    seasonings: [
        { id: 1, name: '盐', icon: '🧂', price: 1, effect: 1 },
        { id: 2, name: '糖', icon: '🍯', price: 2, effect: 1 },
        { id: 3, name: '酱油', icon: '🍶', price: 3, effect: 2 },
        { id: 4, name: '醋', icon: '🍶', price: 2, effect: 1 },
        { id: 5, name: '辣椒', icon: '🌶️', price: 4, effect: 2 },
        { id: 6, name: '蒜', icon: '🧄', price: 3, effect: 2 },
        { id: 7, name: '姜', icon: '🫚', price: 3, effect: 2 },
        { id: 8, name: '料酒', icon: '🍷', price: 5, effect: 3 },
        { id: 9, name: '蚝油', icon: '🍶', price: 8, effect: 4 },
        { id: 10, name: '豆瓣酱', icon: '🥫', price: 6, effect: 3 }
    ],

    // 烹饪方式数据
    cookingMethods: [
        { id: 'fry', name: '炒', icon: '🍳', difficulty: 1, bonus: 1.2 },
        { id: 'boil', name: '煮', icon: '🥘', difficulty: 1, bonus: 1.0 },
        { id: 'steam', name: '蒸', icon: '🍲', difficulty: 2, bonus: 1.5 },
        { id: 'bake', name: '烤', icon: '🔥', difficulty: 3, bonus: 2.0 }
    ],

    // 美食岛数据
    islands: [
        {
            id: 1,
            name: '川菜岛',
            icon: '🌶️',
            description: '麻辣鲜香的川菜圣地，聚集着众多川菜大师',
            players: [
                { id: 1, name: '麻辣小厨', avatar: '👨‍🍳', level: 15, likes: 128 },
                { id: 2, name: '川味达人', avatar: '👩‍🍳', level: 12, likes: 95 },
                { id: 3, name: '火锅王子', avatar: '👨‍🍳', level: 18, likes: 156 }
            ]
        },
        {
            id: 2,
            name: '粤菜岛',
            icon: '🥘',
            description: '清淡鲜美的粤菜天堂，传统与创新的完美结合',
            players: [
                { id: 4, name: '粤菜师傅', avatar: '👨‍🍳', level: 20, likes: 200 },
                { id: 5, name: '点心女王', avatar: '👩‍🍳', level: 16, likes: 145 },
                { id: 6, name: '汤品专家', avatar: '👨‍🍳', level: 14, likes: 112 }
            ]
        },
        {
            id: 3,
            name: '鲁菜岛',
            icon: '🍖',
            description: '浓香醇厚的鲁菜重镇，北方菜系的代表',
            players: [
                { id: 7, name: '鲁菜大师', avatar: '👨‍🍳', level: 22, likes: 180 },
                { id: 8, name: '面食专家', avatar: '👩‍🍳', level: 13, likes: 98 },
                { id: 9, name: '炖菜高手', avatar: '👨‍🍳', level: 17, likes: 134 }
            ]
        },
        {
            id: 4,
            name: '苏菜岛',
            icon: '🍤',
            description: '精致优雅的苏菜乐园，江南水乡的美食文化',
            players: [
                { id: 10, name: '苏菜名厨', avatar: '👨‍🍳', level: 19, likes: 167 },
                { id: 11, name: '甜点仙子', avatar: '👩‍🍳', level: 15, likes: 123 },
                { id: 12, name: '河鲜专家', avatar: '👨‍🍳', level: 16, likes: 142 }
            ]
        }
    ],

    // 美食秘籍数据
    recipes: [
        { id: 1, name: '麻婆豆腐秘籍', description: '提升川菜烹饪评分20%', effect: 'sichuan_bonus', rarity: 'rare' },
        { id: 2, name: '白切鸡秘籍', description: '提升粤菜烹饪评分20%', effect: 'cantonese_bonus', rarity: 'rare' },
        { id: 3, name: '糖醋里脊秘籍', description: '提升鲁菜烹饪评分20%', effect: 'shandong_bonus', rarity: 'rare' },
        { id: 4, name: '松鼠桂鱼秘籍', description: '提升苏菜烹饪评分20%', effect: 'jiangsu_bonus', rarity: 'rare' },
        { id: 5, name: '火候掌控秘籍', description: '提升所有烹饪评分10%', effect: 'general_bonus', rarity: 'epic' },
        { id: 6, name: '调味大师秘籍', description: '调味料效果提升50%', effect: 'seasoning_bonus', rarity: 'epic' }
    ],

    // 模拟排行榜数据
    leaderboardData: [
        { id: 1, name: '厨神小王', level: 25, coins: 1500, maxScore: 98, avatar: '👨‍🍳' },
        { id: 2, name: '美食达人', level: 23, coins: 1200, maxScore: 95, avatar: '👩‍🍳' },
        { id: 3, name: '料理大师', level: 20, coins: 1000, maxScore: 92, avatar: '👨‍🍳' },
        { id: 4, name: '厨房小能手', level: 18, coins: 800, maxScore: 88, avatar: '👩‍🍳' },
        { id: 5, name: '新手厨师', level: 15, coins: 600, maxScore: 85, avatar: '👨‍🍳' },
        { id: 6, name: '美食爱好者', level: 12, coins: 400, maxScore: 80, avatar: '👩‍🍳' },
        { id: 7, name: '厨房新手', level: 8, coins: 200, maxScore: 75, avatar: '👨‍🍳' },
        { id: 8, name: '料理学徒', level: 5, coins: 100, maxScore: 70, avatar: '👩‍🍳' }
    ]
};

// 菜品图鉴数据
const DISH_RECIPES = [
    {
        id: 1,
        name: '土豆炖牛肉',
        icon: '🥘',
        image: '🥔🥩',
        description: '经典的土豆炖牛肉，肉质鲜嫩，土豆软糯',
        ingredients: [1, 12], // 土豆 + 牛肉
        seasonings: [1], // 盐
        cookingMethod: 'boil', // 煮
        difficulty: 2,
        score: 85,
        rarity: 'common'
    },
    {
        id: 2,
        name: '胡萝卜炒肉丝',
        icon: '🥘',
        image: '🥕🥩',
        description: '清爽的胡萝卜炒肉丝，营养丰富',
        ingredients: [2, 11], // 胡萝卜 + 猪肉
        seasonings: [1, 3], // 盐 + 酱油
        cookingMethod: 'fry', // 炒
        difficulty: 1,
        score: 75,
        rarity: 'common'
    },
    {
        id: 3,
        name: '洋葱炒蛋',
        icon: '🥘',
        image: '🧅🥚',
        description: '简单美味的洋葱炒蛋，香气四溢',
        ingredients: [3, 9], // 洋葱 + 鸡蛋
        seasonings: [1], // 盐
        cookingMethod: 'fry', // 炒
        difficulty: 1,
        score: 70,
        rarity: 'common'
    },
    {
        id: 4,
        name: '清蒸鱼片',
        icon: '🥘',
        image: '🐟',
        description: '鲜美的清蒸鱼片，保持原汁原味',
        ingredients: [14], // 鱼片
        seasonings: [1, 7], // 盐 + 姜
        cookingMethod: 'steam', // 蒸
        difficulty: 2,
        score: 90,
        rarity: 'rare'
    },
    {
        id: 5,
        name: '烤鸡翅',
        icon: '🥘',
        image: '🍗',
        description: '香脆可口的烤鸡翅，外酥里嫩',
        ingredients: [10], // 鸡肉
        seasonings: [1, 5], // 盐 + 辣椒
        cookingMethod: 'bake', // 烤
        difficulty: 2,
        score: 80,
        rarity: 'rare'
    },
    {
        id: 6,
        name: '番茄炒蛋',
        icon: '🥘',
        image: '🍅🥚',
        description: '酸甜可口的番茄炒蛋，开胃下饭',
        ingredients: [4, 9], // 西红柿 + 鸡蛋
        seasonings: [1, 2], // 盐 + 糖
        cookingMethod: 'fry', // 炒
        difficulty: 1,
        score: 75,
        rarity: 'common'
    },
    {
        id: 7,
        name: '蒜蓉炒白菜',
        icon: '🥘',
        image: '🥬🧄',
        description: '清淡爽口的蒜蓉炒白菜，健康美味',
        ingredients: [7], // 白菜
        seasonings: [1, 6], // 盐 + 蒜
        cookingMethod: 'fry', // 炒
        difficulty: 1,
        score: 65,
        rarity: 'common'
    },
    {
        id: 8,
        name: '红烧肉',
        icon: '🥘',
        image: '🥩',
        description: '经典的红烧肉，肥而不腻，入口即化',
        ingredients: [11], // 猪肉
        seasonings: [1, 3, 2], // 盐 + 酱油 + 糖
        cookingMethod: 'boil', // 煮
        difficulty: 3,
        score: 95,
        rarity: 'epic'
    },
    {
        id: 9,
        name: '宫保鸡丁',
        icon: '🥘',
        image: '🍗🥜',
        description: '经典的宫保鸡丁，麻辣鲜香',
        ingredients: [10, 15], // 鸡肉 + 蘑菇
        seasonings: [1, 3, 5], // 盐 + 酱油 + 辣椒
        cookingMethod: 'fry', // 炒
        difficulty: 3,
        score: 90,
        rarity: 'epic'
    },
    {
        id: 10,
        name: '麻婆豆腐',
        icon: '🥘',
        image: '🧈🌶️',
        description: '麻辣鲜香的麻婆豆腐，让人欲罢不能',
        ingredients: [8, 11], // 豆腐 + 猪肉
        seasonings: [1, 5, 10], // 盐 + 辣椒 + 豆瓣酱
        cookingMethod: 'fry', // 炒
        difficulty: 3,
        score: 95,
        rarity: 'epic'
    },
    {
        id: 11,
        name: '青椒炒肉丝',
        icon: '🥘',
        image: '🫑🥩',
        description: '清爽的青椒炒肉丝，开胃下饭',
        ingredients: [5, 11], // 青椒 + 猪肉
        seasonings: [1, 3], // 盐 + 酱油
        cookingMethod: 'fry', // 炒
        difficulty: 1,
        score: 70,
        rarity: 'common'
    },
    {
        id: 12,
        name: '红烧茄子',
        icon: '🥘',
        image: '🍆',
        description: '软糯香甜的红烧茄子，下饭神器',
        ingredients: [6], // 茄子
        seasonings: [1, 3, 2], // 盐 + 酱油 + 糖
        cookingMethod: 'fry', // 炒
        difficulty: 2,
        score: 80,
        rarity: 'rare'
    },
    {
        id: 13,
        name: '白灼虾仁',
        icon: '🥘',
        image: '🦐',
        description: '鲜嫩爽滑的白灼虾仁，原汁原味',
        ingredients: [13], // 虾仁
        seasonings: [1, 7], // 盐 + 姜
        cookingMethod: 'boil', // 煮
        difficulty: 2,
        score: 85,
        rarity: 'rare'
    },
    {
        id: 14,
        name: '蒜蓉炒虾仁',
        icon: '🥘',
        image: '🦐🧄',
        description: '蒜香浓郁的炒虾仁，香气四溢',
        ingredients: [13], // 虾仁
        seasonings: [1, 6], // 盐 + 蒜
        cookingMethod: 'fry', // 炒
        difficulty: 2,
        score: 85,
        rarity: 'rare'
    },
    {
        id: 15,
        name: '蘑菇炒肉片',
        icon: '🥘',
        image: '🍄🥩',
        description: '鲜美的蘑菇炒肉片，营养丰富',
        ingredients: [15, 11], // 蘑菇 + 猪肉
        seasonings: [1, 3], // 盐 + 酱油
        cookingMethod: 'fry', // 炒
        difficulty: 2,
        score: 75,
        rarity: 'rare'
    },
    {
        id: 16,
        name: '咖喱鸡肉赛高',
        icon: '🥘',
        image: '🍛🍗',
        description: '传说中的咖喱鸡肉，香气四溢，让人欲罢不能！',
        ingredients: [1, 10], // 土豆 + 鸡肉
        seasonings: [1, 3], // 盐 + 酱油
        cookingMethod: 'fry', // 炒
        difficulty: 3,
        score: 100,
        rarity: 'legendary'
    }
];

// 黑暗料理数据
const DARK_DISHES = [
    {
        id: 1,
        name: '黑暗料理：焦炭炒蛋',
        icon: '💀',
        image: '🔥🥚',
        description: '鸡蛋被炒成了焦炭，散发着不祥的气息...',
        ingredients: [9], // 鸡蛋
        seasonings: [1], // 盐
        cookingMethod: 'fry',
        difficulty: 1,
        score: 10,
        rarity: 'dark',
        effect: 'burn'
    },
    {
        id: 2,
        name: '黑暗料理：生肉沙拉',
        icon: '💀',
        image: '🥩🥬',
        description: '生肉配生菜，看起来就很危险...',
        ingredients: [11, 7], // 猪肉 + 白菜
        seasonings: [1], // 盐
        cookingMethod: 'fry',
        difficulty: 1,
        score: 15,
        rarity: 'dark',
        effect: 'raw'
    },
    {
        id: 3,
        name: '黑暗料理：盐巴炸弹',
        icon: '💀',
        image: '💣🧂',
        description: '盐放太多了，咸得让人怀疑人生...',
        ingredients: [1, 2], // 土豆 + 胡萝卜
        seasonings: [1, 1, 1], // 盐 + 盐 + 盐
        cookingMethod: 'fry',
        difficulty: 2,
        score: 20,
        rarity: 'dark',
        effect: 'salty'
    },
    {
        id: 4,
        name: '黑暗料理：糖醋地狱',
        icon: '💀',
        image: '🍯🌶️',
        description: '糖和醋的完美结合，酸得让人流泪...',
        ingredients: [4, 5], // 西红柿 + 青椒
        seasonings: [2, 4, 2], // 糖 + 醋 + 糖
        cookingMethod: 'fry',
        difficulty: 2,
        score: 25,
        rarity: 'dark',
        effect: 'sour'
    },
    {
        id: 5,
        name: '黑暗料理：辣椒火山',
        icon: '💀',
        image: '🌋🌶️',
        description: '辣椒堆成山，辣得让人怀疑人生...',
        ingredients: [5, 5, 5], // 青椒 + 青椒 + 青椒
        seasonings: [5, 5], // 辣椒 + 辣椒
        cookingMethod: 'fry',
        difficulty: 3,
        score: 30,
        rarity: 'dark',
        effect: 'spicy'
    },
    {
        id: 6,
        name: '黑暗料理：生鱼片寿司',
        icon: '💀',
        image: '🐟🍣',
        description: '用普通鱼片做的寿司，看起来就很可疑...',
        ingredients: [14], // 鱼片
        seasonings: [1], // 盐
        cookingMethod: 'fry',
        difficulty: 2,
        score: 35,
        rarity: 'dark',
        effect: 'suspicious'
    },
    {
        id: 7,
        name: '黑暗料理：豆腐泥',
        icon: '💀',
        image: '🧈💩',
        description: '豆腐被煮成了泥，看起来像...',
        ingredients: [8], // 豆腐
        seasonings: [1, 3], // 盐 + 酱油
        cookingMethod: 'boil',
        difficulty: 1,
        score: 40,
        rarity: 'dark',
        effect: 'mush'
    },
    {
        id: 8,
        name: '黑暗料理：蘑菇毒汤',
        icon: '💀',
        image: '🍄☠️',
        description: '蘑菇汤看起来有毒，散发着诡异的光芒...',
        ingredients: [15, 15], // 蘑菇 + 蘑菇
        seasonings: [1, 7], // 盐 + 姜
        cookingMethod: 'boil',
        difficulty: 2,
        score: 45,
        rarity: 'dark',
        effect: 'poison'
    }
];

// 稀有度配置
const RARITY_CONFIG = {
    common: { name: '普通', color: '#6c757d', bonus: 1.0 },
    rare: { name: '稀有', color: '#007bff', bonus: 1.2 },
    epic: { name: '史诗', color: '#6f42c1', bonus: 1.5 },
    legendary: { name: '传说', color: '#fd7e14', bonus: 2.0 },
    dark: { name: '黑暗', color: '#dc3545', bonus: 0.5 }
};

// 玩家初始数据
const INITIAL_PLAYER_DATA = {
    level: 1,
    coins: 100,
    experience: 0,
    maxScore: 0,
    inventory: {
        ingredients: [
            { id: 1, name: '土豆', icon: '🥔', price: 5, quality: 1, quantity: 2 },
            { id: 2, name: '胡萝卜', icon: '🥕', price: 3, quality: 1, quantity: 2 },
            { id: 3, name: '洋葱', icon: '🧅', price: 2, quality: 1, quantity: 2 },
            { id: 9, name: '鸡蛋', icon: '🥚', price: 10, quality: 2, quantity: 2 }
        ],
        seasonings: [
            { id: 1, name: '盐', icon: '🧂', price: 1, effect: 1, quantity: 3 },
            { id: 2, name: '糖', icon: '🍯', price: 2, effect: 1, quantity: 2 }
        ],
        recipes: []
    },
    discoveredDishes: [], // 已发现的菜品
    likedPlayers: []
};

// 等级经验值配置
const LEVEL_EXP = {
    1: 0,
    2: 100,
    3: 250,
    4: 450,
    5: 700,
    6: 1000,
    7: 1350,
    8: 1750,
    9: 2200,
    10: 2700,
    11: 3250,
    12: 3850,
    13: 4500,
    14: 5200,
    15: 5950,
    16: 6750,
    17: 7600,
    18: 8500,
    19: 9450,
    20: 10450
}; 