import { evilGlitchEffect, evilGlitchEffect2, GLITCH } from "./effects.js";
import THEME from "./globals.js";

document.addEventListener("DOMContentLoaded", () => {
    const mainBox = document.getElementById("mainBox");
    const body = document.body;

    // ——————— 1. DEFINE addComponent FIRST ———————
    const addComponent = (title = "", contentHtml = "", customStyle = "") => {
        const card = document.createElement("div");
        card.style.cssText = `
            background: var(--theme-primary-soft);
            border-radius: ${THEME.cardRadius};
            padding: 32px;
            backdrop-filter: blur(12px);
            border: ${THEME.cardBorderWidth} solid var(--theme-primary-border);
            box-shadow: ${THEME.cardShadow};
            transition: all .5s;
            position: relative;
            ${customStyle}
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
            h2.textContent = title;
            h2.style.cssText = `
                margin: 0 0 20px;
                font-size: 24px;
                color: var(--theme-primary);
                font-weight: 800;
                text-shadow: 0 0 30px rgba(202,36,34,0.6);
                letter-spacing: 1px;
            `;
            card.appendChild(h2);
        }

        const content = document.createElement("div");
        content.innerHTML = contentHtml;
        content.style.cssText = "color: var(--theme-text); line-height: 1.8; font-size: 17px;";
        card.appendChild(content);

        return card;
    };

    // ——————— 2. DEFINE triggerExpansion ———————
    const triggerExpansion = () => {
        // Reset body
        body.innerHTML = "";
        body.appendChild(mainBox);
        Object.assign(body.style, {
            margin: "0", padding: "0",
            backgroundColor: THEME.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
            minHeight: "100vh", overflow: "hidden"
        });

        // Initial small box
        Object.assign(mainBox.style, {
            width: "400px", height: "400px",
            transition: "all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)",
            opacity: "1"
        });
        mainBox.offsetHeight; // Force reflow

        // Expand to full dashboard
        Object.assign(mainBox.style, {
            width: "calc(100vw - 80px)",
            height: "calc(100vh - 80px)",
            maxWidth: THEME.maxWidth,
            maxHeight: THEME.maxHeight,
            margin: THEME.margin,
            padding: THEME.padding,
            borderRadius: THEME.borderRadius,
            border: `${THEME.borderWidth} solid var(--theme-primary)`,
            background: "var(--theme-bg-gradient)",
            outline: `8px solid var(--theme-primary-alpha)`,
            boxShadow: "0 20px 100px var(--theme-primary-glow), inset 0 0 80px rgba(202,36,34,0.1)",
            animation: "pulseGlow 6s infinite alternate",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden"
        });

        mainBox.innerHTML = "";
        const dashboard = document.createElement("div");
        dashboard.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 32px;
            width: 100%;
            height: 100%;
            padding: 20px;
            box-sizing: border-box;
            overflow-y: auto;
        `;
        mainBox.appendChild(dashboard);

        // ——————— 3. ADD ALL CARDS ———————
        // Card 1: Image with lazy load
        const imageCard = addComponent("", `
            <div class="image-container" style="position:relative;width:100%;max-width:420px;margin:0 auto;">
                <div class="image-placeholder" style="
                    width:100%; height:0; padding-bottom:100%;
                    background: linear-gradient(135deg, #1a0003, #2a0005);
                    border-radius: 20px;
                    border: 3px solid var(--theme-primary);
                    box-shadow: 0 15px 40px rgba(202,36,34,0.6);
                    position: relative;
                    overflow: hidden;
                ">
                    <div style="
                        position: absolute; inset: 0;
                        background: radial-gradient(circle at 30% 30%, var(--theme-primary-alpha), transparent);
                        animation: pulseGlow 3s infinite alternate;
                        opacity: 0.3;
                    "></div>
                    <div style="
                        position: absolute; top: 50%; left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 32px; opacity: 0.6;
                    ">Loading...</div>
                </div>
                <img data-src="img/alexljn5/alex_1.png" class="lazy-image" alt="Alexander Leijen"
                     style="display:none; width:100%; border-radius:20px; border:3px solid var(--theme-primary); box-shadow:0 15px 40px rgba(202,36,34,0.6);">
            </div>
            <div style="margin-top:32px; text-align:center; font-size:18px;">
                <a href="https://www.linkedin.com/in/alexander-leijen/" target="_blank"
                   style="color:var(--theme-primary); text-decoration:none; margin:0 16px; text-shadow:0 0 20px var(--theme-primary);">LinkedIn</a> •
                <a href="https://github.com/alexljn5" target="_blank"
                   style="color:var(--theme-primary); text-decoration:none; margin:0 16px; text-shadow:0 0 20px var(--theme-primary);">GitHub</a>
            </div>
            <p style="margin-top:28px; font-size:16px; opacity:0.9; text-align:center;">
                Almere • Available for internship • 2025
            </p>
        `);
        dashboard.appendChild(imageCard);

        // Card 2: Who am I?
        const aboutCard = addComponent("Who am I?", `
            <p style="text-align:center; font-size:22px; margin-bottom:24px;">
                My name is <strong style="color:var(--theme-primary);">Alexander Leijen</strong>.<br>
                I am 24 years old and currently studying <strong>Software Development</strong><br>
                at ROC van Flevoland, specializing in <strong>Web Development</strong>.
            </p>
            <p>I chose this path because I am deeply passionate about programming and technology.<br>
               I genuinely love coding and learning new technologies every single day.</p>
            <p>I'm strong in <strong>JavaScript, PHP, CSS, and Java</strong>,<br>
               and I excel at problem-solving. Others describe me as curious, kind, and intelligent.</p>
            <p>In my work, I value honesty, calm, and the ability to deliver high-quality results.<br>
               My greatest strengths are my <strong>perseverance</strong> and <strong>dedication</strong>.</p>
            <p style="text-align:center; margin-top:28px; font-size:19px;">
                I dream of a peaceful workplace where I can keep growing my ICT skills.<br>
                During my internship, I want to evolve as a developer<br>
                and apply everything I’ve learned — in the real world.
            </p>
            <p style="text-align:right; margin-top:32px; font-style:italic; color:var(--theme-text-muted);">
                — Alexander Leijen · ${GLITCH("˚ʚ♡ɞ˚")}
            </p>
        `);
        dashboard.appendChild(aboutCard);

        // Card 3: Enter the rabbit hole
        const portalCard = addComponent("Enter the rabbit hole", `
            <div style="text-align:center; font-size:60px; margin:40px 0;">${GLITCH("˚ʚ♡ɞ˚")}</div>
            <p id="glitchme" style="
                font-size:28px; text-align:center; cursor:pointer;
                padding:36px 40px; background:rgba(202,36,34,0.25);
                border-radius:22px; transition:all 0.5s cubic-bezier(0.2,0.8,0.2,1);
                position:relative; overflow:hidden; backdrop-filter:blur(10px);
                border:2px solid transparent; box-shadow:0 8px 32px rgba(0,0,0,0.3);
            ">
                View my full portfolio ${GLITCH("˚ʚ♡ɞ˚")}
            </p>
        `, `
            min-height:240px; display:flex; flex-direction:column;
            justify-content:center; align-items:center; padding:40px 32px !important; gap:24px;
        `);
        dashboard.appendChild(portalCard);

        // ——————— 4. PRELOAD IMAGE (after DOM exists) ———————
        const preloadImage = (src) => new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });

        const imageContainer = dashboard.querySelector('.image-container');
        const lazyImg = imageContainer?.querySelector('.lazy-image');
        const placeholder = imageContainer?.querySelector('.image-placeholder');

        if (lazyImg && placeholder && lazyImg.dataset.src) {
            const imgSrc = lazyImg.dataset.src;

            preloadImage(imgSrc)
                .then(() => {
                    // THIS IS THE MISSING LINE:
                    lazyImg.src = imgSrc;  // NOW THE DOM IMAGE LOADS!

                    lazyImg.style.display = 'block';
                    lazyImg.style.opacity = '0';
                    placeholder.style.opacity = '0';

                    requestAnimationFrame(() => {
                        lazyImg.style.transition = 'opacity 0.6s ease';
                        lazyImg.style.opacity = '1';
                        setTimeout(() => placeholder.remove(), 600);
                    });
                })
                .catch((err) => {
                    console.error("Image failed to load:", err);
                    placeholder.innerHTML = '<div style="color:var(--theme-text-muted);font-size:16px;">Failed to load</div>';
                });
        }

        // ——————— 5. GLITCH BUTTON ———————
        const glitchBtn = document.getElementById("glitchme");
        if (glitchBtn) {
            glitchBtn.addEventListener("click", function () {
                evilGlitchEffect(this, 12);
                evilGlitchEffect2(this);
                this.style.transform = "scale(1.15)";
                this.style.padding = "48px 56px";
                this.style.fontSize = "36px";
                this.style.letterSpacing = "3px";
                this.style.background = "rgba(202,36,34,0.4)";
                this.style.border = "2px dashed var(--theme-primary)";
                this.style.boxShadow = "0 0 60px var(--theme-primary), inset 0 0 40px rgba(202,36,34,0.3)";
                this.textContent = "ENTERING THE VOID...";
                setTimeout(() => {
                    import("./portfolio.js").then(m => m.enterFullPortfolio());
                }, 1400);
            });
        }
    };

    // ——————— 6. START EXPANSION ———————
    const startExpansion = () => {
        document.removeEventListener("enterPortal", startExpansion);
        triggerExpansion();
    };

    document.addEventListener("enterPortal", startExpansion);
    document.getElementById("clickMeButton")?.addEventListener("click", startExpansion);
    document.addEventListener("keydown", e => (e.key === "Enter" || e.key === " ") && startExpansion());
    window.rebuildMainDashboard = triggerExpansion;
});