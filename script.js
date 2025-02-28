const timerDisplay = document.getElementById('timer');
const timerLabel = document.getElementById('timer-label');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const ampulhetaImg = document.getElementById('ampulheta');
const setButton = document.getElementById('setTime'); 

let tempo = 45; 
let timerInterval;
let timeLeft = tempo * 60; 
let isRunning = false;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = formattedTime;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
        resetButton.style.display = 'inline-block';
        setButton.style.display = "none"; 
        timerLabel.textContent = "Tempo em execução";

        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                pauseButton.style.display = 'none';
                resetButton.style.display = 'none';
                startButton.style.display = 'inline-block';
                setButton.style.display = "inline-block"; 
                timerLabel.textContent = "Tempo esgotado!";
                ampulhetaImg.src = "images/cronometro.png";
                alert("Tempo esgotado!");
                resetTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        pauseButton.style.display = 'none';
        resetButton.style.display = 'inline-block';
        startButton.style.display = 'inline-block';
        setButton.style.display = "inline-block"; 
        timerLabel.textContent = "Tempo pausado";
        ampulhetaImg.src = "images/cronometro.png";
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = tempo * 60; 
    updateTimerDisplay();
    pauseButton.style.display = 'none';
    resetButton.style.display = 'none';
    startButton.style.display = 'inline-block';
    setButton.style.display = "inline-block"; 
    timerLabel.textContent = "Tempo do foco";
    ampulhetaImg.src = "images/cronometro.png";
}

function setTime() {
    const novoTempo = parseInt(prompt("Digite o tempo em minutos:"));
    if (!isNaN(novoTempo) && novoTempo > 0){
        tempo = novoTempo;
        timeLeft = tempo * 60; 
        resetTimer();
    } else {
        alert("Tempo inválido. Digite um número maior que zero.")
    }
}

setButton.addEventListener('click', setTime);
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

updateTimerDisplay();
