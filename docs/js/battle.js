// =========================
// battle.js — Combat System
// =========================

// Battle state
let Battle = {
  active: false,
  enemy: null
};

// Enemy name pools
const EnemyNames = {
  normal: [
    "Wolf",
    "Orc",
    "Goblin",
    "Imp",
    "Feral Reptile",
    "Cursed Lavender",
    "Skeleton",
    "Demon-Possessed Skeleton",
    "Werewolf"
  ],
  boss: [
    "Alpha Wolf",
    "Goblorc",
    "Possessed Knight Corpse"
  ]
};

// Enemy level generator (weighted table)
function enemyLevelFor(playerLevel) {
  if (playerLevel <= 20) return playerLevel;

  const buckets = [
    { weight: 20, pick: () => 17 + Math.floor(Math.random() * 4) }, // weaker
    { weight: 30, pick: () => 30 },                                 // boss
    { weight: 25, pick: () => playerLevel + 1 },                    // +1 higher
    { weight: 25, pick: () => playerLevel }                         // mirror
  ];

  let roll = Math.random() * 100;
  for (let b of buckets) {
    if (roll < b.weight) return b.pick();
    roll -= b.weight;
  }
}

// Enemy factory
function spawnEnemy(playerLevel = 1) {
  const level = enemyLevelFor(playerLevel);
  let name, isBoss = false;

  if (level === 30) {
    name = EnemyNames.boss[Math.floor(Math.random() * EnemyNames.boss.length)];
    isBoss = true;
  } else {
    name = EnemyNames.normal[Math.floor(Math.random() * EnemyNames.normal.length)];
  }

  return {
    name,
    level,
    hp: isBoss ? 200 : 20 + level * 5,
    atk: isBoss ? 15 : 2 + level,
    def: isBoss ? 8 : 1 + Math.floor(level / 2),
    boss: isBoss
  };
}

// Start battle
function startBattle(playerLevel = 1) {
  if (Battle.active) {
    logMsg("⚠ Already in battle!");
    return;
  }
  Battle.enemy = spawnEnemy(playerLevel);
  Battle.active = true;
  logMsg(`A ${Battle.enemy.boss ? "boss" : "wild"} ${Battle.enemy.name} (Lv ${Battle.enemy.level}) appears!`);
  drawBattle();
}

// Player action stubs
function playerFight() {
  if (!Battle.active) return;
  const dmg = Math.max(1, 5 - Battle.enemy.def); // stub damage
  Battle.enemy.hp -= dmg;
  logMsg(`You hit the ${Battle.enemy.name} for ${dmg}!`);
  checkBattle();
}

function playerItem() {
  if (!Battle.active) return;
  logMsg("You rummage for an item... (stub)");
}

function playerFlee() {
  if (!Battle.active) return;
  logMsg("You fled the battle!");
  endBattle();
}

// End battle
function endBattle() {
  Battle.active = false;
  Battle.enemy = null;
  drawBattle();
}

// Check outcome
function checkBattle() {
  if (Battle.enemy.hp <= 0) {
    logMsg(`You defeated the ${Battle.enemy.name}!`);
    endBattle();
  }
}

// Render battle UI stub
function drawBattle() {
  const div = $("battleStatus");
  if (!div) return;

  if (!Battle.active) {
    div.textContent = "No battle active.";
  } else {
    div.textContent = `${Battle.enemy.name} — HP: ${Battle.enemy.hp}`;
  }
    }
