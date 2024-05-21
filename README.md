## Betr React Native Technical Interview

👉 Setup:
The repo you will be cloning down is a react native expo project. Please ensure you have your environment setup and can run an iOS or android simulator as you will be required to have it open while working on this task.

You can clone the project at:

```
git clone https://github.com/rcimoszko/betr-rn-challenge.git
```

Run `yarn install` and then `yarn ios` to get started.

👉 Challenge Requirements:
- Fetch a list of games. An async function (`fetchGames()`) is provided that will give you a list of games.
- Display the games in a vertical scrollable list with the following information:
  - homeTeam
  - awayTeam
  - date
- Show a loading indicator while fetching data
- Clicking on a game should display the title `"{homeTeam} vs {awayTeam}"` above the list.
- Add the ability to select a game by clicking on it. 
  - The selected game should be highlighted in the list.
  - Only 1 game can be selected at a time.
  - Ability to deselect a game by clicking on it again.

Optional:
* Apply render optimizations if needed
* Create a custom hook for fetching data
* Group the games by date and display the date above each group
* Add pull to refresh functionality to the list
