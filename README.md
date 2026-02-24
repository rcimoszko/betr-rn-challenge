# Betr Sportsbook - React Native Challenge

An NBA sportsbook app built with React Native and Expo. Browse upcoming NBA games, view betting lines (spread, moneyline, total), and build a bet slip with straight or parlay wagers.

## Getting Started

### Prerequisites

- Node.js 20+
- Expo CLI (`npx expo`)
- iOS Simulator (Xcode) or Android Emulator

### Installation

```bash
npm install
```

### Running the App

```bash
npx expo start
```

Then press `i` for iOS simulator or `a` for Android emulator.

## Features

- Browse upcoming NBA games with live odds
- Search/filter games by team name
- Pull-to-refresh game list
- Simulated live odds movement
- Game detail view with full betting markets
- Bet slip with straight and parlay modes
- Wager input with payout calculation

## Tech Stack

- Expo SDK 54
- React Native 0.81
- React Navigation (Native Stack)
- TypeScript

## Project Structure

```
src/
  api/          - Mock data and API layer
  components/   - Reusable UI components
  navigation/   - React Navigation setup
  screens/      - App screens
  types/        - TypeScript type definitions
  utils/        - Utility functions
```
