import { shuffle } from './utils';
import { ACTION_TYPE, MAX_CARD_MATCH } from './constants';

export const initialState = {
  matches: 0,
  attempts: 0,
  gameBoard: {},
  openCardIndexes: [],
};

const initGameBoard = cards => {
  const gameBoard = {};
  const gameCards = shuffle([...cards, ...cards]); // Double the cards to 16, with 2 copies of each & Shuffle
  gameCards.forEach((cardVal, index) => {
    gameBoard[index] = {
      value: cardVal,
      show: false,
      isDisabled: false,
    };
  });
  return gameBoard;
};

const openCards = ({ gameBoard, openCardIndexes }, { clickedIndex }) => {
  if (openCardIndexes.length >= MAX_CARD_MATCH) {
    //TODO
    return {};
  }
  console.log('OpenCards: ', clickedIndex);
  return {
    openCardIndexes: [...openCardIndexes, clickedIndex],
    gameBoard: {
      ...gameBoard,
      [clickedIndex]: { ...gameBoard[clickedIndex], show: true },
    },
  };
};

const evaluateOpenCards = ({ gameBoard, openCardIndexes, attempts }) => {
  let openCards = {};
  openCardIndexes.forEach(openCardIndex => {
    openCards[openCardIndex] = { ...gameBoard[openCardIndex], show: false };
  });
  return {
    gameBoard: {
      ...gameBoard,
      ...openCards,
    },
    openCardIndexes: initialState.openCardIndexes,
    attempts: attempts + 1,
  };
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.CREATE_GAME:
      return { ...initialState, gameBoard: initGameBoard(action.payload) };
    case ACTION_TYPE.CARD_CLICKED:
      return {
        ...state,
        ...openCards(state, action.payload),
      };
    case ACTION_TYPE.EVAL_CARD_CLICKED:
      return {
        ...state,
        ...evaluateOpenCards(state, action.payload),
      };
    default:
      return state;
  }
}

export default reducer;
