import { initClock, initSpeed } from "./data/clock.js";
import { initWorld } from "./data/world.js";

const clockContainer = document.createElement("div");
clockContainer.id = "clock-container";
document.querySelector("game").append(clockContainer);
initClock(clockContainer);
initSpeed(clockContainer);

initWorld();
