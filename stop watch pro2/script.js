let timer;
let startTime;
let running = false;
let laps = [];

function startTimer() {
  if (!running) {
    startTime = Date.now();
    timer = setInterval(updateTime, 1000);
    running = true;
  }
}

function updateTime() {
  const elapsedTime = Date.now() - startTime;
  displayTime(elapsedTime);
}

function displayTime(time) {
  const formattedTime = new Date(time).toISOString().substr(11, 8);
  document.querySelector('.time').textContent = formattedTime;
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  document.querySelector('.time').textContent = '00:00:00';
  laps = [];
  displayLaps();
}

function lap() {
  if (running) {
    const elapsedTime = Date.now() - startTime;
    laps.push(new Date(elapsedTime).toISOString().substr(11, 8));
    displayLaps();
  }
}

function displayLaps() {
  const lapsList = document.querySelector('.laps');
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    const li = document.createElement('li');
    li.textContent = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(li);
  });
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', lap);
