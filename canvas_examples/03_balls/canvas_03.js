const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

function setSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setSize();

let colors = [
    "#FFFFFF", "#000000",
    "#FF0000", "#00FF00", "#0000FF",
    "#00FFFF", "#FF00FF", "#FFFF00",
    "#80FF00", "#8000FF", "#FF8000", "#0080FF", "#00FF80", "#FF0080"
]

const minRadius = 10;
const maxRadius = 60;
const minSpeed = 3;
const maxSpeed = 10;

class Ball {
    constructor() {
        this.radius = Math.abs(this.generateRandomInt(minRadius, maxRadius));
        this.x = Math.abs(this.generateRandomInt(this.radius, canvas.width - this.radius));
        this.y = Math.abs(this.generateRandomInt(this.radius, canvas.height - this.radius));
        this.speedX = this.generateRandomInt(minSpeed, maxSpeed);
        this.speedY = this.generateRandomInt(minSpeed, maxSpeed);
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
        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
            this.speedX *= -1;
        }
        if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
            this.speedY *= -1;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }

    updateColor(color) {
        this.color = color;
    }

    generateRandomInt(min, max) {
        let bool = Math.random() < 0.5;
        let signal = bool ? 1 : -1;
        return (Math.floor(Math.random() * (max - min + 1)) + min) * signal;
    }
}

const ballArray = [];

for (i = 0; i < 14; i++) {
    ballArray[i] = new Ball();
}

function clear() {
    context.fillStyle = 'rgba(128, 128, 128, 0.3)';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

window.onresize = () => setSize();

let timer = null;
let counter = 0;
const colorFrames = 180;

function update() {
    clear();
    for (i = 0; i < 14; i++) {
        ballArray[i].move();
        ballArray[i].updateColor(colors[i]);
    }
    if (counter > colorFrames) {
        colors = colors.sort(() => Math.random() - 0.5);
        console.log(colors);
    }
    counter = counter > colorFrames ? 0 : counter + 1;

    cancelAnimationFrame(timer);
    timer = window.requestAnimationFrame(() => update());
}

update();