import { evilGlitchEffect, evilGlitchEffect2, GLITCH } from "./effects.js";
import THEME from "./globals.js";

const createBackButton = (text, onClick, position = "left") => {
    const btn = document.createElement("div");
    btn.innerHTML = text;
    btn.style.cssText = `
        position:fixed;top:50px;${position === "right" ? "right:50px;" : "left:50px;"}z-index:9999;
        color:var(--theme-primary);font-size:18px;font-weight:bold;cursor:pointer;
        padding:14px 28px;background:rgba(202,36,34,0.25);
        border:2px solid var(--theme-primary);border-radius:16px;
        backdrop-filter:blur(12px);text-shadow:0 0 30px var(--theme-primary);
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

export const returnToMainDashboard = () => {
    const mainBox = document.getElementById("mainBox");
    if (!mainBox) return;
    document.querySelectorAll("div[style*='position:fixed'][style*='z-index:9999']").forEach(el => el.remove());
    mainBox.style.transition = "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
    mainBox.style.transform = "scale(0.94) rotate(1deg)";
    mainBox.style.opacity = "0";
    setTimeout(() => window.rebuildMainDashboard?.(), 800);
};

export const returnToReality = () => {
    const mainBox = document.getElementById("mainBox");
    if (mainBox) {
        mainBox.style.transition = "all 1.8s cubic-bezier(0.16, 1, 0.3, 1)";
        mainBox.style.transform = "scale(0.1) rotate(666deg)";
        mainBox.style.opacity = "0";
    }
    setTimeout(() => location.reload(), 1800);
};

export const enterFullPortfolio = () => {
    const mainBox = document.getElementById("mainBox");
    if (!mainBox) return;
    const trigger = document.getElementById("glitchme");
    if (trigger) {
        evilGlitchEffect(trigger, 16);
        evilGlitchEffect2(trigger);
        trigger.textContent = "CREAM IS ETERNAL CROSS";
        trigger.style.fontSize = "52px";
        trigger.style.textShadow = "0 0 100px var(--theme-primary)";
    }
    setTimeout(() => {
        mainBox.style.transition = "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)";
        mainBox.style.transform = "scale(0.92) rotate(-1deg)";
        mainBox.style.opacity = "0";
        setTimeout(() => {
            Object.assign(mainBox.style, {
                width: "calc(100vw - 80px)", height: "calc(100vh - 80px)",
                maxWidth: THEME.maxWidth, maxHeight: THEME.maxHeight,
                margin: THEME.margin, padding: THEME.padding,
                borderRadius: THEME.borderRadius,
                border: `${THEME.borderWidth} solid var(--theme-primary)`,
                background: "var(--theme-bg-gradient)",
                outline: `8px solid var(--theme-primary-alpha)`,
                boxShadow: "0 20px 100px var(--theme-primary-glow), inset 0 0 80px rgba(202,36,34,0.1)",
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

    const addProject = (title = "", imageSrc = "", contentHtml = "", link = "#") => {
        const card = document.createElement("div");
        card.style.cssText = `
            background:var(--theme-primary-soft);
            border-radius:${THEME.cardRadius};
            padding:32px;
            backdrop-filter:blur(12px);
            border:${THEME.cardBorderWidth} solid var(--theme-primary-border);
            box-shadow:${THEME.cardShadow};
            transition:all .5s;
            position:relative;
            cursor:pointer;
            overflow:hidden;
        `;

        // Entire card click
        card.onclick = () => window.open(link, "_blank");

        card.onmouseenter = () => {
            card.style.transform = "translateY(var(--theme-hover-lift))";
            card.style.borderColor = "var(--theme-primary)";
            card.style.boxShadow = THEME.hoverShadow;
            if (overlay) overlay.style.opacity = "1";
        };
        card.onmouseleave = () => {
            card.style.transform = "";
            card.style.borderColor = "var(--theme-primary-border)";
            card.style.boxShadow = THEME.cardShadow;
            if (overlay) overlay.style.opacity = "0";
        };

        // Hover overlay
        const overlay = document.createElement("div");
        overlay.textContent = "View Project";
        overlay.style.cssText = `
            position:absolute;
            top:0; left:0; width:100%; height:100%;
            display:flex; align-items:center; justify-content:center;
            background:rgba(202,36,34,0.7);
            color:#fff; font-size:24px; font-weight:bold;
            text-shadow:0 0 20px #000;
            opacity:0; transition:opacity 0.3s;
            pointer-events:none;
            border-radius:${THEME.cardRadius};
        `;
        card.appendChild(overlay);

        if (title) {
            const h2 = document.createElement("h2");
            h2.innerHTML = GLITCH(title);
            h2.style.cssText = `margin:0 0 20px;font-size:28px;color:var(--theme-primary);font-weight:800;text-shadow:0 0 40px var(--theme-primary);letter-spacing:2px;`;
            card.appendChild(h2);
        }

        if (imageSrc) {
            const imgContainer = document.createElement("div");
            imgContainer.style.cssText = `
                position:relative;width:100%;height:200px;overflow:hidden;border-radius:12px;
                margin-bottom:24px;box-shadow:0 4px 20px rgba(0,0,0,0.2);
            `;
            const img = document.createElement("img");
            img.src = imageSrc;
            img.alt = title || "Project image";
            img.style.cssText = "width:100%;height:100%;object-fit:cover;transition:transform 0.5s; border:3px solid var(--theme-primary); box-shadow:0 15px 40px rgba(202,36,34,0.6);";
            imgContainer.appendChild(img);
            card.appendChild(imgContainer);

            // Hover zoom
            card.onmouseenter = () => {
                img.style.transform = "scale(1.1)";
                card.style.transform = "translateY(var(--theme-hover-lift))";
                card.style.borderColor = "var(--theme-primary)";
                card.style.boxShadow = THEME.hoverShadow;
                overlay.style.opacity = "1";
            };
            card.onmouseleave = () => {
                img.style.transform = "";
                card.style.transform = "";
                card.style.borderColor = "var(--theme-primary-border)";
                card.style.boxShadow = THEME.cardShadow;
                overlay.style.opacity = "0";
            };
        }

        const content = document.createElement("div");
        content.innerHTML = contentHtml;
        content.style.cssText = "color:var(--theme-text);line-height:1.8;font-size:17px;";
        card.appendChild(content);

        grid.appendChild(card);
    };

    addProject(
        "Bunbit Game Engine",
        "img/projects/bunbit_game_engine.png",
        `<p>This very site. A living, breathing digital demon built with nothing but vanilla JS, CSS sorcery, and pure devotion.</p>
         <p style="margin-top:16px;color:var(--theme-text-muted);font-size:15px;">Vanilla JS • Web Workers • CSS Hell • Love</p>`,
        "https://github.com/alexljn5/bunbit_project"
    );

    addProject(
        "Emerald Utilities",
        "img/projects/emerald_utilities.png",
        `<p>A fully functional terminal-based OS running entirely in the browser.</p>
         <p style="color:var(--theme-text-muted);font-size:15px;">Three.js • WebGL • WebAssembly</p>`,
        "https://github.com/alexljn5/emerald-utilities"
    );

    addProject(
        "Tickit Team Project",
        "img/projects/tickit_team_project.png",
        `<p>An infinite red gradient generator that slowly corrupts your soul.</p>
         <p style="color:var(--theme-text-muted);font-size:15px;">Canvas • requestAnimationFrame</p>`,
        "https://github.com/alexljn5/croissant_project"
    );

    addProject(
        "Tools4Ever",
        "img/projects/tools4ever_project.png",
        `<p style="font-style:italic;opacity:.8">More demons are being summoned...</p>
         <p style="margin-top:20px;font-size:60px;text-align:center;"></p>`,
        "https://github.com/alexljn5/alexljn5s-fullstack-project"
    );

    createBackButton("Return to Overview", returnToMainDashboard, "left");
    createBackButton("Return to Reality", returnToReality, "right");
};
