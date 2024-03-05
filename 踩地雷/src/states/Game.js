/* globals __DEV__ */
import Phaser from 'phaser';
import Hammer from 'hammerjs';
import config from '../config';
import Board from '../sprites/Board';
import Timer from '../sprites/Timer';
import MineCounter from '../sprites/MineCounter';
import Button from '../sprites/Button';
import { Icons } from '../utils';
const DPR = window.devicePixelRatio || 1;
const clamp =  Phaser.Math.clamp;

// 遊戲面板平移起始點坐標
let boardStartX = 0;
let boardStartY = 0;
// 遊戲面板雙指縮放初始縮放
let initScale = 1;
// 遊戲面板變形對象
let transform = {};

export default class Game extends Phaser.State {
  init (gameProps = {...config}) {
    this.gameProps = gameProps;
    this.currentLevel = `${gameProps.boardWidth}_${gameProps.boardHeight}_${gameProps.mineTotal}`;
    
    // 限制最多兩點觸摸
    this.game.input.maxPointers = 2;

    // 載入客戶端本地遊戲數據
    this.gameData = this.loadGameData();
  }

  create () {
    // 初始話遊戲
    this.initGame();
  }

  // 初始化遊戲
  initGame () {
    // 初始話遊戲面板
    this.initBoard();

    // 初始化遊戲計時器與地雷計數器
    this.headerGroup = this.game.add.group();
    this.timer = new Timer(this.game, this.board, this.headerGroup);
    this.mineCounter = new MineCounter(this.game, this.board, this.headerGroup);

    // 菜單按鈕
    let buttonProps = {
      game: this.game,
      x: this.game.width - 58 * DPR,
      y: this.game.height - 58 * DPR,
      width: 48 * DPR,
      height: 48 * DPR,
      icon: Icons.menu,
      text: '',
      style: 'circleAction'
    };
    let menuButton = new Button(buttonProps);
    menuButton.onClick.add(this.backMenu, this);

    // 布局UI
    this.mineCounter.alignTo(this.timer.text);
    this.headerGroup.x = this.game.world.centerX - this.headerGroup.centerX;
    this.headerGroup.y = 20 * DPR;

    // 遊戲事件監聽
    this.board.onGameWin.add(this.gameWin, this);
    this.board.onGameOver.add(this.gameOver, this);

    // 遊戲面板縮放功能
    // 鼠標滾輪縮放
    this.game.input.mouse.mouseWheelCallback = event => {
      let currentScale = this.board.group.scale.x;
      let scale = currentScale * (1 + this.game.input.mouse.wheelDelta * 0.1);
      scale = clamp(scale, 1, this.boardMaxScale);
      this.board.group.scale.set(scale);
      // 居中遊戲面板
      this.board.alignToCenter();
    }

    // 創建觸摸手勢縮放與平移事件
    this.hammerManager = new Hammer.Manager(this.game.canvas);
    this.hammerManager.add(new Hammer.Pan({threshold: 0, pointers: 0}));
    this.hammerManager.add(new Hammer.Pinch({threshold: 0}))
      .recognizeWith(this.hammerManager.get('pan'));

    this.hammerManager.on("panstart panmove", this.handlePan.bind(this));
    this.hammerManager.on("pinchstart pinchmove", this.handlePinch.bind(this));
    this.hammerManager.on("hammer.input", (event) => {
      if(event.isFinal) {
        transform.translate = null;
        transform.scale = null;
        Board.panning = false;
        Board.pinching = false;
      }
    });

    // 遊戲結束時禁用與還原縮放
    this.board.onGameEnded.add(()=> {
      // 禁用縮放與平移
      this.game.input.mouse.mouseWheelCallback = null;
      this.hammerManager.destroy();

      // 還原縮放
      this.board.group.scale.set(1);
      this.board.alignToCenter();
    }, this);

    // 輔助功能：按住CTRL鍵偷看全部方塊
    let ctrlKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ALT);
    ctrlKey.onDown.add(() => {
      this.board.peekAllTiles();
    });
    ctrlKey.onUp.add(() => {
      this.board.cancelPeekAllTiles();
    });
  }

  // 初始遊戲面板
  initBoard () {
    let availWidth = this.game.width - 20 * DPR;
    let availHeight = this.game.height - 128 * DPR - config.timerIconSize;
    let aspectRatio = this.gameProps.boardWidth / this.gameProps.boardHeight;

    // 遊戲面板有效範圍矩形
    this.availRect = new Phaser.Rectangle(
      10 * DPR,
      78 * DPR,
      availWidth,
      this.game.height - 148 * DPR
    );

    // 窄屏
    if (availHeight > availWidth && aspectRatio > 1) {
      let temp = this.gameProps.boardWidth;
      this.gameProps.boardWidth = this.gameProps.boardHeight;
      this.gameProps.boardHeight = temp;
      aspectRatio = this.gameProps.boardWidth / this.gameProps.boardHeight;
    }

    // 等比例鋪滿可用空間
    let width = availWidth;
    let height = width / aspectRatio;
    if ( height > availHeight ) {
      height = availHeight;
      width = height * aspectRatio;
    }
    this.gameProps.tileWidth = width / this.gameProps.boardWidth;
    this.gameProps.tileHeight = this.gameProps.tileWidth;

    // 設置遊戲面板的最大縮放比例
    this.boardMaxScale = this.gameProps.boardMaxScale = Math.max(
      80 * DPR / this.gameProps.tileHeight, 2
    );

    this.board = new Board({
      game: this.game,
      cols: this.gameProps.boardWidth,
      rows: this.gameProps.boardHeight,
      mines: this.gameProps.mineTotal,
      tileWidth: this.gameProps.tileWidth,
      tileHeight: this.gameProps.tileHeight,
      boardMaxScale: this.boardMaxScale
    });
  }

  // 遊戲勝利
  gameWin () {
    // 設置並保存最佳用時
    this.gameData[this.currentLevel] = this.gameData[this.currentLevel] || {};
    if (!this.gameData[this.currentLevel].bestTime) {
      this.gameData[this.currentLevel].bestTime = this.timer.timeText;
      this.gameData[this.currentLevel].bestTimeValue = this.timer.time;
    } else if (this.timer.time < this.gameData[this.currentLevel].bestTimeValue) {
      this.gameData[this.currentLevel].bestTime = this.timer.timeText;
      this.gameData[this.currentLevel].bestTimeValue = this.timer.time;
    }
    this.saveGameData();

    // 切換到遊戲勝利的場景
    this.game.state.start('GameWin', false, false, {
      gameProps: this.gameProps,
      currentTime: this.timer.timeText,
      bestTime: this.gameData[this.currentLevel].bestTime,
      isGameWin: true
    });
  }

  // 遊戲失敗
  gameOver () {
    // 設置並保存最佳用時
    let bestTime = '暫無記錄';
    if (this.gameData[this.currentLevel] && this.gameData[this.currentLevel].bestTime) {
      bestTime = this.gameData[this.currentLevel].bestTime;
    }

    // 切換到遊戲失敗的場景
    this.game.state.start('GameOver', false, false, {
      gameProps: this.gameProps,
      currentTime: this.timer.timeText,
      bestTime: bestTime,
      isGameWin: false
    });
  }

  // 保存遊戲數據到客戶端本地
  saveGameData () {
    try {
      localStorage.setItem(config.localStorageName, JSON.stringify(this.gameData));
    } catch (err) {
      // 忽略寫入錯誤
    }
  }

  // 讀取客戶端本地的遊戲數據
  loadGameData () {
    try {
      const gameData = localStorage.getItem(config.localStorageName);
      if (gameData === null) {
        return {};
      }
      return JSON.parse(gameData);
    } catch (err) {
      return {};
    }
  }

  // 返回菜單
  backMenu () {
    this.game.state.start('Menu');
  }

  // 平移遊戲面板事件處理器
  handlePan(event) {
    let availRect = this.availRect;
    let boardRect = this.board.group.getBounds();
    
    // 如果遊戲面板大小未超出有效範圍，直接跳過
    if (boardRect.width <= availRect.width && boardRect.height <= availRect.height) {
      return;
    }

    // 初始化平移起始坐標
    if (event.type == 'panstart') {
      boardStartX = this.board.group.x;
      boardStartY = this.board.group.y;

      // 標記遊戲面板正在平移
      Board.panning = true;
    }

    // 獲取移動到的坐標
    let x = boardStartX + event.deltaX * DPR;
    let y = boardStartY + event.deltaY * DPR;

    // 限制遊戲面板可移動的範圍
    if (boardRect.width > availRect.width) {
      x = clamp(x, availRect.x + availRect.width - boardRect.width, availRect.x);
    } else {
      x = boardRect.x;
    }

    if (boardRect.height > availRect.height) {
      y = clamp(y, availRect.y + availRect.height - boardRect.height, availRect.y);
    } else {
      y = boardRect.y;
    }

    transform.translate = {x, y};
  }

  // 雙指縮放遊戲面板事件處理器
  handlePinch(event) {
    // 初始化起始縮放
    if (event.type == 'pinchstart') {
      initScale = this.board.group.scale.x;

      // 標記遊戲面板正在縮放
      Board.pinching = true;
    }

    transform.scale = clamp(initScale * event.scale, 1, this.boardMaxScale);
  }

  update () {
    // 更新遊戲面板的平移與縮放
    if (transform.translate) {
      this.board.group.x = transform.translate.x;
      this.board.group.y = transform.translate.y;
    }

    if (transform.scale) {
      this.board.group.scale.set(transform.scale);
      // 居中遊戲面板
      this.board.alignToCenter();
    }
  }
}