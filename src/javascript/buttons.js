// buttons.js — THE SEXIEST ENTRY POINT ON EARTH ♡⛧
// Alexander Leijen @alexljn5 — Amsterdam, November 11, 2025

import { GLITCH } from "./effects.js";

const buttonHTML = `
    <div class="entry-portal" id="clickMeButton">
        <div class="portal-core">
            <div class="core-glow"></div>
            <div class="core-ring ring-1"></div>
            <div class="core-ring ring-2"></div>
            <div class="core-ring ring-3"></div>
            
            <div class="portal-text">
                <div class="line-1">${GLITCH("ALEXANDER LEIJEN")}</div>
                <div class="line-2">Web Developer • Amsterdam</div>
                <div class="line-3 glitch-pulse">CLICK TO ENTER THE VOID</div>
            </div>
            
            <div class="scanlines"></div>
            <div class="particles"></div>
        </div>
    </div>
`;

const buttonCSS = `
<style id="alex-entry-portal">
    .entry-portal {
        cursor: pointer;
        width: 420px;
        height: 580px;
        position: relative;
        border: 4px solid #CA2422;
        border-radius: 32px;
        background: radial-gradient(circle at 50% 50%, #1a0003 0%, #0a0000 100%);
        box-shadow: 
            0 0 80px rgba(202,36,34,0.8),
            inset 0 0 60px rgba(202,36,34,0.3);
        overflow: hidden;
        transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        animation: portalBreathing 8s infinite alternate;
    }
    .entry-portal:hover {
        transform: translateY(-20px) scale(1.05);
        box-shadow: 
            0 0 140px #CA2422,
            0 0 200px rgba(202,36,34,0.6),
            inset 0 0 100px rgba(202,36,34,0.4);
    }
    .entry-portal:active {
        transform: translateY(-10px) scale(1.02);
    }

    .portal-core {
        position: absolute;
        inset: 20px;
        border: 2px solid #CA2422;
        border-radius: 24px;
        overflow: hidden;
    }

    .core-glow {
        position: absolute;
        inset: -50%;
        background: radial-gradient(circle, #CA2422 0%, transparent 70%);
        animation: corePulse 4s infinite;
        opacity: 0.6;
    }

    .core-ring {
        position: absolute;
        inset: 0;
        border: 2px solid #CA2422;
        border-radius: 50%;
        animation: spin 12s linear infinite;
    }
    .ring-1 { animation-duration: 8s; opacity: 0.3; }
    .ring-2 { animation-duration: 16s; opacity: 0.2; }
    .ring-3 { animation-duration: 24s; opacity: 0.1; }

    .portal-text {
        position: absolute;
        bottom: 60px;
        left: 0; right: 0;
        text-align: center;
        color: #ffd7d7;
        z-index: 10;
    }
    .line-1 { font-size: 36px; font-weight: 900; letter-spacing: 4px; margin-bottom: 12px; }
    .line-2 { font-size: 18px; opacity: 0.9; margin-bottom: 20px; }
    .line-3 { 
        font-size: 22px; 
        font-weight: bold;
        background: linear-gradient(90deg, #CA2422, #ff0040, #CA2422);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: textFlicker 3s infinite;
    }

    .scanlines {
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(202,36,34,0.03) 2px,
            rgba(202,36,34,0.03) 4px
        );
        pointer-events: none;
        animation: scan 8s linear infinite;
    }

    .particles {
        position: absolute;
        inset: 0;
        background-image: 
            radial-gradient(2px 2px at 20px 30px, #CA2422, transparent),
            radial-gradient(2px 2px at 40px 70px, #ff0040, transparent),
            radial-gradient(1px 1px at 90px 40px, #CA2422, transparent);
        background-repeat: repeat;
        background-size: 100px 100px;
        animation: particles 20s linear infinite;
        opacity: 0.4;
    }

    @keyframes portalBreathing {
        0%, 100% { box-shadow: 0 0 80px rgba(202,36,34,0.8), inset 0 0 60px rgba(202,36,34,0.3); }
        50% { box-shadow: 0 0 120px #CA2422, inset 0 0 100px rgba(202,36,34,0.4); }
    }
    @keyframes corePulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes textFlicker { 0%,100% { opacity: 1; } 50% { opacity: 0.7; } }
    @keyframes scan { from { transform: translateY(-100%); } to { transform: translateY(100%); } }
    @keyframes particles { from { background-position: 0 0; } to { background-position: 100px 100px; } }
</style>
`;

// Inject everything on load
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".click-me-effect") || document.getElementById("mainBox");
    if (!container) return;

    // Inject CSS once
    if (!document.getElementById("alex-entry-portal")) {
        document.head.insertAdjacentHTML("beforeend", buttonCSS);
    }

    // Replace the old button
    container.innerHTML = buttonHTML;

    // Make it clickable
    document.getElementById("clickMeButton")?.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("enterPortal"));
    });
});