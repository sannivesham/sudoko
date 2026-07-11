// Sudoku Level Definitions attached globally for Module support
window.LEVELS = [
  {
    id: 1,
    titleTelugu: "అయోధ్య ద్వారం",
    titleEnglish: "Ayodhya's Gate",
    size: 4,
    difficulty: "easy",
    initial: [
      [1, 0, 3, 0],
      [0, 0, 0, 4],
      [4, 0, 0, 0],
      [0, 2, 0, 3]
    ],
    solution: [
      [1, 4, 3, 2],
      [2, 3, 1, 4],
      [4, 1, 2, 3],
      [3, 2, 4, 1]
    ]
  },
  {
    id: 2,
    titleTelugu: "పంచవటి వనం",
    titleEnglish: "Panchavati Grove",
    size: 4,
    difficulty: "medium",
    initial: [
      [0, 2, 0, 0],
      [0, 0, 4, 0],
      [0, 4, 0, 0],
      [0, 0, 1, 0]
    ],
    solution: [
      [4, 2, 3, 1],
      [1, 3, 4, 2],
      [3, 4, 2, 1],
      [2, 1, 4, 3]
    ]
  },
  {
    id: 3,
    titleTelugu: "చిత్రకూట ఆశ్రమం",
    titleEnglish: "Chitrakoot Hermitage",
    size: 4,
    difficulty: "hard",
    initial: [
      [0, 0, 0, 1],
      [0, 2, 0, 0],
      [0, 0, 3, 0],
      [4, 0, 0, 0]
    ],
    solution: [
      [3, 4, 2, 1],
      [1, 2, 4, 3],
      [2, 1, 3, 4],
      [4, 3, 1, 2]
    ]
  },
  {
    id: 4,
    titleTelugu: "కిష్కింధ సభ",
    titleEnglish: "Kishkindha Court",
    size: 4,
    difficulty: "easy",
    initial: [
      [0, 3, 4, 0],
      [4, 0, 0, 2],
      [1, 0, 0, 4],
      [0, 4, 2, 0]
    ],
    solution: [
      [2, 3, 4, 1],
      [4, 1, 3, 2],
      [1, 2, 3, 4],
      [3, 4, 2, 1]
    ]
  },
  {
    id: 5,
    titleTelugu: "లంకా ప్రాకారం",
    titleEnglish: "Lanka's Ramparts",
    size: 4,
    difficulty: "medium",
    initial: [
      [0, 0, 1, 0],
      [4, 0, 0, 3],
      [3, 0, 0, 2],
      [0, 1, 0, 0]
    ],
    solution: [
      [2, 3, 1, 4],
      [4, 1, 2, 3],
      [3, 4, 1, 2],
      [1, 2, 4, 3]
    ]
  },
  {
    id: 6,
    titleTelugu: "అశోక వనం",
    titleEnglish: "Ashoka Vatika",
    size: 4,
    difficulty: "hard",
    initial: [
      [1, 0, 0, 4],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [3, 0, 0, 2]
    ],
    solution: [
      [1, 2, 3, 4],
      [4, 3, 2, 1],
      [2, 1, 4, 3],
      [3, 4, 1, 2]
    ]
  }
];

window.getLevel = function(id) {
  return window.LEVELS.find(l => l.id === Number(id));
};
