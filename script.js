const board = document.getElementById('board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8], 
  [0,4,8], [2,4,6]           
];


function createBoard() {
  board.innerHTML = "";
  boardState.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.index = index;
    div.textContent = cell;
    div.addEventListener('click', handleCellClick);
    board.appendChild(div);
  });
}


function handleCellClick(e) {
  const idx = e.target.dataset.index;

  if (boardState[idx] !== "" || !gameActive) return;

  boardState[idx] = currentPlayer;
  createBoard();
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s Turn`;
}


function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      status.textContent = `🎉 Player ${boardState[a]} Wins!`;
      gameActive = false;
      return;
    }
  }

  if (!boardState.includes("")) {
    status.textContent = "It's a Draw!";
    gameActive = false;
  }
}

restartBtn.addEventListener('click', () => {
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s Turn`;
  createBoard();
});

createBoard();
