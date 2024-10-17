// Create the audio player object
const audioPlayer = new Audio();

// Select play pause button element
const playPauseButton = document.getElementById("play-button");

// Select progress slider
const progressSlider = document.getElementById("progress-slider");

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
 * 
 */
function onTimeUpdate() {
    progressSlider.value = audioPlayer.currentTime;
}


// Link all events to relevant objects
playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;