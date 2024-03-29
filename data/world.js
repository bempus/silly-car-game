import { carClickedSound } from "../music.js";

const roads = [];
const cars = new Set();
window.density = 3;
window.carsPassed = 0;
window.carsClicked = 0;

const refreshRoads = () => {
  document.querySelector("world").append(...roads);
};

const addRoad = () => {
  const road = document.createElement("road");
  const roadLine = document.createElement("line");

  road.append(roadLine);

  roads.push(road);
  refreshRoads();
};

const updateCarsPassed = () => {
  window.carsPassed++;
  document.querySelector(
    "passed"
  ).innerText = `Cars passed: ${window.carsPassed}`;
};

const updateCarsClicked = (e) => {
  if (!window.speed)
    return e.target.addEventListener("click", updateCarsClicked);
  e.target.remove();
  window.carsClicked++;
  document.querySelector(
    "clicked"
  ).innerText = `Cars clicked: ${window.carsClicked}`;
  carClickedSound();
};

window.updateCarSpeed = (speed) => {
  Array.from(cars).forEach((car) => {
    car.animation.updatePlaybackRate(speed);
    car.animation;
  });
};

const addCar = () => {
  const car = document.createElement("car");
  const door = document.createElement("door");
  const windScreen = document.createElement("windscreen");

  car.addEventListener("click", updateCarsClicked, { once: true });

  const carData = {
    width: "80px",
  };

  car.style = {
    width: carData.width,
    height: "40px",
  };

  car.append(door, windScreen);
  cars.add(car);
  car.addEventListener("animationend", () => {});

  const timing = {
    duration: 2000,
    iterations: 1,
  };

  const carConfig = {
    direction: null,
  };
  const l2r = [
    {
      translate: "-100% 0",
    },
    {
      translate: `calc(${document.querySelector("world").clientWidth}px + ${
        carData.width
      }`,
    },
  ];

  if (Math.random() > 0.4) {
    car.style.right = "100%";
    car.style.bottom = "4%";
    windScreen.style.right = "10%";
    carConfig.direction = l2r;
  } else {
    car.style.right = "100%";
    car.style.top = "4%";
    windScreen.style.left = "10%";
    timing.direction = "reverse";
    carConfig.direction = l2r;
  }

  const carAnim = car.animate(carConfig.direction, timing);
  car.setSpeed = carAnim.updatePlaybackRate;

  carAnim.updatePlaybackRate(window.speed);

  console.log(carAnim.updatePlaybackRate);
  car.animation = carAnim;
  carAnim.onfinish = (e) => {
    if (!car.parentNode) return;
    car.remove();
    cars.delete(car);
    updateCarsPassed();
  };

  roads[0].appendChild(car);
};

window.updateSpawnCarInterval = () => {
  clearInterval(window.spawnCarInterval);
  if (window.speed === 0) return;
  window.spawnCarInterval = setInterval(() => {
    if (Math.random() > 0.6 / density) addCar();
  }, 300 / (window.speed / 2));
};

const initCarSpawn = () => {
  updateSpawnCarInterval();
  const cardata = document.createElement("cardata");
  const carsPassed = document.createElement("passed");
  const carsClickedContainer = document.createElement("div");
  const carsClicked = document.createElement("clicked");
  carsClicked.innerHTML = "Cars clicked: 0";
  cardata.append(carsPassed);
  carsClickedContainer.append(carsClicked);
  cardata.append(carsClickedContainer);
  window.carsPassed = -1;
  document.querySelector("game").append(cardata);
  updateCarsPassed();
};

const initHouse = () => {
  const floor = document.createElement("floor");
  document.querySelector("world").appendChild(floor);
};

const initWorld = () => {
  const world = document.createElement("world");
  document.querySelector("game").append(world);
  addRoad();
  initCarSpawn();
  initHouse();
};

export { initWorld };
