export const initGameBoard = cards => {
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

export const shuffle = array => {
  let arr = [...array];
  for (let current = arr.length - 1; current > 0; current--) {
    const random = Math.floor(Math.random() * current);
    [arr[current], arr[random]] = [arr[random], arr[current]];
  }
  return arr;
};
