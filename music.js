const setSoundLevel = (level) => {
  window.bgMusic.volume = level;
};

const initBgMusic = () => {
  window.bgMusic = new Audio("./data/assets/audio/bg-audio.mp3");
  window.bgMusic.loop = true; // Set the audio to loop
  document.addEventListener(
    "click",
    () => {
      window.bgMusic.play();
      setSoundLevel(window.localStorage.getItem("soundLevel") || 0.5);
    },
    {
      once: true,
    }
  );
};

const carClickedSound = () => {
  const beeps = [
    "carbeep-1.wav",
    "carbeep-2.ogg",
    "carbeep-3.wav",
    "carbeep-4.wav",
  ];
  const beep = beeps[Math.floor(Math.random() * beeps.length)];
  const carBeep = new Audio(`./data/assets/audio/${beep}`);
  carBeep.volume = window.localStorage.getItem("soundLevel") || 0.5;
  carBeep.play();
};

const pauseMusic = () => {
  window.bgMusic.pause();
};

const resumeMusic = () => {
  window.bgMusic.play();
};

const gameResumedMusic = () => {
  window.bgMusic.volume = window.localStorage.getItem("soundLevel") || 0.5;
};

const gamePausedMusic = () => {
  window.bgMusic.volume = window.bgMusic.volume * 0.3;
};

const setMusicSpeed = (speed) => {
  window.bgMusic.playbackRate = speed;
};

const displaySoundLevelSlider = (container) => {
  const sliderContainer = document.createElement("div");
  sliderContainer.id = "slider-container";
  container.append(sliderContainer);
  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = 0;
  slider.max = 0.7;
  slider.step = 0.01;
  slider.value = window.localStorage.getItem("soundLevel") || 0.4;
  slider.addEventListener("input", (e) => {
    setSoundLevel(e.target.value);
    window.localStorage.setItem("soundLevel", e.target.value);
  });

  sliderContainer.append(slider);
};

const displayAuthorCredit = (container) => {
  const authorContainer = document.createElement("div");
  authorContainer.id = "author-container";
  container.append(authorContainer);
  const authorText = `Music by: Komorebi by | e s c p | https://www.escp.space
https://escp-music.bandcamp.com`;

  const author = document.createElement("author");
  author.innerText = authorText;
  author.style.color = "#eee";
  authorContainer.append(author);
};

export default initBgMusic;
export {
  pauseMusic,
  resumeMusic,
  displaySoundLevelSlider,
  displayAuthorCredit,
  carClickedSound,
  gamePausedMusic,
  gameResumedMusic,
  setMusicSpeed,
};
