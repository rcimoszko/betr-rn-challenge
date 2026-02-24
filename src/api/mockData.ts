import { Game } from '../types';

export const GAMES: Game[] = [
  {
    id: '1',
    homeTeam: { name: 'Los Angeles Lakers', record: '32-25' },
    awayTeam: { name: 'Boston Celtics', record: '40-17' },
    date: '2025-03-15T19:30:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: 4.5, odds: -110 },
        away: { line: -4.5, odds: -110 },
      },
      moneyline: { home: 160, away: -190 },
      total: {
        over: { line: 224.5, odds: -110 },
        under: { line: 224.5, odds: -110 },
      },
    },
  },
  {
    id: '2',
    homeTeam: { name: 'Golden State Warriors', record: '30-27' },
    awayTeam: { name: 'Phoenix Suns', record: '33-24' },
    date: '2025-03-15T22:00:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: -2.5, odds: -108 },
        away: { line: 2.5, odds: -112 },
      },
      moneyline: { home: -135, away: 115 },
      total: {
        over: { line: 230.0, odds: -112 },
        under: { line: 230.0, odds: -108 },
      },
    },
  },
  {
    id: '3',
    homeTeam: { name: 'Milwaukee Bucks', record: '36-21' },
    awayTeam: { name: 'Philadelphia 76ers', record: '28-29' },
    date: '2025-03-16T13:00:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: -7.0, odds: -110 },
        away: { line: 7.0, odds: -110 },
      },
      moneyline: { home: -300, away: 240 },
      total: {
        over: { line: 228.5, odds: -105 },
        under: { line: 228.5, odds: -115 },
      },
    },
  },
  {
    id: '4',
    homeTeam: { name: 'Denver Nuggets', record: '38-19' },
    awayTeam: { name: 'Oklahoma City Thunder', record: '41-16' },
    date: '2025-03-16T15:30:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: 1.5, odds: -110 },
        away: { line: -1.5, odds: -110 },
      },
      moneyline: { home: 105, away: -125 },
      total: {
        over: { line: 221.0, odds: -110 },
        under: { line: 221.0, odds: -110 },
      },
    },
  },
  {
    id: '5',
    homeTeam: { name: 'Miami Heat', record: '29-28' },
    awayTeam: { name: 'New York Knicks', record: '35-22' },
    date: '2025-03-16T18:00:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: 3.0, odds: -110 },
        away: { line: -3.0, odds: -110 },
      },
      moneyline: { home: 130, away: -150 },
      total: {
        over: { line: 212.5, odds: -110 },
        under: { line: 212.5, odds: -110 },
      },
    },
  },
  {
    id: '6',
    homeTeam: { name: 'Dallas Mavericks', record: '34-23' },
    awayTeam: { name: 'Minnesota Timberwolves', record: '36-21' },
    date: '2025-03-17T19:30:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: -1.0, odds: -105 },
        away: { line: 1.0, odds: -115 },
      },
      moneyline: { home: -118, away: -102 },
      total: {
        over: { line: 218.5, odds: -110 },
        under: { line: 218.5, odds: -110 },
      },
    },
  },
  {
    id: '7',
    homeTeam: { name: 'Cleveland Cavaliers', record: '39-18' },
    awayTeam: { name: 'Indiana Pacers', record: '31-26' },
    date: '2025-03-17T19:00:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: -6.5, odds: -110 },
        away: { line: 6.5, odds: -110 },
      },
      moneyline: { home: -275, away: 220 },
      total: {
        over: { line: 226.0, odds: -108 },
        under: { line: 226.0, odds: -112 },
      },
    },
  },
  {
    id: '8',
    homeTeam: { name: 'Sacramento Kings', record: '28-29' },
    awayTeam: { name: 'Houston Rockets', record: '34-23' },
    date: '2025-03-17T22:00:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: 2.0, odds: -110 },
        away: { line: -2.0, odds: -110 },
      },
      moneyline: { home: 115, away: -135 },
      total: {
        over: { line: 219.0, odds: -110 },
        under: { line: 219.0, odds: -110 },
      },
    },
  },
  {
    id: '9',
    homeTeam: { name: 'Chicago Bulls', record: '24-33' },
    awayTeam: { name: 'Toronto Raptors', record: '20-37' },
    date: '2025-03-18T20:00:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: -4.5, odds: -110 },
        away: { line: 4.5, odds: -110 },
      },
      moneyline: { home: -190, away: 160 },
      total: {
        over: { line: 215.5, odds: -110 },
        under: { line: 215.5, odds: -110 },
      },
    },
  },
  {
    id: '10',
    homeTeam: { name: 'Portland Trail Blazers', record: '18-39' },
    awayTeam: { name: 'San Antonio Spurs', record: '22-35' },
    date: '2025-03-18T22:00:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: -2.0, odds: -108 },
        away: { line: 2.0, odds: -112 },
      },
      moneyline: { home: -130, away: 110 },
      total: {
        over: { line: 217.0, odds: -110 },
        under: { line: 217.0, odds: -110 },
      },
    },
  },
  {
    id: '11',
    homeTeam: { name: 'Memphis Grizzlies', record: '33-24' },
    awayTeam: { name: 'New Orleans Pelicans', record: '21-36' },
    date: '2025-03-18T20:00:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: -9.5, odds: -110 },
        away: { line: 9.5, odds: -110 },
      },
      moneyline: { home: -420, away: 320 },
      total: {
        over: { line: 222.0, odds: -110 },
        under: { line: 222.0, odds: -110 },
      },
    },
  },
  {
    id: '12',
    homeTeam: { name: 'Atlanta Hawks', record: '26-31' },
    awayTeam: { name: 'Charlotte Hornets', record: '16-41' },
    date: '2025-03-19T19:30:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: -8.0, odds: -110 },
        away: { line: 8.0, odds: -110 },
      },
      moneyline: { home: -350, away: 275 },
      total: {
        over: { line: 225.0, odds: -105 },
        under: { line: 225.0, odds: -115 },
      },
    },
  },
  {
    id: '13',
    homeTeam: { name: 'Brooklyn Nets', record: '19-38' },
    awayTeam: { name: 'Detroit Pistons', record: '23-34' },
    date: '2025-03-19T19:30:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: -1.5, odds: -110 },
        away: { line: 1.5, odds: -110 },
      },
      moneyline: { home: -125, away: 105 },
      total: {
        over: { line: 213.0, odds: -110 },
        under: { line: 213.0, odds: -110 },
      },
    },
  },
  {
    id: '14',
    homeTeam: { name: 'Utah Jazz', record: '17-40' },
    awayTeam: { name: 'Washington Wizards', record: '14-43' },
    date: '2025-03-19T21:00:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: -3.5, odds: -110 },
        away: { line: 3.5, odds: -110 },
      },
      moneyline: { home: -160, away: 140 },
      total: {
        over: { line: 220.0, odds: -110 },
        under: { line: 220.0, odds: -110 },
      },
    },
  },
  {
    id: '15',
    homeTeam: { name: 'Los Angeles Clippers', record: '27-30' },
    awayTeam: { name: 'Orlando Magic', record: '31-26' },
    date: '2025-03-20T22:30:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: 3.5, odds: -110 },
        away: { line: -3.5, odds: -110 },
      },
      moneyline: { home: 145, away: -170 },
      total: {
        over: { line: 210.5, odds: -110 },
        under: { line: 210.5, odds: -110 },
      },
    },
  },
  {
    id: '16',
    homeTeam: { name: 'Phoenix Suns', record: '33-24' },
    awayTeam: { name: 'Los Angeles Lakers', record: '32-25' },
    date: '2025-03-20T22:00:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: -3.0, odds: -110 },
        away: { line: 3.0, odds: -110 },
      },
      moneyline: { home: -155, away: 135 },
      total: {
        over: { line: 226.5, odds: -108 },
        under: { line: 226.5, odds: -112 },
      },
    },
  },
  {
    id: '17',
    homeTeam: { name: 'Boston Celtics', record: '40-17' },
    awayTeam: { name: 'Milwaukee Bucks', record: '36-21' },
    date: '2025-03-21T19:30:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: -4.0, odds: -108 },
        away: { line: 4.0, odds: -112 },
      },
      moneyline: { home: -185, away: 155 },
      total: {
        over: { line: 231.0, odds: -110 },
        under: { line: 231.0, odds: -110 },
      },
    },
  },
  {
    id: '18',
    homeTeam: { name: 'Oklahoma City Thunder', record: '41-16' },
    awayTeam: { name: 'Golden State Warriors', record: '30-27' },
    date: '2025-03-21T20:00:00Z',
    status: 'upcoming',
    market: {
      spread: {
        home: { line: -5.5, odds: -110 },
        away: { line: 5.5, odds: -110 },
      },
      moneyline: { home: -225, away: 185 },
      total: {
        over: { line: 223.5, odds: -110 },
        under: { line: 223.5, odds: -110 },
      },
    },
  },
];
