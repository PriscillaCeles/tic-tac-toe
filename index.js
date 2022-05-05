const $boardField = document.querySelectorAll(".game-box__moves-board--item");
const $roundMovesWinner = document.querySelector(".start-box__round-moves");

const $player1Name = document.querySelector(".player--input-player-1");
const $player2Name = document.querySelector(".player--input-player-2");

const $winnerPrint = document.querySelector(".start-box__moves-winner--name");

const $startButton = document.querySelector(".start-box__button--play");
const $resettButton = document.querySelector(".start-box__button--reset");

const $scorePlayer1 = document.querySelector(".scoreboard-score-1");
const $scorePlayer2 = document.querySelector(".scoreboard-score-2");

const $playerRound = document.querySelector(".game-box__scoreboard--player");

const $switcher = document.querySelector(".start-box__player--input-switcher");
const $switcher2 = document.querySelector(
  ".start-box__player--input-switcher-2"
);

let movePlayer = "X";

let gameStart = false;

let score1 = 0;
let score2 = 0;

function resetBoard() {
  $boardField[0].textContent = "";
  for (let i = 0; i < $boardField.length; i++) {
    $boardField[i].textContent = "";
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
  if (
    ($boardField[0].textContent != "" &&
      $boardField[0].textContent == $boardField[2].textContent &&
      $boardField[1].textContent == $boardField[2].textContent) ||
    ($boardField[3].textContent != "" &&
      $boardField[3].textContent == $boardField[4].textContent &&
      $boardField[4].textContent == $boardField[5].textContent) ||
    ($boardField[6].textContent != "" &&
      $boardField[6].textContent == $boardField[7].textContent &&
      $boardField[7].textContent == $boardField[8].textContent) ||
    ($boardField[0].textContent != "" &&
      $boardField[0].textContent == $boardField[3].textContent &&
      $boardField[3].textContent == $boardField[6].textContent) ||
    ($boardField[1].textContent != "" &&
      $boardField[1].textContent == $boardField[4].textContent &&
      $boardField[4].textContent == $boardField[7].textContent) ||
    ($boardField[2].textContent != "" &&
      $boardField[2].textContent == $boardField[5].textContent &&
      $boardField[5].textContent == $boardField[8].textContent) ||
    ($boardField[0].textContent != "" &&
      $boardField[0].textContent == $boardField[4].textContent &&
      $boardField[4].textContent == $boardField[8].textContent) ||
    ($boardField[2].textContent != "" &&
      $boardField[2].textContent == $boardField[4].textContent &&
      $boardField[4].textContent == $boardField[6].textContent)
  ) {
    return movePlayer;
  }

  if (
      $boardField[0].textContent != "" &&
      $boardField[1].textContent != "" &&
      $boardField[2].textContent != "" &&
      $boardField[3].textContent != "" &&
      $boardField[4].textContent != "" &&
      $boardField[5].textContent != "" && 
      $boardField[6].textContent != '' && 
      $boardField[7].textContent != '' && 
      $boardField[8].textContent != ''
    ) {

    return "draw";
  }
}

$boardField.forEach(function ($field) {
  $field.addEventListener("click", function () {
    if (gameStart) {
      if ($field.innerHTML != "") {
        return;
      }

      $field.innerHTML = movePlayer;
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
