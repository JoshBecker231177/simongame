let level = 0;

let started = false;

const theButtons = document.querySelectorAll(".btn");

const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];



// Starting a game by pressing any key
$(document).keydown(function() {
  if (!started) {
    $("h1").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

// Setting off sound effect and animation for button pressed by user, and logging it in userClickedPattern.
$(theButtons).click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

// Checking if user pressed correct button
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over. Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

// Moving to next level and adding another colour to the sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed"), 100
  });
}


function playSound(name) {
  let colourSound = new Audio("sounds/" + name + ".mp3");
  colourSound.play();
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
