var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
const width = 800;
const height = 600;
var change = 1;

class Ball {
    constructor(color) {
        this.color = color;
        this.radius = Math.abs(this.generateRandomInt(20, 60));
        this.x = Math.abs(this.generateRandomInt(this.radius, width - this.radius));
        this.y = Math.abs(this.generateRandomInt(this.radius, height - this.radius));
        this.speedX = this.generateRandomInt(5, 10);
        this.speedY = this.generateRandomInt(5, 10);
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    move() {
        this.draw();
        if (this.x + this.radius >= 800 || this.x - this.radius <= 0) {
            this.speedX *= -1;
        }
        if (this.y + this.radius >= 600 || this.y - this.radius <= 0) {
            this.speedY *= -1;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }

    generateRandomInt(min, max) {
        let bool = Math.random() < 0.5;
        let signal = bool ? 1 : -1;
        return (Math.floor(Math.random() * (max - min + 1)) + min) * signal;
    }
}

const red = new Ball("red")
const green = new Ball("green")
const blue = new Ball("blue")

function clear() { // clears the canvas
    context.fillStyle = 'rgba(255, 255, 255, 0.3)';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

setInterval(update, 20);  // refresh the canvas every 20ms (50 fps)

function update() { // clears and redraw the canvas
    clear();
    red.move();
    green.move();
    blue.move();
}