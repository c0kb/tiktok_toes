let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const boardElement = document.getElementById('game-board');
const gameStatusElement = document.getElementById('game-status');
const newGameButton = document.getElementById('new-game');
const twoPlayerButton = document.getElementById('two-player');
const singlePlayerButton = document.getElementById('single-player');
let gameMode = 'two-player';

function initializeBoard() {
    boardElement.innerHTML = '';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    gameStatusElement.textContent = '';
    newGameButton.style.display = 'none';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.dataset.index;

    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameStatusElement.textContent = `${currentPlayer} játékos nyert!`;
        gameActive = false;
        newGameButton.style.display = 'inline-block';
    } else if (gameBoard.every(cell => cell !== '')) {
        gameStatusElement.textContent = 'A játék döntetlen.';
        gameActive = false;
        newGameButton.style.display = 'inline-block';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameMode === 'single-player' && currentPlayer === 'O') {
            setTimeout(computerMove, 500);
        }
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function computerMove() {
    if (!gameActive) return;

    const availableCells = gameBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    const randomMove = availableCells[Math.floor(Math.random() * availableCells.length)];
    
    gameBoard[randomMove] = 'O';
    const cell = boardElement.children[randomMove];
    cell.textContent = 'O';

    if (checkWin()) {
        gameStatusElement.textContent = 'A számítógép nyert!';
        gameActive = false;
        newGameButton.style.display = 'inline-block';
    } else if (gameBoard.every(cell => cell !== '')) {
        gameStatusElement.textContent = 'A játék döntetlen.';
        gameActive = false;
        newGameButton.style.display = 'inline-block';
    } else {
        currentPlayer = 'X';
    }
}

function startNewGame() {
    initializeBoard();
    gameStatusElement.textContent = '';
}

twoPlayerButton.addEventListener('click', () => {
    gameMode = 'two-player';
    initializeBoard();
});

singlePlayerButton.addEventListener('click', () => {
    gameMode = 'single-player';
    initializeBoard();
});

newGameButton.addEventListener('click', startNewGame);

initializeBoard();
