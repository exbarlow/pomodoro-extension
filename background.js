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

// Returns the remaining time in the timer given the endTime
function getRemainingTime(endTime) {
    const difference = endTime - Date.now();
    const total = Math.floor(difference / 1000);
    const minutes = Math.floor((total / 60) % 60); // I think the modulo can probably be removed once
    const seconds = Math.floor(total % 60);

    return {
        total,
        minutes,
        seconds,
    };

}

// starts the timer
function startTimer() {

    let total = timer.remainingTime.total;

    const endTime = Date.now() + total * 1000;

    interval = window.setInterval(() => {
        timer.remainingTime = getRemainingTime(endTime);
        /// send a response to popup.js?

        total = timer.remainingTime.total;
        if (total <= 0) {
            window.clearInterval(interval);
        }
    }, 1000);
}

