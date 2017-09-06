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
var count = 15;
var countTally = 0;
var timeInterval;

//correct, incorrect, and unaswered tallies
var correctTally = 0;
var incorrectTally = 0;
var unanswered = 0;
var i = 0;

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
   question: "Who is the Green Lantern's arch nemesis?",
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
   c: "Himself, dummy",
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

//calling render populates each button and the question div in the html
render();

function countDown(){
    timeInterval = setInterval(function(){

      if (count < 0){
        unanswered++;
        countTally++;
        i++;
        count = 15;
        countDown();
        
        render();
        clearInterval(timeInterval);
      }

      $(".timer").html("<h2>" + count + "</h2>");
      count--;
   }, 1000);
}

countDown();

//calling gameEnd will populate the end page of the game regardless of getting correct or incorrect answers
function gameEnd(){
  if(countTally === 6){
    $(".button , #questions , #timer").remove();
    $("#lastpage").append("<h2>" + "Correct Answers: " + correctTally + "</h2>")
    .append("<h2>" + "Incorrect Answers: " + incorrectTally + "</h2>")
    .append("<h2>" + "Unanswered Questions: " + unanswered + "</h2>");
  } 
}

gameEnd();

$(".button").on("click", function(){
clearInterval(timeInterval);
countTally++;
count = 15;
countDown();
var userAnswer = $(this).eq(0).attr("value");
// console.log(userAnswer, questions[i].correct);
var gameOver = i === questions.length - 1;

// Case user correct answer
if (userAnswer === questions[i].correct){
  correctTally++;
// Case user incorrect answer
} else {
  incorrectTally++;
}

if (gameOver = i === questions.length -1) {
   $(".button , #questions , #timer").remove();
   $(".last1").html("Correct Answers: " + correctTally);
   $(".last2").html("Incorrect Answers: " + incorrectTally);
   $(".last3").html("Unanswered Questions: " + unanswered);
   // show correct/incorrect answers tallies
} else {
   i++;
   render();
}


/**/
}); //this is the on click end bracket
/**/

// unfinished:
// I need to add a reset button to will appear at the end of the game that restarts the game

 

