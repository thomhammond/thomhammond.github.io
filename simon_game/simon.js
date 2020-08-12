// Variables
var simonPattern = [];
var playerPattern = [];
var level = 0;
var index = 0;
var padColors = ["red", "blue", "green", "yellow"];
var gameModes = [
  "classic-click",
  "single-click",
  "grayscale-click",
  "reverse-click",
  "creator-click",
];
var currentMode = "classic";

// logic functions
function updateSimonPattern() {
  let randomNum = Math.floor(Math.random() * 4);
  let randomColor = padColors[randomNum];
  simonPattern.push(randomColor);
  playPattern(randomColor);
  return randomNum;
}

function checkAnswer(currentIndex) {
  // Check for correct sequence element
  if (playerPattern[currentIndex] != simonPattern[currentIndex]) {
    let audio = new Audio("simon_sounds/wrong.mp3");
    audio.play();
    gameOver();
    resetGame();
    return;
  }
  // Check if pattern is complete
  if (currentIndex === level) {
    playerPattern = [];
    index = 0;
    level += 1;
    updateScore();
    setTimeout(() => {
      updateSimonPattern();
    }, 500);
  } else {
    index += 1;
  }
}

function playPattern(randomColor) {
  switch (currentMode) {
    case "classic":
      var i = 0;
      var len = simonPattern.length;
      setInterval(function () {
        if (i < len) {
          animatePad(simonPattern[i]);
          playSound(simonPattern[i]);
          i++;
        } else {
          return;
        }
      }, 500);
      break;
    case "single":
      setTimeout(() => {
        animatePad(randomColor);
        playSound(randomColor);
      }, 500);
      break;
    default:
      break;
  }
}

// UI handlers
function playSound(color) {
  let audio = new Audio("simon_sounds/" + color + ".mp3");
  audio.play();
}

function animatePad(color) {
  let pad = document.querySelector("#" + color);
  pad.classList.add("hide");
  pad.classList.remove("show");
  setTimeout(() => {
    pad.classList.add("show");
    pad.classList.remove("hide");
  }, 100);
}

function updateScore() {
  document.querySelector("#score").textContent = "SCORE: " + level;
}

function clickHandler(color) {
  animatePad(color);
  playSound(color);
  playerPattern.push(color);
  checkAnswer(index);
}

function gameOver() {
  let gameBoard = document.querySelector(".outer");
  let triviaMenu = document.querySelector(".trivia");
  let finalScore = document.querySelector("#final-score");
  finalScore.textContent = "SCORE: " + level;
  gameBoard.classList.add("invisible");
  triviaMenu.classList.remove("invisible");
  document.querySelector("#score").textContent = "GAME OVER";
  document.querySelector(".play-again").addEventListener(
    "click",
    function () {
      gameBoard.classList.remove("invisible");
      triviaMenu.classList.add("invisible");
      updateSimonPattern();
      updateScore();
    },
    { once: true }
  );
}

function resetGame() {
  simonPattern = [];
  playerPattern = [];
  level = 0;
  index = 0;
}

function setGameMode(mode) {
  document.getElementById("mode-title").textContent = mode.toUpperCase();
  currentMode = mode;
  mode = mode + "-click";
  document.querySelector(".power-btn").addEventListener(
    "click",
    function () {
      updateSimonPattern();
      // updateScore();
    },
    { once: true }
  );
  resetGame();
  updateScore();
  for (let i = 0; i < gameModes.length; i++) {
    if (gameModes[i] != mode) {
      document.getElementById(gameModes[i]).classList.add("invisible");
    } else {
      document.getElementById(gameModes[i]).classList.remove("invisible");
    }
  }
}

// Set-Up and initialize
for (let i = 0; i < padColors.length; i++) {
  let pad = document.querySelector("#" + padColors[i]);
  pad.addEventListener("touchstart", function (event) {
    color = event.target.id;
    clickHandler(color);
    event.preventDefault();
  });
  pad.addEventListener("click", function (event) {
    color = event.target.id;
    clickHandler(color);
    event.preventDefault();
  });
}

document.querySelector(".power-btn").addEventListener(
  "click",
  function () {
    updateSimonPattern();
    updateScore();
  },
  { once: true }
);

var radioButtons = document.getElementsByClassName("radio-btn");

for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener("touchstart", function (event) {
    setGameMode(event.target.id);
    event.preventDefault();
  });
  radioButtons[i].addEventListener("click", function (event) {
    setGameMode(event.target.id);
    event.preventDefault();
  });
}
