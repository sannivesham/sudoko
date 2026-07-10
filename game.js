(function () {
  const params = new URLSearchParams(window.location.search);
  const levelId = Number(params.get("level")) || 1;
  const level = getLevel(levelId);

  if (!level) {
    document.body.innerHTML = "<p style='padding:40px;color:#EDE3C8;'>Level not found.</p>";
    return;
  }
  if (!Progress.isUnlocked(levelId)) {
    window.location.href = "index.html";
    return;
  }

  const { size, symbolCount, difficulty } = level;
  const { br, bc } = SudokuEngine.boxDims(size);
  const { puzzle, solution } = SudokuEngine.generate(size, difficulty);

  // player's current grid (0 = empty), and which cells were given
  const playerGrid = puzzle.map(row => row.slice());
  const givenMask = puzzle.map(row => row.map(v => v !== 0));

  let selected = null; // {r, c}
  let mistakes = 0;
  let seconds = 0;
  let timerHandle = null;
  let solved = false;

  document.getElementById("levelTitle").textContent = `Level ${level.id}: ${level.title}`;
  document.getElementById("levelSubtitle").textContent =
    `${size}×${size} · ${difficulty[0].toUpperCase()}${difficulty.slice(1)}`;

  const gridEl = document.getElementById("grid");
  const paletteEl = document.getElementById("palette");
  const timerEl = document.getElementById("timer");
  const mistakeEl = document.getElementById("mistakeCount");

  function formatTime(s) {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
  }

  function startTimer() {
    timerHandle = setInterval(() => {
      seconds++;
      timerEl.textContent = formatTime(seconds);
    }, 1000);
  }

  function buildGrid() {
    gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridEl.innerHTML = "";

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.r = r;
        cell.dataset.c = c;
        if (givenMask[r][c]) cell.classList.add("given");
        if ((c + 1) % bc === 0 && c !== size - 1) cell.classList.add("box-edge-right");
        if ((r + 1) % br === 0 && r !== size - 1) cell.classList.add("box-edge-bottom");

        renderCellContent(cell, r, c);
        cell.addEventListener("click", () => selectCell(r, c));
        gridEl.appendChild(cell);
      }
    }
  }

  function renderCellContent(cell, r, c) {
    const val = playerGrid[r][c];
    cell.innerHTML = val ? symbolIcon(val) : "";
  }

  function buildPalette() {
    paletteEl.innerHTML = "";
    for (let n = 1; n <= symbolCount; n++) {
      const btn = document.createElement("button");
      btn.className = "palette-btn";
      btn.innerHTML = symbolIcon(n);
      btn.title = SYMBOLS[n].name;
      btn.addEventListener("click", () => placeValue(n));
      paletteEl.appendChild(btn);
    }
    const erase = document.createElement("button");
    erase.className = "palette-btn erase";
    erase.textContent = "✕";
    erase.title = "Erase";
    erase.addEventListener("click", () => placeValue(0));
    paletteEl.appendChild(erase);
  }

  function selectCell(r, c) {
    if (solved) return;
    selected = { r, c };
    refreshHighlights();
  }

  function refreshHighlights() {
    const cells = gridEl.querySelectorAll(".cell");
    cells.forEach(cell => {
      cell.classList.remove("selected", "same-value", "conflict");
    });
    if (!selected) return;
    const { r, c } = selected;
    const val = playerGrid[r][c];

    cells.forEach(cell => {
      const cr = Number(cell.dataset.r), cc = Number(cell.dataset.c);
      if (cr === r && cc === c) cell.classList.add("selected");
      else if (val && playerGrid[cr][cc] === val) cell.classList.add("same-value");
    });
  }

  function placeValue(n) {
    if (!selected || solved) return;
    const { r, c } = selected;
    if (givenMask[r][c]) return;

    playerGrid[r][c] = n;
    const cellEl = gridEl.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
    renderCellContent(cellEl, r, c);

    if (n !== 0 && n !== solution[r][c]) {
      mistakes++;
      mistakeEl.textContent = mistakes;
      cellEl.classList.add("conflict");
      setTimeout(() => cellEl.classList.remove("conflict"), 500);
    }

    refreshHighlights();
    checkWin();
  }

  function checkWin() {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (playerGrid[r][c] !== solution[r][c]) return;
      }
    }
    solved = true;
    clearInterval(timerHandle);

    let stars = 3;
    if (mistakes > 2) stars = 2;
    if (mistakes > 5) stars = 1;
    if (mistakes > 9) stars = 1;

    Progress.recordCompletion(level.id, seconds, stars);

    document.getElementById("winStars").textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
    document.getElementById("winTime").textContent =
      `Solved in ${formatTime(seconds)} with ${mistakes} mistake${mistakes === 1 ? "" : "s"}.`;
    document.getElementById("winOverlay").classList.remove("hidden");

    const nextBtn = document.getElementById("nextLevelBtn");
    const nextLevel = getLevel(level.id + 1);
    if (nextLevel) {
      nextBtn.addEventListener("click", () => {
        window.location.href = `game.html?level=${nextLevel.id}`;
      });
    } else {
      nextBtn.style.display = "none";
    }
  }

  function giveHint() {
    if (solved) return;
    // find a random empty or incorrect cell and fill it correctly
    const candidates = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!givenMask[r][c] && playerGrid[r][c] !== solution[r][c]) {
          candidates.push([r, c]);
        }
      }
    }
    if (candidates.length === 0) return;
    const [r, c] = candidates[Math.floor(Math.random() * candidates.length)];
    playerGrid[r][c] = solution[r][c];
    const cellEl = gridEl.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
    renderCellContent(cellEl, r, c);
    selected = { r, c };
    refreshHighlights();
    checkWin();
  }

  function resetPuzzle() {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!givenMask[r][c]) playerGrid[r][c] = 0;
      }
    }
    mistakes = 0;
    mistakeEl.textContent = 0;
    selected = null;
    buildGrid();
  }

  document.getElementById("hintBtn").addEventListener("click", giveHint);
  document.getElementById("resetBtn").addEventListener("click", resetPuzzle);

  // keyboard support
  document.addEventListener("keydown", (e) => {
    if (!selected) return;
    if (e.key >= "1" && e.key <= String(symbolCount)) {
      placeValue(Number(e.key));
    } else if (e.key === "Backspace" || e.key === "Delete") {
      placeValue(0);
    } else if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      let { r, c } = selected;
      if (e.key === "ArrowUp") r = Math.max(0, r - 1);
      if (e.key === "ArrowDown") r = Math.min(size - 1, r + 1);
      if (e.key === "ArrowLeft") c = Math.max(0, c - 1);
      if (e.key === "ArrowRight") c = Math.min(size - 1, c + 1);
      selectCell(r, c);
    }
  });

  buildGrid();
  buildPalette();
  startTimer();
})();
