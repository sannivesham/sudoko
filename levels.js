// Level definitions. 
const LEVELS = [
  // 4x4 Grids (Ayodhya & Aranya Kanda)
  { id: 1, title: "Ayodhya's Gate",     size: 4, difficulty: "easy",   symbolCount: 4 },
  { id: 2, title: "Panchavati Grove",   size: 4, difficulty: "medium", symbolCount: 4 },
  { id: 3, title: "Chitrakoot Hermitage",size: 4, difficulty: "hard",   symbolCount: 4 },

  // 6x6 Grids (Kishkindha & Sundara Kanda)
  { id: 4, title: "Kishkindha Court",   size: 6, difficulty: "easy",   symbolCount: 6 },
  { id: 5, title: "Lanka's Ramparts",   size: 6, difficulty: "medium", symbolCount: 6 },
  { id: 6, title: "Ashoka Vatika",      size: 6, difficulty: "hard",   symbolCount: 6 },

  // 9x9 Grids (Mahabharata - Early Chapters)
  { id: 7, title: "Indraprastha Hall",  size: 9, difficulty: "easy",   symbolCount: 9 },
  { id: 8, title: "Hastinapur Court",   size: 9, difficulty: "medium", symbolCount: 9 },
  { id: 9, title: "Kamyaka Forest",     size: 9, difficulty: "medium", symbolCount: 9 },

  // 9x9 Grids (Mahabharata - The War)
  { id: 10, title: "Kurukshetra Field", size: 9, difficulty: "hard",   symbolCount: 9 },
  { id: 11, title: "Bhishma's Bed",     size: 9, difficulty: "hard",   symbolCount: 9 },
  { id: 12, title: "Yudhishthira's Crown",size: 9, difficulty: "hard", symbolCount: 9 },
];

function getLevel(id) {
  return LEVELS.find(l => l.id === Number(id));
}
