let timer;
let isRunning = false;
let startTime;
let lapTimes = [];

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    document.getElementById("startStop").innerText = "Start";
  } else {
    startTime = Date.now() - (lapTimes.length > 0 ? lapTimes.reduce((a, b) => a + b) : 0);
    timer = setInterval(updateDisplay, 10);
    isRunning = true;
    document.getElementById("startStop").innerText = "Stop";
  }
}

function reset() {
  clearInterval(timer);
  lapTimes = [];
  isRunning = false;
  document.getElementById("startStop").innerText = "Start";
  document.getElementById("display").innerText = "00:00:00";
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (isRunning) {
    const elapsedTime = Date.now() - startTime;
    lapTimes.push(elapsedTime);
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    document.getElementById("laps").appendChild(lapItem);
  }
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  document.getElementById("display").innerText = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millisecondsFormatted = Math.floor(milliseconds % 1000 / 10).toString().padStart(2, "0");
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${millisecondsFormatted}`;
}
