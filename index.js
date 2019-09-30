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

let countDownID;

window.onload = function(){
    init();
}

function init(){
    breakTime = 5;
    sessionTime = 25;
    seconds = 59;
    minutes = sessionTime
    pomodoroBreak.textContent = breakTime;
    pomodoroSession.textContent = sessionTime;
    displayMinutes.textContent = sessionTime;
    displaySeconds.textContent = "00";
    clockState.innerHTML = "<h2>Session</h2>";
    message.textContent = "";
}

reset.addEventListener('click', resetSettings);

function resetSettings(){
    started = false;
    paused = false;
    isBreak = false;
    displayMinutes.textContent = sessionTime;
    init();
    clearInterval(countDownID);
    startButton.textContent = "Start";
}

breakUp.addEventListener('click', upBreakTime);

function upBreakTime(){
    if(!started){
        if( breakTime < 25){
            breakTime += 1;
            pomodoroBreak.textContent = breakTime;
            message.textContent = "";
        } else {
            message.textContent = "You have reached the maximum break time";
        }
    }
}

breakDown.addEventListener('click', downBreakTime);

function downBreakTime(){
    if(!started){
        if (breakTime > 1){
            breakTime -= 1;
            pomodoroBreak.textContent = breakTime;
            message.textContent = "";
        } else {
            message.textContent = "You have reached the minimum break time";
        }
    }
}

sessionUp.addEventListener('click', upSessionTime);

function upSessionTime(){
    if(!started){
        if (sessionTime < 25){
            sessionTime += 1;
            pomodoroSession.textContent = sessionTime;
            displayMinutes.textContent = sessionTime;
            message.textContent = "";
        } else {
            message.textContent = "You have reached the maximum session time.";
        }
    }
}

sessionDown.addEventListener('click', downSessionTime);

function downSessionTime(){
    if(!started){
        if (sessionTime > 1){
            sessionTime -= 1;
            pomodoroSession.textContent = sessionTime;
            displayMinutes.textContent = sessionTime;
            message.textContent = "";
        } else {
            message.textContent = "You have reached the minimum session time.";
        }
    }
}

startButton.addEventListener("click", startClock);

let started = false;
let paused = false;

let seconds = 59;
let minutes = sessionTime;   
let isBreak = false;

function startClock(){
    if(!started){
        started = true;
        message.textContent = "";        
        startButton.textContent = "Pause";
        minutes = sessionTime
        minutes -= 1;
        displayMinutes.textContent = minutes;
        displaySeconds.textContent = seconds;
        countDownID = window.setInterval(function countDown() {
            let time = 0;
            if(seconds > 0 && time < 60){
                seconds -= 1;
                time += 1;
                if(seconds >= 10){
                    displaySeconds.textContent = seconds;
                } else {
                    displaySeconds.textContent = `0${seconds}`;
                }
            } else if (minutes > 0) {
                    minutes -= 1;
                    seconds = 59;
                    time = 0;
                    displayMinutes.textContent = minutes;
                    displaySeconds.textContent = seconds;
            } else if (!minutes > 0){
                if(isBreak){
                    isBreak = false;
                    clockState.innerHTML = "<h2>Session</h2>";
                    minutes = sessionTime;
                    displayMinutes.textContent = minutes;
                } else {
                    isBreak = true;
                    clockState.innerHTML = "<h2>Break</h2>";
                    minutes = breakTime;
                    displayMinutes.textContent = minutes;
                }
            }
        }, 1000);
    } else {
        pauseFunction();
    }
}

function pauseFunction(){
    if(paused){
        startButton.textContent = "Pause";
        paused = false;
        message.textContent = "";
        let isBreak = false;
        
        displayMinutes.textContent = minutes;
        displaySeconds.textContent = seconds;
        countDownID = window.setInterval(function countDown() {
            let time = 0;
            if(seconds > 0 && time < 60){
                seconds -= 1;
                time += 1;
                if(seconds >= 10){
                    displaySeconds.textContent = seconds;
                } else {
                    displaySeconds.textContent = `0${seconds}`;
                }
            } else if (minutes > 0) {
                    minutes -= 1;
                    seconds = 59;
                    time = 0;
                    displayMinutes.textContent = minutes;
                    displaySeconds.textContent = seconds;
            } else if (!minutes > 0){
                if(isBreak){
                    isBreak = false;
                    clockState.innerHTML = "<h2>Session</h2>";
                    minutes = sessionTime;
                    displayMinutes.textContent = minutes;
                } else {
                    isBreak = true;
                    clockState.innerHTML = "<h2>Break</h2>";
                    minutes = breakTime;
                    displayMinutes.textContent = minutes;
                }
            }
        }, 1000);
    } else {
        clearInterval(countDownID);
        startButton.textContent = "Start";
        paused = true;
    }
}