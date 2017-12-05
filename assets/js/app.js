//Quiz Questions
//====================================================================================================		
var questions = [
   {
      question : "What is Superman's real name?",
      answers: ["Zor-EL","Kevin","Kal-El","Korben"],
      correctAnswer: "Kal-El",
      image: "assets/images/kalel.png"
   },
   {
      question: "Who is the Green Lanters arhc nemesis?",
      answers:["Doomsday","Sinestro","Blue Lantern","Parallax"],
      correctAnswer: "Sinestro",
      image: "assets//images/greenlantern.png"
   },
   {
      question: "Where does the Flash get his powers from?",
      answers: ["The Speed Zone","Lightning","Himself, dummy","The Speed Force"],
      correctAnswer: "The Speed Force",
      image: "assets/images/flash.png"
   }, 
   {
      question: "How is Supergirl related to Superman?",
      answers: ["Married","Siblings","Cousins","Biological Mother"],
      correctAnswer: "Cousins",
      image: "assets/images/supergirl.png"
   },
   {
      question: "Who created Wonder Woman?",
      answers: ["Zues","She was created the normal way?!?","Hades","Kronos"],
      correctAnswer: "Zues",
      image: "assets/images/wonderwoman.png"
   },
   {
      question: "Who killed Superman?",
      answers: ["Batman","Lex Luthor","Doomsday","Dark Seid"],
      correctAnswer: "Doomsday",
      image: "assets/images/doomsday.png"
   }
      ];

//Game Object
//====================================================================================================		
var game = {
	questions: questions, //this gives the game object access to the questions arrary
	currentQuestion: 0,
	counter: 30,
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	//countdown() decrements game counter and appends that to the page, once game.counter = 0 timeUp() function is run.
	countdown: function(){
		game.counter--;
		$('#counter').html(game.counter);
		if(game.counter <= 0) {
				console.log("time up");
				game.timeUp();
		}
	},
	//loadQuestion() counts down from 30 every second, appends counter and question to #subwrapper, and dynamically generates answer buttons
	loadQuestion: function(){
		timer = setInterval(game.countdown, 1000);
		$('#subwrapper').html("<h2>Time Remaining: <span id='counter'>30 </span> seconds</h2>");
		$('#subwrapper').append('<h2>' + questions[game.currentQuestion].question + '</h2>');
			for(var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
				$('#subwrapper').append('<button class="answer-button" id="button-' + i + '"data-name="' + 
				questions[game.currentQuestion].answers[i] +'">' +
				questions[game.currentQuestion].answers[i]+ '</button>');
			}
	},
	//nextQuestion() resets game counter to 30 on page, iterates to next question, and by adding an empty string to #correct-image div removes the image for the next question.
	nextQuestion: function(){
		game.counter = 30;
		$('#counter').html(game.counter);
		game.currentQuestion++;
		$('#correct-image').html('');
		game.loadQuestion();
	},
	//timeUp() resets counter, adds to unansewred tally, appends a message to the page, and will iterate to the next question
	timeUp: function(){
		clearInterval(timer);
		game.unanswered ++;
		$('#subwrapper').html('<h2>Out of time</h2>');
		$('#subwrapper').append('<h3>The correct answer was: ' + questions[game.currentQuestion].correctAnswer+ '</h3>');
		if(game.currentQuestion == questions.length -1) {
			setTimeout(game.results,2*1000);
		} else {
			setTimeout(game.nextQuestion, 2*1000);
		}
	},
	//results() stops the timer, uses removeImage() to remove the image if last question was answered correctly, displays results, and generates a reset button that runs reset() function.
	results: function(){
		clearInterval(timer);
		game.removeImage();
		$('#subwrapper').html("All Done!");
		$('#subwrapper').append("<h3>Correct: " + game.correct +"</h3>");
		$('#subwrapper').append("<h3>Incorrect: " + game.incorrect + "</h3>");
		$('#subwrapper').append("<h3>Unanswered: " + game.unanswered + "</h3>");
		$('#subwrapper').append("<button id='reset'>Restart</button>");

	},
	//clicked(e) looks for the correct answer inside the questions array inside the game object. if e.target is = to the data-name of the correctAnswer then it will run answeredCorrectly(), if not it will run answeredIncorrectly() 
	clicked: function(e){
		clearInterval(timer);
			if($(e.target).data("name")== questions[game.currentQuestion].correctAnswer) {
				game.answeredCorrectly();  
			} else {
				game.answeredIncorrectly();
			}
	},
	//answering correctly will reset the timer to 30secs, add to correct tally, and run the loadImage() function to append an image to the page.
	answeredCorrectly: function(){
		console.log("you got it right");
		clearInterval(timer);
		game.correct ++;
		$('#subwrapper').html('<h2>You Got It Right!</h2>');
		game.loadImage();
			if(game.currentQuestion == questions.length -1) {
					setTimeout(game.results, 2500);
			} else {
					setTimeout(game.nextQuestion, 2500);
			}
	},
	//answering incorrectly will reset the timer to 30secs, add to incorrect tally, and show you what the correct answer was
	answeredIncorrectly: function() {
		console.log("wrong");
		clearInterval(timer);
		game.incorrect ++;
		$('#subwrapper').html('<h2>You Got It Wrong!</h2>');
		$('#subwrapper').append('<h3>The correct answer was: ' + questions[game.currentQuestion].correctAnswer+ '</h3>');
			if(game.currentQuestion == questions.length -1) {
				setTimeout(game.results, 2500);
			} else {
				setTimeout(game.nextQuestion, 2500);
			}
	},
	//appends an image into the correct-image div if answered correctly
	loadImage: function() {
		var correctImage = $('<img class="correctImages">').attr('src', questions[game.currentQuestion].image);
		$('#correct-image').append(correctImage);
	},
	//removes last image from the results screen
	removeImage: function() {
		var correctImage = $('<img class="correctImages">').attr('src', questions[game.currentQuestion].image);
		$('#correct-image').html('');
	},
	//reset() resets all values back to zero excluding the counter, and uses loadQuestion() the same way clicking the start button does
	reset: function(){
		game.currentQuestion = 0;
		game.counter = 0;
		game.correct = 0;
		game.incorrect = 0;
		game.unanswered = 0;
		game.loadQuestion();
	}

};


//Game logic
//====================================================================================================		
//clicking on the start button will remove the start button and run the game object's loadQuestion() function to get everything started
$('#start').on('click', function () {
	$('#start').remove();
	game.loadQuestion();
});

//since answer buttons are generated dynamically use seperate added document click listener for dynamically created .answer-button <button>'s
$(document).on('click', ".answer-button", function(e){
	game.clicked(e);
});

//same logic here. The reset button is generated dynamically at the end of the game so another document click listener is used for the #reset button.
$(document).on('click', '#reset', function(){
	game.reset();
});
