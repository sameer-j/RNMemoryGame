import { shuffle } from './utils';
import { ACTION_TYPE, MAX_CARD_MATCH } from './constants';

export const initialState = {
  matches: 0,
  attempts: 0,
  gameBoard: {},
  openCardIndexes: [],
  isMatched: false,
};

const initGameBoard = cards => {
  const gameBoard = {};
  const gameCards = shuffle([...cards, ...cards]); // Double the cards to 16, with 2 copies of each & Shuffle
  gameCards.forEach((cardVal, index) => {
    gameBoard[index] = {
      value: cardVal,
      show: false,
      matched: false,
    };
  });
  return gameBoard;
};

const openCards = (
  { gameBoard, openCardIndexes, isMatched },
  { clickedIndex },
) => {
  const totalOpenCards = openCardIndexes.length;
  if (totalOpenCards >= MAX_CARD_MATCH) {
    return {};
  }

  let newIsMatchedState = true;

  if (totalOpenCards > 0) {
    newIsMatchedState =
      isMatched &&
      gameBoard[openCardIndexes[totalOpenCards - 1]].value ===
        gameBoard[clickedIndex].value;
  }
  console.log('OpenCards: ', clickedIndex);
  return {
    openCardIndexes: [...openCardIndexes, clickedIndex],
    gameBoard: {
      ...gameBoard,
      [clickedIndex]: { ...gameBoard[clickedIndex], show: true },
    },
    isMatched: newIsMatchedState,
  };
};

const evaluateOpenCards = ({
  gameBoard,
  openCardIndexes,
  attempts,
  isMatched,
  matches,
}) => {
  const openCards = {};
  openCardIndexes.forEach(openCardIndex => {
    openCards[openCardIndex] = {
      ...gameBoard[openCardIndex],
      show: false,
      matched: isMatched,
    };
  });

  return {
    gameBoard: {
      ...gameBoard,
      ...openCards,
    },
    openCardIndexes: initialState.openCardIndexes,
    attempts: attempts + 1,
    matches: matches + +isMatched,
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
