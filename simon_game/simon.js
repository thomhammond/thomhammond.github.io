// Variables
var simonPattern = [];
var playerPattern = [];
var level = 0;
var index = 0;
var padColors = ["red", "blue", "green", "yellow"];
var gameModes = [
  "classic-click",
  "single-click",
  "graymode-click",
  "reverse-click",
  "creator-click",
];
var currentMode = "classic";

// logic functions
function updateSimonPattern() {
  let randomNum = Math.floor(Math.random() * 4);
  let randomColor = padColors[randomNum];
  if (currentMode !== "reverse") {
    simonPattern.push(randomColor);
  } else {
    simonPattern.unshift(randomColor);
  }
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
    case "single":
      setTimeout(() => {
        animatePad(randomColor);
        playSound(randomColor);
      }, 500);
      break;
    case "reverse":
      var i = simonPattern.length - 1;
      setInterval(function () {
        if (i >= 0) {
          animatePad(simonPattern[i]);
          playSound(simonPattern[i]);
          i--;
        } else {
          return;
        }
      }, 500);
      break;
    default:
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
  setTriviaText();
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
  resetGame();
  document.getElementById("mode-title").textContent = mode.toUpperCase();
  currentMode = mode;
  console.log(currentMode);
  mode = mode + "-click";
  document.querySelector("#score").textContent = "THINK FAST!";
  for (let i = 0; i < gameModes.length; i++) {
    if (gameModes[i] != mode) {
      document.getElementById(gameModes[i]).classList.add("invisible");
    } else {
      document.getElementById(gameModes[i]).classList.remove("invisible");
    }
  }
  if (currentMode === "graymode") {
    setGrayMode(true);
  } else {
    setGrayMode(false);
  }
}

function setTriviaText() {
  let randomNum = Math.floor(Math.random() * triviaText.length);
  document.getElementById("trivia-text").textContent = triviaText[randomNum];
}

function setGrayMode(on) {
  if (on) {
    for (let i = 0; i < padColors.length; i++) {
      let pad = document.querySelector("#" + padColors[i]);
      pad.classList.add("gray");
    }
  } else {
    for (let i = 0; i < padColors.length; i++) {
      let pad = document.querySelector("#" + padColors[i]);
      pad.classList.remove("gray");
    }
  }
}

// Set-Up and initialization
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

document
  .querySelector(".power-btn, .inner")
  .addEventListener("click", function () {
    resetGame();
    updateSimonPattern();
    updateScore();
  });

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

const triviaText = [
  "SIMON is an electronic game of memory skill invented by Ralph H. Baer and Howard J. Morrison and released by the American board game company Milton Bradley in 1978.",
  "Simon debuted in 1978 at a retail price of $24.95 (equivalent to $98 in 2020) and became one of the top-selling toys that Christmas.",
  "The creators of SIMON were originally inspired by Atari's arcade game TOUCH ME which they felt had 'nice gameplay' but 'terrible exectution'",
  "The SIMON prototype used the low cost Texas Instruments TMS 1000 microcontroller chip, which was used in many popular games of the 1970s",
  "SIMON's tones were designed to always be harmonic, no matter the sequence, and consisted of an A major triad in second inversion, resembling a trumpet fanfare",
];
