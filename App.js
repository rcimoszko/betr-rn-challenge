import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * There is an async function, fetchGames() that will give you a list of games.
 *
 * - Fetch the games data via `fetchGames()`
 * - Display a list of games. Each row should include some details about the game (homeTeam, awayTeam, startTime)
 * - Show a loading indicator while data is fetching
 * - Clicking on a game should display the title ("{homeTeam} vs {awayTeam}") of game
 * - Make the items in the list selectable (single selection, ability to deselect)
 * - Optional: apply render optimisations if needed
 * - Optional: create a custom hook for fetching the game data
 * - Optional: group the games by date and display the date above each group
 * - Optional: add pull to refresh functionality
 */

function App() {
  return (
    <View style={styles.app}>
      <Text>
        {/** Add the selected game title here **/}
        Select a game
      </Text>
      {/** Add a list of games here **/}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default App;
