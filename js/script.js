// Create the audio player object
const audioPlayer = new Audio();

// Select play pause button element
const playPauseButton = document.getElementById("play-button");

// Select progress slider
const progressSlider = document.getElementById("progress-slider");

// Selects volume slider
const volumeSlider = document.getElementById("volume-slider");

// audioPlayer.src is the first song of the audio player by default
audioPlayer.src = "assets/sound/Angeleyes.mp3";

// Stores if audio is playing
let playing = false;

/**
 * If audio player is playing -> do not play sound
 * If audio player is not playing -> play sound
 */
function onPlayPauseClick() {
    if (playing) {
        audioPlayer.pause();
        playPauseButton.innerHTML = "play";
        playing = false;
    } else {
        audioPlayer.play();
        playPauseButton.innerHTML = "pause";
        playing = true;
    }
}

/**
 * 
 */
function onLoadedMetadata() {
    progressSlider.max = audioPlayer.duration;
}

/**
 * Moves progress slider to current time of song
 */
function onTimeUpdate() {
    progressSlider.value = audioPlayer.currentTime;
}

/**
 * When slider reaches end, reset button and slider
 */
function onEnd() {
    progressSlider.value = 0;
    playPauseButton.innerHTML = "play";
    playing = false;
}

/**
 * take value of volume slider and update audioPlayer.volume
 */
function onVolumeSliderChange() {
    audioPlayer.volume = volumeSlider.value * 0.01;
}


// Link all events to relevant objects
playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;
volumeSlider.onchange = onVolumeSliderChange;