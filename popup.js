// Settings, duration of each timer mode type
let settings = {
    focus: 1,
    rest: 5,
}

// Timer object, contains information about current mode and remaining time in current mode
let timer = {
    mode: 'focus',
    remainingTime: {
        total: settings['focus'] * 60,
        minutes: settings['focus'],
        seconds: 0,
    }
}

let interval;

// get control buttons
const startButton = document.querySelector('#startButton');
const endButton = document.querySelector('#endButton');
const skipButton = document.querySelector('#skipButton');
const quitButton = document.querySelector('#quitButton');
// get countdown and current mode text
const countdownDisplay = document.querySelector('.countdown');
const modeDisplay = document.querySelector('.mode');


// Returns the remaining time in the timer given the endTime
function getRemainingTime() {
    let endTime;
    chrome.storage.local.get('timerEnd', function (result) {
        endTime = result.timerEnd;
        alert(endTime);
        const difference = endTime - Date.now();
        // alert(difference)
        const total = Math.floor(difference / 1000);
        const minutes = Math.floor((total / 60) % 60); // I think the modulo can probably be removed once
        const seconds = Math.floor(total % 60);

        return {
            total,
            minutes,
            seconds,
        };
    });

}


function startTimer() {
    let total = timer.remainingTime.total;
    const endTime = Date.now() + total * 1000;
    chrome.storage.local.set({ timerEnd: endTime })
    runTimer();
}



function runTimer() {
    interval = window.setInterval(() => {
        total = timer.remainingTime.total;
        if (total <= 0) {
            window.clearInterval(interval);
        }
        timer.remainingTime = getRemainingTime();
        updateCountdownText(timer.remainingTime);
    }, 1000);
}

// actually updates the time on the countdown timer
function updateCountdownText(rT) {

    const remainingTime = rT
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');

    const newText = minutes + ":" + seconds;
    countdownDisplay.innerText = newText;
}

startButton.addEventListener('click', () => {
    startTimer();
})



