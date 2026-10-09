gsap.registerPlugin(Observer);

const cards = Array.from(document.querySelectorAll('.menu-card'));
let Currentchoice = 1;
let isAnimating = false;

function Cards(targetChoice) {
    targetChoice = Math.max(0, Math.min(cards.length - 1, targetChoice));
    Currentchoice = targetChoice;
    isAnimating = true;

    cards.forEach((card, index) => {
        const offset = index - Currentchoice;
        const yOffset = offset * 110;
        const xOffset = Math.abs(offset) * 45;
        const scale = offset === 0 ? 1 : 0.72;
        const opacity = offset === 0 ? 1 : 0.32;
        const color = offset === 0 ? "#000000" : "#6c757d";

        gsap.to(card, {
            y: yOffset,
            x: xOffset,
            scale: scale,
            opacity: opacity,
            color: color,
            duration: 0.55,
            ease: "power3.out",
            overwrite: "auto",
            onComplete: () => {
                isAnimating = false;
            }
        });
    });
}

Cards(Currentchoice);

Observer.create({
    target: window,
    type: "wheel,touch,pointer",
    wheelSpeed: -1,
    tolerance: 15,
    preventDefault: true,
    onUp: () => {
        if (!isAnimating && Currentchoice > 0) {
            Cards(Currentchoice - 1);
        }
    },
    onDown: () => {
        if (!isAnimating && Currentchoice < cards.length - 1) {
            Cards(Currentchoice + 1);
        }
    }
});

cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (Currentchoice === index) {
            const mode = card.dataset.mode;
            gsap.to(card, { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => launchhGame(mode) });
        } else {
            Cards(index);
        }
    });
});


function launchhGame(mode){
    window.location.href = `game.html?mode=${mode}`;
}

