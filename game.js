var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = true;

function nextSequence() {
  // Creates a random number from 0 - 3
  var randomNumber = Math.floor(Math.random() * 4);
  // Selects the corresponding color
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  level++;
  $("#level-title").text("Level " + level);

  // Creates a flash animation on the corresponding button
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  window.setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(gamePattern.length === userClickedPattern.length) {
      userClickedPattern = [];
      window.setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
      playSound("wrong");
      $("body").addClass("game-over");
      window.setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})

$(document).keypress(function() {
  if(level === 0) {
    nextSequence();
  }
});
