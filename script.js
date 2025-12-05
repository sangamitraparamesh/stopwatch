let hours = 0, minutes = 0, seconds = 0;
let timer;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function updateDisplay() {
    const h = hours < 10 ? '0'+hours : hours;
    const m = minutes < 10 ? '0'+minutes : minutes;
    const s = seconds < 10 ? '0'+seconds : seconds;
    display.textContent = `${h}:${m}:${s}`;
}

function tick() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    updateDisplay();
}

startStopBtn.addEventListener('click', () => {
    if (!running) {
        timer = setInterval(tick, 1000);
        startStopBtn.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
        running = false;
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    hours = minutes = seconds = 0;
    updateDisplay();
    startStopBtn.textContent = 'Start';
    running = false;
    laps.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
    if (running) {
        const li = document.createElement('li');
        li.textContent = display.textContent;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            li.remove();
        });

        li.appendChild(deleteBtn);
        laps.appendChild(li);
    }
});
