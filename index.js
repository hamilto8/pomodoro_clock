const pomodoroBreak = document.getElementById("breakTime");
const pomodoroSession = document.getElementById("sessionTime");
const pomodoroDisplay = document.getElementById("display");
const pomodoroClock = document.getElementById("clock");
const breakUp = document.getElementById("breakUp");
const breakDown = document.getElementById("breakDown");
const sessionUp = document.getElementById("sessionUp");
const sessionDown = document.getElementById("sessionDown");
const displayMinutes = document.getElementById("minutes");
const displaySeconds = document.getElementById("seconds");
const clockState = document.getElementById("clockState");
const message = document.getElementById("message");
const reset = document.getElementById("reset");
const startButton = document.getElementById("start");

let breakTime = 5;
let sessionTime = 25;

window.onload = function(){
    init();
}

function init(){
    pomodoroBreak.textContent = breakTime;
    pomodoroSession.textContent = sessionTime;
    displayMinutes.textContent = sessionTime;
    displaySeconds.textContent = "00";
    clockState.innerHTML = "<h2>Session</h2>";
    message.textContent = "";
}

reset.addEventListener('click', resetSettings);

function resetSettings(){
    breakTime = 5;
    sessionTime = 25;
    init();
}

breakUp.addEventListener('click', upBreakTime);

function upBreakTime(){
    if( breakTime < 25){
        breakTime += 1;
        pomodoroBreak.textContent = breakTime;
        message.textContent = "";
    } else {
        message.textContent = "You have reached the maximum break time";
    }
}

breakDown.addEventListener('click', downBreakTime);

function downBreakTime(){
    if (breakTime > 1){
        breakTime -= 1;
        pomodoroBreak.textContent = breakTime;
        message.textContent = "";
    } else {
        message.textContent = "You have reached the minimum break time";
    }
}

sessionUp.addEventListener('click', upSessionTime);

function upSessionTime(){
    if (sessionTime < 25){
        sessionTime += 1;
        pomodoroSession.textContent = sessionTime;
        message.textContent = "";
    } else {
        message.textContent = "You have reached the maximum session time.";
    }
}

sessionDown.addEventListener('click', downSessionTime);

function downSessionTime(){
    if (sessionTime > 1){
        sessionTime -= 1;
        pomodoroSession.textContent = sessionTime;
        message.textContent = "";
    } else {
        message.textContent = "You have reached the minimum session time.";
    }
}

startButton.addEventListener("click", startClock);

function startClock(){
    setInterval(() => {
        if(sessionTime > 0){
            sessionTime -=1
        }
        message.textContent = sessionTime
    }, 1000);
}

function stopClock(){
    
}