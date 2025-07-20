const questions = [
  {
    question: "What is the output of: print(2 ** 3)?",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: true },
      { text: "9", correct: false },
      { text: "5", correct: false }
    ]
  },
  {
    question: "Which of the following is a valid variable name in Python?",
    answers: [
      { text: "2var", correct: false },
      { text: "_var", correct: true },
      { text: "var-name", correct: false },
      { text: "var name", correct: false }
    ]
  },
  {
    question: "Which keyword is used to create a function in Python?",
    answers: [
      { text: "func", correct: false },
      { text: "def", correct: true },
      { text: "define", correct: false },
      { text: "function", correct: false }
    ]
  },
  {
    question: "What data type is the result of: type(10.0)?",
    answers: [
      { text: "int", correct: false },
      { text: "str", correct: false },
      { text: "float", correct: true },
      { text: "double", correct: false }
    ]
  },
  {
    question: "Which loop is guaranteed to run at least once?",
    answers: [
      { text: "for", correct: false },
      { text: "while", correct: false },
      { text: "do-while", correct: false },
      { text: "None (Python doesn't have do-while)", correct: true }
    ]
  },
  {
    question: "Which operator is used for floor division?",
    answers: [
      { text: "/", correct: false },
      { text: "//", correct: true },
      { text: "%", correct: false },
      { text: "**", correct: false }
    ]
  },
  {
    question: "What is the result of len(\"Python\")?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: true },
      { text: "7", correct: false },
      { text: "Error", correct: false }
    ]
  },
  {
    question: "Which collection type is immutable?",
    answers: [
      { text: "List", correct: false },
      { text: "Set", correct: false },
      { text: "Tuple", correct: true },
      { text: "Dictionary", correct: false }
    ]
  },
  {
    question: "What does 'break' do in a loop?",
    answers: [
      { text: "Skips current iteration", correct: false },
      { text: "Exits the loop", correct: true },
      { text: "Restarts the loop", correct: false },
      { text: "Ends the program", correct: false }
    ]
  },
  {
    question: "What is the default value of a function return?",
    answers: [
      { text: "0", correct: false },
      { text: "None", correct: true },
      { text: "False", correct: false },
      { text: "Empty String", correct: false }
    ]
  },
  {
    question: "Which method is used to add an item to a list?",
    answers: [
      { text: "append()", correct: true },
      { text: "add()", correct: false },
      { text: "insert()", correct: false },
      { text: "extend()", correct: false }
    ]
  },
  {
    question: "Which function converts a string to an integer?",
    answers: [
      { text: "str()", correct: false },
      { text: "int()", correct: true },
      { text: "input()", correct: false },
      { text: "eval()", correct: false }
    ]
  },
  {
    question: "What does the 'pass' statement do?",
    answers: [
      { text: "Breaks loop", correct: false },
      { text: "Skips code block", correct: false },
      { text: "Does nothing", correct: true },
      { text: "Raises exception", correct: false }
    ]
  },
  {
    question: "Which statement is used to handle exceptions?",
    answers: [
      { text: "catch", correct: false },
      { text: "try/except", correct: true },
      { text: "handle", correct: false },
      { text: "error", correct: false }
    ]
  },
  {
    question: "Which of these is not a valid data type?",
    answers: [
      { text: "float", correct: false },
      { text: "bool", correct: false },
      { text: "char", correct: true },
      { text: "list", correct: false }
    ]
  },
  {
    question: "What is the correct file extension for Python files?",
    answers: [
      { text: ".py", correct: true },
      { text: ".python", correct: false },
      { text: ".pt", correct: false },
      { text: ".p", correct: false }
    ]
  },
  {
    question: "How do you start a comment in Python?",
    answers: [
      { text: "//", correct: false },
      { text: "/*", correct: false },
      { text: "#", correct: true },
      { text: "--", correct: false }
    ]
  },
  {
    question: "Which built-in function returns the largest item?",
    answers: [
      { text: "min()", correct: false },
      { text: "max()", correct: true },
      { text: "top()", correct: false },
      { text: "high()", correct: false }
    ]
  },
  {
    question: "Which one is used to import external libraries?",
    answers: [
      { text: "import", correct: true },
      { text: "include", correct: false },
      { text: "require", correct: false },
      { text: "load", correct: false }
    ]
  },
  {
    question: "Which of the following is used to define a class in Python?",
    answers: [
      { text: "class", correct: true },
      { text: "object", correct: false },
      { text: "def", correct: false },
      { text: "struct", correct: false }
    ]
  }
];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const resultScreen = document.getElementById("result-screen");
const finalScore = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");
const progressFill = document.getElementById("progress-fill");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  timeLeft = 15;
  nextBtn.innerText = "Next";
  resultScreen.classList.add("hide");
  document.querySelector(".quiz-box").classList.remove("hide");
  loadQuestion();
  updateScore();
  startTimer();
}

function loadQuestion() {
  resetState();
  showProgress();

  let currentQ = questions[currentQuestion];
  questionEl.innerHTML = `
    <div style="margin-bottom: 8px; font-weight: 500; color: #666;">
      Question ${currentQuestion + 1} of ${questions.length}
    </div>
    <div>${currentQ.question}</div>
  `;

  currentQ.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.classList.add("btn");
    if (answer.correct) {
      btn.dataset.correct = true;
    }
    btn.addEventListener("click", selectAnswer);
    answersEl.appendChild(btn);
  });

  resetTimer();
}

function resetState() {
  nextBtn.style.display = "none";
  answersEl.innerHTML = "";
}

function selectAnswer(e) {
  const selected = e.target;
  const correct = selected.dataset.correct === "true";

  Array.from(answersEl.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
  });

  if (correct) {
    score++;
    updateScore();
  }

  nextBtn.style.display = "block";
  clearInterval(timer);
}

function updateScore() {
  scoreEl.innerText = `Score: ${score}`;
}

function showProgress() {
  let percent = ((currentQuestion + 1) / questions.length) * 100;
  progressFill.style.width = percent + "%";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextBtn.style.display = "block";
      Array.from(answersEl.children).forEach((btn) => {
        btn.disabled = true;
        if (btn.dataset.correct === "true") {
          btn.classList.add("correct");
        }
      });
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.innerText = `Time: ${timeLeft}`;
  startTimer();
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  document.querySelector(".quiz-box").classList.add("hide");
  resultScreen.classList.remove("hide");
  finalScore.innerText = `Your final score is ${score} out of ${questions.length}.`;
}

restartBtn.addEventListener("click", startQuiz);

startQuiz();
