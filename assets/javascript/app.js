//declares arrays for question, choices, and answers
var questionsArray = [
  "How many years old is the solar system (in billions)?",
  "How many years would it take light to travel from Earth to the edge of the universe (in billions)?",
  "How many kilometers are in a lightyear (in quadrillions)?",
  "When was pluto no longer classified as a planet in our solar system?",
  "What is the closest galaxy to the Milky Way galaxy?",
  "Out of the choices, which star is closest to us?",
  "Which planet has a longer day than year?"
];

var choicesArray = [
  ["4.6", "4.7", "4.8", "4.9"],
  ["1", "5", "10", "50"],
  ["0.01", "0.1", "1", "10"],
  ["2005", "2006", "2007", "2008"],
  ["Pinwheel", "Magellanic", "Andromeda", "Whirlpool"],
  ["Alpha Centauri", "Kapteyn", "Teegarden", "Ross 128"],
  ["Mercury", "Venus", "Mars", "None"]
];

var answersArray = [
  "4.6",
  "50",
  "0.01",
  "2006",
  "Andromeda",
  "Alpha Centauri",
  "Venus"
];

var i = 0;
var numRight = 0;
var numWrong = 0;
var numUnanswered = 0;
var timer = 31;
var userGuess;
var intervalID;

$("#start").on("click", function() {
  //$("#start").attr("disabled", true);
  i = 0;
  timer = 31;
  $("#start").empty();
  $(".final-page").empty();
  $("#question").text(questionsArray[i]);
  for (var j = 0; j < 4; j++) {
    $("#choice" + j + "").text(choicesArray[i][j]);
  }
  runTimer();
});

$(".choice").on("click", function() {
  userGuess = $(this).text();
  if (userGuess === answersArray[i]) {
    postQuestionResult("Right!");
    numRight++;
    if (i < 6) {
      setTimeout(nextQuestion, 5000);
    } else {
      setTimeout(endOfGame, 5000);
    }

    //clearTimeout(timeOutID);
  } else {
    postQuestionResult("Wrong! The answer is " + answersArray[i] + ".");
    numWrong++;
    if (i < 6) {
      setTimeout(nextQuestion, 5000);
    } else {
      setTimeout(endOfGame, 5000);
    }
    //clearTimeout(timeOutID);
  }
});
/*
if (timer <= 0) {
  stopTimer();
  $("#post-question-page").text("Wrong!");
  numWrong++;
  setTimeout(nextQuestion, 5000);
}
*/

function postQuestionResult(result) {
  stopTimer();
  $(".choice").empty();
  $("#post-question-page").text(result);
}

function nextQuestion() {
  $("#post-question-page").empty();
  i++;
  $("#question").text(questionsArray[i]);
  for (var j = 0; j < 4; j++) {
    $("#choice" + j + "").text(choicesArray[i][j]);
  }
  timer = 31;
  runTimer();
}

function endOfGame() {
  $("#post-question-page").empty();
  $("#timer").empty();
  $("#question").empty();
  $("#num-right").text("You got " + numRight + " out of 7 right.");
  $("#num-wrong").text("You got " + numWrong + " out of 7 wrong.");
  $("#num-unanswered").text("You unanswered " + numUnanswered + " out of 7.");
  $("#message").text("Press 'Start' to play again.");
  $("#start").text("Start");
}

function decrement() {
  timer--;
  $("#timer").text("Time Left: " + timer);
  if (timer === 0) {
    postQuestionResult("Out of time! The answer is " + answersArray[i] + ".");
    numUnanswered++;
    if (i < 6) {
      setTimeout(nextQuestion, 5000);
    } else {
      setTimeout(endOfGame, 5000);
    }
  }
}

function runTimer() {
  clearInterval(intervalID);
  intervalID = setInterval(decrement, 1000);
}

function stopTimer() {
  clearInterval(intervalID);
}
