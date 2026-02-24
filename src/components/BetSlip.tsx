import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { BetSlipItem } from '../types';
import { calculatePayout, calculateParlayPayout, formatOdds, americanToDecimal } from '../utils/odds';

const { height } = Dimensions.get('window');

interface BetSlipProps {
  betSlip: BetSlipItem[];
  setBetSlip: any;
  parlayMode: boolean;
  setParlayMode: any;
  onClose: () => void;
}

export default function BetSlip({ betSlip, setBetSlip, parlayMode, setParlayMode, onClose }: BetSlipProps) {
  const [parlayWager, setParlayWager] = useState('');

  const updateWager = (index: number, value: string) => {
    const updated = [...betSlip];
    updated[index] = { ...updated[index], wager: parseFloat(value) || 0 };
    setBetSlip(updated);
  };

  const removeBet = (index: number) => {
    const updated = betSlip.filter((_, i) => i !== index);
    setBetSlip(updated);
    if (updated.length === 0) {
      onClose();
    }
  };

  const getTotalPayout = () => {
    if (parlayMode) {
      const legs = betSlip.map(b => b.odds);
      const wager = parseFloat(parlayWager) || 0;
      return calculateParlayPayout(wager, legs);
    }
    let total = 0;
    betSlip.forEach(bet => {
      total += calculatePayout(bet.wager, bet.odds);
    });
    return total;
  };

  const getTotalWager = () => {
    if (parlayMode) return parseFloat(parlayWager) || 0;
    let total = 0;
    betSlip.forEach(bet => {
      total += bet.wager;
    });
    return total;
  };

  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: height * 0.7,
      backgroundColor: '#1a1a2e',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    }}>
      {/* Drag handle indicator */}
      <View style={{
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 4,
      }}>
        <View style={{
          width: 40,
          height: 4,
          backgroundColor: '#3a3a5a',
          borderRadius: 2,
        }} />
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#2a2a4a',
      }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Bet Slip</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={{ color: '#e63946', fontSize: 15, fontWeight: '600' }}>Close</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 8,
      }}>
        <TouchableOpacity
          onPress={() => setParlayMode(false)}
          style={{
            flex: 1,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: !parlayMode ? '#e63946' : '#16213e',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>Straight</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setParlayMode(true)}
          style={{
            flex: 1,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: parlayMode ? '#e63946' : '#16213e',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>Parlay</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        {betSlip.map((bet, index) => (
          <View key={index} style={{
            backgroundColor: '#16213e',
            borderRadius: 10,
            padding: 12,
            marginBottom: 8,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }} numberOfLines={2}>
                  {bet.description}
                </Text>
                <Text style={{ color: '#e63946', fontSize: 13, fontWeight: '600', marginTop: 4 }}>
                  {formatOdds(bet.odds)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => removeBet(index)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: '#2a2a4a',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#a0a0b8', fontSize: 15, fontWeight: '700', lineHeight: 16 }}>X</Text>
              </TouchableOpacity>
            </View>

            {!parlayMode && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <Text style={{ color: '#a0a0b8', fontSize: 13, marginRight: 8 }}>Wager $</Text>
                <TextInput
                  style={{
                    flex: 1,
                    backgroundColor: '#0f0f23',
                    color: '#fff',
                    borderRadius: 6,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    fontSize: 14,
                  }}
                  keyboardType="numeric"
                  value={bet.wager > 0 ? String(bet.wager) : ''}
                  onChangeText={(val) => updateWager(index, val)}
                  placeholder="0.00"
                  placeholderTextColor="#555"
                />
                {bet.wager > 0 && (
                  <Text style={{ color: '#2ecc71', fontSize: 13, marginLeft: 8 }}>
                    Win ${calculatePayout(bet.wager, bet.odds).toFixed(2)}
                  </Text>
                )}
              </View>
            )}
          </View>
        ))}

        {parlayMode && betSlip.length > 0 && (
          <View style={{
            backgroundColor: '#16213e',
            borderRadius: 10,
            padding: 14,
            marginTop: 4,
          }}>
            <Text style={{ color: '#a0a0b8', fontSize: 13, marginBottom: 8 }}>
              {betSlip.length}-Leg Parlay
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#a0a0b8', fontSize: 13, marginRight: 8 }}>Wager $</Text>
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: '#0f0f23',
                  color: '#fff',
                  borderRadius: 6,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  fontSize: 14,
                }}
                keyboardType="numeric"
                value={parlayWager}
                onChangeText={setParlayWager}
                placeholder="0.00"
                placeholderTextColor="#555"
              />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={{
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: '#2a2a4a',
        backgroundColor: '#1a1a2e',
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ color: '#a0a0b8', fontSize: 14 }}>Total Wager</Text>
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>
            ${getTotalWager().toFixed(2)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
          <Text style={{ color: '#a0a0b8', fontSize: 14 }}>Potential Payout</Text>
          <Text style={{ color: '#2ecc71', fontSize: 14, fontWeight: '600' }}>
            ${getTotalPayout().toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={{
          backgroundColor: '#2ecc71',
          borderRadius: 10,
          paddingVertical: 14,
          alignItems: 'center',
        }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>Place Bet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
