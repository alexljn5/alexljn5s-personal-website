document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("clickMeButton");
    const mainBox = document.getElementById("mainBox");
    const body = document.body;

    button.addEventListener("click", () => {
        // 1. Clear everything except mainBox
        body.innerHTML = "";
        body.appendChild(mainBox);
        button.remove(); // Remove button too

        // 2. Reset body for full-screen layout
        Object.assign(body.style, {
            margin: "0",
            padding: "0",
            backgroundColor: "#121216",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            overflow: "hidden",
        });

        // 3. Set initial small size (for animation)
        mainBox.style.width = "400px";
        mainBox.style.height = "400px";
        mainBox.style.transition = "all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)";
        mainBox.style.opacity = "1";

        // 4. Trigger reflow, then expand to full screen with padding
        mainBox.offsetHeight; // Force reflow

        Object.assign(mainBox.style, {
            width: "calc(100vw - 80px)",   // Full width minus padding
            height: "calc(100vh - 80px)",  // Full height minus padding
            maxWidth: "1600px",
            maxHeight: "900px",
            margin: "40px",                // Nice padding around edges
            padding: "40px",
            borderRadius: "24px",          // Soft corners
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
            border: "4px solid rgba(0, 0, 0, 1.6)"
        });

        // Optional: Add a class for future styling
        mainBox.classList.add("expanded");
    });
});