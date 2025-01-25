document.addEventListener('DOMContentLoaded', () => {
    const diceContainer = document.getElementById('diceContainer');
    const rollButton = document.getElementById('rollButton');
    const diceCountInput = document.getElementById('diceCount');
    const results = document.getElementById('results');
    let isRolling = false;

    const rotations = [
        { x: 0, y: 0 },     // 1
        { x: 0, y: -180 },  // 2
        { x: 0, y: -90 },   // 3
        { x: 0, y: 90 },    // 4
        { x: -90, y: 0 },   // 5
        { x: 90, y: 0 }     // 6
    ];

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createDiceElement(index) {
        const diceHtml = `
            <div class="dice" id="dice-${index}">
                <div class="face front">
                    <span class="dot"></span>
                </div>
                <div class="face back">
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <div class="face right">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <div class="face left">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <div class="face top">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <div class="face bottom">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
        `;
        return diceHtml;
    }

    function updateDiceCount() {
        const count = parseInt(diceCountInput.value) || 1;
        diceCountInput.value = Math.min(Math.max(count, 1), 6);
        createDice();
    }

    function createDice() {
        diceContainer.innerHTML = '';
        for (let i = 0; i < diceCountInput.value; i++) {
            diceContainer.innerHTML += createDiceElement(i);
        }
    }

    function rollDice() {
        if (isRolling) return;
        isRolling = true;
        rollButton.disabled = true;

        // 重新創建骰子以重置動畫狀態
        createDice();
        
        const diceElements = document.querySelectorAll('.dice');
        const diceValues = [];
        const spins = getRandomNumber(2, 5);
        
        diceElements.forEach((dice, index) => {
            const diceValue = getRandomNumber(1, 6);
            diceValues.push(diceValue);
            const rotation = rotations[diceValue - 1];
            
            // 添加一個小延遲使每個骰子的動畫稍微錯開
            setTimeout(() => {
                dice.style.transition = `transform ${spins}s cubic-bezier(0.17, 0.67, 0.83, 0.67)`;
                dice.style.transform = `rotateX(${rotation.x + spins * 360}deg) rotateY(${rotation.y + spins * 360}deg)`;
            }, index * 50);
        });

        setTimeout(() => {
            const total = diceValues.reduce((sum, value) => sum + value, 0);
            results.innerHTML = `
                <p>各骰子點數：${diceValues.join(', ')}</p>
                <p>總點數：${total}</p>
            `;
            isRolling = false;
            rollButton.disabled = false;
        }, spins * 1000 + (diceElements.length - 1) * 50);
    }

    diceCountInput.addEventListener('change', updateDiceCount);
    rollButton.addEventListener('click', rollDice);
    
    // 初始化第一個骰子
    updateDiceCount();
});
