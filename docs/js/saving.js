// =========================
// saving.js - Save / Load
// =========================

const SAVEKEY = "rpgrSave";

// Save current state
function saveGame() {
  try {
    localStorage.setItem(SAVEKEY, JSON.stringify(G));
  } catch (e) {
    console.error("Save failed:", e);
    const err = document.getElementById("errorMsg");
    if (err) err.textContent = "⚠ Save failed!";
  }
}

// Load state
function loadGame() {
  let raw = localStorage.getItem(SAVEKEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") throw "Corrupt";

    // Merge defaults + save (so new keys don’t break old saves)
    G = { ...structuredClone(DEF), ...data };

    // Sanitize critical numbers
    G.time = safeNumber(G.time, 0);
    G.hp   = safeNumber(G.hp, 100);

  } catch (e) {
    console.warn("Save data corrupt, resetting.", e);
    const err = document.getElementById("errorMsg");
    if (err) {
      err.textContent =
        "⚠ Save file data corrupt. Try Hard Reset. If issue persists, clear site data.";
    }
    resetGameState();
  }
}

// Hard reset
function hardReset() {
  if (!confirm("⚠ Reset ALL progress? This cannot be undone.")) return;
  localStorage.removeItem(SAVEKEY);
  resetGameState();
  saveGame();
  location.reload();
}

// Auto-save before unload (reload/close tab)
window.addEventListener("beforeunload", () => {
  saveGame();
});

// Load immediately on startup
window.addEventListener("DOMContentLoaded", () => {
  loadGame();
  drawStats();
});
