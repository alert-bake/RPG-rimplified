// =========================
// stat.js - Game State
// =========================

// Default values
const DEF = {
  version: "0.1",
  time: 0,
  hp: 100,
  inventory: [],
  playtime: 0,
  stats: {
    ticks: 0,
    battles: 0
  }
};

// Global state object
let G = structuredClone(DEF);

// Helpers
function safeNumber(val, fallback = 0) {
  return (typeof val === "number" && !isNaN(val)) ? val : fallback;
}

// Hard reset function (safe to call from anywhere)
function resetGameState() {
  G = structuredClone(DEF);
                      }
