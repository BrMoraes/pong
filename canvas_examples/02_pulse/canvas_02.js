var canvas = document.getElementById('canvas'); // gets canvas element
var context = canvas.getContext('2d'); // gets canvas' context
const centerX = 400; // horizontal center
const centerY = 300; // vertical center
var radius = 50; // circle radius
var change = 1; // change in radius

function drawCircle(x, y, r) { // draws circle centered on x, y with r radius
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.stroke();
}

function clear() { // clears the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
}

setInterval(update, 20);  // refresh the canvas every 20ms (50 fps)

function update() { // clears and redraw the canvas
    clear();
    if (radius <= 50) {
        change = 1
    }
    if (radius >= 100) {
        change = -1
    }
    radius += change;
    drawCircle(centerX, centerY, radius);
}