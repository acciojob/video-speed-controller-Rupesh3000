const player = document.querySelector(".wrapper");
const video = player.querySelector("video");

// create controls dynamically (instead of default inputs)
const controls = document.createElement("div");
controls.classList.add("controls");
controls.innerHTML = `
    <button class="player__button toggle">►</button>
    <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
    <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
    <button data-skip="-10">« 10s</button>
    <button data-skip="25">25s »</button>
    <div class="progress">
      <div class="progress__filled"></div>
    </div>
  `;
player.appendChild(controls);

const toggle = controls.querySelector(".toggle");
const progress = controls.querySelector(".progress");
const progressBar = controls.querySelector(".progress__filled");
const skipButtons = controls.querySelectorAll("[data-skip]");
const ranges = controls.querySelectorAll(".player__slider");

// toggle play/pause
function togglePlay() {
  video[video.paused ? "play" : "pause"]();
}

function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("input", handleRangeUpdate));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
