import { initClock, initSpeed } from "./data/clock.js";
import { initWorld } from "./data/world.js";
import initBgMusic, {
  displayAuthorCredit,
  displaySoundLevelSlider,
} from "./music.js";

const clockContainer = document.createElement("div");
clockContainer.id = "clock-container";
document.querySelector("game").append(clockContainer);
initClock(clockContainer);
initSpeed(clockContainer);
initBgMusic();
initWorld();

const soundContainer = document.createElement("div");
soundContainer.id = "sound-container";
document.querySelector("game").append(soundContainer);
displaySoundLevelSlider(soundContainer);
displayAuthorCredit(soundContainer);
