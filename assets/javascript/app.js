//I need to have a theme
// I need to have a group of questions related to that theme
// I need also need to have groups of answers related the questions
//I'll need a correct answer
//I'll also need incorrect answers
//Every question will have 30 seconds to answer
//Everytime a question is loaded the timer needs to reset to 30 seconds
//The end of the game will display the results
//This will include
   /*Wins
      Losses
      Unanswered questions
   */


   //The theme is going to be based around DC Comics
/*******************/
/*Global Varaibles*/
/******************/

//this is the countdown variable
var count = 30;

//this is variable for stopping the countdown
// var counter = window.setInterval(decrement, 1000);

//correct, incorrect, and unaswered tallies
var correctTally = 0;
var incorrectTally = 0;
var unanswered = 0;
var i = 5;

//array of objects for questions and answers with incorrect answers in the objects

var question1 = 
{
   question: "What is Superman's real name?",
   a: "Zor-El",
   b: "Kevin",
   c: "Kal-El",
   d: "Korben",
   correct: "c"
};
var question2 =  {
   question: "Who is the Green Lantern\' arch nemesis?",
   a: "Doomsday",
   b: "Sinestro",
   c: "Blue Lantern",
   d: "Parallax",
   correct: "b"
};
var question3 = {
   question: "Where does the Flash get his powers from?",
   a: "The Speed Zone",
   b: "Lightning",
   c: "He generates it himself, dummy",
   d: "The Speed Force",
   correct: "d"
};

var question4 = {
   question: "How is Supergirl related to Superman?",
   a: "Married",
   b: "Siblings",
   c: "Cousins",
   d: "Biological Mother",
   correct: "c"
};
var question5 = {
   question: "Who created Wonder Woman?",
   a: "Zeus",
   b: "She was created the normal way?!?",
   c: "Hades",
   d: "Kronos",
   correct: "a"
};
var question6 =  {
   question: "Who killed Superman?",
   a: "Batman",
   b: "Lex Luthor",
   c: "Doomsday",
   d: "Dark Seid",
   correct: "c"
};

var questions = [question1, question2, question3, question4, question5, question6];

/***********/
/*functions*/
/***********/

//countdown function with 30 second countdown using var "count"
// function decrement(){
//    count--;
//    $("#timer").html("<h2>" + count + "</h2>");
//    if(count === 0){
//          clearInterval(counter);
//          alert("Times Up!");
//    }
// }

function render(){
//checking for game over case
if (i > questions.length - 1) {
   return;
}

$("#questions").html("<h2 class='question'>" + questions[i].question + "</h2>");
   $("#a").text(questions[i].a);
   $("#b").text(questions[i].b);
   $("#c").text(questions[i].c);
   $("#d").text(questions[i].d);
}

render();

var countDown = setInterval(function(){
count--;
$("#timer").html("<h2>" + count + "</h2>");
if (count === 0){
   clearInterval(countDown);
}
}, 1000);

$(".button").on("click", function(){
var userAnswer = $(this).eq(0).attr("value");
// console.log(userAnswer, questions[i].correct);
var gameOver = i === questions.length - 1;

if (gameOver) {
   alert('game over');
   // show correct/incorrect answers tallies
} else {
   i++;
   render();
}
// Case user correct answer
if (userAnswer === questions[i].correct){
   correctTally++;
// Case user incorrect answer
} else {
   incorrectTally++;
}

// countDown = setInterval(decrement, 30000);
console.log(correctTally, incorrectTally);

});

// show correct/incorrect on game over
// 
