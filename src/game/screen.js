import React, { useEffect, useReducer } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import reducer, { initialState } from './reducer';
import {
  COLOR,
  MAX_CARD_MATCH,
  ACTION_TYPE,
  UNIQUE_CARDS,
  CARD_EVALUATION_DELAY,
} from './constants';
import { Card } from './components';

let timeout = null;

const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTION_TYPE.CREATE_GAME, payload: UNIQUE_CARDS });
  }, []);

  useEffect(() => {
    if (state.openCardIndexes.length === MAX_CARD_MATCH) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        dispatch({ type: ACTION_TYPE.EVAL_CARD_CLICKED });
      }, CARD_EVALUATION_DELAY);
    }
  }, [state.openCardIndexes]);

  const handleCardPress = clickedIndex => {
    dispatch({ type: ACTION_TYPE.CARD_CLICKED, payload: { clickedIndex } });
  };

  const gameBoardView = () => {
    if (state.matches === UNIQUE_CARDS.length) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>You did it in {state.attempts} attempts</Text>
        </View>
      );
    }
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.gameBoard}>
          {Object.entries(state.gameBoard).map(([key, card]) => {
            return (
              <Card
                {...card}
                key={`${card.value}+${key}`}
                onCardPress={() => handleCardPress(key)}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.gameScreen}>
      <View>
        <Text style={styles.title}>Memory Game</Text>
        <View style={styles.scoreRow}>
          <Text style={styles.score}>Matches: {state.matches}</Text>
          <Text style={styles.score}>Attempts: {state.attempts}</Text>
        </View>
      </View>

      {gameBoardView()}

      <TouchableOpacity
        onPress={() =>
          dispatch({ type: ACTION_TYPE.CREATE_GAME, payload: UNIQUE_CARDS })
        }
        style={{ justifyContent: 'flex-end', paddingHorizontal: 30 }}>
        <Text style={styles.restart}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gameScreen: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
  gameBoard: {
    width: '100%',
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
    marginBottom: 15,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
});

export default Game;
