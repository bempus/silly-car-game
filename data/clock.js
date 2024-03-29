import { gamePausedMusic, gameResumedMusic, setMusicSpeed } from "../music.js";

let time = window.localStorage.getItem("time") || Date.now();
let interval;

const updateTime = () => {
  const timeString = new Date(time).toLocaleTimeString("sv", {
    hour: "2-digit",
    minute: "2-digit",
  });
  time = time * 1 + 60000;
  window.localStorage.setItem("time", time);
  const [hour, minute] = timeString.split(":");
  const hourDegrees = (360 / 12) * hour - 90;
  const minuteDegrees = (360 / 60) * minute - 90;
  document
    .querySelector(":root")
    .style.setProperty("--hour-deg", `${hourDegrees}deg`);
  document
    .querySelector(":root")
    .style.setProperty("--minute-deg", `${minuteDegrees}deg`);
  window.hour = hour;
};

const startTimer = () => {
  clearInterval(interval);
  if (window.speed === 0) {
    document.querySelector("world").style.filter = "grayscale(.8)";
    return;
  }
  if (document.querySelector("world"))
    document.querySelector("world").style.filter = "grayscale(0)";
  interval = setInterval(updateTime, 1000 / (window.speed || 1));
};

const updateSpeed = () => {
  startTimer(window.speed);
  window.updateCarSpeed(window.speed);
  window.updateSpawnCarInterval();
};

const initClock = (element = document.querySelector("game")) => {
  if (!document.querySelector("clock")) {
    const clock = document.createElement("clock");
    const clockHour = document.createElement("arm");
    const clockMinute = document.createElement("arm");

    clock.classList.add("clock");
    clockHour.classList.add("arm", "hour");
    clockMinute.classList.add("arm", "minute");

    clock.append(clockHour, clockMinute);
    updateTime();
    startTimer(1);
    element.appendChild(clock);
  }
  updateTime();
};

const speedHandler = (e) => {
  window.speed = e.target.speed;
  window.speed === 0 ? gamePausedMusic() : gameResumedMusic();
  setMusicSpeed(e.target.musicSpeed);
  updateSpeed();
};

const initSpeed = (element = document.querySelector("game")) => {
  window.speed = 1;

  const speeds = [
    {
      name: "pause",
      value: 0,
      text: "⏸",
      musicSpeed: 0.8,
    },
    {
      name: "slow",
      value: 0.5,
      text: "➷",
      musicSpeed: 0.9,
    },
    {
      name: "normal",
      value: 1,
      text: "➵",
      musicSpeed: 1,
    },
    {
      name: "fast",
      value: 4,
      text: "➹",
      musicSpeed: 1.3,
    },
    {
      name: "ultra",
      value: 20,
      text: "➳",
      musicSpeed: 2,
    },
  ];

  const speedEl = document.createElement("speedController");
  speeds.forEach((speed) => {
    const el = document.createElement(speed.name);
    el.speed = speed.value;
    el.innerText = speed.text;
    el.musicSpeed = speed.musicSpeed;
    el.addEventListener("click", speedHandler);
    speedEl.append(el);
  });

  element.append(speedEl);
};

export { initClock, initSpeed };
