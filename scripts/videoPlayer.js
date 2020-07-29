export const videoPlayerInit = () => {
  // обЪявлеие переменных
  const videoPlayer = document.querySelector(".video-player");
  const videoButtonPlay = document.querySelector(".video-button__play");
  const videoButtonStop = document.querySelector(".video-button__stop");
  const videoProgress = document.querySelector(".video-progress");
  const videoTimePassed = document.querySelector(".video-time__passed");
  const videoTimeTotal = document.querySelector(".video-time__total");
  const videoVolumeUp = document.querySelector(".video-volume-up");
  const videoVolumeDown = document.querySelector(".video-volume-down");
  const videoVolume = document.querySelector(".video-volume");
  const videoFullscreen = document.querySelector(".video-fullscreen");

  // смена иконки play / pause
  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove("fa-pause");
      videoButtonPlay.classList.add("fa-play");
    } else {
      videoButtonPlay.classList.add("fa-pause");
      videoButtonPlay.classList.remove("fa-play");
    }
  };

  // запуск / остановка видео
  const togglePlay = () => {
    if (videoPlayer.paused) videoPlayer.play();
    else videoPlayer.pause();
  };

  // остановка и перемотка видео в начало
  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  // добовление 0 перед временем
  const addZero = (n) => (n < 10 ? "0" + n : n);

  videoPlayer.addEventListener("click", togglePlay);
  videoButtonPlay.addEventListener("click", togglePlay);
  videoPlayer.addEventListener("play", toggleIcon);
  videoPlayer.addEventListener("pause", toggleIcon);
  videoButtonStop.addEventListener("click", stopPlay);
  videoPlayer.addEventListener("timeupdate", () => {
    const currentTime = videoPlayer.currentTime; // текущее время видео
    const duration = videoPlayer.duration; // полное время видео

    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);
    let minuteDuration = Math.floor(duration / 60);
    let secondsDuration = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`; // текущее время видео (минуты : секунды)
    videoTimeTotal.textContent = `${addZero(minuteDuration)}:${addZero(secondsDuration)}`; // полное время видео (минуты : секунды)
  });

  // перемотка видео
  videoProgress.addEventListener("input", () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;
    videoPlayer.currentTime = (value * duration) / 100;
  });

  // полноэкранный режим
  videoFullscreen.addEventListener("click", () =>
    videoPlayer.requestFullscreen()
  );

  //изменение громкости видео
  videoVolume.addEventListener("input", () => {
    videoPlayer.volume = videoVolume.value / 100;
  });

  videoPlayer.volume = 0.5; // громкость видео 50%

  videoVolume.value = videoPlayer.volume * 100;

  // громкость видео 0%
  videoVolumeDown.addEventListener("click", () => {
    videoPlayer.volume = 0;
    videoVolume.value = videoPlayer.volume * 100;
  });

  // громкость видео 100%
  videoVolumeUp.addEventListener("click", () => {
    videoPlayer.volume = 1;
    videoVolume.value = videoPlayer.volume * 100;
  });
};
