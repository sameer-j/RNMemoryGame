export const shuffle = arr => {
  for (let current = arr.length - 1; current > 0; current--) {
    const random = Math.floor(Math.random() * current);
    [arr[current], arr[random]] = [arr[random], arr[current]];
  }
};
