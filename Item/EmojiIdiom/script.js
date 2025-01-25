// 成語題目庫
const idiomPuzzles = [
    {
        emoji: "🐦🕊️📄❌",
        answer: "信口雌黃",
        hint: "形容隨口亂說，毫無根據，或胡亂發表言論。"
    },
];

let remainingPuzzles = [];
let score = 0;

// DOM 元素
const emojiPuzzleElement = document.getElementById('emoji-puzzle');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const hintElement = document.querySelector('.hint');
const characterButtonsContainer = document.querySelector('.character-buttons');
const answerBox = document.getElementById('answer-box');
const clearBtn = document.getElementById('clear-btn');

let availableChars = [];
let selectedChars = [];

// 打亂題目順序
function shufflePuzzles() {
    remainingPuzzles = [...idiomPuzzles]
        .sort(() => Math.random() - 0.5);
}

// 獲取下一題
function getNextPuzzle() {
    if (remainingPuzzles.length === 0) {
        if (confirm('恭喜完成所有題目！要重新開始嗎？')) {
            score = 0;
            scoreElement.textContent = score;
            shufflePuzzles();
        } else {
            alert('遊戲結束！總得分：' + score);
            return null;
        }
    }
    return remainingPuzzles[remainingPuzzles.length - 1];
}

// 顯示當前題目
function displayPuzzle() {
    if (remainingPuzzles.length > 0) {
        const currentPuzzle = getNextPuzzle();
        if (currentPuzzle) {
            emojiPuzzleElement.textContent = currentPuzzle.emoji;
            hintElement.textContent = `提示：${currentPuzzle.hint}`;
            nextButton.style.display = 'none';
            generateCharacterButtons(currentPuzzle.answer);
        }
    } else {
        shufflePuzzles();
        displayPuzzle();
    }
}

// 檢查答案
function checkAnswer() {
    const currentPuzzle = remainingPuzzles[remainingPuzzles.length - 1];
    const userAnswer = answerInput.value.trim();
    
    if (userAnswer === currentPuzzle.answer) {
        score += 10;
        scoreElement.textContent = score;
        alert('答對了！🎉');
        nextButton.style.display = 'inline-block';
        submitButton.disabled = true;
    } else {
        alert('答錯了，再試試看！');
    }
}

// 生成可選擇的文字按鈕
function generateCharacterButtons(answer) {
    // 清空現有按鈕
    characterButtonsContainer.innerHTML = '';
    answerBox.innerHTML = '';
    selectedChars = [];
    
    // 獲取答案的所有字
    const answerChars = Array.from(answer);
    
    // 創建一個包含答案字和額外隨機漢字的數組
    availableChars = [...answerChars];
    const extraChars = "天地人我你他山水火風雨雪月日星空雲木林花鳥魚龍虎狼馬牛羊鹿蝶蜂";
    
    // 添加4+16個隨機漢字
    while (availableChars.length < 20) {
        const randomChar = extraChars[Math.floor(Math.random() * extraChars.length)];
        if (!availableChars.includes(randomChar)) {
            availableChars.push(randomChar);
        }
    }
    
    // 打亂字符順序
    availableChars.sort(() => Math.random() - 0.5);
    
    // 創建按鈕
    availableChars.forEach(char => {
        const button = document.createElement('button');
        button.className = 'char-btn';
        button.textContent = char;
        button.addEventListener('click', () => selectCharacter(button));
        characterButtonsContainer.appendChild(button);
    });
}

// 選擇字符
function selectCharacter(button) {
    if (button.classList.contains('used') || selectedChars.length >= 4) return;
    
    const char = button.textContent;
    selectedChars.push(char);
    button.classList.add('used');
    
    updateAnswerDisplay();
    checkAutoSubmit();
}

// 更新答案顯示
function updateAnswerDisplay() {
    answerBox.innerHTML = selectedChars.join('');
}

// 當選擇了4個字時自動提交
function checkAutoSubmit() {
    if (selectedChars.length === 4) {
        const answer = selectedChars.join('');
        const currentPuzzle = remainingPuzzles[remainingPuzzles.length - 1];
        
        setTimeout(() => {
            if (answer === currentPuzzle.answer) {
                score += 10;
                scoreElement.textContent = score;
                alert('答對了！🎉');
                nextButton.style.display = 'inline-block';
            } else {
                alert('答錯了，再試試看！');
                clearSelection();
            }
        }, 100);
    }
}

// 清除選擇
function clearSelection() {
    selectedChars = [];
    answerBox.innerHTML = '';
    const buttons = document.querySelectorAll('.char-btn');
    buttons.forEach(btn => btn.classList.remove('used'));
}

// 事件監聽
nextButton.addEventListener('click', () => {
    remainingPuzzles.pop();
    displayPuzzle();
});

// 添加清除按鈕事件監聽
clearBtn.addEventListener('click', clearSelection);

// 遊戲初始化
shufflePuzzles();
displayPuzzle(); 