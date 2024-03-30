const gameBoard = document.getElementById('gameBoard');
const levelSelect = document.getElementById('level');
const difficultySelect = document.getElementById('difficulty');
const startBtn = document.getElementById('startBtn');

let boardSize = 3;
let difficulty = 1;
let tiles = [];

startBtn.addEventListener('click', startGame);

function startGame() {
  boardSize = parseInt(levelSelect.value);
  difficulty = parseInt(difficultySelect.value);
  createBoard();
}

function createBoard() {
  gameBoard.innerHTML = '';
  tiles = [];
  
  for (let i = 1; i <= boardSize * boardSize - 1; i++) {
    tiles.push(i);
  }
  tiles.push(null); // Empty tile
  
  shuffleTiles();
  renderBoard();
}

function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  
  // Ensure the puzzle is solvable
  if (!isSolvable()) {
    shuffleTiles();
  }
}

function isSolvable() {
  let inversions = 0;
  
  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) {
        inversions++;
      }
    }
  }
  
  if (boardSize % 2 === 1) {
    return inversions % 2 === 0;
  } else {
    const emptyTileRow = Math.floor(tiles.indexOf(null) / boardSize) + 1;
    return (inversions + emptyTileRow) % 2 === 1;
  }
}

function renderBoard() {
  gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
  gameBoard.style.width = `${boardSize * 60}px`; // 每個方塊的大小設置為 60px，也可以調整
  
  tiles.forEach((tile, index) => {
    const tileElement = document.createElement('div');
    tileElement.classList.add('tile');
    tileElement.textContent = tile ? tile : '';
    tileElement.dataset.index = index;
    tileElement.addEventListener('click', () => moveTile(index));
    
    gameBoard.appendChild(tileElement);
  });
}

function moveTile(index) {
  const emptyIndex = tiles.indexOf(null);
  const rowDiff = Math.floor(Math.abs(index % boardSize - emptyIndex % boardSize));
  const colDiff = Math.floor(Math.abs(Math.floor(index / boardSize) - Math.floor(emptyIndex / boardSize)));
  
  if ((rowDiff === 0 && colDiff === 1) || (rowDiff === 1 && colDiff === 0)) {
    animateMove(index, emptyIndex);
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    checkWin();
  }
}

function animateMove(fromIndex, toIndex) {
  const tile = document.querySelector(`.tile[data-index="${fromIndex}"]`);
  const emptyTile = document.querySelector(`.tile[data-index="${toIndex}"]`);
  
  tile.classList.add('move');
  setTimeout(() => {
    emptyTile.textContent = tile.textContent;
    tile.textContent = '';
    tile.classList.remove('move');
  }, 200);
}

function checkWin() {
  const isWin = tiles.every((tile, index) => {
    return tile === null || tile === index + 1;
  });
  
  if (isWin) {
    setTimeout(() => {
        Swal.fire({
            icon: 'success',
            title: 'Good job!',
            html: '你成功了！',
            confirmButtonText: '確定',
            footer: '製作：<a href="https://wmcc.jp.eu.org" target="_blank">YeSheng</a>'
        });
    }, 250);
  }
}
