// Progress storage. This is intentionally a thin wrapper — when Firebase
// is wired in, only this file needs to change (swap localStorage calls for
// Firestore reads/writes against users/{uid}/sudokuProgress/{levelId}).

const Progress = (() => {
  const KEY = "mythologySudokuProgress";

  function loadAll() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveAll(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function getLevelProgress(levelId) {
    const all = loadAll();
    return all[levelId] || { completed: false, bestTimeSeconds: null, stars: 0 };
  }

  function isUnlocked(levelId) {
    if (Number(levelId) === 1) return true;
    const prev = getLevelProgress(Number(levelId) - 1);
    return !!prev.completed;
  }

  function recordCompletion(levelId, timeSeconds, stars) {
    const all = loadAll();
    const existing = all[levelId] || { completed: false, bestTimeSeconds: null, stars: 0 };
    all[levelId] = {
      completed: true,
      bestTimeSeconds: existing.bestTimeSeconds
        ? Math.min(existing.bestTimeSeconds, timeSeconds)
        : timeSeconds,
      stars: Math.max(existing.stars, stars),
    };
    saveAll(all);
  }

  return { getLevelProgress, isUnlocked, recordCompletion };
})();
