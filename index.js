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
const $historyButton = document.querySelector(".moves-box__button");
const $scorePlayer1 = document.querySelector(".scoreboard-score-1");
const $scorePlayer2 = document.querySelector(".scoreboard-score-2");
const $winnerNameField = document.querySelector(".game-box__winner");
const $playerTurn = document.querySelector(".game-box__scoreboard--player");
const $switcherBot = document.querySelector(
  ".start-box__player--input-switcher"
);
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

const movePlayScenery = [];
//#endregion

//#region GLOBAL VARIABLES
let movePlayer = "X";
let gameStart = false;
let score1 = 0;
let score2 = 0;
let botActive = false;
let bestOf = 5;
//#endregion

//#region FUNCTIONS
//** MOVE AND SCORE */
const toggleMove = () => {
  movePlayer = movePlayer === "X" ? "O" : "X";
  printPlayerTurn(movePlayer);
};

const toggleBestOf = () => {
  bestOf = bestOf === 5 ? 3 : 5;
};

const getMoveScenery = () => {
  const scenery = [];

  $boardFieldList.forEach(($board) => {
    scenery.push($board.textContent);
  });

  return scenery;
};

const addMoveScenery = () => {
  const scenery = getMoveScenery();
  movePlayScenery.push(scenery);
};

const printBoardScenery = (scenery) => {
  scenery.forEach((item, index) => {
    $boardFieldList[index].textContent = scenery[index];
  });
};

const printPlayerTurn = (move) => {
  $playerTurn.textContent =
    move === "X" ? $player1Name.value : $player2Name.value;
};

const printScore = () => {
  $scorePlayer1.textContent = score1 < 10 ? "0" + score1 : score1;
  $scorePlayer2.textContent = score1 < 10 ? "0" + score2 : score2;
};

const printEndGameHistory = (winner, scenery) => {
  const listItem = document.createElement("li");
  const winnerContainer = document.createElement("div");
  const winnerTitle = document.createElement("strong");
  const winnerName = document.createElement("span");
  const sceneryContainerTitle = document.createElement("span");
  const miniBoardContainer = document.createElement("div");

  //* LIST ITEM
  listItem.classList.add("start-box__moves");

  //* DIV
  winnerContainer.classList.add("start-box__moves-winner");

  //* STRONG
  winnerTitle.classList.add("start-box__moves-winner--title");
  winnerTitle.textContent = "Vencedor";

  //* SPAN
  winnerName.classList.add("start-box__moves-winner--name");
  winnerName.textContent = winner;

  //*SPAN
  sceneryContainerTitle.classList.add("start-box__moves-winner--scenery");
  sceneryContainerTitle.textContent = "Cenário";

  //* BOARD CONTAINER
  miniBoardContainer.classList.add("start-box__moves-mini-board");

  scenery.forEach((move) => {
    const miniBoardScenery = document.createElement("span");

    miniBoardScenery.classList.add("start-box__moves-mini-board--item");
    miniBoardScenery.textContent = move;

    miniBoardContainer.appendChild(miniBoardScenery);
  });

  winnerContainer.appendChild(winnerTitle);
  winnerContainer.appendChild(winnerName);

  listItem.appendChild(winnerContainer);
  listItem.appendChild(winnerContainer);
  listItem.appendChild(sceneryContainerTitle);
  listItem.appendChild(miniBoardContainer);

  $endGameHistory.appendChild(listItem);
};

//** VERIFICATION */
const verifyGame = () => {
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

  $boardFieldList.forEach(($field) => {
    if ($field.textContent != "") filledFields++;
  });

  if (filledFields === 9) return "draw";
};

const verifyBestOf = () => {
  if ((score1 === 2 && bestOf === 3) || (score1 === 3 && bestOf === 5))
    return "X";
  if ((score2 === 2 && bestOf === 3) || (score2 === 3 && bestOf === 5))
    return "O";
};

//** POINTs */
const addPoint = (winner) => {
  if (winner === "X") score1++;
  if (winner === "O") score2++;
};

//** MOVE HiStORY */
const printMoveHistory = (move, player, fieldIndex) => {
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
  const listItem = document.createElement("li");
  const movePlayerIcon = document.createElement("small");
  const textContainer = document.createElement("div");
  const textPlayerName = document.createElement("strong");
  const textPosition = document.createElement("span");

  //* LIST ITEM
  listItem.classList.add("moves-box__move-list--item");

  //* MOVE
  movePlayerIcon.classList.add("moves-box__move-list--item-icon");
  movePlayerIcon.textContent = move;

  //* TEXT CONTAINER
  textContainer.classList.add("moves-box__move-text");

  //* TEXT STRONG
  textPlayerName.classList.add("moves-box__move-text--name");
  textPlayerName.textContent = player;

  //* TEXT SPAN
  textPosition.classList.add("moves-box__move-text--position");
  textPosition.textContent = dictionaryIndexField[fieldIndex] + " Campo";

  textContainer.appendChild(textPlayerName);
  textContainer.appendChild(textPosition);

  listItem.appendChild(movePlayerIcon);
  listItem.appendChild(textContainer);

  $turnMovesHistoryList.appendChild(listItem);

  const $turnMovesHistoryItem = document.querySelectorAll(
    ".moves-box__move-list--item"
  );

  const scenery = getMoveScenery()

  $turnMovesHistoryItem.forEach(($item, index) => {
    $item.addEventListener("click", () => {
      const currentScenery = movePlayScenery[index];

      $historyButton.classList.add("active");
      printBoardScenery(currentScenery);
      gameStart = false
    });
  });

  $historyButton.addEventListener("click", () => {
    gameStart = true;
    $historyButton.classList.remove("active");
    printBoardScenery(scenery)
  })


};

//** RESETs */
const resetBoard = () => {
  $boardFieldList.forEach(($item) => {
    $item.textContent = "";
  });

  gameStart = true;
};

const resetScoreBoard = () => {
  $scorePlayer1.textContent = "00";
  $scorePlayer2.textContent = "00";
};

const resetScoreVariables = () => {
  score1 = 0;
  score2 = 0;
};

const resetMoveHistory = () => {
  $turnMovesHistoryList.innerHTML = "";
};

const resetEndGameHistory = () => {
  $endGameHistory.innerHTML = "";
};

const resetGameWinner = () => {
  $winnerNameField.textContent = "";
};

const resetMovePlayScenery = () => {
  movePlayScenery.splice(0, movePlayScenery.length)
}

//** WINNER */
const gameWinner = (winnerName) => {
  const winnerMessage = document.createElement("span");
  const winnerMessageName = document.createElement("strong");

  winnerMessage.classList.add("game-box__winner--name")
  winnerMessage.textContent =  "O vencedor da melhor de " + bestOf + " foi " 

  winnerMessageName.textContent = winnerName

  winnerMessage.appendChild(winnerMessageName)

  $winnerNameField.appendChild(winnerMessage)
};

//** MOVES */
const bot = () => {
  const randomNumber = Math.random() * 9;
  const index = Math.floor(randomNumber);
  const $boardItem = $boardFieldList[index];
  const game = verifyGame();

  if ($boardItem.textContent != "" && game != "draw") return bot();

  moveBoard(index, "bot");
};

const moveBoard = (boardIndex, type) => {
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
      setTimeout(resetMovePlayScenery, 800);
      printEndGameHistory(playerName, scenery);
      movePlayer = "O";
    }

    if (gameResult == "draw") {
      setTimeout(resetBoard, 800);
      setTimeout(resetMoveHistory, 800);
      printEndGameHistory("Empate", scenery);
      resetMovePlayScenery()
    }

    const bestOfResult = verifyBestOf();

    printMoveHistory(movePlayer, playerName, boardIndex);
    printScore();
    toggleMove();
    addMoveScenery();

    if ($winnerNameField.textContent !== "") resetGameWinner();
    if (type === "user" && botActive) setTimeout(bot, 100);
    if (bestOfResult !== undefined) {
      resetScoreBoard();
      resetScoreVariables();
      gameWinner(playerName);
    }
  }
};
//#endregion

//** MOVES BOARD*/
$boardFieldList.forEach(function ($field, index) {
  $field.addEventListener("click", () => {
    moveBoard(index, "user");
  });
});

//** START AND RESET BUTTONS */
$startButton.addEventListener("click", () => {
  gameStart = !gameStart;
  $startButton.classList.toggle("start");
  $player1Name.disabled = !$player2Name.disabled;
  $player2Name.disabled = !$player2Name.disabled;
  if (gameStart) {
    $playerTurn.textContent = $player1Name.value;
  }
});

$resetButton.addEventListener("click", () => {
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
$switcherBot.addEventListener("click", () => {
  $switcherBot.classList.toggle("start-box__player--input-switcher-toggle");
  botActive = !botActive;
  $player2Name.value = botActive ? "BOT" : "";
  $player2Name.disabled = !$player2Name.disabled;
});

$switcherBestOf.addEventListener("click", () => {
  $switcherBestOf.classList.toggle("start-box__player--input-switcher-toggle");
  toggleBestOf();
});
