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
var count = 3;
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
   correct: "c",
   image: ""
};
var question2 =  {
   question: "Who is the Green Lantern's arch nemesis?",
   a: "Doomsday",
   b: "Sinestro",
   c: "Blue Lantern",
   d: "Parallax",
   correct: "b",
   image: ""
};
var question3 = {
   question: "Where does the Flash get his powers from?",
   a: "The Speed Zone",
   b: "Lightning",
   c: "He generates it himself, dummy",
   d: "The Speed Force",
   correct: "d",
   image: ""
};

var question4 = {
   question: "How is Supergirl related to Superman?",
   a: "Married",
   b: "Siblings",
   c: "Cousins",
   d: "Biological Mother",
   correct: "c",
   image: ""
};
var question5 = {
   question: "Who created Wonder Woman?",
   a: "Zeus",
   b: "She was created the normal way?!?",
   c: "Hades",
   d: "Kronos",
   correct: "a",
   image: ""
};
var question6 =  {
   question: "Who killed Superman?",
   a: "Batman",
   b: "Lex Luthor",
   c: "Doomsday",
   d: "Dark Seid",
   correct: "c",
   image: ""
};

var questions = [question1, question2, question3, question4, question5, question6];
var picture = questions[i].image;
var imagePlacer = $("<img>").attr("src", picture);
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
$("#jumbotron").append(imagePlacer);
}

//calling render populates each button and the question div in the html
render();

function countDown(){
    timeInterval = setInterval(function(){

      if (count < 0){
        unanswered++;
        
        i++;
        count = 3;
        countDown();
        
        render();
        clearInterval(timeInterval);
      }

      $("#timer").html("<h2>" + count + "</h2>");
      count--;
   }, 1000);
}

countDown();

$(".button").on("click", function(){
clearInterval(timeInterval);
count = 3;
// countDown();
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
   $("#lastpage").append("<h2>" + "Correct Answers: " + correctTally + "</h2>")
   .append("<h2>" + "Incorrect Answers: " + incorrectTally + "</h2>")
   .append("<h2>" + "Unanswered Questions: " + unanswered + "</h2>");
   // show correct/incorrect answers tallies
} else {
   i++;
   render();
}


/**/
}); //this is the on click end bracket
/**/

// show correct/incorrect on game over
 

