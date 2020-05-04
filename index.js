var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var score = document.getElementById('score');
var myQuestions = [
	{
		question: "Which reaction is the major regulatory step of glycolysis?",
		answers: {
			a: 'Hexokinase reaction',
			b: ' Pyruvate kinase reaction',
			c: 'PFK reaction'
		},
		correctAnswer: 'c'
	},
	{
		question: "What is the net ATP generated in the complete hydrolysis of glucose?",
		answers: {
			a: '36',
			b: '67',
			c: '128'
		},
		correctAnswer: 'a'
	},
    {
        question: "The first reaction of the TCA cycle is catalyzed by?",
		answers: {
			a: 'ketoglutarate dehydrogenase',
			b: 'citrate synthase',
			c: 'malate dehydrogenase'
		},
        correctAnswer: 'b'
    },
    {
        question: "How many NADH is produced per TCA cycle?",
		answers: {
			a: '4',
			b: '3',
			c: '2'
		},
        correctAnswer: 'b'
    },
    {
        question: "The fate of glucose in yeast is?",
		answers: {
			a: 'ethanol',
			b: 'pyruvate',
			c: 'acetylcoa'
		},
        correctAnswer: 'a'
    }


];


function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
 
    function showQuestions(questions, quizContainer){
	// we'll need a place to store the output and the answer choices
	var output = [];
	var answers;

	// for each question...
	for(var i=0; i<questions.length; i++){
		
		// first reset the list of answers
		answers = [];

		// for each available answer to this question...
		for(letter in questions[i].answers){

			// ...add an html radio button
			answers.push(
				'<label>'
                + '<input type="radio" name="question'+i+'" value="'+letter+'">'
					+ letter + '.'
                    + questions[i].answers[letter]
                    
				+ '</label>'
			);
		}

		// add this question and its answers to the output
		output.push(
			'<div class="question">' + questions[i].question + '</div>'
			+ '<div class="answers">' + answers.join('') + '</div>'
		);
	}

	// finally combine our output list into one string of html and put it on the page
	quizContainer.innerHTML = output.join('');
}

function showResults(questions, quizContainer, resultsContainer){
	
	// gather answer containers from our quiz
	var answerContainers = quizContainer.querySelectorAll('.answers');
	
	// keep track of user's answers
	var userAnswer = '';
	var numCorrect = 0;
	
	// for each question...
	for(var i=0; i<questions.length; i++){

		// find selected answer
		userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
		
		// if answer is correct
		if(userAnswer===questions[i].correctAnswer){
			// add to the number of correct answers
			numCorrect++;
			
			// color the answers green
            answerContainers[i].style.color = 'lightgreen';
		}
		// if answer is wrong or blank
		else{
			// color the answers red
			answerContainers[i].style.color = 'red';
		}
	}

	// show number of correct answers out of total
	resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}

// show the questions
showQuestions(questions, quizContainer);

// when user clicks submit, show results
submitButton.onclick = function(){
	showResults(questions, quizContainer, resultsContainer);
}
}
generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);