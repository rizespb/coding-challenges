// https://leetcode.com/problems/candy/description/

const candy = (ratings) => {
  const length = ratings.length;
  const candies = new Array(length).fill(1);

  for (let i = 1; i < length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  for (let i = length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  return candies.reduce((acc, value) => acc + value);
};

candy([1, 0, 2]); // 5 - [2, 1, 2]
candy([1, 2, 2]); // 4 - [1, 2, 1]
