// VARIABLES
// Selects audio container element
const audioContainer = document.getElementById("audio-container");
// Selects drop zone element
const dropZone = document.getElementById("main-container");

let offsetX = 0;
let offsetY = 0;

let draggedImg = undefined;

// FUNCTIONS
/**
 * When something is dropped in drop zone, update audioContainer style accordingly
 * @param {Event} event stores information on current drop event
 */
function onDrop(event) {
    draggedImg.style.left = event.clientX - offsetX + "px";
    draggedImg.style.top = event.clientY - offsetY + "px";
}

/**
 * Prevent the event default to allow dropping to happen
 * @param {Event} event stoes information on the current drag over element
 */
function onDragOver(event) {
    event.preventDefault();
}

/**
 * Store audioContainer as the event target and compute initial offsetX and offsetY
 * @param {Event} event stores information related to the current drag start event
 */
function onDragStart(event) {
    draggedImg = event.target;

    const style = window.getComputedStyle(draggedImg, null);

    offsetX = event.clientX - parseInt(style.left);
    offsetY = event.clientY - parseInt(style.top);
}


// LINK EVENTS TO OBJECTS
dropZone.ondrop = onDrop;
dropZone.ondragover = onDragOver;

audioContainer.ondragstart = onDragStart;
audioContainer.ondragover = onDragOver;
audioContainer.ondrop = onDrop;

