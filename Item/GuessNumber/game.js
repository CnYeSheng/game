let targetNumber;
let attempts = 0;
let minRange = 1;
let maxRange = 100;
let currentDifficulty = 'medium';

// 設置難度
function setDifficulty(difficulty) {
    currentDifficulty = difficulty;
    
    // 設置範圍
    switch(difficulty) {
        case 'easy':
            minRange = 1;
            maxRange = 50;
            break;
        case 'medium':
            minRange = 1;
            maxRange = 100;
            break;
        case 'hard':
            minRange = 1;
            maxRange = 200;
            break;
    }
    
    // 重新開始遊戲
    initGame();
}

// 遊戲初始化
function initGame() {
    targetNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    attempts = 0;
    document.getElementById('message').textContent = '';
    document.getElementById('guessInput').value = '';
    
    // 更新輸入框的範圍限制
    const input = document.getElementById('guessInput');
    input.min = minRange;
    input.max = maxRange;
    
    updateRangeDisplay();
    focusInput();
}

// 更新範圍顯示
function updateRangeDisplay() {
    document.getElementById('range').textContent = `範圍：${minRange} - ${maxRange}`;
}

// 檢查猜測
function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    const messageElement = document.getElementById('message');
    const input = document.getElementById('guessInput');
    
    if (isNaN(guess) || guess < minRange || guess > maxRange) {
        messageElement.textContent = `請輸入 ${minRange} 到 ${maxRange} 之間的數字！`;
        messageElement.style.color = '#ff0000';
        return;
    }

    attempts++;
    
    if (guess === targetNumber) {
        messageElement.textContent = `恭喜你猜對了！答案就是 ${targetNumber}！總共猜了 ${attempts} 次。`;
        messageElement.classList.add('success');
    } else {
        messageElement.classList.remove('success');
        if (guess < targetNumber) {
            messageElement.textContent = '太小了！再試一次。';
            minRange = Math.max(minRange, guess + 1);
        } else {
            messageElement.textContent = '太大了！再試一次。';
            maxRange = Math.min(maxRange, guess - 1);
        }
        messageElement.style.color = '#666';
    }
    updateRangeDisplay();
    input.value = '';
    focusInput();
}

// 聚焦輸入框
function focusInput() {
    document.getElementById('guessInput').focus();
}

// 重新開始遊戲
function resetGame() {
    initGame();
    setDifficulty();
}

// 添加鍵盤事件監聽
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('guessInput');
    
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkGuess();
        }
    });
    
    // 初始化遊戲
    initGame();
}); 