const opening =
  document.getElementById("opening");

const liveScreen =
  document.getElementById("liveScreen");

const ending =
  document.getElementById("ending");

const startButton =
  document.getElementById("startButton");

const pauseButton =
  document.getElementById("pauseButton");

const replayButton =
  document.getElementById("replayButton");

const backButton =
  document.getElementById("backButton");

const forwardButton =
  document.getElementById("forwardButton");

const liveMusic =
  document.getElementById("liveMusic");

const progressBar =
  document.getElementById("progressBar");

const progressFill =
  document.getElementById("progressFill");

const currentTime =
  document.getElementById("currentTime");

const duration =
  document.getElementById("duration");


let isPaused = false;


/* =========================================
             TIME FORMAT
========================================= */

function formatTime(seconds) {

  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes =
    Math.floor(seconds / 60);

  const secs =
    Math.floor(seconds % 60);

  return (
    minutes +
    ":" +
    String(secs).padStart(2, "0")
  );
}


/* =========================================
              LIVE START
========================================= */

startButton.addEventListener(
  "click",
  async () => {

    opening.style.display =
      "none";

    ending.style.display =
      "none";

    liveScreen.style.display =
      "flex";

    liveMusic.currentTime = 0;

    try {

      await liveMusic.play();

      pauseButton.textContent =
        "❚❚";

      pauseButton.setAttribute(
        "aria-label",
        "一時停止"
      );

      isPaused = false;

    } catch (error) {

      console.error(
        "再生エラー:",
        error
      );

    }

  }
);


/* =========================================
               PAUSE / PLAY
========================================= */

pauseButton.addEventListener(
  "click",
  async () => {

    if (!isPaused) {

      liveMusic.pause();

      pauseButton.textContent =
        "▶";

      pauseButton.setAttribute(
        "aria-label",
        "再生"
      );

      isPaused = true;

    } else {

      try {

        await liveMusic.play();

        pauseButton.textContent =
          "❚❚";

        pauseButton.setAttribute(
          "aria-label",
          "一時停止"
        );

        isPaused = false;

      } catch (error) {

        console.error(
          "再生エラー:",
          error
        );

      }

    }

  }
);


/* =========================================
             10 SEC BACK
========================================= */

backButton.addEventListener(
  "click",
  () => {

    liveMusic.currentTime =
      Math.max(
        0,
        liveMusic.currentTime - 10
      );

  }
);


/* =========================================
             10 SEC FORWARD
========================================= */

forwardButton.addEventListener(
  "click",
  () => {

    if (
      Number.isFinite(
        liveMusic.duration
      )
    ) {

      liveMusic.currentTime =
        Math.min(
          liveMusic.duration,
          liveMusic.currentTime + 10
        );

    }

  }
);


/* =========================================
             MUSIC META
========================================= */

liveMusic.addEventListener(
  "loadedmetadata",
  () => {

    duration.textContent =
      formatTime(
        liveMusic.duration
      );

  }
);


/* =========================================
               PROGRESS
========================================= */

liveMusic.addEventListener(
  "timeupdate",
  () => {

    currentTime.textContent =
      formatTime(
        liveMusic.currentTime
      );

    if (
      Number.isFinite(
        liveMusic.duration
      ) &&
      liveMusic.duration > 0
    ) {

      const percentage =
        (
          liveMusic.currentTime /
          liveMusic.duration
        ) * 100;

      progressFill.style.width =
        percentage + "%";

    }

  }
);


/* =========================================
              SEEK BAR
========================================= */

progressBar.addEventListener(
  "click",
  (event) => {

    if (
      !Number.isFinite(
        liveMusic.duration
      )
    ) {
      return;
    }

    const rect =
      progressBar
        .getBoundingClientRect();

    const clickX =
      event.clientX - rect.left;

    const ratio =
      clickX / rect.width;

    liveMusic.currentTime =
      ratio *
      liveMusic.duration;

  }
);


/* =========================================
               END LIVE
========================================= */

liveMusic.addEventListener(
  "ended",
  () => {

    liveScreen.style.display =
      "none";

    ending.style.display =
      "flex";

    progressFill.style.width =
      "0%";

    currentTime.textContent =
      "0:00";

    liveMusic.currentTime = 0;

    pauseButton.textContent =
      "❚❚";

    isPaused = false;

  }
);


/* =========================================
               REPLAY
========================================= */

replayButton.addEventListener(
  "click",
  () => {

    ending.style.display =
      "none";

    opening.style.display =
      "flex";

    progressFill.style.width =
      "0%";

    currentTime.textContent =
      "0:00";

    liveMusic.currentTime = 0;

  }
);
