import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { formatOdds } from '../utils/odds';
import { Game, BetSlipItem } from '../types';

export default function GameDetailScreen({ route, navigation, betSlip, setBetSlip }: any) {
  const { game } = route.params as { game: Game };

  const addToBetSlip = (betType: string, selection: string, odds: number, line?: number) => {
    const description = `${game.awayTeam.name} @ ${game.homeTeam.name} - ${selection}`;
    setBetSlip([...betSlip, {
      gameId: game.id,
      betType,
      selection,
      odds,
      line,
      description,
      wager: 0,
    }]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Game Detail</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.matchupCard}>
          <View style={styles.matchupAccent} />
          <View style={styles.matchupContent}>
            <View style={styles.teamColumn}>
              <Text style={styles.teamLabel}>AWAY</Text>
              <Text style={styles.teamName}>{game.awayTeam.name}</Text>
              <Text style={styles.record}>{game.awayTeam.record}</Text>
            </View>
            <View style={styles.vsContainer}>
              <View style={styles.vsBadge}>
                <Text style={styles.vsText}>VS</Text>
              </View>
              <Text style={styles.dateText}>
                {new Date(game.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </Text>
              <Text style={styles.timeText}>
                {new Date(game.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </Text>
            </View>
            <View style={[styles.teamColumn, { alignItems: 'flex-end' }]}>
              <Text style={styles.teamLabel}>HOME</Text>
              <Text style={styles.teamName}>{game.homeTeam.name}</Text>
              <Text style={styles.record}>{game.homeTeam.record}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Spread</Text>
        </View>

        <View style={styles.marketRow}>
          <TouchableOpacity
            style={styles.betButton}
            onPress={() => addToBetSlip('spread', `${game.awayTeam.name} ${game.market.spread.away.line > 0 ? '+' : ''}${game.market.spread.away.line}`, game.market.spread.away.odds, game.market.spread.away.line)}
          >
            <Text style={styles.betTeam}>{game.awayTeam.name}</Text>
            <Text style={styles.betLine}>{game.market.spread.away.line > 0 ? '+' : ''}{game.market.spread.away.line}</Text>
            <Text style={styles.betOdds}>{formatOdds(game.market.spread.away.odds)}</Text>
            <Text style={styles.addLabel}>Add to Bet Slip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.betButton}
            onPress={() => addToBetSlip('spread', `${game.homeTeam.name} ${game.market.spread.home.line > 0 ? '+' : ''}${game.market.spread.home.line}`, game.market.spread.home.odds, game.market.spread.home.line)}
          >
            <Text style={styles.betTeam}>{game.homeTeam.name}</Text>
            <Text style={styles.betLine}>{game.market.spread.home.line > 0 ? '+' : ''}{game.market.spread.home.line}</Text>
            <Text style={styles.betOdds}>{formatOdds(game.market.spread.home.odds)}</Text>
            <Text style={styles.addLabel}>Add to Bet Slip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Moneyline</Text>
        </View>

        <View style={styles.marketRow}>
          <TouchableOpacity
            style={styles.betButton}
            onPress={() => addToBetSlip('moneyline', `${game.awayTeam.name} ML`, game.market.moneyline.away)}
          >
            <Text style={styles.betTeam}>{game.awayTeam.name}</Text>
            <Text style={styles.betOdds}>{formatOdds(game.market.moneyline.away)}</Text>
            <Text style={styles.addLabel}>Add to Bet Slip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.betButton}
            onPress={() => addToBetSlip('moneyline', `${game.homeTeam.name} ML`, game.market.moneyline.home)}
          >
            <Text style={styles.betTeam}>{game.homeTeam.name}</Text>
            <Text style={styles.betOdds}>{formatOdds(game.market.moneyline.home)}</Text>
            <Text style={styles.addLabel}>Add to Bet Slip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Total Points</Text>
        </View>

        <View style={styles.marketRow}>
          <TouchableOpacity
            style={styles.betButton}
            onPress={() => addToBetSlip('total', `Over ${game.market.total.over.line}`, game.market.total.over.odds, game.market.total.over.line)}
          >
            <Text style={styles.betTeam}>Over</Text>
            <Text style={styles.betLine}>{game.market.total.over.line}</Text>
            <Text style={styles.betOdds}>{formatOdds(game.market.total.over.odds)}</Text>
            <Text style={styles.addLabel}>Add to Bet Slip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.betButton}
            onPress={() => addToBetSlip('total', `Under ${game.market.total.under.line}`, game.market.total.under.odds, game.market.total.under.line)}
          >
            <Text style={styles.betTeam}>Under</Text>
            <Text style={styles.betLine}>{game.market.total.under.line}</Text>
            <Text style={styles.betOdds}>{formatOdds(game.market.total.under.odds)}</Text>
            <Text style={styles.addLabel}>Add to Bet Slip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    backgroundColor: '#1a1a2e',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  backButton: {
    width: 60,
  },
  backText: {
    color: '#e63946',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  matchupCard: {
    backgroundColor: '#1a1a2e',
    margin: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  matchupAccent: {
    height: 3,
    backgroundColor: '#e63946',
  },
  matchupContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamColumn: {
    flex: 1,
  },
  teamLabel: {
    color: '#6b6b85',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  teamName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  record: {
    color: '#a0a0b8',
    fontSize: 13,
    marginTop: 4,
  },
  vsContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  vsBadge: {
    backgroundColor: '#2a2a4a',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 6,
  },
  vsText: {
    color: '#a0a0b8',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  dateText: {
    color: '#a0a0b8',
    fontSize: 11,
    marginTop: 2,
  },
  timeText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  sectionTitle: {
    color: '#a0a0b8',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  marketRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 8,
  },
  betButton: {
    flex: 1,
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  betTeam: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  betLine: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  betOdds: {
    color: '#e63946',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  addLabel: {
    color: '#6b6b85',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
