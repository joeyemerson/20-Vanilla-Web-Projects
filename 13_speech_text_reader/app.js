const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const textBox = document.getElementById('text-box');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm thirsty."
  },
  {
    image: './img/food.jpg',
    text: "I'm hungry."
  },
  {
    image: './img/tired.jpg',
    text: "I'm tired."
  },
  {
    image: './img/hurt.jpg',
    text: "I'm hurt."
  },
  {
    image: './img/happy.jpg',
    text: "I'm happy."
  },
  {
    image: './img/angry.jpg',
    text: "I'm angry."
  },
  {
    image: './img/sad.jpg',
    text: "I'm sad."
  },
  {
    image: './img/scared.jpg',
    text: "I'm scared."
  },
  {
    image: './img/outside.jpg',
    text: 'I want to go outside.'
  },
  {
    image: './img/home.jpg',
    text: 'I want to go home.'
  },
  {
    image: './img/school.jpg',
    text: 'I want to go school.'
  },
  {
    image: './img/grandma.jpg',
    text: 'I want to go to Grandma.'
  }
];

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');
  const { image, text } = item;

  box.classList.add('box');
  box.innerHTML = `
  <img src="${image}" alt="${text}" />
  <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Initialize preset boxes and voices for speech synthesis
data.forEach(createBox);
getVoices();

// Event Listeners

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () => textBox.classList.toggle('show'));

// Close button
closeBtn.addEventListener('click', () => textBox.classList.remove('show'));

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();
  textArea.value = '';
});
