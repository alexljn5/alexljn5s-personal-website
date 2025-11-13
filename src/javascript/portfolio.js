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
            // RESPONSIVE FULLSCREEN FIX
            Object.assign(mainBox.style, {
                width: "100vw",
                height: "100vh",
                maxWidth: "none",
                maxHeight: "none",
                margin: "0",
                padding: "16px",
                borderRadius: "0",
                border: "none",
                background: "var(--theme-bg-gradient)",
                boxShadow: "0 0 80px var(--theme-primary-glow)",
                animation: "pulseGlow 6s infinite alternate",
                transform: "",
                opacity: "1",
                overflow: "hidden",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999
            });
            mainBox.innerHTML = "";
            buildPortfolioDashboard(mainBox);
        }, 900);
    }, 1000);
};

// Toggle image zoom
window.toggleImageZoom = (img) => {
    const existingOverlay = document.getElementById("imageZoomOverlay");
    if (existingOverlay) {
        existingOverlay.style.opacity = "0";
        setTimeout(() => existingOverlay.remove(), 400);
        return;
    }
    const overlay = document.createElement("div");
    overlay.id = "imageZoomOverlay";
    overlay.style.cssText = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        background:rgba(0,0,0,0.8);backdrop-filter:blur(8px);
        z-index:9998;display:flex;align-items:center;justify-content:center;
        opacity:0;transition:opacity 0.4s ease;
    `;
    document.body.appendChild(overlay);
    const clonedImg = img.cloneNode();
    clonedImg.style.cssText = `
        max-width:90%;max-height:90%;object-fit:contain;
        border:3px solid var(--theme-primary);
        box-shadow:0 0 100px rgba(202,36,34,0.8);
        border-radius:12px;transform:scale(0.8);transition:transform 0.4s ease;
        cursor:zoom-out;
    `;
    overlay.appendChild(clonedImg);
    setTimeout(() => {
        overlay.style.opacity = "1";
        clonedImg.style.transform = "scale(1)";
    }, 10);
    const closeZoom = () => {
        clonedImg.style.transform = "scale(0.8)";
        overlay.style.opacity = "0";
        setTimeout(() => overlay.remove(), 400);
    };
    overlay.addEventListener("click", closeZoom);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeZoom();
    }, { once: true });
};

const buildPortfolioDashboard = (container) => {
    const grid = document.createElement("div");
    grid.style.cssText = `
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
    gap:24px;
    width:100%;
    height:100%;
    padding:16px;
    padding-top:100px; /* SPACE FOR TOP BUTTONS */
    box-sizing:border-box;
    overflow-y:auto;
`;
    container.appendChild(grid);

    const addProject = (title = "", imageSrc = "", contentHtml = "", link = "#") => {
        const card = document.createElement("div");
        card.style.cssText = `
            background:var(--theme-primary-soft);
            border-radius:${THEME.cardRadius};
            padding:24px;
            backdrop-filter:blur(12px);
            border:${THEME.cardBorderWidth} solid var(--theme-primary-border);
            box-shadow:${THEME.cardShadow};
            transition:all .5s;
            position:relative;
            overflow:hidden;
        `;
        card.onmouseenter = () => {
            card.style.transform = "translateY(var(--theme-hover-lift))";
            card.style.borderColor = "var(--theme-primary)";
            card.style.boxShadow = THEME.hoverShadow;
        };
        card.onmouseleave = () => {
            card.style.transform = "";
            card.style.borderColor = "var(--theme-primary-border)";
            card.style.boxShadow = THEME.cardShadow;
        };

        if (title) {
            const h2 = document.createElement("h2");
            h2.innerHTML = title;
            h2.style.cssText = `
                margin:0 0 20px;
                font-size:28px;
                color:var(--theme-primary);
                font-weight:800;
                text-shadow:0 0 40px var(--theme-primary);
                letter-spacing:2px;
            `;
            card.appendChild(h2);
        }

        if (imageSrc) {
            const imgContainer = document.createElement("div");
            imgContainer.style.cssText = `
                position:relative;width:100%;height:180px;overflow:hidden;border-radius:12px;
                margin-bottom:20px;box-shadow:0 4px 20px rgba(0,0,0,0.2);
            `;
            const img = document.createElement("img");
            img.src = imageSrc;
            img.alt = title || "Project image";
            img.style.cssText = `
                width:100%;height:100%;object-fit:cover;transition:transform 0.5s;
                border:3px solid var(--theme-primary);
                box-shadow:0 15px 40px rgba(202,36,34,0.6);
                cursor:pointer;
            `;
            img.addEventListener("click", (e) => {
                e.stopPropagation();
                window.toggleImageZoom(img);
            });
            imgContainer.appendChild(img);
            card.appendChild(imgContainer);
            card.addEventListener("mouseenter", () => (img.style.transform = "scale(1.1)"));
            card.addEventListener("mouseleave", () => (img.style.transform = ""));
        }

        const content = document.createElement("div");
        content.innerHTML = contentHtml;
        content.style.cssText = "color:var(--theme-text);line-height:1.8;font-size:16px;margin-bottom:12px;";
        card.appendChild(content);

        const linkEl = document.createElement("a");
        linkEl.href = link;
        linkEl.textContent = "View on GitHub";
        linkEl.target = "_blank";
        linkEl.style.cssText = `
            color:var(--theme-primary);
            font-weight:bold;
            text-decoration:none;
            transition:color 0.3s;
        `;
        linkEl.onmouseenter = () => (linkEl.style.color = "#ff4444");
        linkEl.onmouseleave = () => (linkEl.style.color = "var(--theme-primary)");
        card.appendChild(linkEl);

        grid.appendChild(card);
    };

    // PROJECTS
    addProject(
        "Bunbit Game Engine",
        "img/projects/bunbit_game_engine.png",
        `<p>Game engine created with vanilla JavaScript and a little bit of Node.js.</p>
         <p style="margin-top:16px;color:var(--theme-text-muted);font-size:15px;">Vanilla JS • Web Workers • CSS • WebGL</p>`,
        "https://github.com/alexljn5/bunbit_project"
    );
    addProject(
        "Emerald Utilities",
        "img/projects/emerald_utilities.png",
        `<p>A small auto script running tool.</p>
         <p style="color:var(--theme-text-muted);font-size:15px;">Vanilla JS • NodeJS</p>`,
        "https://github.com/alexljn5/emerald-utilities"
    );
    addProject(
        "Tickit Team Project",
        "img/projects/tickit_team_project.png",
        `<p>Team project for school, a student and teacher ticket management system.</p>
         <p style="color:var(--theme-text-muted);font-size:15px;">Canvas • requestAnimationFrame</p>`,
        "https://github.com/alexljn5/croissant_project"
    );
    addProject(
        "Tools4Ever",
        "img/projects/tools4ever_project.png",
        `<p>Fullstack project for school — a simple product dashboard where you can add, remove, view orders, and order new products.</p>
         <p style="color:var(--theme-text-muted);font-size:15px;">JavaScript • MySQL • CSS</p>`,
        "https://github.com/alexljn5/alexljn5s-fullstack-project"
    );

    createBackButton("Return to Overview", returnToMainDashboard, "left");
    createBackButton("Return to Reality", returnToReality, "right");
};