// Variables
var gamePattern = [];
var userPattern = [];
var score = 0;
var currScore = 0;
var padColors = ["red", "blue", "green", "yellow"];

// logic functions
function updateSequence() {
  // document.querySelector("body").classList.remove("game-over");
  var randomNum = Math.floor(Math.random() * 4);
  var randomCol = padColors[randomNum];
  gamePattern.push(randomCol);
  score += 1;
  updateScore();
  setTimeout(() => {
    animatePad(randomCol);
  }, 500);
  setTimeout(() => {
    playSound(randomCol);
  }, 500);
  return randomNum;
}

function checkAnswer(curr) {
  if (userPattern[curr] != gamePattern[curr]) {
    var audio = new Audio("simon_sounds/wrong.mp3");
    audio.play();
    resetGame();
    return;
  }
  if (curr == score - 1) {
    userPattern = [];
    currScore = 0;
    setTimeout(() => {
      updateSequence();
    }, 500);
  } else {
    currScore += 1;
  }
}

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
  document.querySelector("#score").textContent = "SCORE: " + score;
}

function clickHandler(color) {
  playSound(color);
  animatePad(color);
  userPattern.push(color);
  checkAnswer(currScore);
}

function resetGame() {
  gamePattern = [];
  userPattern = [];
  score = 0;
  currScore = 0;
  // document.querySelector("body").classList.add("game-over");
  document
    .querySelector("#score")
    .addEventListener("click", updateSequence, { once: true });
  document.querySelector("#score").textContent = "GAME OVER!";
  setTimeout(() => {
    document.querySelector("#score").textContent = "PLAY AGAIN";
  }, 2000);
}

// Set-Up
for (let i = 0; i < padColors.length; i++) {
  let pad = document.querySelector("#" + padColors[i]);
  pad.addEventListener("click", function (event) {
    color = event.target.id;
    clickHandler(color);
  });
}

// Initialize
document
  .querySelector(".power-btn")
  .addEventListener("click", updateSequence, { once: true });
