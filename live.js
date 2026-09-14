"use strict";

/* ========================================
   NEON CIRCUIT
   HALLOWEEN SPECIAL
======================================== */


/* ----------------------------------------
   Elements
---------------------------------------- */

const openingScreen = document.getElementById("openingScreen");
const liveScreen = document.getElementById("liveScreen");
const endingScreen = document.getElementById("endingScreen");

const startButton = document.getElementById("startButton");
const replayButton = document.getElementById("replayButton");

const liveMusic = document.getElementById("liveMusic");

const playButton = document.getElementById("playButton");
const backButton = document.getElementById("backButton");
const forwardButton = document.getElementById("forwardButton");

const progressBar = document.getElementById("progressBar");

const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");


/* ----------------------------------------
   Time Formatter
---------------------------------------- */

function formatTime(seconds) {

  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}


/* ----------------------------------------
   Opening → Live
---------------------------------------- */

startButton.addEventListener("click", () => {

  openingScreen.classList.add("hidden");
  endingScreen.classList.add("hidden");

  liveScreen.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* ----------------------------------------
   Play / Pause
---------------------------------------- */

playButton.addEventListener("click", async () => {

  if (liveMusic.paused) {

    try {

      await liveMusic.play();

    } catch (error) {

      console.error(
        "Audio playback could not start:",
        error
      );

    }

  } else {

    liveMusic.pause();

  }

});


/* ----------------------------------------
   Play Button Display
---------------------------------------- */

liveMusic.addEventListener("play", () => {

  playButton.textContent = "❚❚";
  playButton.setAttribute(
    "aria-label",
    "一時停止"
  );

});


liveMusic.addEventListener("pause", () => {

  playButton.textContent = "▶";
  playButton.setAttribute(
    "aria-label",
    "再生"
  );

});


/* ----------------------------------------
   10 Seconds Back
---------------------------------------- */

backButton.addEventListener("click", () => {

  liveMusic.currentTime = Math.max(
    0,
    liveMusic.currentTime - 10
  );

});


/* ----------------------------------------
   10 Seconds Forward
---------------------------------------- */

forwardButton.addEventListener("click", () => {

  if (!Number.isFinite(liveMusic.duration)) {
    return;
  }

  liveMusic.currentTime = Math.min(
    liveMusic.duration,
    liveMusic.currentTime + 10
  );

});


/* ----------------------------------------
   Metadata Loaded
---------------------------------------- */

liveMusic.addEventListener(
  "loadedmetadata",
  () => {

    durationDisplay.textContent =
      formatTime(liveMusic.duration);

    progressBar.value = 0;

  }
);


/* ----------------------------------------
   Progress Update
---------------------------------------- */

liveMusic.addEventListener(
  "timeupdate",
  () => {

    currentTimeDisplay.textContent =
      formatTime(liveMusic.currentTime);

    if (
      Number.isFinite(liveMusic.duration) &&
      liveMusic.duration > 0
    ) {

      const progress =
        (
          liveMusic.currentTime /
          liveMusic.duration
        ) * 100;

      progressBar.value = progress;

    }

  }
);


/* ----------------------------------------
   Seek
---------------------------------------- */

progressBar.addEventListener(
  "input",
  () => {

    if (
      !Number.isFinite(liveMusic.duration) ||
      liveMusic.duration <= 0
    ) {
      return;
    }

    const newTime =
      (
        progressBar.value / 100
      ) * liveMusic.duration;

    liveMusic.currentTime = newTime;

  }
);


/* ----------------------------------------
   Music Finished
---------------------------------------- */

liveMusic.addEventListener(
  "ended",
  () => {

    liveMusic.currentTime = 0;

    progressBar.value = 0;

    currentTimeDisplay.textContent =
      "0:00";

    playButton.textContent = "▶";

    liveScreen.classList.add("hidden");
    endingScreen.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* ----------------------------------------
   Replay
---------------------------------------- */

replayButton.addEventListener(
  "click",
  () => {

    liveMusic.pause();
    liveMusic.currentTime = 0;

    progressBar.value = 0;

    currentTimeDisplay.textContent =
      "0:00";

    endingScreen.classList.add("hidden");
    liveScreen.classList.remove("hidden");

    playButton.textContent = "▶";
    playButton.setAttribute(
      "aria-label",
      "再生"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* ----------------------------------------
   Audio Error
---------------------------------------- */

liveMusic.addEventListener(
  "error",
  () => {

    console.error(
      "Halloween Parade audio file could not be loaded."
    );

  }
);


/* ----------------------------------------
   Initial State
---------------------------------------- */

currentTimeDisplay.textContent = "0:00";
durationDisplay.textContent = "0:00";
progressBar.value = 0;