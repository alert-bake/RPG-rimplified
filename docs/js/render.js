// =========================
// render.js - UI Updates
// =========================

function safeNumber(val, fallback = 0) {
  return (typeof val === "number" && !isNaN(val)) ? val : fallback;
}

function $(id) { return document.getElementById(id); }

// Log system
function logMsg(msg) {
  const logDiv = $("log");
  const p = document.createElement("p");
  p.textContent = msg;
  logDiv.appendChild(p);
  logDiv.scrollTop = logDiv.scrollHeight;
}

// Draw stats safely
function drawStats() {
  $("time").textContent = safeNumber(G.time, 0);
  $("hp").textContent = safeNumber(G.hp, 100);
}

// Tab switching
document.querySelectorAll(".tabbtn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tabbtn").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".tab").forEach(sec => sec.classList.remove("active"));
    $(btn.dataset.tab).classList.add("active");
  });
});
