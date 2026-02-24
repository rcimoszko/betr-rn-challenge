import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';

interface HeaderProps {
  title: string;
  searchQuery?: string;
  onSearchChange?: (text: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title, searchQuery, onSearchChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.accentBar} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {onSearchChange !== undefined && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search teams..."
          placeholderTextColor="#6b6b85"
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    paddingTop: 50,
    paddingBottom: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  accentBar: {
    width: 4,
    height: 22,
    backgroundColor: '#e63946',
    borderRadius: 2,
    marginRight: 10,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  searchInput: {
    backgroundColor: '#0f0f23',
    color: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 11 : 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
});

export default Header;
