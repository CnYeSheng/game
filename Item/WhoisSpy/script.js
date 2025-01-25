// 定義預設詞庫
const DEFAULT_WORD_PAIRS = [
    { normal: '手機', spy: '平板' },
    { normal: '筷子', spy: '叉子' },
    { normal: '西瓜', spy: '哈密瓜' },
    { normal: '蘋果', spy: '梨子' },
    { normal: '電視', spy: '電腦' },
    { normal: '公車', spy: '計程車' },
    { normal: '可樂', spy: '雪碧' },
    { normal: '警察', spy: '保全' },
    { normal: '醫生', spy: '護士' },
    { normal: '足球', spy: '籃球' },
    { normal: '珍珠奶茶', spy: '波霸奶茶' },
    { normal: '滷肉飯', spy: '雞肉飯' },
    { normal: '台鐵', spy: '高鐵' },
    { normal: '士林夜市', spy: '饒河夜市' },
    { normal: '小籠包', spy: '湯包' },
    { normal: '蝦餃', spy: '燒賣' },
    { normal: '悠遊卡', spy: '一卡通' },
    { normal: '捷運', spy: '公車' },
    { normal: '藍白拖', spy: '拖鞋' },
    { normal: '台灣啤酒', spy: '金牌啤酒' },
    { normal: '牛肉麵', spy: '陽春麵' },
    { normal: '太陽餅', spy: '鳳梨酥' },
    { normal: '基隆廟口', spy: '逢甲夜市' },
    { normal: '旗津', spy: '淡水' },
    { normal: '藍晒圖', spy: '赤崁樓' },
    { normal: '火鍋', spy: '涮涮鍋' },
    { normal: '鹹酥雞', spy: '炸雞排' },
    { normal: '沙茶醬', spy: '胡椒鹽' },
    { normal: '手搖飲料', spy: '罐裝飲料' },
    { normal: '奶酥吐司', spy: '花生吐司' },
    { normal: '鹹豆漿', spy: '甜豆漿' },
    { normal: '燒仙草', spy: '芋圓' },
    { normal: '台灣大哥大', spy: '中華電信' },
    { normal: '高雄捷運', spy: '台北捷運' },
    { normal: '阿里山', spy: '陽明山' },
    { normal: '海洋音樂祭', spy: '跨年演唱會' },
    { normal: '棺材板', spy: '蚵仔煎' },
    { normal: '包種茶', spy: '烏龍茶' },
    { normal: '金門高粱', spy: '台灣啤酒' },
    { normal: '旗津渡輪', spy: '淡水渡輪' },
    { normal: '貢丸湯', spy: '四神湯' },
    { normal: '關廟麵', spy: '陽春麵' },
    { normal: '車輪餅', spy: '紅豆餅' },
    { normal: '微熱山丘', spy: '佳德鳳梨酥' },
    { normal: '小籠包', spy: '灌湯包' },
    { normal: '剉冰', spy: '雪花冰' },
    { normal: '春水堂', spy: '50嵐' },
    { normal: '肉圓', spy: '水晶餃' },
    { normal: '廟會', spy: '燈會' },
    { normal: '農夫市集', spy: '夜市' },
    { normal: '綠島', spy: '蘭嶼' },
    { normal: '墾丁大街', spy: '西門町' },
    { normal: '三仙台', spy: '北海岸' },
    { normal: '北迴歸線', spy: '赤道' },
    { normal: '豆花', spy: '布丁' },
    { normal: '愛玉冰', spy: '仙草蜜' },
    { normal: '滷蛋', spy: '茶葉蛋' },
    { normal: '大甲媽祖', spy: '白沙屯媽祖' },
    { normal: '綠豆椪', spy: '月餅' },
    { normal: '竹筍', spy: '蘆筍' },
    { normal: '龍山寺', spy: '行天宮' },
    { normal: '國父紀念館', spy: '中正紀念堂' },
    { normal: '蔥抓餅', spy: '蛋餅' },
    { normal: '九份', spy: '十分' },
    { normal: '埔里酒廠', spy: '金門酒廠' },
    { normal: '風獅爺', spy: '媽祖像' },
    { normal: '澎湖花火節', spy: '台北燈節' },
    { normal: '炸年糕', spy: '蘿蔔糕' },
    { normal: '花枝羹', spy: '蚵仔羹' },
    { normal: '黑糖珍奶', spy: '白珍奶' },
    { normal: '珍珠丸子', spy: '糯米腸' },
    { normal: '龍眼', spy: '荔枝' },
    { normal: '梅子綠茶', spy: '檸檬紅茶' },
    { normal: '台灣黑熊', spy: '石虎' },
    { normal: '鹽酥雞', spy: '雞翅' },
    { normal: '車城福安宮', spy: '鹿港天后宮' },
    { normal: '釋迦', spy: '蓮霧' },
    { normal: '麻辣鍋', spy: '壽喜燒' },
    { normal: '台東池上便當', spy: '台鐵便當' },
    { normal: '烤玉米', spy: '爆米花' },
    { normal: '鐵蛋', spy: '皮蛋' },
    { normal: '嘉義雞肉飯', spy: '台南鱔魚意麵' },
    { normal: '土鳳梨酥', spy: '鳳梨蛋糕' },
    { normal: '鹽水蜂炮', spy: '台東炸寒單' },
    { normal: '愛河', spy: '濁水溪' },
    { normal: '日月潭', spy: '澎湖' },
    { normal: '東港黑鮪魚', spy: '基隆鮭魚' },
    { normal: '花生糖', spy: '牛軋糖' },
    { normal: '臭豆腐', spy: '豆干' },
    { normal: '泡泡冰', spy: '剉冰' },
    { normal: '蛋黃酥', spy: '芋頭酥' },
    { normal: '芋頭冰沙', spy: '紅豆冰沙' },
    { normal: '台灣藍鵲', spy: '喜鵲' },
    { normal: '關子嶺泥漿溫泉', spy: '北投溫泉' },
    { normal: '鳳梨蝦球', spy: '宮保雞丁' },
    { normal: '三杯雞', spy: '滷雞' },
    { normal: '台南牛肉湯', spy: '羊肉爐' },
    { normal: '綠島藍洞', spy: '小琉球花瓶岩' },
    { normal: '花蓮麻糬', spy: '草仔粿' },
    { normal: '大稻埕煙火', spy: '101跨年煙火' },
    { normal: '香腸', spy: '熱狗' },
    { normal: '豆干', spy: '烤魷魚' },
    { normal: '蚵仔麵線', spy: '肉羹麵' },
    { normal: '三峽長青吊橋', spy: '烏來吊橋' },
    { normal: '桂圓紅棗茶', spy: '冬瓜茶' },
    { normal: '清冰', spy: '紅豆冰' },
    { normal: '米苔目', spy: '粄條' },
    { normal: '三重芋圓', spy: '九份芋圓' },
    { normal: '貓空纜車', spy: '台北101觀景台' },
    { normal: '飛機杯', spy: '馬克杯' }, // (搞笑用)
    { normal: '龍潭大池', spy: '澎湖湖西' },
    { normal: '宜蘭三星蔥', spy: '台中梧棲文旦' },
    { normal: '阿給', spy: '豆皮壽司' },
    { normal: '高美濕地', spy: '石門水庫' },
    { normal: '鹿港老街', spy: '九份老街' },
    { normal: '台灣啤酒黑麥汁', spy: '蘋果西打' },
    { normal: '沙鹿肉圓', spy: '彰化肉圓' },
    { normal: '阿里山神木', spy: '玉山' },
    { normal: '油飯', spy: '糯米雞' },
    { normal: '台灣檜木', spy: '紅檜' },
    { normal: '筍乾排骨湯', spy: '酸菜白肉鍋' },
    { normal: '媽祖遶境', spy: '燈籠花燈會' },
    { normal: '香蕉煎餅', spy: '香酥雞' },
    { normal: '九份山城', spy: '基隆廟口' },
    { normal: '麻油雞', spy: '雞酒' },
    { normal: '桃園機場', spy: '松山機場' },
    { normal: '宜蘭冷泉', spy: '台東溫泉' },
    { normal: '甘梅薯條', spy: '原味薯條' },
    { normal: '木瓜牛奶', spy: '香蕉牛奶' },
    { normal: '藥燉排骨', spy: '羊肉爐' },
    { normal: '電風扇', spy: '空調' },
    { normal: '洗衣機', spy: '烘衣機' },
    { normal: '電梯', spy: '手扶梯' },
    { normal: '冰箱', spy: '冷凍庫' },
    { normal: '牙刷', spy: '牙線' },
    { normal: '筆記本', spy: '記事本' },
    { normal: '影印機', spy: '掃描機' },
    { normal: '吸塵器', spy: '掃地機器人' },
    { normal: '餐桌', spy: '茶几' },
    { normal: '雨傘', spy: '雨衣' },
    { normal: '保溫瓶', spy: '水壺' },
    { normal: '微波爐', spy: '烤箱' },
    { normal: '衛生紙', spy: '濕紙巾' },
    { normal: '牛奶', spy: '豆漿' },
    { normal: '冷氣遙控器', spy: '電視遙控器' },
    { normal: '枕頭', spy: '抱枕' },
    { normal: '棉被', spy: '床單' },
    { normal: '牙膏', spy: '洗面乳' },
    { normal: '洗髮精', spy: '沐浴乳' },
    { normal: '馬桶', spy: '洗手台' },
    { normal: '熱水器', spy: '飲水機' },
    { normal: '指甲剪', spy: '剪刀' },
    { normal: '刮鬍刀', spy: '拔毛器' },
    { normal: '手機充電器', spy: '行動電源' },
    { normal: '電腦滑鼠', spy: '鍵盤' },
    { normal: '耳機', spy: '喇叭' },
    { normal: '吹風機', spy: '直髮夾' },
    { normal: '計算機', spy: '手機' },
    { normal: '藥箱', spy: '急救箱' },
    { normal: '垃圾桶', spy: '回收桶' },
    { normal: '水龍頭', spy: '淋浴頭' },
    { normal: '日曆', spy: '時鐘' },
    { normal: '保鮮膜', spy: '鋁箔紙' },
    { normal: '牙籤', spy: '筷子' },
    { normal: '窗簾', spy: '百葉窗' },
    { normal: '鏡子', spy: '相框' },
    { normal: '指紋鎖', spy: '密碼鎖' },
    { normal: '餐巾紙', spy: '濕紙巾' },
    { normal: '腳踏車', spy: '電動車' },
    { normal: '安全帽', spy: '棒球帽' },
    { normal: '口罩', spy: '眼罩' },
    { normal: '背包', spy: '行李箱' },
    { normal: '手錶', spy: '智能手環' },
    { normal: '塑膠袋', spy: '環保袋' },
    { normal: '便當盒', spy: '保鮮盒' },
    { normal: '眼鏡', spy: '隱形眼鏡' },
    { normal: '洗碗精', spy: '肥皂' },
    { normal: '菜瓜布', spy: '鋼絲刷' },
    { normal: '水壺', spy: '咖啡杯' },
    { normal: '螢幕', spy: '投影機' },
    { normal: '咖啡', spy: '茶' },
    { normal: '機車', spy: '腳踏車' },
    { normal: '書桌', spy: '餐桌' },
    { normal: '手套', spy: '襪子' },
    { normal: '啤酒', spy: '紅酒' },
    { normal: '運動鞋', spy: '拖鞋' },
    { normal: '貓', spy: '狗' },
    { normal: '沙發', spy: '椅子' },
    { normal: '燈泡', spy: '蠟燭' },
    { normal: '手機殼', spy: '平板保護套' },
    { normal: '背包', spy: '手提包' },
    { normal: '泳池', spy: '海邊' },
    { normal: '電影院', spy: '劇院' },
    { normal: '耳機', spy: '耳罩' },
    { normal: '地毯', spy: '地墊' },
    { normal: '冰箱', spy: '冷凍庫' },
    { normal: '馬拉松', spy: '慢跑' },
    { normal: '手錶', spy: '鬧鐘' },
    { normal: '剪刀', spy: '美工刀' },
    { normal: '烤箱', spy: '微波爐' },
    { normal: '窗簾', spy: '百葉窗' },
    { normal: '洗衣粉', spy: '柔軟精' },
    { normal: '蛋糕', spy: '麵包' },
    { normal: '牛排', spy: '漢堡' },
    { normal: '吉他', spy: '小提琴' },
    { normal: '冰淇淋', spy: '雪糕' },
    { normal: '襯衫', spy: 'T 恤' },
    { normal: '衛生紙', spy: '濕紙巾' },
    { normal: '足球', spy: '籃球' },
    { normal: '花', spy: '盆栽' },
    { normal: '地球儀', spy: '地圖' },
    { normal: '雨靴', spy: '登山鞋' },
    { normal: '洋裝', spy: '裙子' },
    { normal: '電腦', spy: '平板' },
    { normal: '牙刷', spy: '牙線棒' },
    { normal: '刮鬍刀', spy: '電動刮鬍刀' },
    { normal: '熱氣球', spy: '直升機' },
    { normal: '滑板', spy: '溜冰鞋' },
    { normal: '枕頭', spy: '靠墊' },
    { normal: '外套', spy: '毛衣' },
    { normal: '洗髮精', spy: '潤髮乳' },
    { normal: '餅乾', spy: '糖果' },
    { normal: '泳衣', spy: '運動服' },
    { normal: '地圖', spy: '導航儀' },
    { normal: '毛巾', spy: '浴巾' },
    { normal: '鋼琴', spy: '電子琴' },
    { normal: '飛機', spy: '火車' },
    { normal: '白板', spy: '黑板' },
    { normal: '手提箱', spy: '背包' },
    { normal: '酒杯', spy: '咖啡杯' }
];

// 初始化詞語庫
const wordPairs = [...DEFAULT_WORD_PAIRS];

// 遊戲狀態
let gameState = {
    totalPlayers: 20,
    spyCount: 1,
    blankCount: 1,
    currentPlayer: 0,
    spyIndexes: [],
    blankIndexes: [],
    normalWord: '',
    spyWord: '',
    playerRoles: [],
    eliminatedPlayers: new Set(),
    playerNames: []
};

// DOM 元素
const screens = {
    setup: document.getElementById('setupScreen'),
    names: document.getElementById('namesScreen'),
    role: document.getElementById('roleScreen'),
    game: document.getElementById('gameScreen'),
    end: document.getElementById('endScreen'),
    words: document.getElementById('wordsScreen'),
};

const elements = {
    playerCount: document.getElementById('playerCount'),
    spyCount: document.getElementById('spyCount'),
    blankCount: document.getElementById('blankCount'),
    startBtn: document.getElementById('startBtn'),
    currentPlayer: document.getElementById('currentPlayer'),
    showRole: document.getElementById('showRole'),
    roleText: document.getElementById('roleText'),
    wordDisplay: document.getElementById('wordDisplay'),
    nextPlayer: document.getElementById('nextPlayer'),
    resultDisplay: document.getElementById('resultDisplay'),
    restartBtn: document.getElementById('restartBtn'),
    voteResult: document.getElementById('voteResult'),
    voteCount: document.getElementById('voteCount'),
    wordCheckArea: document.getElementById('wordCheckArea'),
    playerWordDisplay: document.getElementById('playerWordDisplay'),
    playerButtons: document.getElementById('playerButtons'),
    actionButtons: document.getElementById('actionButtons'),
    selectedPlayer: document.getElementById('selectedPlayer'),
    showWordBtn: document.getElementById('showWordBtn'),
    votePlayerBtn: document.getElementById('votePlayerBtn'),
    closeWordBtn: document.getElementById('closeWordBtn'),
    playerNames: document.getElementById('playerNames'),
    namesContainer: document.querySelector('.names-container'),
    setNamesBtn: document.getElementById('setNamesBtn'),
    saveNamesBtn: document.getElementById('saveNamesBtn'),
    backToSetupBtn: document.getElementById('backToSetupBtn'),
    customWordsBtn: document.getElementById('customWordsBtn'),
    wordPairList: document.querySelector('.word-pair-list'),
    addWordPairBtn: document.getElementById('addWordPairBtn'),
    saveWordsBtn: document.getElementById('saveWordsBtn'),
    backToSetupFromWordsBtn: document.getElementById('backToSetupFromWordsBtn'),
    restoreDefaultWordsBtn: document.getElementById('restoreDefaultWordsBtn'),
};

// 添加當前選擇的玩家狀態
let selectedPlayerIndex = -1;

// 初始化遊戲
function initGame() {
    gameState.totalPlayers = parseInt(elements.playerCount.value);
    gameState.spyCount = parseInt(elements.spyCount.value);
    gameState.blankCount = gameState.totalPlayers < 5 ? 0 : parseInt(elements.blankCount.value);
    gameState.currentPlayer = 0;
    
    // 檢查詞庫是否空
    if (wordPairs.length === 0) {
        alert('請先設置詞庫！');
        return;
    }
    
    // 選擇詞語
    const wordPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    gameState.normalWord = wordPair.normal;
    gameState.spyWord = wordPair.spy;
    
    // 分配角色
    gameState.playerRoles = new Array(gameState.totalPlayers).fill('normal');
    gameState.spyIndexes = [];
    gameState.blankIndexes = [];
    
    // 隨機選擇臥底
    while (gameState.spyIndexes.length < gameState.spyCount) {
        const spyIndex = Math.floor(Math.random() * gameState.totalPlayers);
        if (!gameState.spyIndexes.includes(spyIndex) && !gameState.blankIndexes.includes(spyIndex)) {
            gameState.spyIndexes.push(spyIndex);
            gameState.playerRoles[spyIndex] = 'spy';
        }
    }
    
    // 隨機選擇白板
    while (gameState.blankIndexes.length < gameState.blankCount) {
        const blankIndex = Math.floor(Math.random() * gameState.totalPlayers);
        if (!gameState.spyIndexes.includes(blankIndex) && !gameState.blankIndexes.includes(blankIndex)) {
            gameState.blankIndexes.push(blankIndex);
            gameState.playerRoles[blankIndex] = 'blank';
        }
    }
    
    // 重置遊戲狀態
    gameState.eliminatedPlayers.clear();
    elements.wordCheckArea.classList.add('hidden');
    selectedPlayerIndex = -1;
    
    showScreen('role');
    updateRoleDisplay();
}

// 修改更新角色顯示函數
function updateRoleDisplay() {
    // 使用玩家名稱而不是編號
    elements.currentPlayer.textContent = gameState.playerNames[gameState.currentPlayer];
    elements.roleText.classList.add('hidden');
    elements.showRole.classList.remove('hidden');
    elements.nextPlayer.classList.add('hidden');
}

// 顯示角色
function showRole() {
    const role = gameState.playerRoles[gameState.currentPlayer];
    let word = '';
    
    switch(role) {
        case 'spy':
            word = gameState.spyWord;
            break;
        case 'blank':
            word = '白板';
            break;
        default:
            word = gameState.normalWord;
    }
    
    elements.wordDisplay.textContent = word;
    elements.roleText.classList.remove('hidden');
    elements.showRole.classList.add('hidden');
    elements.nextPlayer.classList.remove('hidden');
}

// 下一位玩家
function nextPlayer() {
    gameState.currentPlayer++;
    if (gameState.currentPlayer < gameState.totalPlayers) {
        updateRoleDisplay();
    } else {
        showScreen('game');
    }
}

// 結束遊戲
function endGame() {
    let resultText = `遊戲結束！\n`;
    resultText += `平民詞語：${gameState.normalWord}\n`;
    resultText += `臥底詞語：${gameState.spyWord}\n`;
    resultText += `白板：`;
    
    gameState.blankIndexes.forEach((blankIndex, index) => {
        resultText += gameState.playerNames[blankIndex];
        if (index < gameState.blankIndexes.length - 1) {
            resultText += '、';
        }
    });
    
    resultText += `\n臥底：`;
    gameState.spyIndexes.forEach((spyIndex, index) => {
        resultText += gameState.playerNames[spyIndex];
        if (index < gameState.spyIndexes.length - 1) {
            resultText += '、';
        }
    });
    
    // 計算剩餘玩家數數量
    const remainingSpies = gameState.spyIndexes.filter(spy => !gameState.eliminatedPlayers.has(spy)).length;
    const remainingNormals = gameState.totalPlayers - gameState.eliminatedPlayers.size - remainingSpies;
    
    resultText += '\n\n遊戲結果：';
    if (remainingSpies === 0) {
        resultText += '\n平民獲勝！成功找出所有臥底！';
    } else if (remainingSpies >= remainingNormals) {
        resultText += '\n臥底獲勝！剩餘臥底數量已經大於或等於平民數量！';
        resultText += `\n剩餘臥底：${remainingSpies}人`;
        resultText += `\n剩餘平民：${remainingNormals}人`;
    }
    
    elements.resultDisplay.innerHTML = resultText.replace(/\n/g, '<br>');
    showScreen('end');
}

// 切換顯示畫面
function showScreen(screenName) {
    Object.keys(screens).forEach(key => {
        screens[key].classList.add('hidden');
    });
    screens[screenName].classList.remove('hidden');
    
    // 如果切換到設置界面，清理界面
    if (screenName === 'setup') {
        elements.voteResult.classList.add('hidden');
    }
    
    // 如果切換到遊戲進行界面，初始化玩家按鈕
    if (screenName === 'game') {
        initPlayerButtons();
        elements.actionButtons.classList.add('hidden');
        elements.wordCheckArea.classList.add('hidden');
    }
}

// 簡化投票處理函數
function handleVote(eliminatedPlayer) {
    gameState.eliminatedPlayers.add(eliminatedPlayer);
    
    let resultText = `決定淘汰${gameState.playerNames[eliminatedPlayer]}！`;
    elements.voteCount.innerHTML = resultText;
    elements.voteResult.classList.remove('hidden');
    
    // 更新玩家按鈕狀態
    initPlayerButtons();
    
    // 檢查遊戲是否結束
    if (checkGameEnd(eliminatedPlayer)) {
        setTimeout(() => endGame(), 2000);
    } else {
        // 3秒後隱藏投票結果
        setTimeout(() => {
            elements.voteResult.classList.add('hidden');
        }, 3000);
    }
}

// 檢查遊戲是否結束
function checkGameEnd(eliminatedPlayer) {
    // 如果被淘汰的是臥底
    if (gameState.spyIndexes.includes(eliminatedPlayer)) {
        // 檢查是否所有臥底都被淘汰
        const remainingSpies = gameState.spyIndexes.filter(spy => !gameState.eliminatedPlayers.has(spy)).length;
        return remainingSpies === 0;
    }
    
    // 計算剩餘的臥底和平民數量
    let remainingSpies = gameState.spyIndexes.filter(spy => !gameState.eliminatedPlayers.has(spy)).length;
    let remainingNormals = gameState.totalPlayers - gameState.eliminatedPlayers.size - remainingSpies;
    
    // 如果剩餘臥底數量大於或等於平民數量，臥底獲勝
    return remainingSpies >= remainingNormals;
}

// 添加查看詞語相關函數
function initWordCheck() {
    // 清空並重新生成玩家選擇下拉選單
    elements.playerSelect.innerHTML = '';
    for (let i = 0; i < gameState.totalPlayers; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `玩家 ${i + 1}`;
        elements.playerSelect.appendChild(option);
    }
    
    elements.wordCheckArea.classList.remove('hidden');
    elements.playerWordCheck.classList.add('hidden');
    elements.playerWord.classList.add('hidden');
}

// 確認玩家身份
function confirmPlayerSelect() {
    elements.playerSelect.disabled = true;
    elements.confirmPlayer.disabled = true;
    elements.playerWordCheck.classList.remove('hidden');
}

// 修改顯示玩家詞語函數
function showPlayerWord() {
    if (selectedPlayerIndex === -1) return;
    
    const role = gameState.playerRoles[selectedPlayerIndex];
    let word = '';
    
    switch(role) {
        case 'spy':
            word = gameState.spyWord;
            break;
        case 'blank':
            word = '白板';
            break;
        default:
            word = gameState.normalWord;
    }
    
    elements.playerWordDisplay.textContent = word;
    elements.wordCheckArea.classList.remove('hidden');
    elements.actionButtons.classList.add('hidden');
}

// 關閉詞語顯示
function closeWordDisplay() {
    elements.wordCheckArea.classList.add('hidden');
    elements.actionButtons.classList.add('hidden');
    selectedPlayerIndex = -1;
}

// 投票淘汰玩家
function votePlayer() {
    if (selectedPlayerIndex === -1) return;
    
    handleVote(selectedPlayerIndex);
    elements.actionButtons.classList.add('hidden');
    selectedPlayerIndex = -1;
}

// 初始化玩家按鈕
function initPlayerButtons() {
    elements.playerButtons.innerHTML = '';
    for (let i = 0; i < gameState.totalPlayers; i++) {
        const button = document.createElement('button');
        button.className = 'player-btn';
        if (gameState.eliminatedPlayers.has(i)) {
            button.className += ' eliminated';
        }
        button.textContent = gameState.playerNames[i];
        button.addEventListener('click', () => selectPlayer(i));
        elements.playerButtons.appendChild(button);
    }
}

// 選擇玩家
function selectPlayer(playerIndex) {
    if (gameState.eliminatedPlayers.has(playerIndex)) {
        return;
    }
    
    selectedPlayerIndex = playerIndex;
    elements.selectedPlayer.textContent = gameState.playerNames[playerIndex];
    elements.actionButtons.classList.remove('hidden');
    elements.wordCheckArea.classList.add('hidden');
}

// 事件監聽
elements.startBtn.addEventListener('click', initGame);
elements.showRole.addEventListener('click', showRole);
elements.nextPlayer.addEventListener('click', nextPlayer);
elements.restartBtn.addEventListener('click', () => showScreen('setup'));
elements.showWordBtn.addEventListener('click', showPlayerWord);
elements.votePlayerBtn.addEventListener('click', votePlayer);
elements.closeWordBtn.addEventListener('click', closeWordDisplay);

// 更新臥底人數的最大值
function updateSpyCountLimit() {
    const playerCount = parseInt(elements.playerCount.value);
    const maxSpies = Math.floor((playerCount - 2) / 2); // 臥底最多只能是總人數-2的一半
    
    // 更新臥底數量的限制
    elements.spyCount.max = maxSpies;
    
    // 如果當前臥底數量超過新的最大值，調整它
    if (parseInt(elements.spyCount.value) > maxSpies) {
        elements.spyCount.value = maxSpies;
    }
    
    // 如果當前臥底數量等於玩家數量，減少臥底數量
    if (parseInt(elements.spyCount.value) >= playerCount) {
        elements.spyCount.value = playerCount - 1;
    }
}

// 修改玩家人數驗證
elements.playerCount.addEventListener('change', function() {
    const value = parseInt(this.value);
    if (value < 4) this.value = 4;
    if (value > 20) this.value = 20;
    
    // 更新臥底人數限制
    updateSpyCountLimit();
    
    // 如果玩家人數小於5，禁用白板選項
    if (value < 5) {
        elements.blankCount.value = 0;
        elements.blankCount.disabled = true;
    } else {
        elements.blankCount.disabled = false;
    }
    
    // 更新玩家名稱數組
    const newPlayerCount = parseInt(this.value);
    while (gameState.playerNames.length < newPlayerCount) {
        gameState.playerNames.push(`玩家 ${gameState.playerNames.length + 1}`);
    }
    gameState.playerNames.length = newPlayerCount;  // 如果減少玩家數量，截斷數組
    
    updatePlayerNameInputs();
});

// 修改臥底人數驗證
elements.spyCount.addEventListener('change', function() {
    const playerCount = parseInt(elements.playerCount.value);
    const value = parseInt(this.value);
    const maxSpies = Math.floor((playerCount - 1) / 2);
    
    if (value < 1) this.value = 1;
    if (value > maxSpies) this.value = maxSpies;
    if (value >= playerCount) this.value = playerCount - 1;
});

// 更新玩家名稱輸入框
function updatePlayerNameInputs() {
    const playerCount = parseInt(elements.playerCount.value);
    elements.namesContainer.innerHTML = '';
    
    for (let i = 0; i < playerCount; i++) {
        const div = document.createElement('div');
        div.className = 'name-input-group';
        
        const label = document.createElement('label');
        label.textContent = `玩家 ${i + 1}：`;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `玩家 ${i + 1}`;
        input.value = gameState.playerNames[i] || input.placeholder;
        input.className = 'player-name-input';
        
        div.appendChild(label);
        div.appendChild(input);
        elements.namesContainer.appendChild(div);
    }
}

// 修改玩家名稱相關函數
function savePlayerNames() {
    gameState.playerNames = Array.from(
        document.querySelectorAll('.player-name-input')
    ).map(input => input.value.trim() || input.placeholder);
    showScreen('setup');
}

// 添加事件監聽
elements.setNamesBtn.addEventListener('click', () => {
    updatePlayerNameInputs();
    showScreen('names');
});
elements.saveNamesBtn.addEventListener('click', savePlayerNames);
elements.backToSetupBtn.addEventListener('click', () => showScreen('setup'));

// 添加自定義詞庫相關函數
function createWordPairElement(normal = '', spy = '') {
    const div = document.createElement('div');
    div.className = 'word-pair';
    
    const normalInput = document.createElement('input');
    normalInput.type = 'text';
    normalInput.placeholder = '平民詞語';
    normalInput.value = normal;
    normalInput.className = 'normal-word';
    
    const spyInput = document.createElement('input');
    spyInput.type = 'text';
    spyInput.placeholder = '臥底詞語';
    spyInput.value = spy;
    spyInput.className = 'spy-word';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '刪除';
    deleteBtn.onclick = () => div.remove();
    
    div.appendChild(normalInput);
    div.appendChild(spyInput);
    div.appendChild(deleteBtn);
    
    return div;
}

function initWordPairs() {
    elements.wordPairList.innerHTML = '';
    // 從 localStorage 讀取自定義詞庫，如果沒有就使用預設詞庫
    const savedWords = JSON.parse(localStorage.getItem('customWordPairs')) || wordPairs;
    
    savedWords.forEach(pair => {
        elements.wordPairList.appendChild(
            createWordPairElement(pair.normal, pair.spy)
        );
    });
}

function saveWordPairs() {
    const pairs = Array.from(elements.wordPairList.children).map(div => ({
        normal: div.querySelector('.normal-word').value.trim(),
        spy: div.querySelector('.spy-word').value.trim()
    })).filter(pair => pair.normal && pair.spy); // 過濾掉空的詞語對
    
    if (pairs.length === 0) {
        alert('請至少添加一組詞語！');
        return;
    }
    
    localStorage.setItem('customWordPairs', JSON.stringify(pairs));
    wordPairs.length = 0; // 清空原有詞庫
    wordPairs.push(...pairs); // 添加新詞庫
    showScreen('setup');
}

// 添加事件監聽
elements.customWordsBtn.addEventListener('click', () => {
    initWordPairs();
    showScreen('words');
});
elements.addWordPairBtn.addEventListener('click', () => {
    elements.wordPairList.appendChild(createWordPairElement());
});
elements.saveWordsBtn.addEventListener('click', saveWordPairs);
elements.backToSetupFromWordsBtn.addEventListener('click', () => showScreen('setup'));

// 修改恢復預設詞庫函數
function restoreDefaultWords() {
    if (confirm('確定要恢復預設詞庫嗎？這將會清除所有自定義詞語！')) {
        // 清空現有詞庫列表
        elements.wordPairList.innerHTML = '';
        
        // 更新 wordPairs 和顯示
        wordPairs.length = 0;
        wordPairs.push(...DEFAULT_WORD_PAIRS);
        
        // 顯示預設詞庫
        wordPairs.forEach(pair => {
            elements.wordPairList.appendChild(
                createWordPairElement(pair.normal, pair.spy)
            );
        });
        
        // 清除 localStorage
        localStorage.removeItem('customWordPairs');
        
        alert('已恢復預設詞庫！');
    }
}

// 添加事件監聽
elements.restoreDefaultWordsBtn.addEventListener('click', restoreDefaultWords);

// 在頁面加載時初始化
window.addEventListener('load', function() {
    const playerCount = parseInt(elements.playerCount.value);
    
    // 初始化白板設置
    if (playerCount < 5) {
        elements.blankCount.value = 0;
        elements.blankCount.disabled = true;
    }
    
    // 初始化臥底人數限制
    updateSpyCountLimit();
    
    // 初始化玩家名稱
    gameState.playerNames = Array(playerCount).fill('').map((_, i) => `玩家 ${i + 1}`);
    
    // 從 localStorage 讀取自定義詞庫
    const savedWords = JSON.parse(localStorage.getItem('customWordPairs'));
    if (savedWords) {
        wordPairs.length = 0;
        wordPairs.push(...savedWords);
    }
}); 