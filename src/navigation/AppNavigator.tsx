import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import GameDetailScreen from '../screens/GameDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ betSlip, setBetSlip, parlayMode, setParlayMode }: any) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home">
        {(props) => (
          <HomeScreen
            {...props}
            betSlip={betSlip}
            setBetSlip={setBetSlip}
            parlayMode={parlayMode}
            setParlayMode={setParlayMode}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="GameDetail">
        {(props) => (
          <GameDetailScreen
            {...props}
            betSlip={betSlip}
            setBetSlip={setBetSlip}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
