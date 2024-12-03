let startTime = 0;
let updatedTime = 0;
let difference = 0;
let running = false;
let interval;
let lapTimes = [];

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapTimesDisplay = document.getElementById('lap-times');
const smileyFace = document.getElementById('smiley-face'); // Smiley face element

function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  const millisecondsFormatted = milliseconds % 1000;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(millisecondsFormatted).padStart(3, '0')}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(difference);
}

function startStopwatch() {
  if (!running) {
    smileyFace.textContent = '😊'; // Happy face when started
    smileyFace.classList.remove('smiley-sad');
    smileyFace.classList.add('smiley-jump'); // Add jump animation
    startTime = new Date().getTime() - difference;
    interval = setInterval(() => {
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      updateDisplay();
    }, 10);  // Update every 10 milliseconds
    running = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
  }
}

function pauseStopwatch() {
  clearInterval(interval);
  running = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  smileyFace.textContent = '😐'; // Change to neutral face
  smileyFace.classList.add('smiley-sad'); // Add sad face animation
}

function resetStopwatch() {
  clearInterval(interval);
  difference = 0;
  lapTimes = [];
  updateDisplay();
  lapTimesDisplay.innerHTML = '';
  running = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  smileyFace.textContent = '😊'; // Reset to happy face
  smileyFace.classList.remove('smiley-sad');
  smileyFace.classList.add('smiley-jump'); // Add jump animation for reset
}

function recordLap() {
  if (running) {
    lapTimes.push(difference);
    const lapTime = document.createElement('div');
    lapTime.textContent = `Lap ${lapTimes.length}: ${formatTime(difference)}`;
    lapTimesDisplay.appendChild(lapTime);
    smileyFace.classList.add('smiley-jump'); // Add jump animation for lap
  }
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
