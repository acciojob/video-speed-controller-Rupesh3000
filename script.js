const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggle = player.querySelector(".toggle");
const volume = player.querySelector(".volume");
const speed = player.querySelector(".playbackSpeed");
const skipButtons = player.querySelectorAll("[data-skip]");
const progress = player.querySelector(".progress");
const progressFilled = player.querySelector(".progress__filled");

// Toggle Play / Pause
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

// Update Play / Pause button icon
function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// Volume control
function handleVolume() {
  video.volume = this.value;
}

// Speed control
function handleSpeed() {
  video.playbackRate = this.value;
}

// Skip
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Progress bar update
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

// Scrub progress
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
toggle.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

volume.addEventListener("input", handleVolume);
speed.addEventListener("input", handleSpeed);

skipButtons.forEach((button) => button.addEventListener("click", skip));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
