import { evilGlitchEffect, evilGlitchEffect2, GLITCH } from "./effects.js";
import THEME from "./globals.js";

document.addEventListener("DOMContentLoaded", () => {
    const mainBox = document.getElementById("mainBox");
    const body = document.body;

    const triggerExpansion = () => {
        body.innerHTML = "";
        body.appendChild(mainBox);

        Object.assign(body.style, {
            margin: "0", padding: "0",
            backgroundColor: THEME.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
            minHeight: "100vh", overflow: "hidden"
        });

        Object.assign(mainBox.style, {
            width: "400px", height: "400px",
            transition: "all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)",
            opacity: "1"
        });
        mainBox.offsetHeight;

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
        dashboard.style.cssText = `display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:32px;width:100%;height:100%;padding:20px;box-sizing:border-box;overflow-y:auto;`;
        mainBox.appendChild(dashboard);

        const addComponent = (title = "", contentHtml = "", customStyle = "") => {
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
                h2.style.cssText = `margin:0 0 20px;font-size:24px;color:var(--theme-primary);font-weight:800;text-shadow:0 0 30px rgba(202,36,34,0.6);letter-spacing:1px;`;
                card.appendChild(h2);
            }

            const content = document.createElement("div");
            content.innerHTML = contentHtml;
            content.style.cssText = "color:var(--theme-text);line-height:1.8;font-size:17px;";
            card.appendChild(content);
            dashboard.appendChild(card);
            return card;
        };

        addComponent("", `
            <img src="img/alexljn5/alex_1.png" style="width:100%;max-width:420px;border-radius:20px;border:3px solid var(--theme-primary);box-shadow:0 15px 40px rgba(202,36,34,0.6);">
            <div style="margin-top:32px;text-align:center;font-size:18px;">
                <a href="https://www.linkedin.com/in/alexander-leijen/" target="_blank" style="color:var(--theme-primary);text-decoration:none;margin:0 16px;text-shadow:0 0 20px var(--theme-primary);">LinkedIn</a> •
                <a href="https://github.com/alexljn5" target="_blank" style="color:var(--theme-primary);text-decoration:none;margin:0 16px;text-shadow:0 0 20px var(--theme-primary);">GitHub</a>
            </div>
            <p style="margin-top:28px;font-size:16px;opacity:0.9;text-align:center;">Almere • Available for internship • 2025</p>
        `);

        addComponent("Who am I?", `
            <p style="text-align:center;font-size:22px;margin-bottom:24px;">
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
            <p style="text-align:center;margin-top:28px;font-size:19px;">
                I dream of a peaceful workplace where I can keep growing my ICT skills.<br>
                During my internship, I want to evolve as a developer<br>
                and apply everything I’ve learned — in the real world.
            </p>
            <p style="text-align:right;margin-top:32px;font-style:italic;color:var(--theme-text-muted);">
                — Alexander Leijen · ${GLITCH("˚ʚ♡ɞ˚")}
            </p>
        `);

        addComponent("Enter the rabbit hole", `
            <div style="text-align:center;font-size:60px;margin:40px 0;"></div>
            <p id="glitchme" style="font-size:28px;text-align:center;cursor:pointer;padding:32px;background:rgba(202,36,34,0.3);border-radius:18px;transition:all 0.4s;">
                View my full portfolio ${GLITCH("˚ʚ♡ɞ˚")}
            </p>
        `);

        document.getElementById("glitchme")?.addEventListener("click", function () {
            evilGlitchEffect(this, 10);
            evilGlitchEffect2(this);
            this.textContent = "CREAM IS ETERNAL heart cross";
            this.style.fontSize = "42px";
            this.style.color = "var(--theme-primary)";
            this.style.textShadow = "0 0 80px var(--theme-primary)";
            setTimeout(() => import("./portfolio.js").then(m => m.enterFullPortfolio()), 1200);
        });
    };

    const startExpansion = () => {
        document.removeEventListener("enterPortal", startExpansion);
        triggerExpansion();
    };

    document.addEventListener("enterPortal", startExpansion);
    document.getElementById("clickMeButton")?.addEventListener("click", startExpansion);
    document.addEventListener("keydown", e => (e.key === "Enter" || e.key === " ") && startExpansion());

    window.rebuildMainDashboard = triggerExpansion;
});