import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLOR, GAME_CARD_SIZE } from '../constants';

export const Card = React.memo(
  ({ value = '', show = false, matched = false, onCardPress = () => {} }) => {
    if (matched) {
      return (
        <View style={{ ...styles.card, backgroundColor: 'transparent' }} />
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          !show && onCardPress();
        }}
        style={styles.card}>
        {show ? <Text style={styles.cardText}>{value}</Text> : <Text />}
      </TouchableOpacity>
    );
  },
  (prev, next) => {
    return prev.show === next.show;
  },
);

const styles = StyleSheet.create({
  card: {
    height: GAME_CARD_SIZE,
    width: GAME_CARD_SIZE,
    borderWidth: 2,
    backgroundColor: COLOR.card,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 6,
  },
  cardText: {
    color: COLOR.text,
    fontSize: 40,
    fontWeight: 'bold',
  },
});
