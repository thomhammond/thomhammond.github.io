// variables
var gamePattern = [];
var userPattern = [];
var level = 0;
var currLevel = 0;
var buttonColors = ["red", "blue", "green", "yellow"];

// logic functions
function nextSequence() {
  document.querySelector("body").classList.remove("game-over");
  var randomNum = Math.floor(Math.random() * 4);
  var randomCol = buttonColors[randomNum];
  gamePattern.push(randomCol);
  level += 1;
  updateHeader();
  setTimeout(() => {
    flash(randomCol);
  }, 500);
  setTimeout(() => {
    playSound(randomCol);
  }, 500);
  return randomNum;
}

function checkAnswer(curr) {
  if (userPattern[curr] != gamePattern[curr]) {
    // reset game!
    var audio = new Audio("simon_sounds/wrong.mp3");
    audio.play();
    gamePattern = [];
    userPattern = [];
    level = 0;
    currLevel = 0;
    document.querySelector("body").classList.add("game-over");
    document.addEventListener("keydown", nextSequence, { once: true });
    document.addEventListener("touchstart", nextSequence, { once: true });
    document.querySelector("h1").textContent = "Game Over!";
    setTimeout(() => {
      document.querySelector("h1").textContent = "Tap to Play";
    }, 2000);

    return;
  }
  if (curr == level - 1) {
    userPattern = [];
    currLevel = 0;
    setTimeout(() => {
      nextSequence();
    }, 500);
  } else {
    currLevel += 1;
  }
}

function clickHandler(color) {
  flash(color);
  playSound(color);
  userPattern.push(color);
  checkAnswer(currLevel);
}

// animation functions
function flash(elem) {
  $("#" + elem)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(elem) {
  var audio = new Audio("simon_sounds/" + elem + ".mp3");
  audio.play();
}

function updateHeader() {
  document.querySelector("h1").textContent = "Level " + level;
}

// set-up
for (let i = 0; i < buttonColors.length; i++) {
  let btn = document.querySelector("#" + buttonColors[i]);
  btn.addEventListener("click", function (event) {
    clickHandler(event.target.id);
  });
}

document.addEventListener("keydown", nextSequence, { once: true });
