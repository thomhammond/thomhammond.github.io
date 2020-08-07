// Variables
var gamePattern = [];
var userPattern = [];
var level = 0;
var currLevel = 0;
var padColors = ["red", "blue", "green", "yellow"];

function playSound(color) {
  let audio = new Audio("simon_sounds/" + color + ".mp3");
  audio.play();
}

function lightPad(color) {
  let pad = document.querySelector("#" + color);
  pad.classList.add("hide");
  pad.classList.remove("show");
  setTimeout(() => {
    pad.classList.add("show");
    pad.classList.remove("hide");
  }, 100);
}

// Set-Up
for (let i = 0; i < padColors.length; i++) {
  let pad = document.querySelector("#" + padColors[i]);
  pad.addEventListener("click", function (event) {
    color = event.target.id;
    playSound(color);
    lightPad(color);
  });
}
