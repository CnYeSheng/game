// 真心話問題庫
const truthQuestions = [
    "你最後一次說謊是什麼時候？說了什麼謊？",
    "你最喜歡的人是誰？",
    "你做過最尷尬的事情是什麼？",
    "你最後悔的一件事是什麼？",
    "你的初戀是什麼時候？",
    "你曾經做過最瘋狂的事情是什麼？",
    "你最想感謝的人是誰？為什麼？",
    "你有什麼特別的童年回憶？",
    "你最大的夢想是什麼？",
    "你最害怕什麼？為什麼？"
];

// 大冒險任務庫
const dareQuestions = [
    "模仿一種動物叫聲",
    "唱一首歌的副歌部分",
    "做10個跳躍",
    "用另一種聲音說話直到下一輪",
    "跳一段即興舞蹈",
    "講一個笑話",
    "用手機打電話給一位朋友",
    "做一個俯臥撐",
    "模仿在場某個人的習慣動作",
    "閉著眼睛畫一隻貓"
];

let isSpinning = false;
let currentMode = null;
let canSelectMode = false;

const bottle = document.getElementById('bottle');
const spinButton = document.getElementById('spinButton');
const truthButton = document.getElementById('truthButton');
const dareButton = document.getElementById('dareButton');
const questionDisplay = document.getElementById('question');

// 初始化按鈕狀態
updateModeStyle();
disableModeButtons();

// 綁定按鈕事件
spinButton.addEventListener('click', spinBottle);
truthButton.addEventListener('click', () => setMode('truth'));
dareButton.addEventListener('click', () => setMode('dare'));

function spinBottle() {
    if (isSpinning) return;
    
    // 重置狀態
    isSpinning = true;
    canSelectMode = false;
    currentMode = null;
    disableModeButtons();
    questionDisplay.textContent = "瓶子旋轉中...";
    
    const rotations = Math.floor(Math.random() * 5) + 5;
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalDegrees = rotations * 360 + extraDegrees;
    
    // 添加旋轉動畫
    bottle.style.transform = `rotate(${totalDegrees}deg)`;
    spinButton.disabled = true;
    spinButton.style.opacity = '0.6';
    
    setTimeout(() => {
        isSpinning = false;
        spinButton.disabled = false;
        spinButton.style.opacity = '1';
        canSelectMode = true;
        enableModeButtons();
        questionDisplay.textContent = "請選擇真心話或大冒險";
    }, 3000);
}

function setMode(mode) {
    if (!canSelectMode) return;
    
    currentMode = mode;
    canSelectMode = false;
    
    // 添加按鈕動畫效果
    const button = mode === 'truth' ? truthButton : dareButton;
    button.style.transform = 'scale(1.1)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
    
    updateModeStyle();
    displayQuestion();
    disableModeButtons();
}

function updateModeStyle() {
    truthButton.style.opacity = currentMode === 'truth' ? '1' : '0.6';
    dareButton.style.opacity = currentMode === 'dare' ? '1' : '0.6';
}

function displayQuestion() {
    if (!currentMode) return;
    
    const questions = currentMode === 'truth' ? truthQuestions : dareQuestions;
    const randomIndex = Math.floor(Math.random() * questions.length);
    
    // 添加問題切換動畫
    questionDisplay.style.opacity = '0';
    setTimeout(() => {
        questionDisplay.textContent = questions[randomIndex];
        questionDisplay.style.opacity = '1';
    }, 300);
}

function enableModeButtons() {
    truthButton.disabled = false;
    dareButton.disabled = false;
    truthButton.style.opacity = '1';
    dareButton.style.opacity = '1';
}

function disableModeButtons() {
    truthButton.disabled = true;
    dareButton.disabled = true;
    truthButton.style.opacity = '0.6';
    dareButton.style.opacity = '0.6';
}
