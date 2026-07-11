(function () {
  const gridEl = document.getElementById("levelGrid");
  if (!gridEl) return;

  gridEl.innerHTML = "";

  LEVELS.forEach((level) => {
    // Reading unlock data from your existing Sudoku progress manager
    const isUnlocked = Progress.isUnlocked(level.id);
    const progress = Progress.getLevelProgress(level.id);

    const card = document.createElement(isUnlocked ? "a" : "div");
    card.className = `level-card ${isUnlocked ? "" : "locked"}`;
    
    if (isUnlocked) {
      card.href = `game.html?level=${level.id}`;
    }

    // Dynamic Bilingual markup injection matching your design language
    let innerHTML = `
      <div class="level-number">LEVEL ${level.id}</div>
      <div class="level-title" style="font-weight: 600; font-size: 1.35rem; margin-bottom: 2px;">${level.titleTelugu}</div>
      <div class="level-subtitle" style="font-family: 'Cinzel', serif; font-size: 0.95rem; color: var(--gold); opacity: 0.85; margin-bottom: 12px;">(${level.titleEnglish})</div>
      <div class="level-meta" style="font-size: 0.85rem; opacity: 0.75;">
        <span>${level.size}×${level.size} grid · ${level.difficulty}</span>
    `;

    if (progress.completed && progress.bestTime) {
      innerHTML += `<span>Best Time: ${progress.bestTime}</span>`;
    }

    innerHTML += `</div>`;

    if (!isUnlocked) {
      innerHTML += `<div class="level-lock-icon" style="position: absolute; top: 20px; right: 20px;">🔒</div>`;
    }

    card.innerHTML = innerHTML;
    gridEl.appendChild(card);
  });
})();
