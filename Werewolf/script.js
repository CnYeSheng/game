const gameState = {
    isPlaying: false,
    currentPhase: null,
    players: [],
    timeRemaining: 0,
    roles: {
        WOLF: '狼人',
        VILLAGER: '平民',
        SEER: '預言家',
        WITCH: '女巫',
        HUNTER: '獵人',
        GUARD: '守衛',
        IDIOT: '白痴',
        KNIGHT: '騎士',
        WOLF_KING: '狼王',
        WHITE_WOLF_KING: '白狼王',
        WOLF_BEAUTY: '狼美人',
        SNOW_WOLF: '雪狼',
        GARGOYLE: '石像鬼',
        GHOST_RIDER: '惡靈騎士',
        HIDDEN_WOLF: '隱狼'
    },
    currentTurn: 1,
    witchPotionUsed: false,
    witchPoisonUsed: false,
    // 存儲當前夜晚的所有死亡玩家
    nightDeaths: [],
    selectedPlayer: null,
    playerNames: [],
    isFirstNight: true,
    hunterDead: false,
    showRoles: false,
    roleCount: {},
    lastGuardedPlayer: null,
    guardedPlayer: null,
    sheriff: null,
    sheriffVotes: {},
    sheriffCandidates: [],
    isFirstDay: true
};

function setupPlayers() {
    // 儲存角色數量到 gameState
    gameState.roleCount = {
        wolf: parseInt(document.getElementById('wolfCount').value) || 0,
        villager: parseInt(document.getElementById('villagerCount').value) || 0,
        seer: parseInt(document.getElementById('seerCount').value) || 0,
        witch: parseInt(document.getElementById('witchCount').value) || 0,
        hunter: parseInt(document.getElementById('hunterCount').value) || 0,
        guard: parseInt(document.getElementById('guardCount').value) || 0,
        idiot: parseInt(document.getElementById('idiotCount').value) || 0,
        knight: parseInt(document.getElementById('knightCount').value) || 0,
        wolfKing: parseInt(document.getElementById('wolfKingCount').value) || 0
    };
    
    const totalPlayers = (
        gameState.roleCount.wolf +
        gameState.roleCount.villager +
        gameState.roleCount.seer +
        gameState.roleCount.witch +
        gameState.roleCount.hunter +
        gameState.roleCount.guard +
        gameState.roleCount.idiot +
        gameState.roleCount.knight +
        gameState.roleCount.wolfKing
    );
    
    const wolfTeamCount = gameState.roleCount.wolf + gameState.roleCount.wolfKing;
    if (!wolfTeamCount || !gameState.roleCount.villager) {
        Swal.fire({
            title: '錯誤',
            text: '請至少設置狼人和平民的數量',
            icon: 'error',
            confirmButtonText: '確定'
        });
        return;
    }

    if (totalPlayers < 6) {
        Swal.fire({
            title: '錯誤',
            text: '遊戲人數不能少於6人',
            icon: 'error',
            confirmButtonText: '確定'
        });
        return;
    }

    let setupHtml = '<div class="player-names-setup">';
    for(let i = 0; i < totalPlayers; i++) {
        setupHtml += `
            <div class="player-name-input">
                <label>${i + 1}號玩家名稱：</label>
                <input type="text" id="playerName${i}" placeholder="${i + 1}號玩家">
            </div>
        `;
    }
    setupHtml += `
        <button class="start-button" onclick="startGame()">開始遊戲</button>
    </div>`;
    
    document.querySelector('.setup-screen').innerHTML = setupHtml;
}

function confirmPlayerNames() {
    const inputs = document.querySelectorAll('[id^=playerName]');
    gameState.playerNames = Array.from(inputs).map(input => input.value || input.placeholder);
    startGame();
}

function startGame() {
    const inputs = document.querySelectorAll('[id^=playerName]');
    gameState.playerNames = Array.from(inputs).map(input => input.value || input.placeholder);

    // 創建實際角色數組
    const roles = [];
    
    // 按順序添加每個角色
    for (let i = 0; i < gameState.roleCount.wolf; i++) roles.push('WOLF');
    if (gameState.roleCount.wolfKing > 0) roles.push('WOLF_KING');
    for (let i = 0; i < gameState.roleCount.villager; i++) roles.push('VILLAGER');
    if (gameState.roleCount.seer > 0) roles.push('SEER');
    if (gameState.roleCount.witch > 0) roles.push('WITCH');
    if (gameState.roleCount.hunter > 0) roles.push('HUNTER');
    if (gameState.roleCount.guard > 0) roles.push('GUARD');
    if (gameState.roleCount.idiot > 0) roles.push('IDIOT');
    if (gameState.roleCount.knight > 0) roles.push('KNIGHT');

    // 打亂角色順序
    for (let i = roles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [roles[i], roles[j]] = [roles[j], roles[i]];
    }

    // 創建玩家數組
    gameState.players = roles.map(role => ({
        role,
        isAlive: true,
        isProtected: false
    }));

    document.getElementById('setupScreen').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    document.getElementById('nightOverlay').style.display = 'block';

    renderPlayers();
    showRoleCard(0);
    speak('請確認身份');
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW';
    speechSynthesis.speak(utterance);
}

function showRoleCard(playerIndex) { 
    const player = gameState.players[playerIndex];
    const playerName = gameState.playerNames[playerIndex];
    
    Swal.fire({
        title: playerName,
        html: `
            <div class="role-card" style="text-align: center;">
                <p>請點擊查看你的身份</p>
                <div class="role-hidden" id="roleRevealBtn" 
                     style="display: inline-block; margin: 0 auto; cursor: pointer; padding: 10px;">
                    點擊查看身份
                </div>
                <div class="role-name" id="roleText" 
                     style="display: none; text-align: center; font-size: 24px; margin: 20px 0;">
                    ${gameState.roles[player.role]}
                </div>
            </div>
        `,
        showConfirmButton: true,
        confirmButtonText: '下一位玩家',
        allowOutsideClick: false,
        didOpen: () => {
            document.getElementById('roleRevealBtn').onclick = function() {
                this.style.display = 'none';
                document.getElementById('roleText').style.display = 'block';
            };
        }
    }).then(() => {
        if (playerIndex < gameState.players.length - 1) {
            gameState.currentPlayerIndex = playerIndex + 1;
            setTimeout(() => showRoleCard(gameState.currentPlayerIndex), 500);
        } else {
            startNightPhase();
        }
    });
}

function startNightPhase() {
    gameState.currentPhase = 'NIGHT';
    speak('天黑請閉眼');
    
    // 先執行狼人階段
    startWolfPhase();
}

function startWolfPhase() {
    gameState.currentPhase = 'WOLF';
    speak('狼人請睜眼，請選擇一個要殺的人');
    Swal.fire({
        title: '狼人階段',
        text: '請選擇要殺的玩家',
        input: 'select',
        inputOptions: Object.fromEntries(
            gameState.players
                .map((player, index) => [index, gameState.playerNames[index]])
                .filter(([index]) => gameState.players[index].isAlive)
        ),
        confirmButtonText: '確認',
    }).then((result) => {
        if (result.isConfirmed) {
            const targetIndex = parseInt(result.value);
            // 如果玩家沒有被守衛保護，則添加到死亡列表
            if (targetIndex !== gameState.guardedPlayer || gameState.witchPotionUsed) {
                if (!gameState.nightDeaths.includes(targetIndex)) {
                    gameState.nightDeaths.push(targetIndex);
                }
            }
            speak('狼人請閉眼');
            setTimeout(() => {
                if (gameState.isFirstNight && gameState.roleCount.hunter > 0) {
                    startHunterFirstNight();
                } else if (gameState.roleCount.seer > 0) {
                    startSeerPhase();
                } else if (gameState.roleCount.witch > 0) {
                    startWitchPhase();
                } else if (gameState.roleCount.guard > 0) {
                    startGuardPhase();
                } else {
                    startDay();
                }
            }, 1000);
        }
    });
}

function startHunterFirstNight() {
    if (gameState.isFirstNight) {
        gameState.currentPhase = 'HUNTER';
        speak('獵人請睜眼');
        Swal.fire({
            title: '獵人第一次睜眼',
            text: '確認身份後請關閉',
            confirmButtonText: '確認'
        }).then(() => {
            speak('獵人請閉眼');
            gameState.isFirstNight = true;
            startSeerPhase();
        });
    }
}

function startSeerPhase() {
    gameState.currentPhase = 'SEER';
    speak('預言家請睜眼，請選擇要查驗的對象');
    Swal.fire({
        title: '預言家階段',
        text: '請選擇要查驗的玩家',
        input: 'select',
        inputOptions: Object.fromEntries(
            gameState.players
                .map((player, index) => [index, gameState.playerNames[index]])
                .filter(([index]) => gameState.players[index].isAlive)
        ),
        confirmButtonText: '確認',
    }).then((result) => {
        if (result.isConfirmed) {
            const targetIndex = parseInt(result.value);
            const role = gameState.players[targetIndex].role;
            const isWolf = role === 'WOLF' ? '是壞人' : '是好人';
            speak('他的身份是');
            
            Swal.fire({
                title: '查驗結果',
                text: `${gameState.playerNames[targetIndex]} ${isWolf}`,
                icon: 'info',
                confirmButtonText: '確定'
            }).then(() => {
                speak('預言家請閉眼');
                setTimeout(() => startWitchPhase(), 1000);
            });
        }
    });
}

function startWitchPhase() {
    gameState.currentPhase = 'WITCH';
    speak('女巫請睜眼');
    setTimeout(() => {
        speak('今晚他被殺了，要使用解藥嗎？');
    }, 1000);

    if (gameState.nightDeaths.length > 0) {
        Swal.fire({
            title: '女巫階段',
            html: '今晚有人被殺了<br>是否使用解藥？',
            showCancelButton: true,
            confirmButtonText: '使用',
            cancelButtonText: '不使用',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed && !gameState.witchPotionUsed) {
                gameState.nightDeaths = [];
                gameState.witchPotionUsed = true;
                logAction('女巫使用解藥救人');
            }
            speak('要使用毒藥嗎？，要毒誰呢？');
            askWitchPoison();
        });
    } else {
        speak('要使用毒藥嗎？，要毒誰呢？');
        askWitchPoison();
    }
}

function askWitchPoison() {
    Swal.fire({
        title: '女巫階段',
        text: '是否使用毒藥？',
        showCancelButton: true,
        confirmButtonText: '使用',
        cancelButtonText: '不使用'
    }).then((result) => {
        if (result.isConfirmed && !gameState.witchPoisonUsed) {
            showWitchPoisonTarget();
        } else {
            speak('女巫請閉眼');
            startDay();
        }
    });
}

function showWitchPoisonTarget() {
    Swal.fire({
        title: '選擇毒藥目標',
        input: 'select',
        inputOptions: Object.fromEntries(
            gameState.players
                .map((player, index) => [index, gameState.playerNames[index]])
                .filter(([index]) => gameState.players[index].isAlive)
        ),
        confirmButtonText: '確認'
    }).then((result) => {
        if (result.isConfirmed) {
            const targetIndex = parseInt(result.value);
            if (!gameState.nightDeaths.includes(targetIndex)) {
                gameState.nightDeaths.push(targetIndex);
            }
            gameState.witchPoisonUsed = true;
            logAction(`女巫毒死了${gameState.playerNames[targetIndex]}`);
        }
        speak('女巫請閉眼');
        startDay();
    });
}

function killPlayer(index) {
    // 如果玩家沒有被守衛保護，則添加到死亡列表
    if (index !== gameState.guardedPlayer || gameState.witchPotionUsed) {
        if (!gameState.nightDeaths.includes(index)) {
            gameState.nightDeaths.push(index);
        }
    }
    logAction('狼人已選擇目標');
}

function logAction(message) {
    const logDiv = document.getElementById('gameLog');
    logDiv.innerHTML += `<div>${message}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
}

function startDay() {
    document.getElementById('nightOverlay').style.display = 'none';
    gameState.currentPhase = 'DAY';
    speak('天亮了');
    
    // 移除之前的投票按鈕
    const oldVoteButtons = document.querySelectorAll('.start-button[onclick*="startVoting"]');
    oldVoteButtons.forEach(button => button.remove());

    let message = '';
    
    // 處理所有昨晚的死亡玩家
    if (gameState.nightDeaths.length > 0) {
        // 將所有死亡玩家標記為死亡
        gameState.nightDeaths.forEach(index => {
            gameState.players[index].isAlive = false;
        });
        
        const deadPlayerNames = gameState.nightDeaths.map(index => gameState.playerNames[index]);
        message = `昨晚 ${deadPlayerNames.join(' 和 ')} 死亡`;
        speak(message);

        // 檢查存活的狼人數量
        const aliveWolves = gameState.players.filter(p => 
            p.isAlive && (p.role === 'WOLF' || p.role === 'WOLF_KING')
        ).length;

        if (aliveWolves === 0) {
            gameState.showRoles = true;
            renderPlayers();
            speak('好人獲勝');
            Swal.fire({
                title: '好人獲勝！',
                text: '所有狼人都已死亡',
                icon: 'success',
                confirmButtonText: '重新開始'
            }).then(() => {
                resetGame();
            });
            return;
        }

        // 如果是第一晚，讓死亡玩家發表遺言
        if (gameState.isFirstNight) {
            function handleLastWords(playerIndex = 0) {
                if (playerIndex < gameState.nightDeaths.length) {
                    speak(`${gameState.playerNames[gameState.nightDeaths[playerIndex]]}請發表遺言`);
                    return Swal.fire({
                        title: '發表遺言',
                        text: `${gameState.playerNames[gameState.nightDeaths[playerIndex]]} 請發表遺言`,
                        confirmButtonText: '遺言結束',
                        allowOutsideClick: false
                    }).then(() => {
                        return handleLastWords(playerIndex + 1);
                    });
                } else {
                    gameState.isFirstNight = false;
                    return startDayDiscussion(message);
                }
            }
            handleLastWords();
            return;
        }
        
        // 檢查死亡玩家中是否有獵人
        gameState.nightDeaths.forEach(index => {
            if (gameState.players[index].role === 'HUNTER') {
                handleHunterDeath(index);
            }
        });
    } else {
        message = '昨晚是平安夜';
        speak(message);
    }

    startDayDiscussion(message);
    // 清空當前夜晚的死亡列表，為下一夜做準備
    gameState.nightDeaths = [];
}

function startDayDiscussion(message = '') {
    // 在第一個白天後，宣布發言順序
    const alivePlayers = gameState.players
        .map((player, index) => ({ index, isAlive: player.isAlive }))
        .filter(player => player.isAlive)
        .map(player => player.index);
        
    const startPlayerIndex = Math.floor(Math.random() * alivePlayers.length);
    const startMessage = `從 ${gameState.playerNames[alivePlayers[startPlayerIndex]]} 開始發言`;

    Swal.fire({
        title: '天亮了',
        html: message ? message + '<br><br>' + startMessage : startMessage,
        icon: message.includes('死亡') ? 'warning' : 'info',
        confirmButtonText: '確認'
    }).then(() => {
        const voteButton = document.createElement('button');
        voteButton.className = 'start-button';
        voteButton.textContent = '開始投票';
        voteButton.onclick = () => {
            speak('開始投票，請選擇一人出局');
            startVoting();
        };
        document.querySelector('.game-board').appendChild(voteButton);
    });

    speak(message + ' ' + startMessage);
    renderPlayers();
}

function startVoting() {
    Swal.fire({
        title: '投票階段',
        text: '請選擇要投票的玩家',
        input: 'select',
        inputOptions: Object.fromEntries(
            gameState.players
                .map((player, index) => [index, gameState.playerNames[index]])
                .filter(([index]) => gameState.players[index].isAlive)
        ),
        confirmButtonText: '投票',
        showCancelButton: true,
        cancelButtonText: '棄票'
    }).then((result) => {
        if (result.isConfirmed) {
            const votedIndex = parseInt(result.value);
            gameState.players[votedIndex].isAlive = false;
            speak(`${gameState.playerNames[votedIndex]}被投票出局`);
            
            // 檢查是否是狼人
            const isWolf = gameState.players[votedIndex].role === 'WOLF' || 
                          gameState.players[votedIndex].role === 'WOLF_KING';
            
            // 檢查存活的狼人數量
            const aliveWolves = gameState.players.filter(p => 
                p.isAlive && (p.role === 'WOLF' || p.role === 'WOLF_KING')
            ).length;
            
            // 如果投死的是狼人且沒有存活的狼人了，直接結束遊戲
            if (isWolf && aliveWolves === 0) {
                gameState.showRoles = true;
                renderPlayers();
                speak('好人獲勝，所有狼人都已死亡');
                Swal.fire({
                    title: '好人獲勝！',
                    text: '狼人被投票出局',
                    icon: 'success',
                    confirmButtonText: '重新開始'
                }).then(() => {
                    resetGame();
                });
                return;
            }
            
            // 檢查是否是獵人
            if (gameState.players[votedIndex].role === 'HUNTER') {
                handleHunterDeath(votedIndex);
            }
            
            Swal.fire({
                title: '投票結果',
                text: `${gameState.playerNames[votedIndex]}被投票出局`,
                icon: 'info',
                confirmButtonText: '進入黑夜'
            }).then(() => {
                startNightPhase();
            });
        } else {
            speak('無人出局');
            startNightPhase();
        }
    });
}

function handleHunterDeath(hunterIndex) {
    if (!gameState.hunterDead) {
        gameState.hunterDead = true;
        
        Swal.fire({
            title: '獵人技能發動',
            text: '獵人死亡，是否要發動技能？',
            showCancelButton: true,
            confirmButtonText: '發動技能',
            cancelButtonText: '不發動'
        }).then((result) => {
            if (result.isConfirmed) {
                speak('獵人請選擇帶走一名玩家');
                Swal.fire({
                    title: '獵人技能發動',
                    text: '請選擇要帶走的玩家',
                    input: 'select',
                    inputOptions: Object.fromEntries(
                        gameState.players
                            .map((player, index) => [index, gameState.playerNames[index]])
                            .filter(([index]) => gameState.players[index].isAlive && parseInt(index) !== hunterIndex)
                    ),
                    confirmButtonText: '確認',
                    showCancelButton: true,
                    cancelButtonText: '不帶走任何人'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const targetIndex = parseInt(result.value);
                        if (!gameState.nightDeaths.includes(targetIndex)) {
                            gameState.nightDeaths.push(targetIndex);
                        }
                        logAction(`獵人帶走了${gameState.playerNames[targetIndex]}`);
                        speak(`獵人帶走了${gameState.playerNames[targetIndex]}`);
                        renderPlayers();
                    }
                });
            }
        });
    }
}

function checkGameEnd() {
    const wolves = gameState.players.filter(p => p.isAlive && p.role === 'WOLF').length;
    const goodPeople = gameState.players.filter(p => p.isAlive && p.role !== 'WOLF').length;
    
    if (wolves === 0 || wolves >= goodPeople) {
        gameState.showRoles = true;
        renderPlayers();
        
        let message = '遊戲結束！\n\n玩家角色：\n';
        gameState.players.forEach((player, index) => {
            message += `${gameState.playerNames[index]}: ${gameState.roles[player.role]}\n`;
        });
        
        Swal.fire({
            title: wolves === 0 ? '好人獲勝！' : '狼人獲勝！',
            html: message.replace(/\n/g, '<br>'),
            icon: 'success',
            confirmButtonText: '確定'
        });
        
        speak(wolves === 0 ? '好人獲勝' : '狼人獲勝');
        return true;
    }
    return false;
}

function renderPlayers() {
    const container = document.getElementById('playersContainer');
    container.innerHTML = '';
    
    // 確保渲染所有玩家
    gameState.players.forEach((player, index) => {
        const playerCard = document.createElement('div');
        playerCard.className = `player-card${!player.isAlive ? ' dead' : ''}`;
        playerCard.id = `player-${index}`;
        playerCard.innerHTML = `
            <div class="player-name">${gameState.playerNames[index]}</div>
            <div class="player-role">
                ${player.isAlive ? 
                    (gameState.showRoles ? gameState.roles[player.role] : '身份未知') 
                    : '已死亡'}
            </div>
            <div class="player-status">
                ${player.isAlive ? '存活' : '死亡'}
            </div>
        `;
        container.appendChild(playerCard);
    });
}

function updatePhaseDisplay() {
    document.getElementById('currentPhase').textContent = 
        '當前階段: ' + (gameState.roles[gameState.currentPhase] || gameState.currentPhase);
}

// 初始化
window.onload = function() {
    speechSynthesis.getVoices();
};

// 添加警長競選階段
function startSheriffElection() {
    gameState.currentPhase = 'SHERIFF_ELECTION';
    speak('開始警長競選，想要競選警長的玩家請舉手');

    Swal.fire({
        title: '警長競選',
        text: '請選擇要參與競選的玩家',
        input: 'select',
        inputOptions: Object.fromEntries(
            gameState.players
                .map((player, index) => [index, gameState.playerNames[index]])
                .filter(([index]) => gameState.players[index].isAlive)
        ),
        confirmButtonText: '確認',
        showCancelButton: true,
        cancelButtonText: '結束選擇',
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (gameState.sheriffCandidates.includes(parseInt(value))) {
                return '該玩家已經參與競選';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const candidateIndex = parseInt(result.value);
            gameState.sheriffCandidates.push(candidateIndex);
            startSheriffElection(); // 繼續選擇
        } else {
            if (gameState.sheriffCandidates.length > 0) {
                startSheriffSpeeches(0); // 開始警長發言
            } else {
                speak('沒有玩家競選警長，直接進入夜晚');
                startNightPhase();
            }
        }
    });
}

// 警長候選人發言
function startSheriffSpeeches(index) {
    if (index < gameState.sheriffCandidates.length) {
        const candidateIndex = gameState.sheriffCandidates[index];
        speak(`${gameState.playerNames[candidateIndex]}請發表競選演說`);
        
        Swal.fire({
            title: '警長競選演說',
            text: `${gameState.playerNames[candidateIndex]}請發表演說`,
            confirmButtonText: '演說結束',
            allowOutsideClick: false
        }).then(() => {
            startSheriffSpeeches(index + 1);
        });
    } else {
        startSheriffVoting();
    }
}

// 警長投票
function startSheriffVoting() {
    speak('請沒有參與競選的玩家進行投票');

    const voters = gameState.players
        .map((player, index) => index)
        .filter(index => 
            gameState.players[index].isAlive && 
            !gameState.sheriffCandidates.includes(index)
        );

    function vote(voterIndex) {
        if (voterIndex < voters.length) {
            Swal.fire({
                title: '警長投票',
                text: `${gameState.playerNames[voters[voterIndex]]}請投票`,
                input: 'select',
                inputOptions: Object.fromEntries(
                    gameState.sheriffCandidates.map(index => 
                        [index, gameState.playerNames[index]]
                    )
                ),
                confirmButtonText: '投票',
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    const votedIndex = parseInt(result.value);
                    gameState.sheriffVotes[voters[voterIndex]] = votedIndex;
                    vote(voterIndex + 1);
                }
            });
        } else {
            announceSheriffResult();
        }
    }

    vote(0);
}

// 宣布警長結果
function announceSheriffResult() {
    const voteCount = {};
    Object.values(gameState.sheriffVotes).forEach(votedIndex => {
        voteCount[votedIndex] = (voteCount[votedIndex] || 0) + 1;
    });

    const maxVotes = Math.max(...Object.values(voteCount));
    const winners = Object.entries(voteCount)
        .filter(([_, count]) => count === maxVotes)
        .map(([index]) => parseInt(index));

    if (winners.length === 1) {
        gameState.sheriff = winners[0];
        speak(`${gameState.playerNames[gameState.sheriff]}當選警長`);
        startNightPhase();
    } else {
        // 平票處理
        speak('出現平票，請平票玩家重新發表演說');
        gameState.sheriffCandidates = winners;
        startSheriffSpeeches(0);
    }
}

// 添加重置遊戲的函數
function resetGame() {
    // 重置所有遊戲狀態
    gameState.isPlaying = false;
    gameState.currentPhase = null;
    gameState.players = [];
    gameState.playerNames = [];
    gameState.isFirstNight = true;
    gameState.hunterDead = false;
    gameState.showRoles = false;
    gameState.witchPotionUsed = false;
    gameState.witchPoisonUsed = false;
    gameState.nightDeaths = [];
    gameState.selectedPlayer = null;
    gameState.sheriff = null;
    gameState.sheriffVotes = {};
    gameState.sheriffCandidates = [];
    gameState.isFirstDay = true;
    gameState.lastGuardedPlayer = null;
    gameState.guardedPlayer = null;

    // 重置 UI
    document.getElementById('setupScreen').style.display = 'block';
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('nightOverlay').style.display = 'none';
    document.getElementById('roleSetup').style.display = 'block';
    
    // 重置所有選擇框的值
    document.getElementById('wolfCount').value = "1";
    document.getElementById('villagerCount').value = "2";
    document.getElementById('seerCount').value = "0";
    document.getElementById('witchCount').value = "0";
    document.getElementById('hunterCount').value = "0";
    document.getElementById('guardCount').value = "0";
    document.getElementById('idiotCount').value = "0";
    document.getElementById('knightCount').value = "0";
    document.getElementById('wolfKingCount').value = "0";
}