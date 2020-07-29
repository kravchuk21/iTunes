export const radioPlayerInit = () => {
  // обЪявлеие переменных
  const radio = document.querySelector(".radio");
  const radioCoverImg = document.querySelector(".radio-cover__img");
  const radioNavigation = document.querySelector(".radio-navigation");
  const radioHeaderBig = document.querySelector(".radio-header__big");
  const radioItem = document.querySelectorAll(".radio-item");
  const radioStop = document.querySelector(".radio-stop");

  const audio = new Audio();
  audio.type = "audio/aac";

  radioStop.disabled = true; // отключение кнопки

  // смена иконки
  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove("play");
      radioStop.classList.add("fa-play");
      radioStop.classList.remove("fa-stop");
    } else {
      radio.classList.add("play");
      radioStop.classList.remove("fa-play");
      radioStop.classList.add("fa-stop");
    }
  };

  // выделение активного радио
  const selectItem = (elem) => {
    radioItem.forEach((item) => item.classList.remove("select"));
    elem.classList.add("select");
  };

  radioNavigation.addEventListener("change", (event) => {
    const target = event.target;
    const parent = target.closest(".radio-item");

    selectItem(parent);

    const title = parent.querySelector(".radio-name").textContent; // название активного радио
    const urlImg = parent.querySelector(".radio-img").src; // картинка активного радио

    radioHeaderBig.textContent = title;
    radioCoverImg.src = urlImg;

    radioStop.disabled = false; // активация кнопки
    audio.src = target.dataset.radioStantion;
    audio.play();
    changeIconPlay();
  });

  // запуск / остановка радио
  radioStop.addEventListener("click", () => {
    if (audio.paused) audio.play();
    else audio.pause();
    changeIconPlay();
  });
};
