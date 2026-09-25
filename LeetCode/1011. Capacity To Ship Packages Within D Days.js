// https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/

const { test } = require('./test');

const shipWithinDays = (weights, days) => {
  // Минимальная вместимость (capacity) равна самому большому весу в массиве weights
  // Максимальная вместимость равна сумме всех весов (если надо перевезти все за один день)
  let sum = 0;

  let max = Number.NEGATIVE_INFINITY;

  for (let index = 0; index < weights.length; index++) {
    sum += weights[index];
    max = Math.max(max, weights[index]);
  }

  let start = max;
  let end = sum;

  let lastCorrect = Number.POSITIVE_INFINITY;

  // Бинарным поиском находим середину интервала
  while (start <= end) {
    const capacity = Math.floor((start + end) / 2);

    // Проверяем, за сколько дней можно с текущей capacity перевезти все грузы
    let currentSum = 0;
    let daysCount = 0;

    for (let index = 0; index < weights.length; index++) {
      currentSum += weights[index];

      if (currentSum < capacity) {
        continue;
      }

      daysCount++;

      if (currentSum === capacity) {
        currentSum = 0;
      } else {
        currentSum = weights[index];
      }
    }

    if (currentSum !== 0) {
      daysCount++;
    }

    // Если мы можем сделать это за целевое количество дней, то сохраняем capacity
    // И теперь можно проверить, что будет если capacity уменьшить
    if (daysCount <= days) {
      lastCorrect = Math.min(capacity, lastCorrect);

      end = capacity - 1;

      continue;
    }

    // Если не можем, то проверяем для большей capacity
    start = capacity + 1;
  }

  return lastCorrect;
};

test(shipWithinDays, [
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5],
    expected: 15,
  },
  {
    input: [[3, 2, 2, 4, 1, 4], 3],
    expected: 6,
  },
  {
    input: [[1, 2, 3, 1, 1], 4],
    expected: 3,
  },
  {
    input: [[3, 2, 2, 4], 3],
    expected: 4,
  },
]);
