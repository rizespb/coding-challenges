// https://leetcode.com/problems/daily-temperatures/description/

const { test } = require('../test');

const dailyTemperatures = (temperatures) => {
  const days = Array.from({ length: temperatures.length }).fill(0);

  let stack = [];

  for (let index = 0; index < temperatures.length; index++) {
    const element = temperatures[index];

    while (stack.length && temperatures[stack.at(-1)] < element) {
      const i = stack.pop();
      days[i] = index - i;
    }

    stack.push(index);
  }

  return days.toString();
};

test(dailyTemperatures, [
  {
    input: [[73, 74, 75, 71, 69, 72, 76, 73]],
    expected: [1, 1, 4, 2, 1, 1, 0, 0].toString(),
  },
  {
    input: [[30, 40, 50, 60]],
    expected: [1, 1, 1, 0].toString(),
  },
  {
    input: [[30, 60, 90]],
    expected: [1, 1, 0].toString(),
  },
]);
