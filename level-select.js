function renderLevels() {
  const container = document.getElementById("levelGrid");
  container.innerHTML = "";

  LEVELS.forEach(level => {
    const unlocked = Progress.isUnlocked(level.id);
    const progress = Progress.getLevelProgress(level.id);

    const card = document.createElement(unlocked ? "a" : "div");
    if (unlocked) card.href = `game.html?level=${level.id}`;
    card.className = "level-card" + (unlocked ? "" : " locked");

    const stars = "★".repeat(progress.stars) + "☆".repeat(3 - progress.stars);

    card.innerHTML = `
      ${unlocked ? "" : '<span class="level-lock-icon">&#128274;</span>'}
      <div class="level-number">Level ${level.id}</div>
      <div class="level-title">${level.title}</div>
      <div class="level-meta">
        <span>${level.size}×${level.size} grid</span>
        <span>${level.difficulty}</span>
      </div>
      <div class="level-stars">${progress.completed ? stars : ""}</div>
    `;

    container.appendChild(card);
  });
}

renderLevels();
