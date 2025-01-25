class MahjongDice {
    constructor() {
        this.positions = {
            1: "莊家(自己)",
            2: "下家",
            3: "對家",
            4: "上家"
        };
        this.playerOrder = ["莊家(自己)", "下家", "對家", "上家"];
        this.setupEventListeners();
    }

    setupEventListeners() {
        const rollButton = document.getElementById('rollButton');
        rollButton.addEventListener('click', () => this.rollDice());
    }

    rollDice() {
        // Disable button during animation
        const rollButton = document.getElementById('rollButton');
        rollButton.disabled = true;

        // Remove previous active player highlight
        document.querySelectorAll('.player').forEach(player => {
            player.classList.remove('active');
        });

        // Add rolling animation class to dice
        const dice1 = document.getElementById('dice1');
        const dice2 = document.getElementById('dice2');
        const dice3 = document.getElementById('dice3');
        dice1.classList.add('rolling');
        dice2.classList.add('rolling');
        dice3.classList.add('rolling');

        // Generate random numbers after a short delay
        setTimeout(() => {
            const dice1Value = Math.floor(Math.random() * 6) + 1;
            const dice2Value = Math.floor(Math.random() * 6) + 1;
            const dice3Value = Math.floor(Math.random() * 6) + 1;
            const total = dice1Value + dice2Value + dice3Value;

            // Remove rolling animation
            dice1.classList.remove('rolling');
            dice2.classList.remove('rolling');
            dice3.classList.remove('rolling');

            this.updateDiceDisplay(dice1Value, dice2Value, dice3Value);
            this.showResults(total);

            // Highlight the starting player
            const startingPos = this.determineStartingPosition(total);
            const playerPositions = {
                "莊家(自己)": "bottom",
                "下家": "right",
                "對家": "top",
                "上家": "left"
            };
            const playerClass = playerPositions[startingPos];
            document.querySelector(`.player.${playerClass}`).classList.add('active');

            // Re-enable button
            rollButton.disabled = false;
        }, 500);
    }

    updateDiceDisplay(dice1, dice2, dice3) {
        // Clear previous dots
        document.getElementById('dice1').innerHTML = '';
        document.getElementById('dice2').innerHTML = '';
        document.getElementById('dice3').innerHTML = '';

        // Add new dots
        this.addDotsToDisplay('dice1', dice1);
        this.addDotsToDisplay('dice2', dice2);
        this.addDotsToDisplay('dice3', dice3);
    }

    addDotsToDisplay(diceId, value) {
        const diceElement = document.getElementById(diceId);
        diceElement.innerHTML = '';
        
        const dotPositions = this.getDotPositions(value);
        
        for (let i = 0; i < 9; i++) {
            const dot = document.createElement('div');
            dot.className = dotPositions.includes(i) ? 'dot' : '';
            diceElement.appendChild(dot);
        }
    }

    getDotPositions(value) {
        const positions = {
            1: [4],                    // 中間
            2: [0, 8],                 // 左上、右下
            3: [0, 4, 8],             // 左上、中間、右下
            4: [0, 2, 6, 8],          // 四角
            5: [0, 2, 4, 6, 8],       // 四角+中間
            6: [0, 2, 3, 5, 6, 8]     // 兩邊各三個
        };
        return positions[value] || [];
    }

    determineStartingPosition(diceSum) {
        // Adjust the position to start from 1 and handle numbers greater than 4
        let position = diceSum;
        while (position > 4) {
            position -= 4;
        }
        return this.positions[position];
    }

    calculateRemainingTiles(diceSum) {
        // Calculate remaining stacks using the formula:
        // remaining = 18 - (dice sum + 2)
        // where 2 represents the tiles being drawn
        const remainingStacks = 18 - (diceSum + 2);
        return remainingStacks;
    }

    calculateTileDrawSequence(startingPosition) {
        let sequence = [];
        
        // Find starting player index
        const startIdx = this.playerOrder.indexOf(startingPosition);
        
        // Reorder players starting from the starting position
        const orderedPlayers = [
            ...this.playerOrder.slice(startIdx),
            ...this.playerOrder.slice(0, startIdx)
        ];

        // Calculate drawing sequence
        for (let i = 0; i < 18; i++) {
            const currentPlayer = orderedPlayers[i % 4];
            sequence.push(`${currentPlayer} 拿第 ${i*2+1} 和 ${i*2+2} 張牌`);
        }

        return sequence;
    }

    showResults(total) {
        const diceResult = document.getElementById('diceResult');
        const drawSequence = document.getElementById('drawSequence');
        
        const startingPos = this.determineStartingPosition(total);
        const remainingStacks = this.calculateRemainingTiles(total);

        diceResult.textContent = `骰子點數總和: ${total}`;
        drawSequence.innerHTML = `<div>從 ${startingPos} 開始拿牌，拿 2 剩 ${remainingStacks}</div>`;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MahjongDice();
});
