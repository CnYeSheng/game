const tarotCards = [
    '0愚者', 'I魔術師', 'II女祭司', 'III女皇', 'IV皇帝',
    'V教皇', 'VI戀人', 'VII戰車', 'VIII力量', 'IX隱士',
    'X命運之輪', 'XI正義', 'XII吊人', 'XIII死神', 'XIV節制',
    'XV惡魔', 'XVI高塔', 'XVII星星', 'XVIII月亮', 'XIX太陽',
    'XX審判', 'XXI世界', 
    '權杖一','權杖二','權杖三','權杖四','權杖五',
    '權杖六','權杖七','權杖八','權杖九','權杖十',
    '權杖騎士','權杖侍從','權杖王后','權杖國王',
    '星幣一','星幣二','星幣三','星幣四','星幣五',
    '星幣六','星幣七','星幣八','星幣九','星幣十',
    '星幣侍從','星幣騎士','星幣王后','星幣國王',
    '寶劍一','寶劍二','寶劍三','寶劍四','寶劍五',
    '寶劍六','寶劍七','寶劍八','寶劍九','寶劍十',
    '寶劍侍從','寶劍騎士','寶劍王后','寶劍國王',
    '聖杯一','聖杯二','聖杯三','聖杯四','聖杯五',
    '聖杯六','聖杯七','聖杯八','聖杯九','聖杯十',
    '聖杯侍從','聖杯騎士','聖杯王后','聖杯國王'
];

let selectedCards = [];
let maxCards = 3;
let isShuffling = false;
let isDragging = false;
let startX = 0;
let startY = 0;
let hasShuffled = false;

// 初始化牌堆
function initializeDeck() {
    const deck = document.getElementById('deck');
    deck.style.display = 'none'; // 初始時隱藏牌堆
    deck.innerHTML = '';
}

// 處理卡片點擊
function handleCardClick(event) {
    if (isShuffling || selectedCards.length >= maxCards) return;
    
    const card = event.target.closest('.card');
    if (!card || card.classList.contains('selected')) return;
    
    const index = parseInt(card.dataset.index);
    const isReversed = Math.random() < 0.5;
    const cardName = tarotCards[index % tarotCards.length];
    
    // 創建新的卡片元素用於顯示選中的牌
    const selectedCard = document.createElement('div');
    selectedCard.className = `card selected ${isReversed ? 'reversed' : ''}`;
    selectedCard.innerHTML = `<img src="cards/${cardName}.jpg" alt="${cardName}">`;
    
    // 將選中的卡片添加到選中區域
    const selectedCardsContainer = document.getElementById('selected-cards');
    selectedCardsContainer.appendChild(selectedCard);
    
    // 更新選中的卡片數據
    selectedCards.push({
        name: cardName,
        reversed: isReversed
    });
    
    // 移除原卡片並重新排列剩餘卡片
    card.remove();
    
    const remainingCards = document.querySelectorAll('#deck .card');
    if (remainingCards.length > 0) {
        const cardWidth = 120;
        const visibleWidth = cardWidth * 0.1;
        const totalWidth = visibleWidth * (remainingCards.length - 1) + cardWidth;
        const startX = -totalWidth / 2;
        
        remainingCards.forEach((card, index) => {
            card.style.transition = 'all 0.5s ease';
            card.style.transform = `translateX(${startX + index * visibleWidth}px)`;
            card.style.zIndex = index;
        });
    }
    
    // 如果達到指定數量，執行解讀並隱藏剩餘卡片
    if (selectedCards.length === maxCards) {
        const deck = document.getElementById('deck');
        deck.style.display = 'none';
        setTimeout(performReading, 1000);
    }
}

// 洗牌動畫
async function shuffleCards() {
    if (isShuffling) return;
    isShuffling = true;
    
    const deck = document.getElementById('deck');
    const cards = Array.from(deck.getElementsByClassName('card'));
    
    // 洗牌動畫
    for (let i = 0; i < 3; i++) {
        const shuffledOrder = shuffleArray([...Array(78).keys()]);
        cards.forEach((card, index) => {
            card.style.transition = 'all 0.5s ease';
            card.style.transform = `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * 360}deg)`;
            card.style.setProperty('--order', shuffledOrder[index]);
        });
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // 重置卡片位置並展開
    await new Promise(resolve => setTimeout(resolve, 500));
    spreadCards();
    
    isShuffling = false;
}

// 展開卡片
function spreadCards(cards) {
    const totalWidth = window.innerWidth * 0.8; // 使用80%的視窗寬度
    const cardWidth = 120; // 卡片寬度
    const cardSpacing = 2; // 卡片間距
    const totalCards = cards.length;
    
    // 計算起始位置，使卡片組居中
    const startX = -((totalCards * cardSpacing) / 2);
    
    cards.forEach((card, index) => {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = `translateX(calc(${startX + (index * cardSpacing)}px - 50%)) translateY(0)`;
        card.style.zIndex = index;
    });
}

// Fisher-Yates 洗牌算法
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 開始新的占卜
function startNewReading() {
    const question = document.getElementById('question').value.trim();
    if (!question) {
        Swal.fire({
            icon: 'warning',
            title: '請輸入問題',
            text: '在開始占卜前，請先輸入你想諮詢的問題'
        });
        return;
    }
    
    // 重置狀態
    selectedCards = [];
    hasShuffled = false;
    isShuffling = false;
    
    // 清除舊的解讀結果
    const readingResult = document.getElementById('reading-result');
    readingResult.innerHTML = '';
    
    // 清除已選擇的卡片
    const selectedCardsContainer = document.getElementById('selected-cards');
    selectedCardsContainer.innerHTML = '';
    
    // 重新初始化牌堆
    const deck = document.getElementById('deck');
    deck.innerHTML = '';
    
    // 創建所有卡片
    for (let i = 0; i < 78; i++) {
        const card = document.createElement('div');
        card.className = 'card back';
        card.dataset.index = i;
        card.addEventListener('click', handleCardClick);
        deck.appendChild(card);
    }
    
    // 顯示牌堆
    deck.style.display = 'flex';
    
    // 禁用開始按鈕，直到本次占卜結束
    const submitButton = document.getElementById('submit-question');
    submitButton.disabled = true;
}

// 重新啟用開始按鈕
function enableStartButton() {
    const submitButton = document.getElementById('submit-question');
    submitButton.disabled = false;
}

// 開始占卜流程
document.getElementById('submit-question').addEventListener('click', async function() {
    const question = document.getElementById('question').value.trim();
    if (!question) {
        Swal.fire({
            icon: 'error',
            title: '請輸入問題',
            text: '需要您的問題才能進行占卜'
        });
        return;
    }

    // 獲取選擇的卡片數量
    maxCards = parseInt(document.getElementById('card-count').value);
    
    // 重置並開始洗牌
    startNewReading();
    await shuffleCards();
});

// 執行占卜解讀
async function performReading() {
    const readingContainer = document.createElement('div');
    readingContainer.className = 'reading-container';
    
    const header = document.createElement('div');
    header.className = 'reading-header';
    header.textContent = '塔羅牌解讀';
    readingContainer.appendChild(header);
    
    const content = document.createElement('div');
    content.className = 'reading-content';
    
    // 格式化解讀文本
    function formatReadingText(text) {
        // 將文本按行分割
        return text.split('\n').map(line => {
            // 移除所有單個 * 標記
            line = line.replace(/\*/g, '');
            
            // 檢查是否是需要加粗的標題
            const boldHeaders = [
                /^第\s*\(\d+\)\s*張牌/,
                /^第\s*[一二三四五]\s*張牌/,
                /^第*\(\d+\)*張牌/,
                /^第*[一二三四五]*張牌/,
                /^總結/,
                /^建議/,
                /^解讀/,
                /^整體解析/,
                /^綜合建議/,
                /^綜合解析與建議/,
            ];
            
            if (boldHeaders.some(pattern => pattern.test(line.trim()))) {
                return `<strong>${line}</strong><br>`;
            }
            
            // 一般文本加上換行
            return line + '<br>';
        }).join('');
    }
    
    // 生成每張牌的解讀
    for (let i = 0; i < selectedCards.length; i++) {
        const card = selectedCards[i];
        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = `第 ${i + 1} 張牌：${card.name}${card.reversed ? ' (逆位)' : ''}`;
        content.appendChild(cardTitle);
        
        const readingText = await getCardReading(card.name, card.reversed);
        const paragraph = document.createElement('div');
        paragraph.className = 'reading-paragraph';
        paragraph.innerHTML = formatReadingText(readingText);
        content.appendChild(paragraph);
    }
    
    // 生成總體解讀
    const overallTitle = document.createElement('div');
    overallTitle.className = 'card-title';
    overallTitle.textContent = '整體解讀';
    content.appendChild(overallTitle);
    
    const overallReading = await getOverallReading();
    const overallParagraph = document.createElement('div');
    overallParagraph.className = 'reading-paragraph';
    overallParagraph.innerHTML = formatReadingText(overallReading);
    content.appendChild(overallParagraph);
    
    // 添加重新占卜按鈕
    const restartButton = document.createElement('button');
    restartButton.className = 'restart-button';
    restartButton.textContent = '重新占卜';
    restartButton.onclick = () => {
        enableStartButton();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    content.appendChild(restartButton);
    
    readingContainer.appendChild(content);
    document.getElementById('reading-result').appendChild(readingContainer);
}

// 初始化拖拽事件
function initDragToShuffle() {
    const deck = document.getElementById('deck');
    
    deck.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', handleDragging);
    document.addEventListener('mouseup', stopDragging);
    
    // 觸摸事件支持
    deck.addEventListener('touchstart', e => {
        const touch = e.touches[0];
        startDragging({ clientX: touch.clientX, clientY: touch.clientY });
    });
    document.addEventListener('touchmove', e => {
        e.preventDefault();
        const touch = e.touches[0];
        handleDragging({ clientX: touch.clientX, clientY: touch.clientY });
    });
    document.addEventListener('touchend', stopDragging);
}

function startDragging(e) {
    if (isShuffling || hasShuffled || selectedCards.length >= maxCards) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
}

function handleDragging(e) {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    const deck = document.getElementById('deck');
    const cards = Array.from(deck.getElementsByClassName('card'));
    
    cards.forEach((card, index) => {
        const offset = Math.sin((index / cards.length) * Math.PI * 2 + Date.now() / 200);
        card.style.transform = `translate(${deltaX + offset * 20}px, ${deltaY + offset * 10}px) rotate(${offset * 20}deg)`;
    });
}

function stopDragging() {
    if (!isDragging) return;
    isDragging = false;
    hasShuffled = true;
    spreadCards();
}

// 展開卡片，顯示10%重疊
function spreadCards() {
    const deck = document.getElementById('deck');
    const cards = Array.from(deck.getElementsByClassName('card'));
    const cardWidth = 120; // 卡片寬度
    const visibleWidth = cardWidth * 0.1; // 10%可見寬度
    const totalWidth = visibleWidth * (cards.length - 1) + cardWidth;
    const startX = -totalWidth / 2;
    
    cards.forEach((card, index) => {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = `translateX(${startX + index * visibleWidth}px)`;
        card.style.zIndex = index;
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initDragToShuffle();
    initializeDeck();
});

// API請求函數
async function getCardReading(cardName, isReversed) {
    try {
        const response = await fetch('https://gemini.cyss.us.eu.org/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer AIzaSyDuyci76agMRfBpzLamuiHVxGBClVZBjMg'
            },
            body: JSON.stringify({
                model: "gemini-2.0-flash-exp",
                messages: [
                    {
                        "role": "system",
                        "content": "你是一個你有海量案例的塔羅牌的老師 你給的解析和建議都是非常精確的 解析的內容也非常的詳細，請使用中文來回答，最多1000字，聚焦在題目上回答不用解釋原本卡牌的牌面意義，在每一張牌前面增加 第幾張牌。"
                    },
                    {
                        role: "user",
                        content: `我抽了塔羅牌，問題是：${document.getElementById('question').value.trim()}。抽到的牌是：${cardName}${isReversed ? '(逆位)' : ''}。請幫我解析每張牌對這個問題的關係再做總結，謝謝。`
                    }
                ]
            })
        });

        const data = await response.json();
        const reading = data.choices[0].message.content;
        return reading;
    } catch (error) {
        console.error('API請求錯誤:', error);
        Swal.fire({
            icon: 'error',
            title: '發生錯誤',
            text: '無法獲取塔羅牌解讀，請稍後再試'
        });
    }
}

async function getOverallReading() {
    try {
        const response = await fetch('https://gemini.cyss.us.eu.org/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer AIzaSyDuyci76agMRfBpzLamuiHVxGBClVZBjMg'
            },
            body: JSON.stringify({
                model: "gemini-2.0-flash-exp",
                messages: [
                    {
                        "role": "system",
                        "content": "你是一個你有海量案例的塔羅牌的老師 你給的解析和建議都是非常精確的 解析的內容也非常的詳細，請使用中文來回答，最多1000字，聚焦在題目上回答不用解釋原本卡牌的牌面意義，在每一張牌前面增加 第幾張牌。請特別注意解讀時要考慮牌的正逆位。"
                    },
                    {
                        role: "user",
                        content: `問題：${document.getElementById('question').value.trim()}。抽到的牌：${selectedCards.map((card, index) => `${card.name}${card.reversed ? '(逆位)' : ''}`).join('、')}.請幫我做解析`
                    }
                ]
            })
        });

        const data = await response.json();
        const reading = data.choices[0].message.content;
        return reading;
    } catch (error) {
        console.error('API請求錯誤:', error);
        Swal.fire({
            icon: 'error',
            title: '發生錯誤',
            text: '無法獲取塔羅牌解讀，請稍後再試'
        });
    }
}