import React, { useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import reducer, { initialState } from './reducer';
import {
  COLOR,
  GAME_CARD_SIZE,
  MAX_CARD_MATCH,
  ACTION_TYPE,
} from './constants';

let timeout = null;
const CARDS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTION_TYPE.CREATE_GAME, payload: CARDS });
  }, []);

  useEffect(() => {
    if (state.openCardIndexes.length === MAX_CARD_MATCH) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        dispatch({ type: ACTION_TYPE.EVAL_CARD_CLICKED });
      }, 1000);
    }
  }, [state.openCardIndexes]);

  const handleCardPress = clickedIndex => {
    dispatch({ type: ACTION_TYPE.CARD_CLICKED, payload: { clickedIndex } });
  };

  return (
    <View style={styles.gameScreen}>
      <View>
        <Text style={styles.title}>Memory Game</Text>
      </View>
      <View style={styles.scoreRow}>
        <Text style={styles.score}>Matches: {state.matches}</Text>
        <Text style={styles.score}>Attempts: {state.attempts}</Text>
      </View>
      <View style={styles.gameBoard}>
        {Object.entries(state.gameBoard).map(([key, card]) => {
          return (
            <Card
              value={card.value}
              key={`${card.value}+${card.show}+${key}`}
              show={card.show}
              onCardPress={() => handleCardPress(key)}
            />
          );
        })}
      </View>
      <TouchableOpacity
        onPress={() =>
          dispatch({ type: ACTION_TYPE.CREATE_GAME, payload: CARDS })
        }>
        <Text style={styles.restart}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
};

const Card = React.memo(
  ({ value = '', show = false, onCardPress = () => {} }) => {
    console.log('==== card ', value, ' :: ', show);
    return (
      <TouchableOpacity
        onPress={() => {
          onCardPress();
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
