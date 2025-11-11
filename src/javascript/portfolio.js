// portfolio.js — THE FINAL, PERFECT, ETERNAL VERSION
// Alexander Leijen @alexljn5 — Amsterdam, November 11, 2025 — 02:45 PM CET

import { evilGlitchEffect, evilGlitchEffect2, GLITCH } from "./effects.js";

// ——————— REUSABLE BACK BUTTON ———————
const createBackButton = (text, onClick, position = "left") => {
    const btn = document.createElement("div");
    btn.innerHTML = text;
    btn.style.cssText = `
        position:fixed; top:50px; ${position === "right" ? "right:50px;" : "left:50px;"} z-index:9999;
        color:#CA2422; font-size:18px; font-weight:bold; cursor:pointer;
        padding:14px 28px; background:rgba(202,36,34,0.25);
        border:2px solid #CA2422; border-radius:16px;
        backdrop-filter:blur(12px); text-shadow:0 0 30px #CA2422;
        transition:all 0.4s ease;
    `;
    btn.onmouseenter = () => {
        btn.style.background = "rgba(202,36,34,0.5)";
        btn.style.transform = "translateY(-4px)";
    };
    btn.onmouseleave = () => {
        btn.style.background = "rgba(202,36,34,0.25)";
        btn.style.transform = "";
    };
    btn.onclick = () => {
        evilGlitchEffect(btn, 8);
        setTimeout(onClick, 400);
    };
    document.body.appendChild(btn);
};

// ——————— RETURN TO MAIN DASHBOARD — WORKS 100% ———————
export const returnToMainDashboard = () => {
    const mainBox = document.getElementById("mainBox");
    if (!mainBox) return;

    // Remove old back buttons
    document.querySelectorAll("div[style*='position:fixed'][style*='z-index:9999']").forEach(el => el.remove());

    mainBox.style.transition = "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
    mainBox.style.transform = "scale(0.94) rotate(1deg)";
    mainBox.style.opacity = "0";

    setTimeout(() => {
        // This function exists globally because boxtransformer.js runs on load
        if (typeof window.rebuildMainDashboard === "function") {
            window.rebuildMainDashboard();
        }
    }, 800);
};

// ——————— RETURN TO REALITY ———————
export const returnToReality = () => {
    const mainBox = document.getElementById("mainBox");
    if (mainBox) {
        mainBox.style.transition = "all 1.8s cubic-bezier(0.16, 1, 0.3, 1)";
        mainBox.style.transform = "scale(0.1) rotate(666deg)";
        mainBox.style.opacity = "0";
    }
    setTimeout(() => window.location.reload(), 1800);
};

// ——————— ENTER PORTFOLIO ———————
export const enterFullPortfolio = () => {
    const mainBox = document.getElementById("mainBox");
    if (!mainBox) return;

    const trigger = document.getElementById("glitchme");
    if (trigger) {
        evilGlitchEffect(trigger, 16);
        evilGlitchEffect2(trigger);
        trigger.textContent = "CREAM IS ETERNAL CROSS";
        trigger.style.fontSize = "52px";
        trigger.style.textShadow = "0 0 100px #CA2422";
    }

    setTimeout(() => {
        mainBox.style.transition = "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)";
        mainBox.style.transform = "scale(0.92) rotate(-1deg)";
        mainBox.style.opacity = "0";

        setTimeout(() => {
            Object.assign(mainBox.style, {
                width: "calc(100vw - 80px)", height: "calc(100vh - 80px)",
                maxWidth: "1600px", maxHeight: "900px",
                margin: "40px", padding: "40px",
                borderRadius: "28px", border: "4px solid #CA2422",
                background: "linear-gradient(135deg, #1a0003 0%, #2a0005 30%, #150002 100%)",
                outline: "8px solid rgba(202, 36, 34, 0.15)",
                boxShadow: "0 20px 100px rgba(202, 36, 34, 0.8), inset 0 0 80px rgba(202, 36, 34, 0.1)",
                animation: "pulseGlow 6s infinite alternate",
                transform: "", opacity: "1"
            });

            mainBox.innerHTML = "";
            buildPortfolioDashboard(mainBox);
        }, 900);
    }, 1000);
};

const buildPortfolioDashboard = (container) => {
    const grid = document.createElement("div");
    grid.style.cssText = `display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:32px;width:100%;height:100%;padding:20px;box-sizing:border-box;overflow-y:auto;`;
    container.appendChild(grid);

    const addProject = (title = "", contentHtml = "") => {
        const card = document.createElement("div");
        card.style.cssText = `background:rgba(202,36,34,0.08);border-radius:24px;padding:32px;backdrop-filter:blur(12px);border:2px solid rgba(202,36,34,0.3);box-shadow:0 15px 50px rgba(202,36,34,0.25);transition:all .5s;position:relative;`;
        card.onmouseenter = () => { card.style.transform = "translateY(-16px)"; card.style.borderColor = "#CA2422"; card.style.boxShadow = "0 25px 80px rgba(202,36,34,0.5)"; };
        card.onmouseleave = () => { card.style.transform = ""; card.style.borderColor = "rgba(202,36,34,0.3)"; card.style.boxShadow = "0 15px 50px rgba(202,36,34,0.25)"; };

        if (title) {
            const h2 = document.createElement("h2");
            h2.innerHTML = GLITCH(title);
            h2.style.cssText = "margin:0 0 20px;font-size:28px;color:#CA2422;font-weight:800;text-shadow:0 0 40px rgba(202,36,34,0.8);letter-spacing:2px;";
            card.appendChild(h2);
        }
        const content = document.createElement("div");
        content.innerHTML = contentHtml;
        content.style.cssText = "color:#ffd7d7;line-height:1.8;font-size:17px;";
        card.appendChild(content);
        grid.appendChild(card);
    };

    addProject("Cream Portal v9", `<p>This very site. A living, breathing digital demon built with nothing but vanilla JS, CSS sorcery, and pure devotion.</p><p style="margin-top:16px;color:#ff6b6b;font-size:15px;">Vanilla JS • Web Workers • CSS Hell • Love</p><a href="https://github.com/alexljn5/portfolio" target="_blank" style="position:absolute;bottom:24px;right:28px;color:#CA2422;font-weight:bold;text-decoration:none;text-shadow:0 0 20px #CA2422;">View Source CROSS</a>`);
    addProject("VoidOS", `<p>A fully functional terminal-based OS running entirely in the browser.</p><p style="color:#ff6b6b;font-size:15px;">Three.js • WebGL • WebAssembly</p><a href="https://voidos.alexljn5.dev" target="_blank" style="position:absolute;bottom:24px;right:28px;color:#CA2422;font-weight:bold;text-decoration:none;text-shadow:0 0 20px #CA2422;">Launch CROSS</a>`);
    addProject("Eternal Red", `<p>An infinite red gradient generator that slowly corrupts your soul.</p><p style="color:#ff6b6b;font-size:15px;">Canvas • requestAnimationFrame</p>`);
    addProject("Coming Soon...", `<p style="font-style:italic;opacity:.8">More demons are being summoned...</p><p style="margin-top:20px;font-size:60px;text-align:center;">${GLITCH("CROSS")}</p>`);

    createBackButton("Return to Overview", returnToMainDashboard, "left");
    createBackButton("Return to Reality", returnToReality, "right");
};