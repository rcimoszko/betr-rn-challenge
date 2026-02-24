import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { fetchGames } from '../api/fetchGames';
import { formatOdds } from '../utils/odds';
import { Game, BetSlipItem } from '../types';
import Header from '../components/Header';
import BetSlip from '../components/BetSlip';

const { width } = Dimensions.get('window');
const ACCENT = '#e63946';
const DARK_BG = '#0f0f23';
const CARD_BG = '#1a1a2e';
const SURFACE = '#16213e';
const TEXT_PRIMARY = '#ffffff';
const TEXT_SECONDARY = '#a0a0b8';
const GREEN = '#2ecc71';

interface HomeScreenProps {
  navigation: any;
  betSlip: BetSlipItem[];
  setBetSlip: any;
  parlayMode: boolean;
  setParlayMode: any;
}

export default function HomeScreen({ navigation, betSlip, setBetSlip, parlayMode, setParlayMode }: HomeScreenProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveOdds, setLiveOdds] = useState<any>({});
  const [showBetSlip, setShowBetSlip] = useState(false);

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveOdds((prev: any) => {
        const updated = { ...prev };
        games.forEach(game => {
          const fluctuation = (Math.random() - 0.5) * 6;
          const spreadFluctuation = (Math.random() - 0.5) * 1.5;
          updated[game.id] = {
            moneylineHome: game.market.moneyline.home + Math.round(fluctuation),
            moneylineAway: game.market.moneyline.away + Math.round(fluctuation),
            spreadHome: {
              line: game.market.spread.home.line + Math.round(spreadFluctuation * 2) / 2,
              odds: game.market.spread.home.odds + Math.round((Math.random() - 0.5) * 10),
            },
            spreadAway: {
              line: game.market.spread.away.line - Math.round(spreadFluctuation * 2) / 2,
              odds: game.market.spread.away.odds + Math.round((Math.random() - 0.5) * 10),
            },
            totalOver: {
              line: game.market.total.over.line + Math.round((Math.random() - 0.5) * 2),
              odds: game.market.total.over.odds + Math.round((Math.random() - 0.5) * 10),
            },
            totalUnder: {
              line: game.market.total.under.line + Math.round((Math.random() - 0.5) * 2),
              odds: game.market.total.under.odds + Math.round((Math.random() - 0.5) * 10),
            },
          };
        });
        return updated;
      });
    }, 3000);
  }, [games]);

  const loadGames = async () => {
    setLoading(true);
    const data = await fetchGames();
    setGames([...games, ...data]);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const data = await fetchGames();
    setGames([...games, ...data]);
    setRefreshing(false);
  };

  const getFilteredGames = () => {
    if (!searchQuery.trim()) return games;

    const filtered: Game[] = [];
    for (let i = 0; i < games.length; i++) {
      const game = games[i];
      const homeWords = game.homeTeam.name.split(' ');
      const awayWords = game.awayTeam.name.split(' ');
      let matches = false;
      for (let j = 0; j < homeWords.length; j++) {
        for (let k = 0; k < searchQuery.split(' ').length; k++) {
          if (homeWords[j].toLowerCase().includes(searchQuery.split(' ')[k].toLowerCase())) {
            matches = true;
          }
        }
      }
      for (let j = 0; j < awayWords.length; j++) {
        for (let k = 0; k < searchQuery.split(' ').length; k++) {
          if (awayWords[j].toLowerCase().includes(searchQuery.split(' ')[k].toLowerCase())) {
            matches = true;
          }
        }
      }
      if (matches) {
        filtered.push(game);
      }
    }
    return filtered;
  };

  const addToBetSlip = (gameId: string, betType: string, selection: string, odds: number, line?: number) => {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    const description = `${game.awayTeam.name} @ ${game.homeTeam.name} - ${selection}`;

    setBetSlip([...betSlip, {
      gameId,
      betType,
      selection,
      odds,
      line,
      description,
      wager: 0,
    }]);
  };

  const formatGameDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let dayLabel = '';
    if (date.toDateString() === now.toDateString()) {
      dayLabel = 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      dayLabel = 'Tomorrow';
    } else {
      dayLabel = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }

    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return `${dayLabel} ${time}`;
  };

  const filteredGames = getFilteredGames();

  const groupedGames: { [key: string]: Game[] } = {};
  filteredGames.forEach(game => {
    const dateKey = new Date(game.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    if (!groupedGames[dateKey]) {
      groupedGames[dateKey] = [];
    }
    groupedGames[dateKey].push(game);
  });

  if (loading && games.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: DARK_BG, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={ACCENT} />
        <Text style={{ color: TEXT_SECONDARY, marginTop: 12, fontSize: 16 }}>Loading games...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: DARK_BG }}>
      <StatusBar style="light" />
      <Header
        title="NBA Lines"
        searchQuery={searchQuery}
        onSearchChange={(text) => setSearchQuery(text)}
      />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={TEXT_SECONDARY} />
        }
        contentContainerStyle={{ paddingBottom: betSlip.length > 0 ? 140 : 20, paddingTop: 4 }}
      >
        {Object.keys(groupedGames).map((dateKey) => (
          <View key={dateKey}>
            <Text style={{
              color: TEXT_PRIMARY,
              fontSize: 13,
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              paddingHorizontal: 16,
              paddingTop: 18,
              paddingBottom: 10,
            }}>
              {dateKey}
            </Text>

            {groupedGames[dateKey].map((game, index) => {
              const odds = liveOdds[game.id];
              const spreadHome = odds?.spreadHome || game.market.spread.home;
              const spreadAway = odds?.spreadAway || game.market.spread.away;
              const moneylineHome = odds?.moneylineHome ?? game.market.moneyline.home;
              const moneylineAway = odds?.moneylineAway ?? game.market.moneyline.away;
              const totalOver = odds?.totalOver || game.market.total.over;
              const totalUnder = odds?.totalUnder || game.market.total.under;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate('GameDetail', { game })}
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: CARD_BG,
                    marginHorizontal: 12,
                    marginBottom: 10,
                    borderRadius: 12,
                    overflow: 'hidden',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    borderLeftWidth: 3,
                    borderLeftColor: ACCENT,
                  }}
                >
                  <View style={{ padding: 14 }}>
                    {/* Top row: date + status badge */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <Text style={{ color: TEXT_SECONDARY, fontSize: 11, fontWeight: '500' }}>
                        {formatGameDate(game.date)}
                      </Text>
                      <View style={{ backgroundColor: '#1b3a2a', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 }}>
                        <Text style={{ color: GREEN, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 }}>UPCOMING</Text>
                      </View>
                    </View>

                    {/* Column headers for the odds grid */}
                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                      <View style={{ flex: 1.2 }} />
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: TEXT_SECONDARY, fontSize: 10, fontWeight: '600', letterSpacing: 0.5 }}>SPREAD</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: TEXT_SECONDARY, fontSize: 10, fontWeight: '600', letterSpacing: 0.5 }}>MONEY</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: TEXT_SECONDARY, fontSize: 10, fontWeight: '600', letterSpacing: 0.5 }}>TOTAL</Text>
                      </View>
                    </View>

                    {/* Away team row */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                      <View style={{ flex: 1.2, paddingRight: 6 }}>
                        <Text style={{ color: TEXT_PRIMARY, fontSize: 14, fontWeight: '600' }}>{game.awayTeam.name}</Text>
                        <Text style={{ color: TEXT_SECONDARY, fontSize: 11, marginTop: 1 }}>{game.awayTeam.record}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => addToBetSlip(game.id, 'spread', `${game.awayTeam.name} ${spreadAway.line > 0 ? '+' : ''}${spreadAway.line}`, spreadAway.odds, spreadAway.line)}
                        style={{
                          flex: 1,
                          backgroundColor: SURFACE,
                          paddingVertical: 8,
                          borderRadius: 6,
                          alignItems: 'center',
                          marginHorizontal: 3,
                        }}
                      >
                        <Text style={{ color: TEXT_PRIMARY, fontSize: 13, fontWeight: '600' }}>
                          {spreadAway.line > 0 ? '+' : ''}{spreadAway.line}
                        </Text>
                        <Text style={{ color: ACCENT, fontSize: 11, marginTop: 1 }}>{formatOdds(spreadAway.odds)}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => addToBetSlip(game.id, 'moneyline', `${game.awayTeam.name} ML`, moneylineAway)}
                        style={{
                          flex: 1,
                          backgroundColor: SURFACE,
                          paddingVertical: 8,
                          borderRadius: 6,
                          alignItems: 'center',
                          marginHorizontal: 3,
                        }}
                      >
                        <Text style={{ color: TEXT_PRIMARY, fontSize: 13, fontWeight: '600' }}>
                          {formatOdds(moneylineAway)}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => addToBetSlip(game.id, 'total', `Over ${totalOver.line}`, totalOver.odds, totalOver.line)}
                        style={{
                          flex: 1,
                          backgroundColor: SURFACE,
                          paddingVertical: 8,
                          borderRadius: 6,
                          alignItems: 'center',
                          marginHorizontal: 3,
                        }}
                      >
                        <Text style={{ color: TEXT_PRIMARY, fontSize: 12, fontWeight: '600' }}>O {totalOver.line}</Text>
                        <Text style={{ color: ACCENT, fontSize: 11, marginTop: 1 }}>{formatOdds(totalOver.odds)}</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Thin separator between away and home rows */}
                    <View style={{ height: 1, backgroundColor: '#2a2a4a', marginHorizontal: 0, marginBottom: 6 }} />

                    {/* Home team row */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ flex: 1.2, paddingRight: 6 }}>
                        <Text style={{ color: TEXT_PRIMARY, fontSize: 14, fontWeight: '600' }}>{game.homeTeam.name}</Text>
                        <Text style={{ color: TEXT_SECONDARY, fontSize: 11, marginTop: 1 }}>{game.homeTeam.record}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => addToBetSlip(game.id, 'spread', `${game.homeTeam.name} ${spreadHome.line > 0 ? '+' : ''}${spreadHome.line}`, spreadHome.odds, spreadHome.line)}
                        style={{
                          flex: 1,
                          backgroundColor: SURFACE,
                          paddingVertical: 8,
                          borderRadius: 6,
                          alignItems: 'center',
                          marginHorizontal: 3,
                        }}
                      >
                        <Text style={{ color: TEXT_PRIMARY, fontSize: 13, fontWeight: '600' }}>
                          {spreadHome.line > 0 ? '+' : ''}{spreadHome.line}
                        </Text>
                        <Text style={{ color: ACCENT, fontSize: 11, marginTop: 1 }}>{formatOdds(spreadHome.odds)}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => addToBetSlip(game.id, 'moneyline', `${game.homeTeam.name} ML`, moneylineHome)}
                        style={{
                          flex: 1,
                          backgroundColor: SURFACE,
                          paddingVertical: 8,
                          borderRadius: 6,
                          alignItems: 'center',
                          marginHorizontal: 3,
                        }}
                      >
                        <Text style={{ color: TEXT_PRIMARY, fontSize: 13, fontWeight: '600' }}>
                          {formatOdds(moneylineHome)}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => addToBetSlip(game.id, 'total', `Under ${totalUnder.line}`, totalUnder.odds, totalUnder.line)}
                        style={{
                          flex: 1,
                          backgroundColor: SURFACE,
                          paddingVertical: 8,
                          borderRadius: 6,
                          alignItems: 'center',
                          marginHorizontal: 3,
                        }}
                      >
                        <Text style={{ color: TEXT_PRIMARY, fontSize: 12, fontWeight: '600' }}>U {totalUnder.line}</Text>
                        <Text style={{ color: ACCENT, fontSize: 11, marginTop: 1 }}>{formatOdds(totalUnder.odds)}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {betSlip.length > 0 && (
        <TouchableOpacity
          onPress={() => setShowBetSlip(true)}
          style={{
            position: 'absolute',
            bottom: 30,
            left: 16,
            right: 16,
            backgroundColor: ACCENT,
            borderRadius: 12,
            paddingVertical: 14,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: ACCENT,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
            Bet Slip ({betSlip.length})
          </Text>
        </TouchableOpacity>
      )}

      {showBetSlip && (
        <BetSlip
          betSlip={betSlip}
          setBetSlip={setBetSlip}
          parlayMode={parlayMode}
          setParlayMode={setParlayMode}
          onClose={() => setShowBetSlip(false)}
        />
      )}
    </View>
  );
}
