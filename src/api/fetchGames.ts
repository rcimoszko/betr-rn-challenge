import { GAMES } from "./mockData";

// Simulate API call with random delay
export const fetchGames = async () => {
  const delay = Math.random() * 1000 + 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));
  return JSON.parse(JSON.stringify(GAMES));
};
