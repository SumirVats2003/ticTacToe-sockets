// Socket logic
const socket = io();

// Game Logic starts here
let symbol = false;
let gameOver = false;
let started = false;
const cells = document.getElementsByClassName("cell");
const result = document.querySelector(".result");
let grid = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];
let filled = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const cellIdToIndex = {
  one: [0, 0],
  two: [0, 1],
  three: [0, 2],
  four: [1, 0],
  five: [1, 1],
  six: [1, 2],
  seven: [2, 0],
  eight: [2, 1],
  nine: [2, 2],
};

Array.from(cells).forEach((element) => {
  element.addEventListener("click", (event) => {
    started = true;
    if (started) {
      result.innerText = "Match in Progress!!";
    }
    if (!gameOver) {
      const cellId = event.target.id;
      const [row, col] = cellIdToIndex[cellId];

      if (grid[row][col] === -1) {
        grid[row][col] = symbol ? 1 : 0;
        filled[row][col] = 1;

        if (symbol) {
          element.innerText = "O";
        } else {
          element.innerText = "X";
        }

        if (checkWin()) {
          result.innerText = `${symbol ? "O" : "X"} Wins!!!`;
        }
        symbol = !symbol;
      }
    }
  });
});

function checkWin() {
  if (checkDraw()) {
    result.innerText = "Drawn!";
    gameOver = true;
    return false;
  }

  // Check rows
  for (let row = 0; row < 3; row++) {
    if (checkRow(row)) {
      gameOver = true;
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (checkColumn(col)) {
      gameOver = true;
      return true;
    }
  }

  // Check diagonals
  if (checkDiagonal() || checkAntiDiagonal()) {
    gameOver = true;
    return true;
  }

  return false;
}

function checkRow(row) {
  const symbol = grid[row][0];
  if (symbol === -1) {
    return false;
  }
  for (let col = 1; col < 3; col++) {
    if (grid[row][col] !== symbol) {
      return false;
    }
  }
  return true;
}

function checkColumn(col) {
  const symbol = grid[0][col];
  if (symbol === -1) {
    return false;
  }
  for (let row = 1; row < 3; row++) {
    if (grid[row][col] !== symbol) {
      return false;
    }
  }
  return true;
}

function checkDiagonal() {
  const symbol = grid[0][0];
  if (symbol === -1) {
    return false;
  }
  for (let i = 1; i < 3; i++) {
    if (grid[i][i] !== symbol) {
      return false;
    }
  }
  return true;
}

function checkAntiDiagonal() {
  const symbol = grid[0][2];
  if (symbol === -1) {
    return false;
  }
  for (let i = 1; i < 3; i++) {
    if (grid[i][2 - i] !== symbol) {
      return false;
    }
  }
  return true;
}

function checkDraw() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!filled[i][j]) {
        return false;
      }
    }
  }
  return true;
}
