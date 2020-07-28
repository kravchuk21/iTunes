// импорт модулей
import { radioPlayerInit } from "./radioPlayer.js";
import { musicPlayerInit } from "./musicPlayer.js";
import { videoPlayerInit } from "./videoPlayer.js";

// обЪявлеие переменных
const playerBtn = document.querySelectorAll(".player-btn");
const playerBlock = document.querySelectorAll(".player-block");
const temp = document.querySelector(".temp"); // надпись на главном экране

// удаление класса "active" у всех playerBtn и playerBlock
const deactivationPlayer = () => {
  temp.style.display = "none"; // скрытие надписи на главном экране
  playerBtn.forEach((item) => item.classList.remove("active"));
  playerBlock.forEach((item) => item.classList.remove("active"));
};

// добавление класса "active" активным кнобкам и блокам
playerBtn.forEach((btn, index) =>
  btn.addEventListener("click", () => {
    deactivationPlayer();
    btn.classList.add("active");
    playerBlock[index].classList.add("active");
  })
);

// инициализация модулей
radioPlayerInit();
musicPlayerInit();
videoPlayerInit();
