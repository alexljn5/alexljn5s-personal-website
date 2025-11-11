// glitchWorker.js — Runs in background, zero main thread jank
const chars = "⛧⸸⚡▣◆✦#CA2422█▓▒░";

self.onmessage = function (e) {
    const { id, text, intensity = 2, frame = 0 } = e.data;

    // Only scramble every even frame
    if (frame % 2 === 0) {
        const scrambled = text
            .split('')
            .map(c => Math.random() < 0.18 * intensity
                ? chars[Math.floor(Math.random() * chars.length)]
                : c
            )
            .join('');

        self.postMessage({ id, text: scrambled, isScrambled: true });
    } else {
        self.postMessage({ id, text, isScrambled: false });
    }
};