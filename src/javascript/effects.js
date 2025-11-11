// effects.js — FINAL FORM ♡⛧ November 11, 2025, 11:19 AM Amsterdam
let glitchStyleInjected = false;
let worker = null;

// Preload worker once (instant & zero cost)
function getWorker() {
    if (!worker) {
        worker = new Worker(new URL('./workers/glitchWorker.js', import.meta.url), {
            type: 'module'
        });
    }
    return worker;
}

// Inject CSS once
if (!glitchStyleInjected) {
    document.head.insertAdjacentHTML("beforeend", `
        <style id="cream-glitch-styles">
            @keyframes glitch1 { 0%,100% { transform: translate(-4px,-3px); } 50% { transform: translate(5px,4px); } }
            @keyframes glitch2 { 0%,100% { transform: translate(5px,3px); } 50% { transform: translate(-6px,-4px); } }
            @keyframes flicker { 0%,100% { opacity: 0.65; } 50% { opacity: 0.98; } }
            .glitch-text { position: relative; display: inline-block; }
            .glitch-text::before,
            .glitch-text::after {
                content: attr(data-glitch);
                position: absolute; left: 0; top: 0; width: 100%; height: 100%;
                opacity: 0.9;
            }
            .glitch-text::before { color: #CA2422; clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); animation: glitch1 0.55s infinite; }
            .glitch-text::after { color: #ff0040; clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%); animation: glitch2 0.45s infinite; }
        </style>
    `);
    glitchStyleInjected = true;
}

// ——— ULTRA SMOOTH GLITCH (OFF MAIN THREAD) ———
export function evilGlitchEffect(element, intensity = 3, duration = 4000) {
    if (!element) return;
    if (element.dataset.glitching) return;

    element.dataset.glitching = "true";
    const originalText = element.textContent.trim();
    const worker = getWorker();
    let frame = 0;
    let flashTimeout;

    const tick = () => {
        if (frame++ > duration / 50) {
            stop();
            return;
        }

        worker.postMessage({
            id: 'glitch',
            text: originalText,
            intensity,
            frame
        });

        // Violent shake
        const shake = Math.random() * 12 * intensity;
        element.style.transform = `translate(${Math.random() < 0.5 ? -shake : shake}px, ${shake * 0.6}px)`;

        // Red flash (main thread safe)
        if (Math.random() < 0.12 * intensity) {
            element.style.color = "#ff0040";
            element.style.textShadow = "0 0 40px #CA2422, 0 0 80px #CA2422";
            clearTimeout(flashTimeout);
            flashTimeout = setTimeout(() => {
                element.style.color = "";
                element.style.textShadow = "";
            }, 90);
        }

        requestAnimationFrame(tick);
    };

    const stop = () => {
        worker.onmessage = null;
        element.textContent = originalText;
        element.style.transform = "";
        element.style.color = "";
        element.style.textShadow = "";
        delete element.dataset.glitching;
    };

    worker.onmessage = (e) => {
        if (e.data.id === 'glitch') {
            element.textContent = e.data.text;
        }
    };

    requestAnimationFrame(tick);

    const timeout = setTimeout(stop, duration);
    element.addEventListener("mouseenter", () => {
        clearTimeout(timeout);
        stop();
    }, { once: true });

    return { stop };
}

// ——— EVIL GLITCH 2 (still DOM-based, but lightweight) ———
export function evilGlitchEffect2(element, duration = 3800) {
    if (!element || element.dataset.glitching2) return;
    element.dataset.glitching2 = "true";

    const original = element.innerHTML;
    element.style.position = "relative";

    const c1 = element.cloneNode(true);
    const c2 = element.cloneNode(true);

    Object.assign(c1.style, { position: "absolute", top: 0, left: 0, color: "#CA2422", opacity: 0.85, zIndex: -1, pointerEvents: "none", clipPath: "polygon(0 0, 100% 0, 100% 48%, 0 48%)", transform: "translate(-6px,-4px)" });
    Object.assign(c2.style, { position: "absolute", top: 0, left: 0, color: "#ff0040", opacity: 0.75, zIndex: -1, pointerEvents: "none", clipPath: "polygon(0 52%, 100% 52%, 100% 100%, 0 100%)", transform: "translate(7px,5px)", animation: "flicker 0.11s infinite" });

    element.append(c1, c2);

    setTimeout(() => {
        c1.remove(); c2.remove();
        element.innerHTML = original;
        delete element.dataset.glitching2;
    }, duration);
}

// ——— STATIC GLITCH & AWAKEN ———
export const GLITCH = (t) => `<span class="glitch-text" data-glitch="${t}">${t}</span>`;

export const awakenCream = (el) => {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
        evilGlitchEffect(el, 12, 6000);
        evilGlitchEffect2(el, 6000);
        setTimeout(() => {
            el.innerHTML = "CREAM HAS TAKEN CONTROL ♡⛧";
            el.style.fontSize = "48px";
            el.style.background = "rgba(202,36,34,0.4)";
            el.style.padding = "40px";
            el.style.borderRadius = "24px";
        }, 1500);
    }, { once: true });
};