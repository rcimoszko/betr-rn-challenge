export interface Team {
  name: string;
  record: string;
  logo?: string;
}

export interface OddsValue {
  line?: number;
  odds: number;
}

export interface Market {
  spread: {
    home: OddsValue;
    away: OddsValue;
  };
  moneyline: {
    home: number;
    away: number;
  };
  total: {
    over: OddsValue;
    under: OddsValue;
  };

}

export interface Game {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  status: string;
  market: Market;
}

export type BetType = 'spread' | 'moneyline' | 'total' | 'playerProp';

export interface BetSelection {
  gameId: string;
  betType: BetType;
  selection: string;
  odds: number;
  line?: number;
  description: string;
}

export interface BetSlipItem extends BetSelection {
  wager: number;
}
