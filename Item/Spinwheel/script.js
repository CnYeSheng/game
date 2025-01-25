// 主要的遊戲類
class WheelGame {
    constructor() {
        this.prizes = [];  // 初始化為空陣列
        this.colors = [
            '#FF6B6B', // 紅色
            '#4ECDC4', // 青色
            '#45B7D1', // 藍色
            '#96CEB4', // 綠色
            '#FFEEAD', // 黃色
            '#D4A5A5', // 粉色
            '#9B59B6', // 紫色
            '#3498DB', // 深藍
            '#E67E22', // 橙色
            '#2ECC71', // 深綠
            '#F1C40F', // 金色
            '#E74C3C'  // 深紅
        ];
        this.usedColors = new Set(); // 追踪已使用的顏色
        this.setup();
        this.bindEvents();
    }

    setup() {
        // DOM 元素
        this.prizeInput = document.getElementById('prize-input');
        this.prizesList = document.getElementById('prizes');
        this.deleteAllBtn = document.getElementById('delete-all');
        this.addPrizeBtn = document.getElementById('add-prize');

        // 初始化轉盤
        this.initWheel();
        this.updatePrizeList();
    }

    initWheel() {
        this.myLucky = new LuckyCanvas.LuckyWheel('#my-lucky', {
            width: '400px',
            height: '400px',
            blocks: [{ padding: '10px', background: '#869cfa' }],
            prizes: this.getPrizeConfig(),
            buttons: [
                { radius: '40%', background: '#617df2' },
                { radius: '35%', background: '#afc8ff' },
                {
                    radius: '30%', 
                    background: '#869cfa',
                    pointer: true,
                    fonts: [{ text: '開始抽獎', top: '-10px' }]
                }
            ],
            start: () => {
                if (this.prizes.length === 0) {
                    Swal.fire({
                        title: '錯誤',
                        text: '請先添加獎項',
                        icon: 'error'
                    });
                    return;
                }
                // 開始遊戲
                this.myLucky.play();
                // 隨機選擇一個獎項
                const index = Math.floor(Math.random() * this.prizes.length);
                setTimeout(() => {
                    this.myLucky.stop(index);
                }, 5000);
            },
            end: (prize) => {
                if (prize && prize.fonts && prize.fonts[0]) {
                    this.showWinner(prize.fonts[0].text);
                }
            }
        });
    }

    updateWheel() {
        if (!this.myLucky) return;
        
        const config = this.getPrizeConfig();
        console.log('Updating wheel with config:', config); // 調試用
        this.myLucky.prizes = config;
        this.myLucky.init();
    }

    getPrizeConfig() {
        if (this.prizes.length === 0) {
            return [{
                background: '#e9e8fe',
                fonts: [{ text: '請添加獎項', top: '10%' }]
            }];
        }

        // 重置已使用的顏色
        this.usedColors.clear();
        
        return this.prizes.map((prize) => ({
            background: this.getRandomColor(),
            fonts: [{ 
                text: prize, 
                top: '10%',
                color: '#ffffff',  // 白色文字
                fontWeight: '600'  // 加粗
            }]
        }));
    }

    getRandomColor() {
        // 如果所有顏色都被使用了，重置已使用顏色集合
        if (this.usedColors.size >= this.colors.length) {
            this.usedColors.clear();
        }

        // 過濾出未使用的顏色
        const availableColors = this.colors.filter(color => !this.usedColors.has(color));
        
        // 隨機選擇一個未使用的顏色
        const color = availableColors[Math.floor(Math.random() * availableColors.length)];
        this.usedColors.add(color);
        return color;
    }

    addPrize() {
        const input = this.prizeInput.value.trim();
        if (!input) return;

        const newPrizes = input.split('\n')
            .map(prize => prize.trim())
            .filter(prize => prize.length > 0);

        if (newPrizes.length > 0) {
            this.prizes.push(...newPrizes);
            this.prizeInput.value = '';
            console.log('Current prizes:', this.prizes); // 調試用
            this.updateWheel();
            this.updatePrizeList();
        }
    }

    bindEvents() {
        this.addPrizeBtn.addEventListener('click', () => this.addPrize());
        this.deleteAllBtn.addEventListener('click', () => this.deleteAllPrizes());
    }

    updatePrizeList() {
        if (!this.prizesList) return;
        
        this.prizesList.innerHTML = '';
        this.prizes.forEach((prize, index) => {
            const li = document.createElement('li');
            li.textContent = prize;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '刪除';
            deleteBtn.onclick = () => {
                this.prizes.splice(index, 1);
                this.updateWheel();
                this.updatePrizeList();
            };
            
            li.appendChild(deleteBtn);
            this.prizesList.appendChild(li);
        });
    }

    deleteAllPrizes() {
        Swal.fire({
            title: '確定要刪除所有獎項嗎？',
            text: '此操作無法復原',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '是的，刪除全部',
            cancelButtonText: '取消'
        }).then((result) => {
            if (result.isConfirmed) {
                this.prizes = [];
                this.updateWheel();
                this.updatePrizeList();
            }
        });
    }

    showWinner(prize) {
        Swal.fire({
            title: '恭喜！',
            text: `您抽中了：${prize}`,
            icon: 'success',
            confirmButtonText: '太棒了！',
            confirmButtonColor: '#4CAF50',
            showConfirmButton: true,
            showDenyButton: true,
            denyButtonText: '刪除此獎項',
            denyButtonColor: '#dc3545'
        }).then((result) => {
            if (result.isDenied) {
                const index = this.prizes.indexOf(prize);
                if (index !== -1) {
                    this.prizes.splice(index, 1);
                    this.updateWheel();
                    this.updatePrizeList();
                    
                    Swal.fire({
                        title: '已刪除',
                        text: `獎項「${prize}」已被刪除`,
                        icon: 'info',
                        confirmButtonColor: '#4CAF50',
                        timer: 2000
                    });
                }
            }
        });
    }
}

// 初始化遊戲
window.onload = () => new WheelGame(); 