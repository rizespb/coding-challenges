const { test } = require('./test');

const maxProfit = (prices) => {
  let profit = 0;

  let purchase = null;

  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];

    if (purchase === null || price <= purchase) {
      purchase = price;

      continue;
    }

    if (i < prices.length - 1 && price < prices[i + 1]) {
      continue;
    }

    profit += price - purchase;
    purchase = null;
  }

  return profit;
};

test(maxProfit, [
  {
    input: [[7, 1, 5, 3, 6, 4]],
    expected: 7,
  },
  {
    input: [[1, 2, 3, 4, 5]],
    expected: 4,
  },
  {
    input: [[7, 6, 4, 3, 1]],
    expected: 0,
  },
  {
    input: [[2, 1, 2, 0, 1]],
    expected: 2,
  },
]);
