
let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerInterval = null;
let answeredQuestions = [];
let quizFinished = false;
let quizStarted = false;

const allQuestions = [
    {
        category: "java",
        question: "What is Java?",
        answer: "Java is an object-oriented programming language."
    },
    {
        category: "web",
        question: "What is HTML?",
        answer: "HTML is used to create the structure of web pages."
    },
    {
        category: "web",
        question: "What is CSS?",
        answer: "CSS is used to style web pages."
    },
    {
        category: "python",
        question: "What is Python?",
        answer: "Python is a high-level programming language."
    },
    {
        category: "web",
        question: "What is JavaScript?",
        answer: "JavaScript makes web pages interactive."
    },
    {
        category: "java",
        question: "What is an Array?",
        answer: "An array stores multiple values in a single variable."
    },
    {
        category: "python",
        question: "What is a Database?",
        answer: "A database is an organized collection of data."
    },
    {
        category: "ai",
        question: "What is AI?",
        answer: "AI stands for Artificial Intelligence."
    },
    {
        category: "ai",
        question: "What is Machine Learning?",
        answer: "Machine Learning allows computers to learn from data."
    },
    {
        category: "python",
        question: "What is an Algorithm?",
        answer: "An algorithm is a step-by-step procedure to solve a problem."
    }
];

let questions = [...allQuestions];

function changeCategory() {
    const category = document.getElementById("category").value;

    if (category === "all") {
        questions = [...allQuestions];
    } else {
        questions = allQuestions.filter(q => q.category === category);
    }

    currentQuestion = 0;
    score = 0;
    answeredQuestions = [];
    timeLeft = 60;
    quizFinished = false;

    if (quizStarted) {
        resetQuiz();
    }
}

function startQuiz() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";

    quizStarted = true;
    resetQuiz();
}

function goHome() {
    clearInterval(timerInterval);
    quizStarted = false;

    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("welcomeScreen").style.display = "block";
}

function displayQuestion() {
    document.getElementById("questionNumber").innerText =
        "Question " + (currentQuestion + 1);

    document.getElementById("question").innerText =
        questions[currentQuestion].question;

    document.getElementById("answer").innerText =
        questions[currentQuestion].answer;

    document.getElementById("answer").style.display = "none";
}

function showAnswer() {
    if (quizFinished) return;

    document.getElementById("answer").style.display = "block";
}

function nextQuestion() {
    if (quizFinished) return;

    currentQuestion = (currentQuestion + 1) % questions.length;
    displayQuestion();
}

function previousQuestion() {
    if (quizFinished) return;

    currentQuestion =
        (currentQuestion - 1 + questions.length) % questions.length;

    displayQuestion();
}

function updateScore() {
    document.getElementById("score").innerText =
        "Score: " + score;
}

function updateProgress() {
    document.getElementById("progressBar").max = questions.length;
    document.getElementById("progressBar").value =
        answeredQuestions.length;

    document.getElementById("progressText").innerText =
        answeredQuestions.length + " / " +
        questions.length + " Questions Completed";
}

function markCorrect() {
    if (quizFinished) return;

    if (answeredQuestions.includes(currentQuestion)) {
        alert("You have already answered this question!");
        return;
    }

    score++;
    answeredQuestions.push(currentQuestion);

    updateScore();
    updateProgress();
    updateBestScore();
}

function markWrong() {
    if (quizFinished) return;

    if (answeredQuestions.includes(currentQuestion)) {
        alert("You have already answered this question!");
        return;
    }

    answeredQuestions.push(currentQuestion);

    updateScore();
    updateProgress();
}

function updateBestScore() {
    let bestScore = Number(localStorage.getItem("bestScore")) || 0;

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
    }

    document.getElementById("bestScore").innerText =
        "Best Score: " + bestScore;
}

function finishQuiz() {
    if (quizFinished) return;

    quizFinished = true;
    clearInterval(timerInterval);

    let attempted = answeredQuestions.length;
    let wrong = attempted - score;
    let percentage = (score / questions.length) * 100;

    document.getElementById("totalAttempted").innerText =
        "Questions Attempted: " + attempted + " / " + questions.length;

    document.getElementById("correctAnswers").innerText =
        "Correct Answers: " + score;

    document.getElementById("wrongAnswers").innerText =
        "Wrong Answers: " + wrong;

    document.getElementById("percentage").innerText =
        "Final Percentage: " + percentage + "%";

    let message = "";

    if (percentage >= 80) {
        message = "Excellent! 🌟";
    } else if (percentage >= 60) {
        message = "Good Job! 👏";
    } else if (percentage >= 40) {
        message = "Keep Practicing! 😊";
    } else {
        message = "Try Again! 💪";
    }

    document.getElementById("resultMessage").innerText = message;

    updateBestScore();

    document.getElementById("resultSection").style.display = "block";
}

function resetQuiz() {
    clearInterval(timerInterval);

    currentQuestion = 0;
    score = 0;
    answeredQuestions = [];
    timeLeft = 60;
    quizFinished = false;

    document.getElementById("resultSection").style.display = "none";

    displayQuestion();
    updateScore();
    updateProgress();
    updateBestScore();

    document.getElementById("timer").innerText = "Time: 60 seconds";

    startTimer();
}

function shuffleQuiz() {
    if (quizFinished) return;

    questions.sort(() => Math.random() - 0.5);
    resetQuiz();

    alert("Questions shuffled successfully!");
}

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(function () {
        if (quizFinished) {
            clearInterval(timerInterval);
            return;
        }

        timeLeft--;

        document.getElementById("timer").innerText =
            "Time: " + timeLeft + " seconds";

        if (timeLeft <= 0) {
            finishQuiz();
            alert("Time is up!");
        }
    }, 1000);
}
