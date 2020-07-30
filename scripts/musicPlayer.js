// импорт функций
import { addZero } from "./supScript.js";

export const musicPlayerInit = () => {
  // обЪявлеие переменных
  const audio = document.querySelector(".audio");
  const audioImg = document.querySelector(".audio-img");
  const audioHeader = document.querySelector(".audio-header");
  const audioPlayer = document.querySelector(".audio-player");
  const audioNavigation = document.querySelector(".audio-navigation");
  const audioButtonPlay = document.querySelector(".audio-button__play");
  const audioProgress = document.querySelector(".audio-progress");
  const audioProgressTiming = document.querySelector(".audio-progress__timing");
  const audioTimePassed = document.querySelector(".audio-time__passed");
  const audioTimeTotal = document.querySelector(".audio-time__total");

  const playlist = ["hello", "flow", "speed"];

  // индекс активной песни
  let trackIndex = 0;

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused;
    const track = playlist[trackIndex];
    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
    audioPlayer.src = `./audio/${track}.mp3`;

    if (isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    audioPlayer.addEventListener("canplay", () => {
      updateTime();
    });
  };

  // переключение на предыдущую перню
  const prevTrack = () => {
    if (trackIndex != 0) {
      trackIndex--;
    } else {
      trackIndex = playlist.length - 1;
    }
    loadTrack();
  };

  // переключение на следующую перню
  const nextTrack = () => {
    if (trackIndex === playlist.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }
    loadTrack();
  };

  audioNavigation.addEventListener("click", (event) => {
    const target = event.target;

    // нажатие на кнопку play
    if (target.classList.contains("audio-button__play")) {
      audio.classList.toggle("play");
      audioButtonPlay.classList.toggle("fa-play");
      audioButtonPlay.classList.toggle("fa-pause");

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }

      const track = playlist[trackIndex];
      audioHeader.textContent = track.toUpperCase();
    }
    // переключение на предыдущую перню
    if (target.classList.contains("audio-button__prev")) {
      prevTrack();
    }
    // переключение на следующую перню
    if (target.classList.contains("audio-button__next")) {
      nextTrack();
    }
  });

  // переключение песни при завершении
  audioPlayer.addEventListener("ended", () => {
    nextTrack();
    audioPlayer.play();
  });

  const updateTime = () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = progress + "%";

    const minutesPassed = Math.floor(currentTime / 60) || "0";
    const secondsPassed = Math.floor(currentTime % 60) || "0";
    const minutesTotal = Math.floor(duration / 60) || "0";
    const secondsTotal = Math.floor(duration % 60) || "0";

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(
      secondsPassed
    )}`;
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(
      secondsTotal
    )}`;
  };
  updateTime();
  audioPlayer.addEventListener("timeupdate", updateTime);

  // перемотка песни
  audioProgress.addEventListener("click", (event) => {
    const x = event.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  });

  musicPlayerInit.stop = () => {
    if (!audioPlayer.paused) {
      audioPlayer.pause();
      audio.classList.remove("play");
      audioButtonPlay.classList.remove("fa-pause");
      audioButtonPlay.classList.add("fa-play");
    }
  };
};
