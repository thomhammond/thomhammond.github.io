// Variables
var simonPattern = [];
var playerPattern = [];
var level = 0;
var index = 0;
var padColors = ["red", "blue", "green", "yellow"];

// logic functions
function updateSimonPattern() {
  let randomNum = Math.floor(Math.random() * 4);
  let randomColor = padColors[randomNum];
  simonPattern.push(randomColor);
  setTimeout(() => {
    animatePad(randomColor);
    playSound(randomColor);
  }, 500);
  return randomNum;
}

function checkAnswer(currentIndex) {
  // Check for correct sequence element
  if (playerPattern[currentIndex] != simonPattern[currentIndex]) {
    let audio = new Audio("simon_sounds/wrong.mp3");
    audio.play();
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

function resetGame() {
  simonPattern = [];
  playerPattern = [];
  level = 0;
  index = 0;
  // Change once trivia is added
  document.querySelector(".power-btn").addEventListener(
    "click",
    function () {
      updateSimonPattern();
      updateScore();
    },
    { once: true }
  );
  document.querySelector("#score").textContent = "GAME OVER!";
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
