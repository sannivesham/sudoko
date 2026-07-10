// Level definitions. Add more levels here later — the engine and UI
// already support any size in {4, 6, 9}.

const LEVELS = [
  { id: 1, title: "Ayodhya's Gate",     size: 4, difficulty: "easy",   symbolCount: 4 },
  { id: 2, title: "Panchavati Grove",   size: 4, difficulty: "medium", symbolCount: 4 },
  { id: 3, title: "Kishkindha Court",   size: 6, difficulty: "easy",   symbolCount: 6 },
  { id: 4, title: "Lanka's Ramparts",   size: 6, difficulty: "medium", symbolCount: 6 },
  { id: 5, title: "Indraprastha Hall",  size: 9, difficulty: "easy",   symbolCount: 9 },
  { id: 6, title: "Kurukshetra Field",  size: 9, difficulty: "hard",   symbolCount: 9 },
];

function getLevel(id) {
  return LEVELS.find(l => l.id === Number(id));
}
