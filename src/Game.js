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
  GAME_CARD_SIZE,
  MAX_CARD_MATCH,
  ACTION_TYPE,
  CARDS,
} from './constants';

let timeout = null;

const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTION_TYPE.CREATE_GAME, payload: CARDS });
  }, []);

  useEffect(() => {
    if (state.openCardIndexes.length === MAX_CARD_MATCH) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log('Timeout over');
        dispatch({ type: ACTION_TYPE.EVAL_CARD_CLICKED });
      }, 1000);
    }
  }, [state.openCardIndexes]);

  const handleCardPress = clickedIndex => {
    dispatch({ type: ACTION_TYPE.CARD_CLICKED, payload: { clickedIndex } });
  };

  const gameBoardView = () => {
    if (state.matches === CARDS.length) {
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
    );
  };

  return (
    <View style={styles.gameScreen}>
      <View style={{ paddingHorizontal: 30 }}>
        <Text style={styles.title}>Memory Game</Text>
        <View style={styles.scoreRow}>
          <Text style={styles.score}>Matches: {state.matches}</Text>
          <Text style={styles.score}>Attempts: {state.attempts}</Text>
        </View>
      </View>
      {/* <ScrollView> */}
      {gameBoardView()}
      {/* </ScrollView> */}

      <TouchableOpacity
        onPress={() =>
          dispatch({ type: ACTION_TYPE.CREATE_GAME, payload: CARDS })
        }
        style={{ justifyContent: 'flex-end', paddingHorizontal: 30 }}>
        <Text style={styles.restart}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
};

const Card = React.memo(
  ({ value = '', show = false, matched = false, onCardPress = () => {} }) => {
    console.log('==== card ', value, ' :: ', show);
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
  gameScreen: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 30,
    alignItems: 'center',
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
    justifyContent: 'space-between',
    marginTop: 30,
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
