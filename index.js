// DOM Elements
const pomodoroBreak = document.getElementById("breakTime");
const pomodoroSession = document.getElementById("sessionTime");
const displayMinutes = document.getElementById("minutes");
const displaySeconds = document.getElementById("seconds");
const clockState = document.getElementById("clockState");
const message = document.getElementById("message");
const reset = document.getElementById("reset");
const startButton = document.getElementById("start");
const breakUp = document.getElementById("breakUp");
const breakDown = document.getElementById("breakDown");
const sessionUp = document.getElementById("sessionUp");
const sessionDown = document.getElementById("sessionDown");
const progressCircle = document.querySelector(".progress-ring__circle");

// Audio Context for alarm
let audioCtx = null;

// Timer State
let breakTime = 5;
let sessionTime = 25;
let timeLeft = 25 * 60;
let totalDuration = 25 * 60;
let started = false;
let paused = false;
let isBreak = false;
let countDownID = null;

// Progress Circle Calculation
let radius = 0;
let circumference = 0;

// Initialize app
window.onload = function() {
    init();
    createStars();
};

function init() {
    breakTime = 5;
    sessionTime = 25;
    timeLeft = sessionTime * 60;
    totalDuration = sessionTime * 60;
    started = false;
    paused = false;
    isBreak = false;
    
    if (countDownID) {
        clearInterval(countDownID);
        countDownID = null;
    }

    pomodoroBreak.textContent = breakTime;
    pomodoroSession.textContent = sessionTime;
    
    document.body.className = "session-mode";
    clockState.textContent = "Session";
    message.textContent = "";
    startButton.textContent = "Start";
    
    if (progressCircle && progressCircle.r && progressCircle.r.baseVal) {
        radius = progressCircle.r.baseVal.value;
        circumference = 2 * Math.PI * radius;
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = 0;
    }
    
    updateDisplay();
}

function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    
    displayMinutes.textContent = mins;
    displaySeconds.textContent = secs < 10 ? `0${secs}` : secs;
    
    // Update progress circle offset
    const offset = circumference - (timeLeft / totalDuration) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

// Adjust timer lengths
function changeLength(type, operation) {
    if (started) return; // Cannot modify time while running or paused
    
    message.textContent = "";
    
    if (type === "session") {
        if (operation === "up") {
            if (sessionTime < 60) {
                sessionTime += 1;
            } else {
                message.textContent = "Session time cannot exceed 60 minutes.";
            }
        } else {
            if (sessionTime > 1) {
                sessionTime -= 1;
            } else {
                message.textContent = "Session time must be at least 1 minute.";
            }
        }
        pomodoroSession.textContent = sessionTime;
        if (!isBreak) {
            timeLeft = sessionTime * 60;
            totalDuration = sessionTime * 60;
            updateDisplay();
        }
    } else if (type === "break") {
        if (operation === "up") {
            if (breakTime < 60) {
                breakTime += 1;
            } else {
                message.textContent = "Break time cannot exceed 60 minutes.";
            }
        } else {
            if (breakTime > 1) {
                breakTime -= 1;
            } else {
                message.textContent = "Break time must be at least 1 minute.";
            }
        }
        pomodoroBreak.textContent = breakTime;
        if (isBreak) {
            timeLeft = breakTime * 60;
            totalDuration = breakTime * 60;
            updateDisplay();
        }
    }
}

// Event Listeners for Controls
sessionUp.addEventListener("click", () => changeLength("session", "up"));
sessionDown.addEventListener("click", () => changeLength("session", "down"));
breakUp.addEventListener("click", () => changeLength("break", "up"));
breakDown.addEventListener("click", () => changeLength("break", "down"));

reset.addEventListener("click", init);
startButton.addEventListener("click", handleStartPause);

function handleStartPause() {
    // Initialize audio context on first user click to satisfy browser security
    try {
        if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioCtx();
        }
        if (audioCtx && audioCtx.state === "suspended") {
            const res = audioCtx.resume();
            if (res && typeof res.catch === "function") res.catch(e => console.warn("Audio resume blocked by browser policy:", e));
        }
    } catch (e) {
        console.warn("AudioContext initialization prevented by browser:", e);
    }

    message.textContent = "";

    if (!started) {
        // First start
        started = true;
        paused = false;
        startButton.textContent = "Pause";
        startTicker();
    } else {
        // Toggle Pause/Resume
        if (paused) {
            paused = false;
            startButton.textContent = "Pause";
            startTicker();
        } else {
            paused = true;
            startButton.textContent = "Start";
            if (countDownID) {
                clearInterval(countDownID);
                countDownID = null;
            }
        }
    }
}

function startTicker() {
    if (countDownID) clearInterval(countDownID);
    
    countDownID = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft -= 1;
            updateDisplay();
        } else {
            // Timer finished! Transition between Session & Break
            playAlarmSound();
            
            if (!isBreak) {
                // Session ended, start break
                isBreak = true;
                timeLeft = breakTime * 60;
                totalDuration = breakTime * 60;
                clockState.textContent = "Break";
                document.body.className = "break-mode";
            } else {
                // Break ended, start session
                isBreak = false;
                timeLeft = sessionTime * 60;
                totalDuration = sessionTime * 60;
                clockState.textContent = "Session";
                document.body.className = "session-mode";
            }
            updateDisplay();
        }
    }, 1000);
}

// Synthesize double-chime alarm sound via Web Audio API
function playAlarmSound() {
    try {
        if (!audioCtx) return;
        if (audioCtx.state === "suspended") {
            const res = audioCtx.resume();
            if (res && typeof res.catch === "function") res.catch(e => console.warn("Audio resume blocked by browser policy:", e));
        }
        
        const now = audioCtx.currentTime;
        
        // Chime 1
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(880, now); // A5 note
        osc1.frequency.exponentialRampToValueAtTime(440, now + 0.4);
        gain1.gain.setValueAtTime(0.25, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.start(now);
        osc1.stop(now + 0.4);
        
        // Chime 2
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(1174.66, now + 0.18); // D6 note
        osc2.frequency.exponentialRampToValueAtTime(587.33, now + 0.58);
        gain2.gain.setValueAtTime(0.25, now + 0.18);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.58);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start(now + 0.18);
        osc2.stop(now + 0.58);
    } catch (e) {
        console.error("Failed to play synthesized alarm:", e);
    }
}

// Sparkle background twinkle stars generator
function createStars() {
    const container = document.getElementById("stars-container");
    if (!container) return;
    const starCount = 45;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.position = "absolute";
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = star.style.width;
        star.style.background = "rgba(255, 255, 255, 0.55)";
        star.style.borderRadius = "50%";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animation = `twinkle ${Math.random() * 4 + 3}s infinite ease-in-out`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(star);
    }
}