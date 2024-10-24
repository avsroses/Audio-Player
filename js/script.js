// *********
// VARIABLES
// *********
// Create the audio player object
const audioPlayer = new Audio();

// Select play pause button element
const playPauseButton = document.getElementById("play-button");

// Selects previous and next buttons
const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");

// Selects auto play and loop buttons
const autoPlayButton = document.getElementById("auto-play");
const loopButton = document.getElementById("loop");

// Select progress slider
const progressSlider = document.getElementById("progress-slider");

// Selects volume slider
const volumeSlider = document.getElementById("volume-slider");

// Selects cover image
const albumImage = document.getElementById("cover-image");

// select progress text spans
const progressText = document.getElementById("progress-text");
const durationText = document.getElementById("duration-text");

const songName = document.getElementById("song-name");

// audioPlayer.src is the first song of the audio player by default
audioPlayer.src = "assets/sound/Angeleyes.mp3";

// All information about songs
const songsInfo = [
    // First song - element at songsInfo[0]
    {
        audioSource: "assets/sound/Angeleyes.mp3",
        title: "Angeleyes",
        imageSource: "assets/images/Angeleyes.jpg",
    },
    // Second song - element at songsInfo[1]
    {
        audioSource: "assets/sound/Does Your Mother Know.mp3",
        title: "Does Your Mother Know",
        imageSource: "assets/images/Does Your Mother Know.jpg",
    },
    // Third song - element at songsInfo[2]
    {
        audioSource: "assets/sound/Gimme!x3.mp3",
        title: "Gimme! Gimme! Gimme!",
        imageSource: "assets/images/Gimme!x3.jpeg",
    },
    // Fourth song - element at songsInfo[3]
    {
        audioSource: "assets/images/Gimme!x3.jpeg",
        title: "Voules-Vous",
        imageSource: "assets/images/Voulez-Vous.jpg",
    },
    // Fifth Song - element at songsInfo[4]
    {
        audioSource: "assets/sound/Waterloo.mp3",
        title: "Waterloo",
        imageSource: "assets/images/Waterloo.jpeg",
    },
]

// Sets volume of audio player to be half as slider starts in middle
audioPlayer.volume = 0.5;

// Stores if audio is playing
let playing = false;
// Stores if someone is adjusting proress slider
let updatingProgress = false;
// Stores whether any of the sliders are changing
let sliderIsChanging = false;
// Initialises variables that are changed throughout
let songCounter = 1;

let onLoop = false;
let onAutoPlay = false;

let btnPressed = 0;
let loopBtnPressed = 0;

// ***************
// EVENT LISTENERS
// ***************
// Change button color to show it's selected for both onLoop and onAutoPlay
autoPlayButton.addEventListener('click', function onclick(event) {
    btnPressed++;
    if (btnPressed % 2 == 0) {
        autoPlayButton.style.backgroundColor = '#F9B97F';
        autoPlayButton.style.color = 'white';
    } else {
        autoPlayButton.style.backgroundColor = '#FFE4A1';
        autoPlayButton.style.color = '#567B81';
    }
})

loopButton.addEventListener('click', function onclick(event) {
    loopBtnPressed++;
    if (loopBtnPressed % 2 == 0) {
        loopButton.style.backgroundColor = '#F9B97F';
        loopButton.style.color = 'white';
    } else {
        loopButton.style.backgroundColor = '#FFE4A1';
        loopButton.style.color = '#567B81';
    }
})

// *********
// FUNCTIONS
// *********
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
 * Moves the song to the next one in the audio player
 */
function onNextButtonClick() {
    songCounter++;
    if (songCounter > 5) {
        songCounter = 1;
    }

    audioPlayer.src = songsInfo[songCounter - 1].audioSource;
    albumImage.src = songsInfo[songCounter - 1].imageSource;
    songName.innerHTML = songsInfo[songCounter - 1].title;

    // Either auto plays when song is changed or stops
    if (onLoop) {
        playing = false;
        onPlayPauseClick();
    } else {
        playPauseButton.innerHTML = "play";
        playing = false;
    }
}

/**
 * Previous button
 * Goes back to the previous song in the audio player
 */
function onPreviousButtonClick() {
    songCounter--;
    if (songCounter < 1) {
        songCounter = 5;
    }

    audioPlayer.src = songsInfo[songCounter - 1].audioSource;
    albumImage.src = songsInfo[songCounter - 1].imageSource;
    songName.innerHTML = songsInfo[songCounter - 1].title;
    // Either auto plays when song is changd or stops
    if (onLoop) {
        playing = false;
        onPlayPauseClick();
    } else {
        playPauseButton.innerHTML = "play";
        playing = false;
    }
}

// Allows onAutoPlay to be pressed multiple times
function onAutoPlayClick() {
    if (onAutoPlay) {
        onAutoPlay = false;
    } else {
        onAutoPlay = true;
    }
}
// Allows onLoop button to be pressed multiple times
function onLoopClick() {
    if (onLoop) {
        onLoop = false;
    } else {
        onLoop = true;
    }
}

/**
 * Progress slider max is length of current song 
 * Duration text matches length of current song
 */
function onLoadedMetadata() {
    progressSlider.max = audioPlayer.duration;

    durationText.innerHTML = secondsToMMSS(audioPlayer.duration);
}

/**
 * Moves progress slider to current time of song
 */
function onTimeUpdate() {
    if (!updatingProgress) {
        progressSlider.value = audioPlayer.currentTime;
    }
    progressText.innerHTML = secondsToMMSS(audioPlayer.currentTime);
}

/**
 * When slider reaches end, reset button and slider
 * Or auto play the next song if on loop
 */
function onEnd() {
    // Either auto plays when song is up or resets
    if (onAutoPlay) {
        // Makes sure it moves onto a value that is actually a song
        songCounter++;
        if (songCounter > 5) {
            songCounter = 1;
        }
        // All arrays are accessing correct song
        audioPlayer.src = songsInfo[songCounter - 1].audioSource;
        albumImage.src = songsInfo[songCounter - 1].imageSource;
        songName.innerHTML = songsInfo[songCounter - 1].title;
        // Calls play pause function and makes song start playing
        playing = false;
        onPlayPauseClick();
    } else {
        progressSlider.value = 0;
        playPauseButton.innerHTML = "play";
        playing = false;
        progressText.innerHTML = "00:00"
    }
}

/**
 * Take value of volume slider and update audioPlayer.volume
 */
function onVolumeSliderChange() {
    audioPlayer.volume = volumeSlider.value * 0.01;
    sliderIsChanging = false;
}

function onVolumeMouseDown() {
    sliderIsChanging = true;
}

/**
 * When mouse is on screen, update variable to show 
 */
function onProgressMouseDown() {
    updatingProgress = true;
    sliderIsChanging = true;
}

/**
 * Take value of current time and update progress slider to that
 */
function onProgressSliderChange() {
    audioPlayer.currentTime = progressSlider.value;
    updatingProgress = false;
    sliderIsChanging = false;
}

/**
 * Calculates the amount of minutes and seconds from a value of seconds
 * @param {seconds} seconds 
 * @returns minutes : seconds
 */
function secondsToMMSS(seconds) {
    const integerSeconds = parseInt(seconds);
    // calculate seconds
    let MM = parseInt(integerSeconds / 60);
    if (MM < 10) MM = "0" + MM;
    // calculate minutes
    let SS = integerSeconds % 60;
    if (SS < 10) SS = "0" + SS;
    return MM + ":" + SS;
}

// ***********************************
// Link all events to relevant objects
// ***********************************
playPauseButton.onclick = onPlayPauseClick;
nextButton.onclick = onNextButtonClick;
previousButton.onclick = onPreviousButtonClick;
autoPlayButton.onclick = onAutoPlayClick;
loopButton.onclick = onLoopClick;

audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;

volumeSlider.onchange = onVolumeSliderChange;
volumeSlider.onmousedown = onVolumeMouseDown;
progressSlider.onchange = onProgressSliderChange
progressSlider.onmousedown = onProgressMouseDown;
