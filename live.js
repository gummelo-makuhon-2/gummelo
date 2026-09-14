const liveMusic =
  document.getElementById("liveMusic");

const playButton =
  document.getElementById("playButton");

const backButton =
  document.getElementById("backButton");

const forwardButton =
  document.getElementById("forwardButton");

const progressTrack =
  document.getElementById("progressTrack");

const progressFill =
  document.getElementById("progressFill");

const currentTimeDisplay =
  document.getElementById("currentTime");

const durationDisplay =
  document.getElementById("duration");


let isPlaying = false;


/* =========================================
              FORMAT TIME
========================================= */

function formatTime(seconds) {

  if (!Number.isFinite(seconds)) {
    return "0:00";
  }


  const minutes =
    Math.floor(seconds / 60);


  const remainingSeconds =
    Math.floor(seconds % 60);


  return (
    minutes +
    ":" +
    String(
      remainingSeconds
    ).padStart(2, "0")
  );

}


/* =========================================
              PLAY / PAUSE
========================================= */

async function togglePlayback() {

  if (liveMusic.paused) {

    try {

      await liveMusic.play();

      playButton.textContent =
        "❚❚";

      playButton.setAttribute(
        "aria-label",
        "一時停止"
      );

      isPlaying = true;

    } catch (error) {

      console.error(
        "音楽を再生できませんでした。",
        error
      );

    }

  } else {

    liveMusic.pause();

    playButton.textContent =
      "▶";

    playButton.setAttribute(
      "aria-label",
      "再生"
    );

    isPlaying = false;

  }

}


playButton.addEventListener(
  "click",
  togglePlayback
);


/* =========================================
             SKIP BUTTONS
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


forwardButton.addEventListener(
  "click",
  () => {

    liveMusic.currentTime =
      Math.min(
        liveMusic.duration || 0,
        liveMusic.currentTime + 10
      );

  }
);


/* =========================================
             METADATA
========================================= */

liveMusic.addEventListener(
  "loadedmetadata",
  () => {

    durationDisplay.textContent =
      formatTime(
        liveMusic.duration
      );

  }
);


/* =========================================
             PROGRESS UPDATE
========================================= */

liveMusic.addEventListener(
  "timeupdate",
  () => {

    currentTimeDisplay.textContent =
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

progressTrack.addEventListener(
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
      progressTrack
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
             SONG ENDED
========================================= */

liveMusic.addEventListener(
  "ended",
  () => {

    playButton.textContent =
      "▶";

    playButton.setAttribute(
      "aria-label",
      "再生"
    );

    isPlaying = false;


    progressFill.style.width =
      "0%";


    currentTimeDisplay.textContent =
      "0:00";


    liveMusic.currentTime = 0;

  }
);