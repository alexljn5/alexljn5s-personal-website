// buttons.js — does exactly one thing and nothing more
import { activatePortalVoid } from "./effects.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".click-me-effect") || document.getElementById("mainBox");
    if (container) {
        activatePortalVoid(container);
    }
});