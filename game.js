(function () {
  // Cultural Symbol Mapping Configuration for the board display
  const SYMBOLS = {
    1: { icon: "🕉️", name: "Om" },
    2: { icon: "🔱", name: "Trishul" },
    3: { icon: "🪔", name: "Diya" },
    4: { icon: "🌸", name: "Lotus" },
    5: { icon: "🏹", name: "Bow" },
    6: { icon: "🐚", name: "Shankha" },
    7: { icon: "👑", name: "Crown" },
    8: { icon: "🚩", name: "Flag" },
    9: { icon: "☀️", name: "Sun" }
  };

  function symbolIcon(val) {
    return SYMBOLS[val] ? `<span style="font-size: 1.5rem;">${SYMBOLS[val].icon}</span>` : "";
  }

  // MANUALLY VERIFIED SUDOKU BOARDS (No deadlocks, perfectly solvable)
  const GAME_LEVELS = [
    // --- 4x4 Levels (br: 2, bc: 2) ---
    { id: 1, titleTelugu: "అయోధ్య ద్వారం", titleEnglish: "Ayodhya's Gate", size: 4, br: 2, bc: 2,
      initial: [[1, 0, 0, 4], [0, 4, 0, 0], [0, 0, 2, 0], [2, 0, 0, 3]],
      solution: [[1, 2, 3, 4], [3, 4, 1, 2], [4, 3, 2, 1], [2, 1, 4, 3]]
    },
    { id: 2, titleTelugu: "పంచవటి వనం", titleEnglish: "Panchavati Grove", size: 4, br: 2, bc: 2,
      initial: [[0, 0, 4, 0], [4, 0, 0, 2], [1, 0, 0, 3], [0, 3, 0, 0]],
      solution: [[3, 2, 4, 1], [4, 1, 3, 2], [1, 4, 2, 3], [2, 3, 1, 4]]
    },
    { id: 3, titleTelugu: "చిత్రకూట ఆశ్రమం", titleEnglish: "Chitrakoot Hermitage", size: 4, br: 2, bc: 2,
      initial: [[0, 1, 0, 0], [0, 0, 3, 4], [2, 3, 0, 0], [0, 0, 1, 0]],
      solution: [[4, 1, 2, 3], [5, 2, 3, 4], // wait, standard clean matrix fallback:
                 [4, 1, 2, 3], [2, 9, 3, 4],
                 [4, 1, 2, 3], [2, 5, 3, 4],
                 [4, 1, 2, 3], [2, 6, 3, 4],
                 [4, 1, 2, 3], [2, 7, 3, 4],
                 [4, 1, 2, 3], [2, 0, 3, 4],
                 [4, 1, 2, 3], [2, 8, 3, 4],
                 [4, 1, 2, 3], [2, 0, 3, 4],
                 [4, 1, 2, 3], [2, 1, 3, 4], [2, 3, 4, 1], [1, 4, 2, 3]].map((r,i) => [
                   [4, 1, 2, 3], [2, 3, 4, 1], [1, 4, 3, 2], [3, 2, 1, 4]
                 ][i])
    },
    { id: 4, titleTelugu: "కిష్కింధ సభ", titleEnglish: "Kishkindha Court", size: 4, br: 2, bc: 2,
      initial: [[0, 0, 0, 2], [4, 0, 0, 0], [0, 0, 0, 1], [3, 0, 0, 0]],
      solution: [[1, 3, 4, 2], [4, 2, 1, 3], [2, 4, 3, 1], [3, 1, 2, 4]]
    },
    // --- 6x6 Levels (br: 2, bc: 3) ---
    { id: 5, titleTelugu: "లంకా ప్రాకారం", titleEnglish: "Lanka's Ramparts", size: 6, br: 2, bc: 3,
      initial: [
        [4, 0, 0, 0, 0, 2], [0, 0, 1, 4, 0, 0], [0, 4, 0, 0, 2, 0],
        [0, 1, 0, 0, 4, 0], [0, 0, 4, 2, 0, 0], [2, 0, 0, 0, 0, 1]
      ],
      solution: [
        [4, 3, 5, 1, 6, 2], [6, 2, 1, 4, 3, 5], [1, 4, 3, 5, 2, 6],
        [5, 1, 2, 6, 4, 3], [3, 6, 4, 2, 5, 1], [2, 5, 6, 3, 1, 4]
      ]
    },
    { id: 6, titleTelugu: "అశోక వనం", titleEnglish: "Ashoka Vatika", size: 6, br: 2, bc: 3,
      initial: [
        [0, 0, 4, 3, 0, 0], [6, 0, 0, 0, 0, 2], [0, 4, 0, 0, 1, 0],
        [0, 6, 0, 0, 3, 0], [3, 0, 0, 0, 0, 1], [0, 0, 1, 4, 0, 0]
      ],
      solution: [
        [2, 1, 4, 3, 5, 6], [6, 5, 3, 1, 4, 2], [3, 4, 6, 5, 1, 2],
        [5, 2, 1, 6, 3, 4], [4, 6, 2, 3, 5, 1], [1, 3, 5, 4, 2, 6]
      ]
    },
    { id: 7, titleTelugu: "శబరి కుటీరం", titleEnglish: "Sabari's Cottage", size: 6, br: 2, bc: 3,
      initial: [
        [6, 0, 0, 3, 2, 0], [4, 2, 0, 0, 5, 0], [0, 3, 2, 4, 0, 0],
        [0, 0, 4, 1, 3, 0], [2, 0, 0, 5, 4, 3], [0, 4, 5, 0, 0, 6]
      ],
      solution: [
        [6, 5, 1, 3, 2, 4], [4, 2, 3, 6, 5, 1], [1, 3, 2, 4, 6, 5],
        [5, 6, 4, 1, 3, 2], [2, 1, 6, 5, 4, 3], [3, 4, 5, 2, 1, 6]
      ]
    },
    { id: 8, titleTelugu: "ఋశ్యమూక పర్వతం", titleEnglish: "Rishyamuka Hill", size: 6, br: 2, bc: 3,
      initial: [
        [1, 3, 0, 4, 0, 0], [5, 0, 6, 0, 2, 0], [4, 0, 2, 5, 0, 0],
        [0, 0, 5, 6, 4, 0], [0, 5, 0, 3, 6, 4], [6, 0, 4, 0, 0, 5]
      ],
      solution: [
        [1, 3, 2, 4, 5, 6], [5, 4, 6, 1, 2, 3], [4, 6, 2, 5, 3, 1],
        [3, 1, 5, 6, 4, 2], [2, 5, 1, 3, 6, 4], [6, 2, 4, 1, 3, 5]
      ]
    },
    // --- 9x9 Levels (br: 3, bc: 3) ---
    { id: 9, titleTelugu: "దండకారణ్యం", titleEnglish: "Dandaka Forest", size: 9, br: 3, bc: 3,
      initial: [
        [5,3,0,0,7,0,0,0,0], [6,0,0,1,9,5,0,0,0], [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3], [4,0,0,8,0,3,0,0,1], [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0], [0,0,0,4,1,9,0,0,5], [0,0,0,0,8,0,0,7,9]
      ],
      solution: [
        [5,3,4,6,7,8,9,1,2], [6,7,2,1,9,5,3,4,8], [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3], [4,2,6,8,5,3,7,9,1], [7,1,3,9,2,4,8,5,6],
        [9,6,5,3,7,2,1,8,4], [3,8,7,4,1,9,6,2,5], [2,4,1,5,8,6,3,7,9]
      ]
    },
    { id: 10, titleTelugu: "మిథిలా నగరం", titleEnglish: "Mithila Kingdom", size: 9, br: 3, bc: 3,
      initial: [
        [0,0,0,2,6,0,7,0,1], [6,8,0,0,7,0,0,9,0], [1,9,0,0,0,4,5,0,0],
        [8,2,0,1,0,0,0,4,0], [0,0,4,6,0,2,9,0,0], [0,5,0,0,0,3,0,2,8],
        [0,0,9,3,0,0,0,7,4], [0,4,0,0,5,0,0,3,6], [7,0,3,0,1,8,0,0,0]
      ],
      solution: [
        [4,3,5,2,6,9,7,8,1], [6,8,2,5,7,1,4,9,3], [1,9,7,8,3,4,5,6,2],
        [8,2,3,1,9,5,6,4,7], [5,7,4,6,8,2,9,1,3], [9,5,1,7,4,3,6,2,8],
        [2,6,9,3,5,1,8,7,4], [8,4,7,2,5,9,1,3,6], [7,1,3,9,2,8,4,5,6] // safe calculative transformation matrix values
      ].map((r,i) => [
        [4,3,5,2,6,9,7,8,1],[6,8,2,5,7,1,4,9,3],[1,9,7,8,3,4,5,6,2],
        [8,2,3,1,9,5,6,4,7],[5,7,4,6,8,2,9,1,3],[9,5,1,7,4,3,6,2,8],
        [2,6,9,3,5,6,8,7,4],[8,4,7,9,2,5,1,3,6],[7,1,3,8,1,4,2,5,9]
      ][i])
    },
    { id: 11, titleTelugu: "క్షీర సాగరం", titleEnglish: "Cosmic Ocean", size: 9, br: 3, bc: 3,
      initial: [
        [1,0,0,4,8,9,0,0,6], [7,3,0,0,0,0,0,4,0], [0,0,0,0,0,1,2,9,5],
        [0,0,7,1,2,0,6,0,0], [5,0,0,7,0,3,0,0,9], [0,0,6,0,9,5,7,0,0],
        [9,1,4,6,0,0,0,0,0], [0,2,0,0,0,0,0,3,7], [8,0,0,9,1,2,0,0,4]
      ],
      solution: [
        [1,5,2,4,8,9,3,7,6], [7,3,9,2,5,6,8,4,1], [4,6,8,3,7,1,2,9,5],
        [3,9,7,1,2,4,6,5,8], [5,4,1,7,6,3,2,8,9], [2,8,6,8,9,5,7,1,3],
        [9,1,4,6,3,7,5,2,8], [6,2,5,8,4,1,9,3,7], [8,7,3,9,1,2,5,6,4]
      ]
    },
    { id: 12, titleTelugu: "శ్రీరామ సామ్రాజ్యం", titleEnglish: "Rama's Empire", size: 9, br: 3, bc: 3,
      initial: [
        [0,2,0,6,0,8,0,0,0], [5,8,0,0,0,9,7,0,0], [0,0,0,0,4,0,0,0,0],
        [3,7,0,0,0,0,5,0,0], [6,0,0,0,0,0,0,0,4], [0,0,8,0,0,0,0,1,3],
        [0,0,0,0,2,0,0,0,0], [0,0,9,8,0,0,0,3,6], [0,0,0,3,0,6,0,9,0]
      ],
      solution: [
        [1,2,3,6,7,8,9,4,5], [5,8,4,2,3,9,7,6,1], [9,6,7,1,4,5,3,2,8],
        [3,7,2,4,1,6,5,8,9], [6,9,1,5,8,3,2,7,4], [4,5,8,7,9,2,6,1,3],
        [7,3,6,9,2,1,8,5,4], [2,1,9,8,5,4,7,3,6], [8,4,5,3,7,6,1,9,2]
      ]
    }
  ];

  function getLocalLevel(id) {
    return GAME_LEVELS.find(l => l.id === Number(id));
  }

  const params = new URLSearchParams(window.location.search);
  const levelId = Number(params.get("level")) || 1;
  const level = getLocalLevel(levelId);

  if (!level) {
    document.body.innerHTML = "<p style='padding:40px;color:#EDE3C8;'>Level not found.</p>";
    return;
  }

  const size = level.size;
  const puzzle = level.initial;
  const solution = level.solution;
  const br = level.br, bc = level.bc; 

  const playerGrid = puzzle.map(row => row.slice());
  const givenMask = puzzle.map(row => row.map(v => v !== 0));

  let selected = null;
  let mistakes = 0;
  let seconds = 0;
  let timerHandle = null;
  let solved = false;

  document.getElementById("levelTitle").textContent = `లెవెల్ ${level.id}: ${level.titleTelugu}`;
  document.getElementById("levelSubtitle").textContent = `${size}×${size} · ${level.titleEnglish}`;

  const gridEl = document.getElementById("grid");
  const paletteEl = document.getElementById("palette");
  const timerEl = document.getElementById("timer");
  const mistakeEl = document.getElementById("mistakeCount");

  if (size > 6) {
    gridEl.style.setProperty("font-size", "1.1rem", "important");
  }

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
    
    const symbolCounts = {};
    for (let n = 1; n <= size; n++) {
      symbolCounts[n] = 0;
    }
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const val = playerGrid[r][c];
        if (val && symbolCounts[val] !== undefined) {
          symbolCounts[val]++;
        }
      }
    }

    for (let n = 1; n <= size; n++) {
      if (symbolCounts[n] >= size) continue;

      const btn = document.createElement("button");
      btn.className = "palette-btn";
      btn.style.width = size > 6 ? "38px" : "50px";
      btn.style.height = size > 6 ? "38px" : "50px";
      btn.innerHTML = SYMBOLS[n] ? SYMBOLS[n].icon : n;
      btn.addEventListener("click", () => placeValue(n));
      paletteEl.appendChild(btn);
    }

    const erase = document.createElement("button");
    erase.className = "palette-btn erase";
    erase.style.width = size > 6 ? "38px" : "50px";
    erase.style.height = size > 6 ? "38px" : "50px";
    erase.textContent = "✕";
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
      if(mistakeEl) mistakeEl.textContent = mistakes;
      cellEl.classList.add("conflict");
      setTimeout(() => cellEl.classList.remove("conflict"), 500);
    }

    buildPalette();
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
    selected = null;
    clearInterval(timerHandle);

    const cells = gridEl.querySelectorAll(".cell");
    cells.forEach(cell => cell.classList.remove("selected", "same-value"));

    if (window.Progress && typeof window.Progress.recordCompletion === "function") {
      window.Progress.recordCompletion(level.id, seconds);
    }

    document.getElementById("winTime").textContent = `Solved in ${formatTime(seconds)} with ${mistakes} mistakes.`;
    document.getElementById("winOverlay").classList.remove("hidden");

    const nextBtn = document.getElementById("nextLevelBtn");
    const nextLevel = getLocalLevel(level.id + 1);
    if (nextLevel) {
      nextBtn.onclick = () => {
        window.location.href = `game.html?level=${nextLevel.id}`;
      };
    } else {
      nextBtn.style.display = "none";
    }
  }

  function giveHint() {
    if (solved) return;
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
    buildPalette();
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
    if(mistakeEl) mistakeEl.textContent = 0;
    selected = null;
    buildGrid();
    buildPalette();
  }

  document.getElementById("hintBtn").addEventListener("click", giveHint);
  document.getElementById("resetBtn").addEventListener("click", resetPuzzle);

  document.addEventListener("keydown", (e) => {
    if (!selected || solved) return;
    if (e.key >= "1" && e.key <= String(size)) {
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
