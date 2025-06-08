const WORDS = ["crane", "plant", "flame", "stone", "glide", "track", "right", "light", "store"];
const target = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();

let board = document.getElementById("board");
let keyboard = document.getElementById("keyboard");
let currentGuess = "";
let currentRow = 0;
let maxRows = 6;

function buildBoard() {
  for (let i = 0; i < 30; i++) {
    let tile = document.createElement("div");
    tile.className = "tile";
    tile.id = "tile-" + i;
    board.appendChild(tile);
  }
}

function buildKeyboard() {
  const keys = [
    ..."QWERTYUIOP",
    ..."ASDFGHJKL",
    "ENTER", ..."ZXCVBNM", "DEL"
  ];

  keys.forEach(k => {
    let key = document.createElement("button");
    key.className = "key";
    key.textContent = k;
    key.onclick = () => keyPressed(k);
    keyboard.appendChild(key);
  });
}

function keyPressed(k) {
  if (k === "DEL") {
    currentGuess = currentGuess.slice(0, -1);
  } else if (k === "ENTER") {
    if (currentGuess.length === 5) {
      checkGuess();
      currentGuess = "";
      currentRow++;
    }
  } else {
    if (currentGuess.length < 5) {
      currentGuess += k;
    }
  }
  updateBoard();
}

function updateBoard() {
  for (let i = 0; i < 5; i++) {
    const tileIndex = currentRow * 5 + i;
    const tile = document.getElementById("tile-" + tileIndex);
    tile.textContent = currentGuess[i] || "";
  }
}

function checkGuess() {
  const guess = currentGuess.toUpperCase();
  for (let i = 0; i < 5; i++) {
    const tileIndex = currentRow * 5 + i;
    const tile = document.getElementById("tile-" + tileIndex);
    if (guess[i] === target[i]) {
      tile.style.backgroundColor = "green";
    } else if (target.includes(guess[i])) {
      tile.style.backgroundColor = "gold";
    } else {
      tile.style.backgroundColor = "gray";
    }
  }

  if (guess === target) {
    setTimeout(() => alert("You guessed the word! 🎉"), 100);
  } else if (currentRow === maxRows - 1) {
    setTimeout(() => alert("Out of tries! Word was: " + target), 100);
  }
}

buildBoard();
buildKeyboard();
