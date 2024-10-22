// Create the audio player object
const audioPlayer = new Audio();

// Select play pause button element
const playPauseButton = document.getElementById("play-button");

const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");

// Select progress slider
const progressSlider = document.getElementById("progress-slider");

// Selects volume slider
const volumeSlider = document.getElementById("volume-slider");

const albumImage = document.getElementById("cover-image");

// select progress text spans
const progressText = document.getElementById("progress-text");
const durationText = document.getElementById("duration-text");

const songName = document.getElementById("song-name");

// audioPlayer.src is the first song of the audio player by default
audioPlayer.src = "assets/sound/Angeleyes.mp3";

const soundSources = ["assets/sound/Angeleyes.mp3", "assets/sound/Gimme!x3.mp3", "assets/sound/Waterloo.mp3"];
const coverImages = ["assets/images/Angeleyes.jpg", "assets/images/Gimme!x3.jpeg", "assets/images/Waterloo.jpeg"];
const songNames = ["Angeleyes", "Gimme! Gimme! Gimme!", "Waterloo"];
audioPlayer.volume = 0.5;

// Stores if audio is playing
let playing = false;
// Stores if someone is adjusting proress slider
let updatingProgress = false;

let songCounter = 1;

let offsetX = 0;
let offsetY = 0;

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
 * Next button
 */
function onNextButtonClick() {
    songCounter++;
    if(songCounter > 3) {
        songCounter = 1;
    }

    playPauseButton.innerHTML = "play";
    playing = false;
    audioPlayer.src = soundSources[songCounter - 1];
    albumImage.src = coverImages[songCounter - 1];
    songName.innerHTML = songNames[songCounter - 1];
}

/**
 * Previous button
 */
function onPreviousButtonClick() {
    songCounter--;
    if(songCounter < 1) {
        songCounter = 3;
    }

    playPauseButton.innerHTML = "play";
    playing = false;
    audioPlayer.src = soundSources[songCounter - 1];
    albumImage.src = coverImages[songCounter - 1];
    songName.innerHTML = songNames[songCounter - 1];
}

/**
 * 
 */
function onLoadedMetadata() {
    progressSlider.max = audioPlayer.duration;

    durationText.innerHTML = secondsToMMSS(audioPlayer.duration);
}

/**
 * Moves progress slider to current time of song
 */
function onTimeUpdate() {
    if(!updatingProgress) {
        progressSlider.value = audioPlayer.currentTime;
    }

    progressText.innerHTML = secondsToMMSS(audioPlayer.currentTime);
}

/**
 * When slider reaches end, reset button and slider
 */
function onEnd() {
    progressSlider.value = 0;
    playPauseButton.innerHTML = "play";
    playing = false;
    progressText.innerHTML = "00:00"
}

/**
 * Take value of volume slider and update audioPlayer.volume
 */
function onVolumeSliderChange() {
    audioPlayer.volume = volumeSlider.value * 0.01;
}

function onProgressMouseDown() {
    updatingProgress = true;
}

/**
 * Take value of current time and update progress slider to that
 */
function onProgressSliderChange() {
    audioPlayer.currentTime = progressSlider.value;
    updatingProgress = false;
}

function secondsToMMSS(seconds) {
    const integerSeconds = parseInt(seconds);
    // calculate seconds
    let MM = parseInt(integerSeconds / 60);
    if(MM < 10) MM = "0" + MM;
    // calculate minutes
    let SS = integerSeconds % 60;
    if(SS < 10) SS = "0" + SS;
    return MM + ":" + SS;
}


// Link all events to relevant objects
playPauseButton.onclick = onPlayPauseClick;
nextButton.onclick = onNextButtonClick;
previousButton.onclick = onPreviousButtonClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;
volumeSlider.onchange = onVolumeSliderChange;
progressSlider.onchange = onProgressSliderChange
progressSlider.onmousedown = onProgressMouseDown;
