// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/

const { test } = require('../test');

// Решение проходит не все тесты
const maxProfit = (prices) => {
  const profits = [];

  let buyPrice = null;

  for (let i = 0; i < prices.length; i++) {
    if (i === prices.length - 1) {
      if (buyPrice !== null && buyPrice < prices[i]) {
        profits.push(prices[i] - buyPrice);
      }

      continue;
    }

    if (buyPrice === null && prices[i] >= prices[i + 1]) {
      continue;
    }

    if (buyPrice === null) {
      buyPrice = prices[i];
      continue;
    }

    if (prices[i] > buyPrice && prices[i] > prices[i + 1]) {
      profits.push(prices[i] - buyPrice);
      buyPrice = null;
    }
  }

  profits.sort((a, b) => b - a);

  profits.splice(2);

  return profits.reduce((acc, value) => acc + value, 0);
};

test(maxProfit, [
  {
    input: [[3, 3, 5, 0, 0, 3, 1, 4]],
    expected: 6,
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
    input: [[1, 2, 4, 2, 5, 7, 2, 4, 9, 0]],
    expected: 13,
  },
]);
