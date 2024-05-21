const GAMES = [
  {
    id: 1,
    homeTeam: "BOS",
    awayTeam: "CLE",
    date: new Date(2023, 0, 1)
  },
  {
    id: 2,
    homeTeam: "LAL",
    awayTeam: "MIA",
    date: new Date(2023, 0, 1)
  },
  {
    id: 3,
    homeTeam: "PHO",
    awayTeam: "BKN",
    date: new Date(2023, 0, 2)
  },
  {
    id: 4,
    homeTeam: "TOR",
    awayTeam: "GSW",
    date: new Date(2023, 0, 2)
  },
  {
    id: 5,
    homeTeam: "DAL",
    awayTeam: "OKC",
    date: new Date(2023, 0, 2)
  },
  {
    id: 6,
    homeTeam: "MIN",
    awayTeam: "DEN",
    date: new Date(2023, 0, 3)
  }
];

/**
 * @typedef Game
 * @property {number} id
 * @property {string} homeTeam
 * @property {string} awayTeam
 * @property {Date} date
 */

/**
 * @return {Promise<Game[]>}
 */
export function fetchGames() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(GAMES), 2000);
  });
}

export function groupByDate(games) {}
