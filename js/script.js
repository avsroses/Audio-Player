// Create the audio player object
const audioPlayer = new Audio();

// Select play pause button element
const playPauseButton = document.getElementById("play-button");

// audioPlayer.src is the first song of the audio player by default
audioPlayer.src = "assets/sound/Angeleyes.mp3";

/**
 * If audio player is not playing -> play sound
 * If audio player is playing -> do not play sound
 */
function onPlayPauseClick() {
    audioPlayer.play();
}

// Link onclick event to the onPlayPauseClick button
playButton.onclick = onPlayPauseClick;