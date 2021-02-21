"use strict";

// VARIABLES

const body = document.querySelector("body");
const resetButton = document.querySelector(".reset-button");
const startButton = document.querySelector(".start-button");
const instructions = document.querySelector("h4");
const turnSign = document.querySelector("h2");
const players = ["Owl", "Eagle"];
let currentPlayer;
let playCount = 0;

const owlImg = document.querySelector(".owl-game-image");
const owlTotal = document.querySelector("#owl-total");
let owlCount = 0;

const eagleImg = document.querySelector(".eagle-game-image");
const eagleTotal = document.querySelector("#eagle-total");
let eagleCount = 0;

const diceImg = document.getElementById("dice-image");

const currentScore = document.getElementById("current-score");
let currentCount = 0;

const saveButton = document.getElementById("save-button");
const rollButton = document.getElementById("roll-button");

let animalNoise;
const fartNoise = new Audio("Fart.mp3");
const triumphNoise = new Audio("Triumph.mp3");
const owlNoise = new Audio("Owl.mp3");
const eagleNoise = new Audio("Eagle.mp3");




// STATES

const original = function() {
  body.style.background = "linear-gradient(to right, #ff4800, #ffdd00)";
  resetButton.classList.add("button-disabled");
  startButton.classList.remove("button-disabled");
  turnSign.classList.add("hidden");
  instructions.classList.remove("hidden");
  playCount = 0;
  diceImg.classList.add("hidden");
  hideGameControls();
  owlTotal.classList.add("hidden");
  eagleTotal.classList.add("hidden");
  eagleImg.style.marginTop = "80px";
  owlImg.style.marginTop = "80px";
  eagleImg.classList.add("fly");
  owlImg.classList.add("fly");
  startButton.disabled = false;
};

const winner = function() {
  body.style.background = "linear-gradient(to right, #00d150, #a2ff30)";
  turnSign.textContent = `${currentPlayer} wins!`;
  triumphNoise.play();
  hideGameControls();
};

const whoFlys = function() {
  if (currentPlayer === players[0]) {
    eagleImg.classList.remove("fly");
    owlImg.classList.add("fly");
  } else {
    owlImg.classList.remove("fly");
    eagleImg.classList.add("fly");
  }
};

const switchPlayer = function() {
  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  turnSign.textContent = `${currentPlayer}'s turn`;
}

const resetCurrentScore = function() {
  currentCount = 0;
  currentScore.textContent = currentCount;
};

const hideGameControls = function() {
  rollButton.classList.add("hidden");
  saveButton.classList.add("hidden");
  currentScore.classList.add("hidden");
};



// ORIGINAL

original();



// BUTTONS

startButton.addEventListener("click", function() {
  startButton.classList.add("button-disabled");
  resetButton.classList.remove("button-disabled");
  currentPlayer = players[(Math.floor(Math.random()*2))];
  turnSign.textContent = `${currentPlayer}'s turn`;
  turnSign.classList.remove("hidden");
  instructions.classList.add("hidden");
  diceImg.classList.remove("hidden");
  rollButton.classList.remove("hidden");
  saveButton.classList.remove("hidden");
  currentScore.classList.remove("hidden");
  owlTotal.classList.remove("hidden");
  eagleTotal.classList.remove("hidden");
  diceImg.src = "";
  currentCount = 0;
  owlCount = 0;
  eagleCount = 0;
  owlTotal.textContent = "0";
  owlImg.style.marginTop = "100px";
  eagleTotal.textContent = "0";
  eagleImg.style.marginTop = "100px";
  owlImg.classList.remove("fly");
  eagleImg.classList.remove("fly");
  if (currentPlayer === players[0]) {
    owlImg.classList.add("fly");
  } else {
    eagleImg.classList.add("fly");
  }
  startButton.disabled = true;
});

resetButton.addEventListener("click", function() {
  original();
});



// GAMEPLAY

rollButton.addEventListener("click", function() {
  const number = (Math.floor(Math.random()*6)+1);
  diceImg.src = `${number}.png`;

  if (number == 1) {
    resetCurrentScore();
    fartNoise.play();
    switchPlayer();
    saveButton.disabled = true;

  } else {
    currentCount += number;
    currentScore.textContent = currentCount;
    saveButton.disabled = false;
  }

  whoFlys();

});



saveButton.addEventListener("click", function() {
  diceImg.src = "";

  if (currentPlayer === players[0]) {
    owlCount += currentCount;
    owlTotal.textContent = `${owlCount}`;
    if (owlCount >= 100) {
      owlImg.style.marginTop = "0";
      winner();
    } else {
      owlNoise.play();
      owlImg.style.marginTop = `${100-owlCount}px`;
      switchPlayer();
    }

  } else {
    eagleCount += currentCount;
    eagleTotal.textContent = `${eagleCount}`;
    if (eagleCount >= 100) {
      eagleImg.style.marginTop = "0";
      winner();
    } else {
      eagleNoise.play();
      eagleImg.style.marginTop = `${100-eagleCount}px`;
      switchPlayer();
    }
  }

  whoFlys();
  resetCurrentScore();
  saveButton.disabled = true;
});
