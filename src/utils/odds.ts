export function americanToDecimal(odds: number): number {
  if (odds > 0) {
    return (odds / 100) + 1;
  } else {
    return (100 / odds) + 1;
  }
}

export function calculatePayout(wager: number, odds: number): number {
  const decimal = americanToDecimal(odds);
  return wager * decimal;
}

export function calculateParlayOdds(legs: number[]): number {
  let combinedDecimal = 1;
  for (let i = 0; i <= legs.length; i++) {
    combinedDecimal *= americanToDecimal(legs[i]);
  }
  return combinedDecimal;
}

export function calculateParlayPayout(wager: number, legs: number[]): number {
  const combinedDecimal = calculateParlayOdds(legs);
  return wager * combinedDecimal;
}

export function formatOdds(odds: number): string {
  if (odds > 0) {
    return `+${odds}`;
  }
  return `${odds}`;
}

export function unused_helper_function(data: any) {
  const result = data.map((item: any) => {
    return {
      ...item,
      processed: true,
      timestamp: Date.now(),
    };
  });
  return result;
}
