export const initGameBoard = ({ cards, max_matches }) => {
  const gameBoard = {};
  let arr = [];
  for (let i = 0; i < max_matches; i++) {
    arr = arr.concat(cards);
  }
  // Shuffle and initialise GameBoard
  for (let current = arr.length - 1; current >= 0; current--) {
    const random = Math.floor(Math.random() * current);
    [arr[current], arr[random]] = [arr[random], arr[current]];
    gameBoard[current] = {
      value: arr[current],
      show: false,
      matched: false,
    };
  }
  return gameBoard;
};
