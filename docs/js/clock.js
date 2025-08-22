// =========================
// clock.js — Game Clock & Timed Updates
// =========================

const TICK_INTERVAL = 1000; // 1 second

// Main loop
setInterval(() => {
  // Increment playtime
  G.playtime = safeNumber(G.playtime, 0) + 1;
  // Optionally, also count real-time ticks
  G.stats.ticks = safeNumber(G.stats.ticks, 0) + 1;

  // Update UI
  drawStats();

  // Insert future timed events here (regen, cooldowns, timed spawns)...

}, TICK_INTERVAL);
