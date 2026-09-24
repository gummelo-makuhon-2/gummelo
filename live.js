
/* ========================================
   HALLOWEEN SPECIAL
   NEON CIRCUIT × GUMIMERO
======================================== */


/* ----------------------------------------
   Screens
---------------------------------------- */

const openingScreen = document.getElementById("openingScreen");

const liveScreen = document.getElementById("liveScreen");
const gummeloScreen = document.getElementById("gummeloScreen");

const endingScreen = document.getElementById("endingScreen");


/* ----------------------------------------
   Opening Buttons
---------------------------------------- */

const startButton = document.getElementById("startButton");
const gummeloButton = document.getElementById("gummeloButton");

const replayButton = document.getElementById("replayButton");


/* ========================================
   NEON CIRCUIT
======================================== */

const liveMusic = document.getElementById("liveMusic");

const playButton = document.getElementById("playButton");
const backButton = document.getElementById("backButton");
const forwardButton = document.getElementById("forwardButton");

const progressBar = document.getElementById("progressBar");

const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");


/* ========================================
   GUMIMERO
======================================== */

const gummeloMusic = document.getElementById("gummeloMusic");

const gummeloPlayButton =
  document.getElementById("gummeloPlayButton");

const gummeloBackButton =
  document.getElementById("gummeloBackButton");

const gummeloForwardButton =
  document.getElementById("gummeloForwardButton");

const gummeloProgressBar =
  document.getElementById("gummeloProgressBar");

const gummeloCurrentTime =
  document.getElementById("gummeloCurrentTime");

const gummeloDuration =
  document.getElementById("gummeloDuration");


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
   Scroll Top
---------------------------------------- */

function scrollTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ----------------------------------------
   Reset NEON
---------------------------------------- */

function resetNeon() {

  liveMusic.pause();
  liveMusic.currentTime = 0;

  progressBar.value = 0;

  currentTimeDisplay.textContent = "0:00";

  playButton.textContent = "▶";

  playButton.setAttribute(
    "aria-label",
    "再生"
  );

}


/* ----------------------------------------
   Reset GUMIMERO
---------------------------------------- */

function resetGummelo() {

  gummeloMusic.pause();
  gummeloMusic.currentTime = 0;

  gummeloProgressBar.value = 0;

  gummeloCurrentTime.textContent = "0:00";

  gummeloPlayButton.textContent = "▶";

  gummeloPlayButton.setAttribute(
    "aria-label",
    "再生"
  );

}


/* ========================================
   OPENING
======================================== */


/* ----------------------------------------
   NEON CIRCUIT ENTER
---------------------------------------- */

startButton.addEventListener("click", () => {

  resetGummelo();

  openingScreen.classList.add("hidden");
  gummeloScreen.classList.add("hidden");
  endingScreen.classList.add("hidden");

  liveScreen.classList.remove("hidden");

  scrollTop();

});


/* ----------------------------------------
   GUMIMERO ENTER
---------------------------------------- */

gummeloButton.addEventListener("click", () => {

  resetNeon();

  openingScreen.classList.add("hidden");
  liveScreen.classList.add("hidden");
  endingScreen.classList.add("hidden");

  gummeloScreen.classList.remove("hidden");

  scrollTop();

});


/* ========================================
   NEON CIRCUIT PLAYER
======================================== */


/* ----------------------------------------
   Play / Pause
---------------------------------------- */

playButton.addEventListener("click", async () => {

  if (liveMusic.paused) {

    try {

      await liveMusic.play();

    } catch (error) {

      console.error(
        "Halloween Parade playback error:",
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
   Metadata
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
   Progress
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

      progressBar.value =
        (
          liveMusic.currentTime /
          liveMusic.duration
        ) * 100;

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

    liveMusic.currentTime =
      (
        progressBar.value / 100
      ) * liveMusic.duration;

  }
);


/* ----------------------------------------
   NEON Finished
---------------------------------------- */

liveMusic.addEventListener(
  "ended",
  () => {

    resetNeon();

    liveScreen.classList.add("hidden");

    endingScreen.classList.remove("hidden");

    scrollTop();

  }
);


/* ========================================
   GUMIMERO PLAYER
======================================== */


/* ----------------------------------------
   Play / Pause
---------------------------------------- */

gummeloPlayButton.addEventListener(
  "click",
  async () => {

    if (gummeloMusic.paused) {

      try {

        await gummeloMusic.play();

      } catch (error) {

        console.error(
          "NightMeet playback error:",
          error
        );

      }

    } else {

      gummeloMusic.pause();

    }

  }
);


/* ----------------------------------------
   Play Button Display
---------------------------------------- */

gummeloMusic.addEventListener(
  "play",
  () => {

    gummeloPlayButton.textContent = "❚❚";

    gummeloPlayButton.setAttribute(
      "aria-label",
      "一時停止"
    );

  }
);


gummeloMusic.addEventListener(
  "pause",
  () => {

    gummeloPlayButton.textContent = "▶";

    gummeloPlayButton.setAttribute(
      "aria-label",
      "再生"
    );

  }
);


/* ----------------------------------------
   10 Seconds Back
---------------------------------------- */

gummeloBackButton.addEventListener(
  "click",
  () => {

    gummeloMusic.currentTime = Math.max(
      0,
      gummeloMusic.currentTime - 10
    );

  }
);


/* ----------------------------------------
   10 Seconds Forward
---------------------------------------- */

gummeloForwardButton.addEventListener(
  "click",
  () => {

    if (
      !Number.isFinite(
        gummeloMusic.duration
      )
    ) {
      return;
    }

    gummeloMusic.currentTime = Math.min(
      gummeloMusic.duration,
      gummeloMusic.currentTime + 10
    );

  }
);


/* ----------------------------------------
   Metadata
---------------------------------------- */

gummeloMusic.addEventListener(
  "loadedmetadata",
  () => {

    gummeloDuration.textContent =
      formatTime(gummeloMusic.duration);

    gummeloProgressBar.value = 0;

  }
);


/* ----------------------------------------
   Progress
---------------------------------------- */

gummeloMusic.addEventListener(
  "timeupdate",
  () => {

    gummeloCurrentTime.textContent =
      formatTime(gummeloMusic.currentTime);

    if (
      Number.isFinite(
        gummeloMusic.duration
      ) &&
      gummeloMusic.duration > 0
    ) {

      gummeloProgressBar.value =
        (
          gummeloMusic.currentTime /
          gummeloMusic.duration
        ) * 100;

    }

  }
);


/* ----------------------------------------
   Seek
---------------------------------------- */

gummeloProgressBar.addEventListener(
  "input",
  () => {

    if (
      !Number.isFinite(
        gummeloMusic.duration
      ) ||
      gummeloMusic.duration <= 0
    ) {
      return;
    }

    gummeloMusic.currentTime =
      (
        gummeloProgressBar.value / 100
      ) * gummeloMusic.duration;

  }
);


/* ----------------------------------------
   GUMIMERO Finished
---------------------------------------- */

gummeloMusic.addEventListener(
  "ended",
  () => {

    resetGummelo();

    gummeloScreen.classList.add("hidden");

    endingScreen.classList.remove("hidden");

    scrollTop();

  }
);


/* ========================================
   ENDING → TOP
======================================== */

replayButton.addEventListener(
  "click",
  () => {

    resetNeon();
    resetGummelo();

    liveScreen.classList.add("hidden");
    gummeloScreen.classList.add("hidden");
    endingScreen.classList.add("hidden");

    openingScreen.classList.remove("hidden");

    scrollTop();

  }
);


/* ========================================
   Audio Errors
======================================== */

liveMusic.addEventListener(
  "error",
  () => {

    console.error(
      "Halloween Parade audio file could not be loaded."
    );

  }
);


gummeloMusic.addEventListener(
  "error",
  () => {

    console.error(
      "秘密のNightMeet audio file could not be loaded."
    );

  }
);


/* ========================================
   Initial State
======================================== */

currentTimeDisplay.textContent = "0:00";
durationDisplay.textContent = "0:00";
progressBar.value = 0;

gummeloCurrentTime.textContent = "0:00";
gummeloDuration.textContent = "0:00";
gummeloProgressBar.value = 0;