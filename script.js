const cards = document.querySelectorAll(".card");
const buttons = document.querySelectorAll("button");

let current = 0;
let animating = false;

const EXIT_DURATION = 3800;

buttons.forEach(button => {

  button.addEventListener("click", () => {

    if (animating) return;
    if (current >= cards.length - 1) return;

    animating = true;

    const currentCard = cards[current];
    currentCard.classList.add("exit");

    setTimeout(() => {

      currentCard.classList.remove("active", "exit");

      current++;

      cards[current].classList.add("active");

      animating = false;

    }, EXIT_DURATION);

  });

});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}

resize();
window.addEventListener("resize", resize);

const particles = [];
const COUNT = 140;

class Particle {

    constructor() {
        this.reset(true);
    }

    reset(first = false) {

        this.x = Math.random() * window.innerWidth;

        this.y = first
            ? Math.random() * window.innerHeight
            : window.innerHeight + Math.random() * 50;

        this.size = Math.random() * 2 + 0.6;

        this.speedY = 0.15 + Math.random() * 0.35;
        this.speedX = (Math.random() - 0.5) * 0.15;

        this.alpha = Math.random() * 0.7 + 0.1;

        this.twinkle = Math.random() * Math.PI * 2;

        this.glow = 6 + Math.random() * 10;
    }

    update() {

        this.x += this.speedX;
        this.y -= this.speedY;

        this.twinkle += 0.02;

        if (
            this.y < -20 ||
            this.x < -20 ||
            this.x > window.innerWidth + 20
        ) {
            this.reset();
        }
    }

    draw() {

        const a = this.alpha + Math.sin(this.twinkle) * 0.25;

        ctx.beginPath();

        ctx.fillStyle = `rgba(255,255,255,${a})`;

        ctx.shadowBlur = this.glow;
        ctx.shadowColor = "white";

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.shadowBlur = 0;
    }

}

for (let i = 0; i < COUNT; i++) {
    particles.push(new Particle());
}

function animate() {

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

animate();
