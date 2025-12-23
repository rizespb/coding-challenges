const { test } = require('../test');

const numSquares = (num) => {
  const squares = [];

  for (let i = 1; i <= num; i++) {
    const square = i * i;

    if (square <= num) {
      squares.push(square);
    } else {
      break;
    }
  }

  let total;

  const inner = (currentSquaresAmount = 0, startIndex = squares.length - 1, sum = 0) => {
    if ((total !== undefined && total <= currentSquaresAmount) || sum > num) {
      return;
    }

    if (sum === num) {
      total = currentSquaresAmount;

      return;
    }

    for (let i = startIndex; i >= 0; i--) {
      inner(currentSquaresAmount + 1, i, sum + squares[i]);
    }
  };

  inner();

  return total;
};

test(numSquares, [
  {
    input: [12],
    expected: 3,
  },
  {
    input: [13],
    expected: 2,
  },
]);
