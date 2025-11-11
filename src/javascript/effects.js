// effects.js — SQUARE. CLEAN. DEADLY. FLAWLESS.
let stylesInjected = false;

const injectGlobalStyles = () => {
    if (stylesInjected) return;
    document.head.insertAdjacentHTML("beforeend", `
        <style id="cream-core-fx">
            @keyframes portalPulse   { 0%,100% { box-shadow: 0 0 70px var(--color-primary), inset 0 0 60px #1a0003; }
                                      50%   { box-shadow: 0 0 130px var(--color-primary), inset 0 0 90px var(--color-primary-alpha); } }
            @keyframes coreGlow      { 0%,100% { opacity: 0.5; } 50% { opacity: 0.85; } }
            @keyframes ringSpin      { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
            @keyframes ringSpinRev   { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
            @keyframes scanlines     { from { transform: translateY(-100%); } to { transform: translateY(100%); } }
            .glitch-text::before { color: var(--color-primary);  clip-path: polygon(0 0, 100% 0, 100% 48%, 0 48%); animation: g1 0.6s infinite; }
            .glitch-text::after  { color: #ffffffff;               clip-path: polygon(0 52%, 100% 52%, 100% 100%, 0 100%); animation: g2 0.5s infinite; }
            @keyframes g1 { 0%,100% { transform: translate(-3px,-2px); } 50% { transform: translate(4px,3px); } }
            @keyframes g2 { 0%,100% { transform: translate(4px,2px); }   50% { transform: translate(-5px,-4px); } }
        </style>
    `);
    stylesInjected = true;
};

// ——————— RESTORE GLOBAL GLITCH STYLES (CRITICAL FOR DASHBOARD) ———————
const injectGlitchBaseStyles = () => {
    if (document.getElementById("cream-glitch-base")) return;
    document.head.insertAdjacentHTML("beforeend", `
        <style id="cream-glitch-base">
            @keyframes glitch1 { 0%,100% { transform: translate(-4px,-3px); } 50% { transform: translate(5px,4px); } }
            @keyframes glitch2 { 0%,100% { transform: translate(5px,3px); } 50% { transform: translate(-6px,-4px); } }
            @keyframes flicker { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }

            .glitch-text {
                position: relative;
                display: inline-block;
            }
            .glitch-text::before,
            .glitch-text::after {
                content: attr(data-glitch);
                position: absolute;
                left: 0; top: 0;
                width: 100%; height: 100%;
                opacity: 0.9;
            }
            .glitch-text::before {
                color: #150d8aff;
                clip-path: polygon(0 0, 100% 0, 100% 48%, 0 48%);
                animation: glitch1 10.05s infinite;
            }
            .glitch-text::after {
                color: #000000ff;
                clip-path: polygon(0 52%, 100% 52%, 100% 100%, 0 100%);
                animation: glitch2 10.45s infinite;
            }
        </style>
    `);
};

// ——————— PORTAL CONFIG — TINY. PERFECT. YOURS. ———————
export const PORTAL_CONFIG = {
    colorPrimary: "#CA2422",
    size: "460px",           // Perfect square
    borderRadius: "44px",    // Soft but strong
    borderWidth: "5px",
    hoverLift: "-28px",
    hoverScale: "1.06",
    rings: [                 // Only 4 rings = silky smooth on any device
        { dur: "10s", op: 0.6 },
        { dur: "16s", op: 0.4, rev: true },
        { dur: "24s", op: 0.25 },
        { dur: "36s", op: 0.15, rev: true }
    ]
};

// ——————— ULTRA-OPTIMIZED SQUARE PORTAL — NO LAG ———————
const generatePortalCSS = () => {
    // LIVE THEME — NO FALLBACK. NO MERCY.
    const t = window.CURRENT_THEME || {
        primary: "#CA2422",
        text: "#ffd7d7"
    };

    const rings = PORTAL_CONFIG.rings.map((r, i) =>
        `.r${i + 1}{animation:ringSpin${r.rev ? 'Rev' : ''} ${r.dur} linear infinite;opacity:${r.op}}`
    ).join('');

    return `
        .entry-portal{
            cursor:pointer;
            width:${PORTAL_CONFIG.size};height:${PORTAL_CONFIG.size};
            position:relative;
            border:${PORTAL_CONFIG.borderWidth} solid ${t.primary};
            border-radius:${PORTAL_CONFIG.borderRadius};
            background:radial-gradient(circle at 50% 50%,${t.primary}20 0%,#0a0000 100%);
            box-shadow:0 0 80px ${t.primary}cc, inset 0 0 70px ${t.primary}40;
            overflow:hidden;
            animation:portalPulse 7s infinite ease-in-out;
            transition:transform .7s cubic-bezier(.2,.8,.2,1.2),box-shadow .7s;
            backdrop-filter:blur(2px);
        }
        .entry-portal:hover{
            transform:translateY(${PORTAL_CONFIG.hoverLift}) scale(${PORTAL_CONFIG.hoverScale});
            box-shadow:0 0 140px ${t.primary}, 0 0 260px ${t.primary}bb;
        }
        .entry-portal:active{
            transform:translateY(calc(${PORTAL_CONFIG.hoverLift}/2)) scale(1.04);
        }
        .core-glow{
            position:absolute;inset:-80%;
            background:radial-gradient(circle,${t.primary} 0%,transparent 70%);
            animation:coreGlow 4s infinite;
            filter:blur(40px);
            opacity:0.8;
        }
        .core-ring{
            position:absolute;inset:20px;
            border:3px solid ${t.primary}88;
            border-radius:50%;
        }
        ${rings}
        .portal-text{
            position:absolute;bottom:70px;left:50%;transform:translateX(-50%);
            text-align:center;color:${t.text};font-weight:900;
            text-shadow:0 0 40px ${t.primary}, 0 0 80px ${t.primary};
            z-index:10;letter-spacing:2px;
        }
        .line-0{font-size:40x;margin-bottom:8px;}
        .line-1,
        .line-2{font-size:46px;letter-spacing:6px;}
        .line-3{font-size:20px;margin-top:20px;opacity:0.9;}
        .line-4{font-size:20px;margin-top:20px;opacity:0.9;}
        .scanlines{
            position:absolute;inset:0;
            background:repeating-linear-gradient(0deg,transparent,transparent 4px,${t.primary}10 4px,${t.primary}10 8px);
            animation:scanlines 10s linear infinite;
            mix-blend-mode:overlay;pointer-events:none;opacity:0.3;
        }
    `.replace(/\s+/g, ' ').trim();
};

const generatePortalHTML = () => {
    const rings = PORTAL_CONFIG.rings.map((_, i) => `<div class="core-ring r${i + 1}"></div>`).join('');
    return `
        <div class="entry-portal" id="clickMeButton">
            <div class="core-glow"></div>
            ${rings}
            <div class="portal-text">
            <div class="line-0">૮ ˶ᵔ ᵕ ᵔ˶ ა"</div>
            <div class="line-1">ִֶAlexander</div>
                <div class="line-2">Leijen's</div>
                <div class="line-3">Website</div>
                <div class="line-4">Press to enter! Ი︵𐑼</div>
            </div>
            <div class="scanlines"></div>
        </div>
    `;
};

export const activatePortalVoid = (container) => {
    if (!container) return;
    injectGlobalStyles();
    injectGlitchBaseStyles();
    if (!document.getElementById("alex-entry-portal")) {
        document.head.appendChild(Object.assign(document.createElement("style"), {
            id: "alex-entry-portal",
            textContent: generatePortalCSS()
        }));
    }
    container.innerHTML = generatePortalHTML();
    document.getElementById("clickMeButton")?.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("enterPortal"));
    });
};

// Make generatePortalCSS globally accessible for theme updates
window.generatePortalCSS = generatePortalCSS;

// ——————— REST OF YOUR EFFECTS (unchanged) ———————
export function evilGlitchEffect(/* ... */) { /* keep your existing code */ }
export function evilGlitchEffect2(/* ... */) { /* keep your existing code */ }
export const GLITCH = (t) => `<span class="glitch-text" data-glitch="${t}">${t}</span>`;
export const awakenCream = (el) => { /* keep your existing code */ };
