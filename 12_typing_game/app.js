const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Init difficulty to medium if not in local storage
const lsDifficulty = localStorage.getItem('difficulty');
let difficulty = lsDifficulty !== null ? lsDifficulty : 'medium';
// Update select
difficultySelect.value = difficulty;

// Time increment value based on difficulty
const timeIncrementValues = {
  easy: 5,
  medium: 3,
  hard: 1
};

// Initialize value to current difficulty
let timeIncrementValue = timeIncrementValues[difficulty];

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  // words array in words.js to keep things cleaner here
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// End game, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play Again</button>
  `;
  endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners
text.addEventListener('input', e => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = '';
    time += timeIncrementValue;
    updateTime();
  }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
  timeIncrementValue = timeIncrementValues[difficulty];
});
