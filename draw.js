document.addEventListener("DOMContentLoaded", function() {
    let number = Math.floor((Math.random() * 10));
    document.getElementById("computer-prediction").innerHTML = 'Computer Prediction: ' +  number;
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let drawing = false;

// Set the drawing color to black
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;

function startDrawing(e) {
    drawing = true;
    draw(e); // start drawing immediately when mouse is clicked
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // reset the drawing path
}

function draw(e) {
    if (!drawing) return;

    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Event listeners for mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

