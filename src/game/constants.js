import { Dimensions } from 'react-native';

export const COLOR = {
  text: '#20232a',
  card: '#61dafb',
};

export const MAX_CARD_MATCH = 2; // TODO: check if this works
export const UNIQUE_CARDS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const GAME_CARD_SIZE = Dimensions.get('window').width / 4 - 20;

export const ACTION_TYPE = {
  CREATE_GAME: 'CREATE_GAME',
  CARD_CLICKED: 'CARD_CLICKED',
  EVAL_CARD_CLICKED: 'EVAL_CARD_CLICKED',
};

export const CARD_EVALUATION_DELAY = 500;
