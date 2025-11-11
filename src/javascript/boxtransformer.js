// main.js — loaded with type="module"
import { evilGlitchEffect, evilGlitchEffect2, GLITCH } from "./effects.js";

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("clickMeButton");
    const mainBox = document.getElementById("mainBox");
    const body = document.body;

    button.addEventListener("click", () => {
        body.innerHTML = "";
        body.appendChild(mainBox);
        button.remove();

        Object.assign(body.style, {
            margin: "0", padding: "0",
            backgroundColor: "#0a0000",
            display: "flex", alignItems: "center", justifyContent: "center",
            minHeight: "100vh", overflow: "hidden"
        });

        mainBox.style.width = "400px";
        mainBox.style.height = "400px";
        mainBox.style.transition = "all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)";
        mainBox.style.opacity = "1";
        mainBox.offsetHeight;

        Object.assign(mainBox.style, {
            width: "calc(100vw - 80px)",
            height: "calc(100vh - 80px)",
            maxWidth: "1600px", maxHeight: "900px",
            margin: "40px", padding: "40px",
            borderRadius: "28px",
            border: "4px solid #CA2422",
            background: "linear-gradient(135deg, #1a0003 0%, #2a0005 30%, #150002 100%)",
            outline: "8px solid rgba(202, 36, 34, 0.15)",
            boxShadow: "0 20px 100px rgba(202, 36, 34, 0.8), inset 0 0 80px rgba(202, 36, 34, 0.1)",
            animation: "pulseGlow 6s infinite alternate",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden"
        });

        if (!document.getElementById("ca2422-pulse")) {
            const style = document.createElement("style");
            style.id = "ca2422-pulse";
            style.textContent = `
                @keyframes pulseGlow {
                    0%   { box-shadow: 0 20px 100px rgba(202,36,34,0.8), inset 0 0 80px rgba(202,36,34,0.1); }
                    100% { box-shadow: 0 20px 120px rgba(202,36,34,1),   inset 0 0 100px rgba(202,36,34,0.18); }
                }
            `;
            document.head.appendChild(style);
        }

        const dashboard = document.createElement("div");
        dashboard.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 32px;
            width: 100%; height: 100%;
            padding: 20px;
            box-sizing: border-box;
            overflow-y: auto;
        `;
        mainBox.appendChild(dashboard);

        const addComponent = (title = "", contentHtml = "", customStyle = "") => {
            const card = document.createElement("div");
            card.style.cssText = `
                background: rgba(202,36,34,0.08);
                border-radius: 24px;
                padding: 32px;
                backdrop-filter: blur(12px);
                border: 2px solid rgba(202,36,34,0.3);
                box-shadow: 0 15px 50px rgba(202,36,34,0.25);
                transition: all 0.5s ease;
                ${customStyle}
            `;
            card.onmouseenter = () => {
                card.style.transform = "translateY(-16px)";
                card.style.borderColor = "#CA2422";
                card.style.boxShadow = "0 25px 80px rgba(202,36,34,0.5)";
            };
            card.onmouseleave = () => {
                card.style.transform = "translateY(0)";
                card.style.borderColor = "rgba(202,36,34,0.3)";
                card.style.boxShadow = "0 15px 50px rgba(202,36,34,0.25)";
            };

            if (title) {
                const h2 = document.createElement("h2");
                h2.textContent = title;
                h2.style.cssText = "margin:0 0 20px; font-size:24px; color:#CA2422; font-weight:800; text-shadow:0 0 30px rgba(202,36,34,0.6); letter-spacing:1px;";
                card.appendChild(h2);
            }

            const content = document.createElement("div");
            content.innerHTML = contentHtml;
            content.style.color = "#ffd7d7";
            content.style.lineHeight = "1.8";
            content.style.fontSize = "17px";
            card.appendChild(content);
            dashboard.appendChild(card);
            return card;
        };

        // ──────── COMPONENTS ────────

        addComponent("", `
    <img src="img/alexljn5/alex_1.png" style="width:100%; max-width:420px; border-radius:20px; border:3px solid #CA2422; box-shadow:0 15px 40px rgba(202,36,34,0.6);">
    
    <div style="margin-top: 32px; text-align: center; font-size: 18px; line-height: 2;">
        <a href="https://www.linkedin.com/in/alexander-leijen/" target="_blank" style="color:#CA2422; text-decoration:none; margin:0 16px; text-shadow: 0 0 20px #CA2422;">
            LinkedIn
        </a>
        •
        <a href="https://github.com/alexljn5" target="_blank" style="color:#CA2422; text-decoration:none; margin:0 16px; text-shadow: 0 0 20px #CA2422;">
            GitHub
        </a>
        •
    </div>

    <p style="margin-top: 28px; font-size: 16px; opacity: 0.9;">
        Amsterdam • Available for internship • November 2025
    </p>
`);

        addComponent("Who am I?", `
            <p style="text-align:center; font-size:22px; margin-bottom:24px;">
                My name is <strong style="color:#CA2422;">Alexander Leijen</strong>.<br>
                I am 24 years old and currently studying <strong>Software Development</strong><br>
                at ROC van Flevoland, specializing in <strong>Web Development</strong>.
            </p>
            <p>
                I chose this path because I am deeply passionate about programming and technology.<br>
                I genuinely love coding and learning new technologies every single day.
            </p>
            <p>
                I'm strong in <strong>JavaScript, PHP, CSS, and Java</strong>,<br>
                and I excel at problem-solving. Others describe me as curious, kind, and intelligent.
            </p>
            <p>
                In my work, I value honesty, calm, and the ability to deliver high-quality results.<br>
                My greatest strengths are my <strong>perseverance</strong> and <strong>dedication</strong>.
            </p>
            <p style="text-align:center; margin-top:28px; font-size:19px;">
                I dream of a peaceful workplace where I can keep growing my ICT skills.<br>
                During my internship, I want to evolve as a developer<br>
                and apply everything I’ve learned — in the real world.
            </p>
            <p style="text-align:right; margin-top:32px; font-style:italic; color:#ff6b6b;">
                — Alexander Leijen,  ·  ${GLITCH("♡")}
            </p>
        `);

        const rabbitHole = addComponent("Enter the rabbit hole", `
            <div style="text-align:center; font-size:60px; margin:40px 0; opacity:0.9;">
                ${GLITCH("૮ ˶• ༝ •˶ ꒱ა ♡")}
            </div>
            <p id="glitchme" style="font-size:28px; text-align:center; cursor:pointer; padding:32px; background:rgba(202,36,34,0.3); border-radius:18px; transition:all 0.4s;">
                View my portfolio ${GLITCH("♡")}
            </p>
        `);

        document.getElementById("glitchme")?.addEventListener("click", function () {
            evilGlitchEffect(this, 8);
            evilGlitchEffect2(this);
            this.textContent = "I'M ALREADY INSIDE ♡";
            this.style.fontSize = "36px";
            this.style.color = "#CA2422";
            this.style.textShadow = "0 0 60px #CA2422";
        });
    });
});