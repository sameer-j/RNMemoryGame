import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { shuffle } from './utils';
import { COLOR, GAME_CARD_SIZE } from './constants';

const Game = () => {
  const [matches, setMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);
  let cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  cards = cards.concat(cards); // Double the cards to 16, with 2 copies of each
  shuffle(cards); // shuffle cards

  return (
    <View style={styles.gameScreen}>
      <View>
        <Text style={styles.title}>Memory Game</Text>
      </View>
      <View style={styles.scoreRow}>
        <Text style={styles.score}>Matches: {matches}</Text>
        <Text style={styles.score}>Attempts: {attempts}</Text>
      </View>
      <View style={styles.gameBoard}>
        {cards.map((cardVal, idx) => {
          return <Card value={cardVal} key={`${cardVal}+${idx}`} />;
        })}
      </View>
      <TouchableOpacity>
        <Text style={styles.restart}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
};

const Card = ({ value }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        toggleShow(index);
      }}
      style={styles.card}>
      <Text style={styles.textColor}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gameScreen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
  },
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
  gameBoard: {
    height: GAME_CARD_SIZE * 4.7,
    width: GAME_CARD_SIZE * 4.7,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 16,
    padding: 8,
    borderWidth: 4,
    borderColor: COLOR.text,
    borderRadius: 6,
    backgroundColor: COLOR.card,
    color: COLOR.text,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  score: {
    color: COLOR.text,
    fontSize: 15,
    fontWeight: 'bold',
  },
  scoreRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  restart: {
    color: COLOR.text,
    marginTop: 16,
    padding: 8,
    borderWidth: 2,
    borderColor: COLOR.text,
    borderRadius: 6,
    backgroundColor: COLOR.card,
    color: COLOR.text,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cardText: {
    color: COLOR.text,
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default Game;
