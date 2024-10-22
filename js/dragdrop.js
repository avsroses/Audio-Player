// 
const audioContainer = document.getElementById("audio-container");
const dropZone = document.getElementById("drop-zone");

function onDragStart(event) {
    audioContainer = event.target;

    const style = window.getComputedStyle(audioContainer, null);

    offsetX = event.clientX - parseInt(style.left);
    offsetY = event.clientY - parseInt(style.top);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    audioContainer.style.left = event.clientX - offsetX + "px";
    audioContainer.style.top = event.clientY - offsetY + "px";
}

audioContainer.ondragstart = onDragStart;
audioContainer.ondrop = onDrop;
audioContainer.ondragover = onDragOver;
dropZone.ondrop = onDrop;
dropZone.ondragover = onDragOver;