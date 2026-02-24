import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { BetSlipItem } from './src/types';

export default function App() {
  const [betSlip, setBetSlip] = useState<BetSlipItem[]>([]);
  const [parlayMode, setParlayMode] = useState(false);

  return (
    <NavigationContainer>
      <AppNavigator
        betSlip={betSlip}
        setBetSlip={setBetSlip}
        parlayMode={parlayMode}
        setParlayMode={setParlayMode}
      />
    </NavigationContainer>
  );
}
