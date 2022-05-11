//#region CONSTANTS
const $boardFieldList = document.querySelectorAll(".game-box__moves-board--item");

const $player1Name = document.querySelector(".player--input-player-1");
const $player2Name = document.querySelector(".player--input-player-2");

const $roundMovesWinner = document.querySelector(".start-box__round-moves");
const $winnerPrint = document.querySelector(".start-box__moves-winner--name");

const $startButton = document.querySelector(".start-box__button--play");
const $resetButton = document.querySelector(".start-box__button--reset");

const $scorePlayer1 = document.querySelector(".scoreboard-score-1");
const $scorePlayer2 = document.querySelector(".scoreboard-score-2");
const $playerRound = document.querySelector(".game-box__scoreboard--player");

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
  [2, 4, 6]
]
//#endregion

//#region VARIABLES
let movePlayer = "X";

let gameStart = false;

let score1 = 0;
let score2 = 0;
//#endregion

//#region FUNCTIONS
function resetBoard() {
  $boardFieldList[0].textContent = "";
  for (let i = 0; i < $boardFieldList.length; i++) {
    $boardFieldList[i].textContent = "";
  }
}

function resetScoreBoard() {
  $scorePlayer1.innerHTML = "00";
  $scorePlayer2.innerHTML = "00";
}

function resetScoreVariables() {
  score1 = 0;
  score2 = 0;
}

function toggleMove() {
  if (movePlayer == "X") {
    movePlayer = "O";
    $playerRound.innerHTML = $player2Name.value;
  } else {
    movePlayer = "X";
    $playerRound.innerHTML = $player1Name.value;
  }
}

function printScore() {
  if (score1 < 10) {
    $scorePlayer1.innerHTML = "0" + score1;
  } else {
    $scorePlayer1.innerHTML = score1;
  }
  if (score2 < 10) {
    $scorePlayer2.innerHTML = "0" + score2;
  } else {
    $scorePlayer2.innerHTML = score2;
  }
}

function verifyGame() {
  let filledFields = 0;

  for (const condition of winConditions) {
    const fieldIndex0 = condition[0]
    const fieldIndex1 = condition[1]
    const fieldIndex2 = condition[2]

    const $field0 = $boardFieldList[fieldIndex0]
    const $field1 = $boardFieldList[fieldIndex1]
    const $field2 = $boardFieldList[fieldIndex2]

    if (
      $field0.textContent != "" &&
      $field0.textContent == $field1.textContent &&
      $field1.textContent == $field2.textContent
      ){
        return movePlayer;
      } 
    }

    for (const $field of $boardFieldList) {
      if ($field.textContent != '') filledFields++
    }

    if (filledFields == 9) return 'draw'
}

function result() {
  const gameResult = verifyGame();

  if (gameResult != undefined && gameResult == "X") {
    $winnerPrint.innerHTML = $player1Name.value;
    score1 += 1;
    setTimeout(resetBoard, 800);
    movePlayer = "O";
  } else if (gameResult != undefined && gameResult == "O") {
    $winnerPrint.innerHTML = $player2Name.value;
    score2 += 1;
    setTimeout(resetBoard, 800);
    movePlayer = "O";
  }
  if (gameResult == "draw"){
    setTimeout(resetBoard, 800);
    movePlayer = "O";
    $winnerPrint.innerHTML = 'Empate';
  }
}
//#endregion

$boardFieldList.forEach(function ($field) {
  $field.addEventListener("click", function () {
    if (gameStart) {
      if ($field.innerHTML != "") return;

      $field.innerHTML = movePlayer;

      result ();
      printScore();
      toggleMove();
    }
  });
});

$startButton.addEventListener("click", function () {
  gameStart = !gameStart;
  $startButton.classList.toggle("start");
  if (gameStart) {
    $playerRound.innerHTML = $player1Name.value;
  }
});

// Checkbox Buttons
$switcher.addEventListener("click", function () {
  $switcher.classList.toggle("start-box__player--input-switcher-toggle");
});

$switcher2.addEventListener("click", function () {
  $switcher2.classList.toggle("start-box__player--input-switcher-toggle");
});
