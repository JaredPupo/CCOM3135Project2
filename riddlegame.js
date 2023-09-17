"use strict"

// Riddle array with questions and answers
const riddles = [
        {
            question: "The more you take, the more you leave behind. What am I?",
            answer: "footsteps",
            hint: "What part of your body do you leave a mark on most of the time? What are those marks called?",
            next: 1
        },
        {
            question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
            answer: "m",
            hint: "Did you detect a pattern on the words above?",
            next: 2
        },
        {   
            question: "I am easy to lift, but hard to throw. What am I?", 
            answer: "feather",
            hint: "What inspired the design for airplanes? What do they have?",
            next: 3 
        },
        {   
            question: "What is 3/7 chicken, 2/3 cat, and 2/4 goat?", 
            answer: "chicago",
            hint: "Don't think about it too literally. The answer is staring at you right in the face.",
            next: 4
        },
    // Add more riddles { question: "", answer: ""},
];
 
// Array before riddles are randomized
shuffleArray(riddles);

let currentLevel = 0;
let score = 0;
let startTime = 0;
let riddleStartTime = 0;
let timerInterval;

function registerUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
        alert('Username already exists!');
        return;
    }
    users[username] = { password: password, score: 0, progress: 0 };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered successfully!');
}

function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const user = users[username];
    if (!user) {
        alert('User does not exist!');
        return false;
    }
    if (user.password !== password) {
        alert('Incorrect password!');
        return false;
    }
    return true;  // Successfully logged in
}

function saveProgress(username, progress, score) {
    const users = JSON.parse(localStorage.getItem('users'));
    if (!users[username]) {
        return;
    }
    users[username].progress = progress;
    users[username].score = score;
    localStorage.setItem('users', JSON.stringify(users));
}

function getProgress(username) {
    const users = JSON.parse(localStorage.getItem('users'));
    return users[username] ? users[username].progress : 0;
}

// This randomizes the riddles in levels
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Start button before the game starts and after it runs the timer.
function startGame() {
    document.getElementById("start-menu").style.display = "none";
    document.getElementById("riddle-container").style.display = "block";
    startTime = new Date().getTime();
    riddleStartTime = startTime;
    startTimer();
    displayRiddle();
}

// This displays the current riddle and score
function displayRiddle() {
    document.getElementById("level").textContent = currentLevel + 1;
    document.getElementById("riddle").textContent = riddles[currentLevel].question;
    document.getElementById("score").textContent = "Total Score: " + score;
    document.getElementById("riddle-time").textContent = "0:00";
}

// After you press the Check Answer Button, it checks if its correct or not
function checkAnswer() {
    const userGuess = document.getElementById("guess").value.toLowerCase();
    const correctAnswer = riddles[currentLevel].answer;

    if (userGuess === correctAnswer) {
        document.getElementById("riddle-p").style.display = "block"
        document.getElementById("result").innerHTML = "";
        document.getElementById("hint").innerHTML = "";
        score += 1; // Total Score increase
        clearInterval(timerInterval);
        const currentTime = new Date().getTime();
        const riddleElapsedTime = (currentTime - riddleStartTime) / 1000;
        const riddleTimeDisplay = formatTime(riddleElapsedTime);
        document.getElementById("riddle-time").textContent = riddleTimeDisplay;
        setTimeout(nextLevel, 1500); // Go to the next level after 1 and a half seconds.
    } else {
        document.getElementById("hint").innerHTML = riddles[currentLevel].hint;
        document.getElementById("result").innerHTML = "Try again.";
    }
}

// What decides if you have won the entire game or not.
function nextLevel() {
    if (currentLevel < riddles.length - 1) {
        currentLevel++;
        displayRiddle();
        document.getElementById("guess").value = "";
        document.getElementById("hint").innerHTML = "";
        document.getElementById("result").innerHTML = "";
        riddleStartTime = new Date().getTime();
        startTimer();
    } else {
        document.getElementById("result").innerHTML = "Congratulations! You completed all levels!";
        document.getElementById("hint").innerHTML = "";
        document.getElementById("final-score").textContent = "Total Score: " + score;
        document.getElementById("riddle-container").style.display = "none";
        clearInterval(timerInterval);
        showWinScreen();
    }
}

// Previous level button
function previousLevel() {
    if (currentLevel > 0) {
        currentLevel--;
        displayRiddle();
        document.getElementById("guess").value = "";
        document.getElementById("hint").innerHTML = "";
        document.getElementById("result").innerHTML = "";
        riddleStartTime = new Date().getTime();
        startTimer();
    }
}

// The Level changer which is currently dropdown, needs to be changed to a desicion tree.
function changeLevel() {
    const select = document.getElementById("level-select");
    currentLevel = parseInt(select.value, 10);
    displayRiddle();
    document.getElementById("guess").value = "";
    document.getElementById("hint").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    riddleStartTime = new Date().getTime();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer()
{
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000; 
    const timeDisplay = formatTime(elapsedTime);
    document.getElementById("timer").textContent = timeDisplay;
}

function formatTime(seconds)//Time Format Minute:Seconds
{
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const secondsDisplay = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return minutes + ":" + secondsDisplay;
}


function showWinScreen() //Win Screen pop up
{
    document.getElementById("win-screen").style.display = "block";
    document.getElementById("final-score").textContent = score;
}