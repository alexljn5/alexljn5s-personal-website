// glitchEffects.js  
// Made with pure love & chaos by Cream the Rabbit ♡ November 11, 2025, 10:21 AM Amsterdam time

export function evilGlitchEffect(element, intensity = 1) {
    if (!element) return;

    const originalText = element.textContent;
    const glitchChars = "█▓▒░▤▣■◆◊★✦⚡⛤⛧⸸♱#CA2422";

    let glitchInterval;
    let frame = 0;

    const startGlitch = () => {
        glitchInterval = setInterval(() => {
            frame++;
            if (frame % 2 === 0) {
                element.textContent = originalText
                    .split('')
                    .map(char => Math.random() < 0.15 * intensity ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
                    .join('');
            } else {
                element.textContent = originalText;
            }

            // Random red flash
            if (Math.random() < 0.07 * intensity) 37; {
                element.style.color = "#ff0040";
                element.style.textShadow = "0 0 20px #CA2422, 0 0 40px #CA2422";
                setTimeout(() => {
                    element.style.color = "";
                    element.style.textShadow = "";
                }, 80);
            }

            // Horizontal shake
            const shake = Math.random() * 6 * intensity;
            element.style.transform = `translateX(${Math.random() < 0.5 ? -shake : shake}px)`;
        }, 70);
    };

    startGlitch();

    // Stop after 3 seconds or on hover
    const stop = () => {
        clearInterval(glitchInterval);
        element.textContent = originalText;
        element.style.transform = "translateX(0)";
    };

    setTimeout(stop, 3000);
    element.addEventListener("mouseenter", stop);

    return { stop }; // in case you want to control it later
}

export function evilGlitchEffect2(element, duration = 4000) {
    if (!element) return;

    const originalHTML = element.innerHTML;
    let isGlitching = true;

    const glitchFrames = () => {
        if (!isGlitching) return;

        // Duplicate lines with offset & red tint
        const glitchClone1 = element.cloneNode(true);
        const glitchClone2 = element.cloneNode(true);

        glitchClone1.style.position = "absolute";
        glitchClone1.style.left = "0";
        glitchClone1.style.top = "0";
        glitchClone1.style.color = "#CA2422";
        glitchClone1.style.clipPath = "polygon(0 0, 100% 0, 100% 50%, 0 50%)";
        glitchClone1.style.transform = "translateX(-4px) translateY(-2px)";
        glitchClone1.style.opacity = "0.7";
        glitchClone1.style.zIndex = "-1";

        glitchClone2.style.position = "absolute";
        glitchClone2.style.left = "0";
        glitchClone2.style.top = "0";
        glitchClone2.style.color = "#ff0040";
        glitchClone2.style.clipPath = "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)";
        glitchClone2.style.transform = "translateX(6px) translateY(3px)";
        glitchClone2.style.opacity = "0.6";
        glitchClone2.style.zIndex = "-1";
        glitchClone2.style.animation = "flicker 0.1s infinite";

        element.style.position = "relative";
        element.appendChild(glitchClone1);
        element.appendChild(glitchClone2);

        // Super fast flicker animation
        const style = document.createElement("style");
        style.textContent = `
            @keyframes flicker {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 0.9; }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            isGlitching = false;
            if (glitchClone1.parentNode) glitchClone1.remove();
            if (glitchClone2.parentNode) glitchClone2.remove();
            element.innerHTML = originalHTML;
        }, duration);
    };

    // Trigger on hover or call manually
    element.addEventListener("mouseenter", glitchFrames);

    // Or start immediately:
    // glitchFrames();
}

// BONUS: One-liner for use directly in addComponent
export const GLITCH = (text) =>
    `<span class="glitch-text" data-glitch="${text}">${text}</span>`;

// Add this CSS once in your main file or HTML
document.head.insertAdjacentHTML("beforeend", `
    <style>
        .glitch-text {
            position: relative;
            display: inline-block;
        }
        .glitch-text::before,
        .glitch-text::after {
            content: attr(data-glitch);
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0.8;
        }
        .glitch-text::before {
            color: #CA2422;
            clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
            transform: translate(-3px, -2px);
            animation: glitch1 0.5s infinite;
        }
        .glitch-text::after {
            color: #ff0040;
            clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
            transform: translate(4px, 2px);
            animation: glitch2 0.4s infinite;
        }
        @keyframes glitch1 { 0%,100% { transform: translate(-3px,-2px); } 50% { transform: translate(3px,2px); } }
        @keyframes glitch2 { 0%,100% { transform: translate(4px,2px); } 50% { transform: translate(-4px,-2px); } }
    </style>
`);