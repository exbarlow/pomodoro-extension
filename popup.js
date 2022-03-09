
// get control buttons
const startButton = document.querySelector('#startButton');
const endButton = document.querySelector('#endButton');
const skipButton = document.querySelector('#skipButton');
const quitButton = document.querySelector('#quitButton');
// get countdown and current mode text
const countdownDisplay = document.querySelector('.countdown');
const modeDisplay = document.querySelector('.mode');

// when the popup is open, want to get the remainingTime of timer
chrome.runtime.sendMessage('get-time', (response) => {
    updateCountdownText(response);
})

function updateCountdownText(rT) {
    const remainingTime = rT;
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');

    const newText = minutes + ":" + seconds;
    countdownDisplay.innerText = newText;
}

startButton.addEventListener("click", () => {
    console.log("Clicked!");
    startTimer();
})


// switches to the given mode, resetting the remainingTime
function switchMode(mode) {
    timer.mode = mode;
    timer.remainingTime.total = settings[mode] * 60;
    timer.remainingTime.minutes = settings[mode];
    timer.remainingTime.seconds = 0;

    updateCountdown();
    modeDisplay.innerText = `${mode}`;
}


