const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const finishBtn = document.querySelector('.finishBtn'); // Added finish button
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. What sound does a cow make?",
        choices: ["Moo", "Oink", "Meow", "Woof"],
        answer: "Moo"
    },
    {
        question: "Q. Which fruit is yellow and curved?",
        choices: ["Apple", "Banana", "Grape", "Orange"],
        answer: "Banana"
    },
    {
        question: "Q. Which animal is known as man's best friend?",
        choices: ["Cat", "Bird", "Dog", "Fish"],
        answer: "Dog"
    },
    {
        question: "Q. What color is the sky on a sunny day?",
        choices: ["Green", "Blue", "red", "yellow"],
        answer:"Blue"
    },
    {
        question: "Q. Which shape has three sides?",
        choices: ["Circle", "Square", "Triangle", "Rectangle"],
        answer: "Triangle"
    },
    {
        question: "Q. What do you use to brush your teeth?",
        choices: ["Spoon", "Fork", "Toothbrush", "Pencil"],
        answer: "Toothbrush"
    },
    {
        question: "Q. What is the name of the story about a girl who visits a big bad wolf dressed as her grandmother?",
        choices: ["Cinderella", "Sleeping Beauty", "Little Red Riding Hood", "Snow White"],
        answer: "Little Red Riding Hood"
    },
    {
        question: "Q. Which season is known for snow and cold weather?",
        choices: ["Spring", "Summer", "Autumn", "Winter"],
        answer: "Winter"
    },
    {
        question: "Q. How many wheels does a bicycle have?",
        choices: ["One", "Two", "Three", "Four"],
        answer: "Two"
    }
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 25;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            document.querySelectorAll('.choice').forEach(choice => choice.classList.remove('selected'));
            choiceDiv.classList.add('selected');
        });
    }

    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice) {
        displayAlert("Select your answer");
        return;
    }
    const selectedText = selectedChoice.textContent.trim();
    if (selectedText === quiz[currentQuestionIndex].answer) {
        displayAlert("Correct Answer!");
        score++;
    } else {
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 25;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    finishBtn.style.display = "block"; // Show finish button
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any existing timers
    timer.textContent = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again?");
            if (confirmUser) {
                timeLeft = 25;
                startQuiz();
            } else {
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () => {
    clearInterval(timerID);
}

// Function to shuffle questions
const shuffleQuestions = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () => {
    timeLeft = 25;
    timer.style.display = "flex";
    shuffleQuestions();
    finishBtn.style.display = "none"; // Hide finish button when starting a new quiz
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    } else {
        checkAnswer();
    }
});

finishBtn.addEventListener('click', () => {
    startBtn.style.display = "block";
    container.style.display = "none";
    scoreCard.textContent = "";
    nextBtn.style.display = "block"; // Reset to show next button
    finishBtn.style.display = "none";
});
