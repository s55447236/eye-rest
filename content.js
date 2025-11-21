let isResting = false;
let countdownInterval;

function createOverlay() {
    if (document.getElementById('eye-rest-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'eye-rest-overlay';

    const cat = document.createElement('img');
    cat.src = chrome.runtime.getURL('images/cat.png');
    cat.id = 'eye-rest-cat';

    const message = document.createElement('div');
    message.id = 'eye-rest-message';
    message.innerText = "Time to rest your eyes! 😺";

    const timer = document.createElement('div');
    timer.id = 'eye-rest-timer';
    timer.innerText = "60";

    const closeBtn = document.createElement('button');
    closeBtn.id = 'eye-rest-close';
    closeBtn.innerText = "I'm good, dismiss";
    closeBtn.onclick = removeOverlay;

    overlay.appendChild(cat);
    overlay.appendChild(message);
    overlay.appendChild(timer);
    overlay.appendChild(closeBtn);

    document.body.appendChild(overlay);

    startCountdown(60);
}

function removeOverlay() {
    const overlay = document.getElementById('eye-rest-overlay');
    if (overlay) {
        overlay.remove();
    }
    clearInterval(countdownInterval);
    isResting = false;
}

function startCountdown(seconds) {
    let counter = seconds;
    const timerElement = document.getElementById('eye-rest-timer');

    countdownInterval = setInterval(() => {
        counter--;
        if (timerElement) timerElement.innerText = counter;

        if (counter <= 0) {
            removeOverlay();
        }
    }, 1000);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "restEyes") {
        createOverlay();
    }
});

// Add a hidden cat in the corner initially?
// Yes, the peeking cat!
function createPeekingCat() {
    if (document.getElementById('eye-rest-peeking-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'eye-rest-peeking-wrapper';

    const peekingCat = document.createElement('img');
    peekingCat.src = chrome.runtime.getURL('images/cat_peeking.png');
    peekingCat.id = 'eye-rest-peeking-cat';
    // Removed title attribute to avoid default browser tooltip
    peekingCat.onclick = createOverlay;

    const tooltip = document.createElement('div');
    tooltip.id = 'eye-rest-peeking-tooltip';
    tooltip.innerText = "Click me to take a break!";

    wrapper.appendChild(peekingCat);
    wrapper.appendChild(tooltip);

    document.body.appendChild(wrapper);
}

// Initialize
createPeekingCat();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "restEyes") {
        createOverlay();
    }
});
