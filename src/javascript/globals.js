// javascript/globals.js

const THEMES = {
    spookyred: {
        name: "Spooky Red",
        primary: "#CA2422",
        primaryAlpha: "rgba(202,36,34,0.15)",
        primaryGlow: "rgba(202,36,34,0.8)",
        primarySoft: "rgba(202,36,34,0.08)",
        primaryBorder: "rgba(202,36,34,0.3)",
        bg: "#0a0000",
        bgGradient: "linear-gradient(135deg,#1a0003 0%,#2a0005 30%,#150002 100%)",
        text: "#ffd7d7",
        textMuted: "#ff6b6b",
        hoverLift: "-16px",
        font: "'Segoe UI Emoji', 'Apple Color Emoji', system-ui, sans-serif"
    },
    matrix: {
        name: "Digital Rain // Enhanced",
        primary: "#076920ff",
        primaryAlpha: "rgba(0,255,65,0.12)",
        primaryGlow: "rgba(0,255,65,0.5)",
        primarySoft: "rgba(0,255,65,0.05)",
        primaryBorder: "rgba(0,255,65,0.3)",
        bg: "#000000",
        bgGradient: "linear-gradient(135deg,#000000 0%,#001000 40%,#000000 100%)",
        text: "#00ff41",
        textMuted: "#00ff62",
        hoverLift: "-18px",
        // Nerdy & hacky font stack with full Unicode support
        font: "'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Segoe UI Symbol', 'Noto Sans Mono', 'Segoe UI Emoji', 'Apple Color Emoji', 'Twemoji Mozilla', monospace"
    },
    ultraviolet: {
        name: "Void Demon",
        primary: "#8B00FF",
        primaryAlpha: "rgba(139,0,255,0.18)",
        primaryGlow: "rgba(139,0,255,0.7)",
        primarySoft: "rgba(139,0,255,0.07)",
        primaryBorder: "rgba(139,0,255,0.3)",
        bg: "#0d001a",
        bgGradient: "linear-gradient(135deg,#1a0033 0%,#0f001a 40%,#000000 100%)",
        text: "#e6ccff",
        textMuted: "#ff66ff",
        hoverLift: "-18px",
        // Techno-sci aesthetic with full symbol coverage
        font: "'Orbitron', 'Noto Sans Symbols', 'Segoe UI Emoji', 'Apple Color Emoji', 'Twemoji Mozilla', system-ui, sans-serif"
    },
    barbie: {
        name: "Barbie Gone Wrong",
        primary: "#ff33ff",
        primaryAlpha: "rgba(255,51,255,0.15)",
        primaryGlow: "rgba(255,51,255,0.75)",
        primarySoft: "rgba(255,51,255,0.08)",
        primaryBorder: "rgba(255,51,255,0.3)",
        bg: "#1a001a",
        bgGradient: "linear-gradient(135deg,#330033 0%,#1a001a 40%,#000000 100%)",
        text: "#ffd7ff",
        textMuted: "#ff99ff",
        hoverLift: "-14px",
        // Fun and chaotic, but still emoji-safe!
        font: "'Comic Sans MS', 'Noto Color Emoji', 'Segoe UI Emoji', 'Apple Color Emoji', cursive"
    }
};

let ACTIVE_THEME = "matrix";
const getTheme = () => THEMES[ACTIVE_THEME] || THEMES.cream;
window.CURRENT_THEME = getTheme();

const applyTheme = () => {
    const t = getTheme();
    window.CURRENT_THEME = t;

    const style = document.getElementById("theme-globals") || document.createElement("style");
    style.id = "theme-globals";
    style.textContent = `
        :root {
            --theme-primary: ${t.primary};
            --theme-primary-alpha: ${t.primaryAlpha};
            --theme-primary-glow: ${t.primaryGlow};
            --theme-primary-soft: ${t.primarySoft};
            --theme-primary-border: ${t.primaryBorder};
            --theme-bg: ${t.bg};
            --theme-bg-gradient: ${t.bgGradient};
            --theme-text: ${t.text};
            --theme-text-muted: ${t.textMuted};
            --theme-hover-lift: ${t.hoverLift};
            --theme-font-main: ${t.font.split(',')[0].trim()};
            --theme-font-fallback: ${t.font};
        }

        /* THE HOLY LINE — UNICODE SHALL NEVER DIE */
        body, .portal-text, .line-0, .line-1, .line-2, .line-3 {
            font-family: var(--theme-font-fallback),
                         'Noto Sans',
                         'Noto Sans Symbols',
                         'Segoe UI Symbol',
                         'Segoe UI Emoji',
                         'Apple Color Emoji',
                         'Twemoji Mozilla',
                         system-ui,
                         sans-serif !important;
        }

        /* Normal text uses theme font but keeps full fallback chain */
        * {
            font-family: var(--theme-font-main),
                         'Noto Sans',
                         'Noto Sans Symbols',
                         'Segoe UI Symbol',
                         'Segoe UI Emoji',
                         'Apple Color Emoji',
                         'Twemoji Mozilla',
                         system-ui,
                         sans-serif;
        }

        @keyframes pulseGlow {
    from {
        box-shadow: 0 20px 100px ${t.primaryGlow}, inset 0 0 80px ${t.primaryAlpha};
    }
    to {
        box-shadow: 0 20px 120px ${t.primaryGlow.replace(/0\.\d+\)/, '0.9)')}, 
                     inset 0 0 100px ${t.primaryAlpha.replace(/0\.\d+\)/, '0.28)')};
    }
}

    `;
    document.head.appendChild(style);

    document.body.style.backgroundColor = t.bg;

    const portalStyle = document.getElementById("alex-entry-portal");
    if (portalStyle && window.generatePortalCSS) {
        portalStyle.textContent = window.generatePortalCSS();
    }
};

applyTheme();

window.setTheme = (name) => {
    if (!THEMES[name]) return console.error("No theme:", name);
    ACTIVE_THEME = name;
    applyTheme();
};

export default { ...getTheme(), setTheme: window.setTheme, current: () => window.CURRENT_THEME };
