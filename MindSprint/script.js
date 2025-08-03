// script.js
let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const startScreen = document.getElementById('start-screen');
const quizBox = document.getElementById('quiz-box');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const optionButtons = document.querySelectorAll('.option-btn');
const timerDisplay = document.getElementById('timer');
const scoreOutput = document.getElementById('score-output');
const progressBar = document.getElementById('progress-bar');

const tick_Sound = document.getElementById('tick-sound');
const correct_Sound = document.getElementById('correct-sound');
const wrong_Sound = document.getElementById('wrong-sound');
const lock_Sound = document.getElementById('lock-sound');

const categorySelect = document.getElementById('category-select');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

startBtn.addEventListener('click', () => {
  const selectedCategory = categorySelect.value;
  if (!selectedCategory) return alert('Please select a category');
  questions = allQuestions[selectedCategory];
  currentQuestion = 0;
  score = 0;
  showQuestion();
  switchScreen(startScreen, quizBox);
});

restartBtn.addEventListener('click', () => {
  switchScreen(resultScreen, startScreen);
  categorySelect.selectedIndex = 0;
});

function switchScreen(from, to) {
  from.classList.remove('active');
  from.classList.add('hidden');
  to.classList.remove('hidden');
  to.classList.add('active');
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  q.options.forEach((opt, i) => {
    optionButtons[i].textContent = opt;
    optionButtons[i].disabled = false;
    optionButtons[i].classList.remove('correct', 'wrong');
  });
  startTimer();
  updateProgress();
}

optionButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    clearInterval(timer);
    lockSound.play();
    const selected = parseInt(e.target.getAttribute('data-index'));
    const correct = questions[currentQuestion].answer;
    if (selected === correct) {
      e.target.classList.add('correct');
      correctSound.play();
      score++;
    } else {
      e.target.classList.add('wrong');
      optionButtons[correct].classList.add('correct');
      wrongSound.play();
    }
    optionButtons.forEach(b => b.disabled = true);
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }, 1500);
  });
});

function startTimer() {
  timeLeft = 30;
  timerDisplay.textContent = timeLeft;
  tickSound.play();
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeOut();
    }
  }, 1000);
}

function handleTimeOut() {
  optionButtons.forEach(b => b.disabled = true);
  const correct = questions[currentQuestion].answer;
  optionButtons[correct].classList.add('correct');
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function updateProgress() {
  const progress = ((currentQuestion) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function showResult() {
  switchScreen(quizBox, resultScreen);
  scoreOutput.textContent = `${score} / ${questions.length}`;
}

const tickSound = new Audio('assets/sounds/tick.mp3');
const correctSound = new Audio('assets/sounds/correct.mp3');
const wrongSound = new Audio('assets/sounds/wrong.mp3');
const lockSound = new Audio('assets/sounds/lock.mp3');

function playTick() {
  tickSound.play();
}

function playCorrect() {
  correctSound.play();
}

function playWrong() {
  wrongSound.play();
}

function playLock() {
  lockSound.play();
}
