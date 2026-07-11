(function () {
  // 1. Level Data built directly into the script to prevent timing errors
  const MODULE_LEVELS = [
    { id: 1, titleTelugu: "అయోధ్య ద్వారం", titleEnglish: "Ayodhya's Gate", size: 4, difficulty: "Easy" },
    { id: 2, titleTelugu: "పంచవటి వనం", titleEnglish: "Panchavati Grove", size: 4, difficulty: "Medium" },
    { id: 3, titleTelugu: "చిత్రకూట ఆశ్రమం", titleEnglish: "Chitrakoot Hermitage", size: 4, difficulty: "Hard" },
    { id: 4, titleTelugu: "కిష్కింధ సభ", titleEnglish: "Kishkindha Court", size: 4, difficulty: "Easy" },
    { id: 5, titleTelugu: "లంకా ప్రాకారం", titleEnglish: "Lanka's Ramparts", size: 4, difficulty: "Medium" },
    { id: 6, titleTelugu: "అశోక వనం", titleEnglish: "Ashoka Vatika", size: 4, difficulty: "Hard" }
  ];

  function renderGrid() {
    const gridEl = document.getElementById("levelGrid");
    if (!gridEl) return;

    gridEl.innerHTML = "";

    MODULE_LEVELS.forEach((level) => {
      const isUnlocked = typeof window.Progress?.isUnlocked === "function" 
        ? window.Progress.isUnlocked(level.id) 
        : (level.id === 1);

      const progress = typeof window.Progress?.getLevelProgress === "function"
        ? window.Progress.getLevelProgress(level.id)
        : { completed: false, bestTime: null };

      const card = document.createElement(isUnlocked ? "a" : "div");
      card.className = `level-card ${isUnlocked ? "" : "locked"}`;
      
      if (isUnlocked) {
        card.href = `game.html?level=${level.id}`;
      }

      let innerHTML = `
        <div class="level-number">LEVEL ${level.id}</div>
        <div class="level-title" style="font-weight: 600; font-size: 1.35rem; margin-bottom: 2px;">${level.titleTelugu}</div>
        <div class="level-subtitle" style="font-family: 'Cinzel', serif; font-size: 0.95rem; color: var(--gold); opacity: 0.85; margin-bottom: 12px;">(${level.titleEnglish})</div>
        <div class="level-meta" style="font-size: 0.85rem; opacity: 0.75;">
          <span>Grid: ${level.size}×${level.size} · ${level.difficulty}</span>
      `;

      if (progress.completed && progress.bestTime) {
        innerHTML += `<span> · Best: ${progress.bestTime}</span>`;
      }

      innerHTML += `</div>`;

      if (!isUnlocked) {
        innerHTML += `<div class="level-lock-icon" style="position: absolute; top: 20px; right: 20px;">🔒</div>`;
      }

      card.innerHTML = innerHTML;
      gridEl.appendChild(card);
    });
  }

  renderGrid();
  setInterval(renderGrid, 500);
})();
