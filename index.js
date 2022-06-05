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
const $winnerNameField = document.querySelector(".game-box__winner--name");
const $playerTurn = document.querySelector(".game-box__scoreboard--player");
const $switcherBot = document.querySelector(".start-box__player--input-switcher");
const $switcherBestOf = document.querySelector(
  ".start-box__player--input-switcher-2"
);
const $endGameHistory = document.querySelector(".start-box__moves-list");

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
let botActive = false;
let bestOf = 5
//#endregion

//#region FUNCTIONS
//** MOVE AND SCORE */
function toggleMove() {
  movePlayer = movePlayer === "X" ? "O" : "X";
  printPlayerTurn(movePlayer);
}

function toggleBestOf() {
  bestOf = bestOf === 5 ? 3 : 5
}

function getMoveScenery() {
  const scenery = [];

  for (const $board of $boardFieldList) {
    scenery.push($board.textContent);
  }
  return scenery;
}

function printPlayerTurn(move) {
  $playerTurn.textContent =
    move === "X" ? $player1Name.value : $player2Name.value;
}

function printScore() {
  $scorePlayer1.textContent = score1 < 10 ? "0" + score1 : score1;
  $scorePlayer2.textContent = score1 < 10 ? "0" + score2 : score2;
}

function printEndGameHistory(winner, scenery) {
  let miniBoardScenery = "";

  for (const move of scenery) {
    miniBoardScenery += `<span class="start-box__moves-mini-board--item">${move}</span>`;
  }

  $endGameHistory.innerHTML += `
  <li class="start-box__moves">
      <div class="start-box__moves-winner">
        <strong class="start-box__moves-winner--title">Vencedor</strong>
        <span class="start-box__moves-winner--name">${winner}</span>
      </div>
      <span class="start-box__moves-winner--scenery">Cenário</span>
      <div class="start-box__moves-mini-board">
        ${miniBoardScenery}
      </div>
    </li>
  `;
}

//** VERIFICATION */
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

function verifyBestOf() {
  if (score1 === 2 && bestOf === 3 || score1 === 3 && bestOf === 5) return "X";
  if (score2 === 2 && bestOf === 3 || score2 === 3 && bestOf === 5) return "O";
}

//** POINTs */
function addPoint(winner) {
  if (winner === "X") score1++;
  if (winner === "O") score2++;
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

function resetEndGameHistory() {
  $endGameHistory.innerHTML = "";
}

function resetGameWinner() {
  $winnerNameField.textContent = ""
}

//** WINNER */
function gameWinner(winnerName) {
  $winnerNameField.innerHTML = `O vencedor da melhor de ${bestOf} foi <strong>${winnerName}</strong>`
}

//** MOVES */
function bot() {
  const randomNumber = Math.random() * 9;
  const index = Math.floor(randomNumber);
  const $boardItem = $boardFieldList[index];
  const game = verifyGame();

  if ($boardItem.textContent != "" && game != "draw") return bot();

  moveBoard(index, "bot");
}

function moveBoard(boardIndex, type) {
  const $boardItem = $boardFieldList[boardIndex];

  if (gameStart) {
    if ($boardItem.textContent != "") return;

    $boardItem.textContent = movePlayer;

    const gameResult = verifyGame();
    const scenery = getMoveScenery();
    const playerName =
      movePlayer === "X" ? $player1Name.value : $player2Name.value;

    if (gameResult === "X" || gameResult === "O") {
      gameStart = false;
      addPoint(gameResult);
      setTimeout(resetBoard, 800);
      setTimeout(resetMoveHistory, 800);
      printEndGameHistory(playerName, scenery);
      movePlayer = "O"
    }

    if (gameResult == "draw") {
      setTimeout(resetBoard, 800);
      setTimeout(resetMoveHistory, 800);
      printEndGameHistory("Empate", scenery);
    }

    const bestOfResult =  verifyBestOf()

    printMoveHistory(movePlayer, playerName, boardIndex);
    printScore();
    toggleMove();

    if ($winnerNameField.textContent !== "") resetGameWinner()
    if (type === "user" && botActive) setTimeout(bot, 100);
    if (bestOfResult !== undefined) {
      resetScoreBoard()
      resetScoreVariables()
      gameWinner(playerName)
    }
  }
}
//#endregion

//** MOVES BOARD*/
$boardFieldList.forEach(function ($field, index) {
  $field.addEventListener("click", function () {
    moveBoard(index, "user");
  });
});

//** START AND RESET BUTTONS */
$startButton.addEventListener("click", function () {
  gameStart = !gameStart;
  $startButton.classList.toggle("start");
  $player1Name.disabled = !$player2Name.disabled;
  $player2Name.disabled = !$player2Name.disabled;
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
  resetEndGameHistory();
  gameStart = false;
  $playerTurn.textContent = "";
  $player1Name.textContent = "";
  $player2Name.textContent = "";
});

//** SWITCHER */
$switcherBot.addEventListener("click", function () {
  $switcherBot.classList.toggle("start-box__player--input-switcher-toggle");
  botActive = !botActive;
  $player2Name.value = botActive ? "BOT" : "";
  $player2Name.disabled = !$player2Name.disabled;
});

$switcherBestOf.addEventListener("click", function () {
  $switcherBestOf.classList.toggle("start-box__player--input-switcher-toggle");
  toggleBestOf()
});
