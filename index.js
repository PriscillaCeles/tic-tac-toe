//#region GLOBAL CONSTANTS
const $boardFieldList = document.querySelectorAll(
  ".game-box__moves-board--item"
);
const $player1Name = document.querySelector(".player--input-player-1");
const $player2Name = document.querySelector(".player--input-player-2");
const $turnMovesHistoryList = document.querySelector(".moves-box__move-list");
const $winnerPrint = document.querySelector(".start-box__moves-winner--name");
const $startButton = document.querySelector(".start-box__button--play");
const $resetButton = document.querySelector(".start-box__button--reset");
const $scorePlayer1 = document.querySelector(".scoreboard-score-1");
const $scorePlayer2 = document.querySelector(".scoreboard-score-2");
const $playerTurn = document.querySelector(".game-box__scoreboard--player");
const $switcher = document.querySelector(".start-box__player--input-switcher");
const $switcher2 = document.querySelector(
  ".start-box__player--input-switcher-2"
);

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//#endregion

//#region GLOBAL VARIABLES
let movePlayer = "X";
let gameStart = false;
let score1 = 0;
let score2 = 0;
//#endregion

//#region FUNCTIONS
//** MOVE AND SCORE */
function toggleMove() {
  movePlayer = movePlayer === "X" ? "O" : "X";
  printPlayerTurn(movePlayer);
}

function printPlayerTurn(move) {
  $playerTurn.textContent =
    move === "X" ? $player1Name.value : $player2Name.value;
}

function printScore() {
  $scorePlayer1.textContent = score1 < 10 ? "0" + score1 : score1;
  $scorePlayer2.textContent = score1 < 10 ? "0" + score2 : score2;
}

function verifyGame() {
  let filledFields = 0;

  for (const condition of winConditions) {
    const fieldIndex0 = condition[0];
    const fieldIndex1 = condition[1];
    const fieldIndex2 = condition[2];

    const $field0 = $boardFieldList[fieldIndex0];
    const $field1 = $boardFieldList[fieldIndex1];
    const $field2 = $boardFieldList[fieldIndex2];

    if (
      $field0.textContent != "" &&
      $field0.textContent == $field1.textContent &&
      $field1.textContent == $field2.textContent
    ) {
      return movePlayer;
    }
  }

  for (const $field of $boardFieldList) {
    if ($field.textContent != "") filledFields++;
  }
  if (filledFields === 9) return "draw";
}

function addPoint(winner) {
  if (winner === "X") score1++;
  if (winner === "O") score2++;
}

function printWinnerName(winnerName) {
  $winnerPrint.textContent = winnerName;
}

//** MOVE HiStORY */
function printMoveHistory(move, player, fieldIndex) {
  const dictionaryIndexField = [
    "Primeiro",
    "Segundo",
    "Terceiro",
    "Quarto",
    "Quinto",
    "Sexto",
    "Sétimo",
    "Oitavo",
    "Nono",
  ];

  $turnMovesHistoryList.innerHTML += `
    <li class="moves-box__move-list--item">
      <small class="moves-box__move-list--item-icon">${move}</small>
      <div class="moves-box__move-text">
        <strong class="moves-box__move-text--name">${player}</strong>
        <span class="moves-box__move-text--position">${dictionaryIndexField[fieldIndex]} campo</span>
      </div>
    </li>
  `;
}

//** RESETs */
function resetBoard() {
  for (let i = 0; i < $boardFieldList.length; i++) {
    $boardFieldList[i].textContent = "";
  }
  gameStart = true;
}

function resetScoreBoard() {
  $scorePlayer1.textContent = "00";
  $scorePlayer2.textContent = "00";
}

function resetScoreVariables() {
  score1 = 0;
  score2 = 0;
}

function resetMoveHistory() {
  $turnMovesHistoryList.innerHTML = "";
}
//#endregion

//** MOVES */
$boardFieldList.forEach(function ($field, index) {
  $field.addEventListener("click", function () {
    if (gameStart) {
      if ($field.textContent != "") return;

      $field.textContent = movePlayer;

      const gameResult = verifyGame();
      const playerName =
        movePlayer === "X" ? $player1Name.value : $player2Name.value;

      if (gameResult === "X" || gameResult === "O") {
        gameStart = false;
        printWinnerName(playerName);
        addPoint(gameResult);
        setTimeout(resetBoard, 800);
        setTimeout(resetMoveHistory, 800);
      }

      if (gameResult == "draw") {
        $winnerPrint.textContent = "Empate";
        setTimeout(resetBoard, 800);
        setTimeout(resetMoveHistory, 800);
      }

      console.log(index);
      printMoveHistory(movePlayer, playerName, index);
      printScore();
      toggleMove();
    }
  });
});

//** START AND RESET BUTTONS */
$startButton.addEventListener("click", function () {
  gameStart = !gameStart;
  $startButton.classList.toggle("start");
  if (gameStart) {
    $playerTurn.textContent = $player1Name.value;
  }
});

$resetButton.addEventListener("click", function () {
  $startButton.classList.remove("start");
  resetBoard();
  resetMoveHistory();
  resetScoreBoard();
  resetScoreVariables();
  $playerTurn.textContent = "";
  $player1Name.textContent = "";
  $player2Name.textContent = "";
})

//** CHECKBOX */
$switcher.addEventListener("click", function () {
  $switcher.classList.toggle("start-box__player--input-switcher-toggle");
});

$switcher2.addEventListener("click", function () {
  $switcher2.classList.toggle("start-box__player--input-switcher-toggle");
});
