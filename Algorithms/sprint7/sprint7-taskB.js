// ID успешной посылки 103912376

/*
-- ПРИНЦИП РАБОТЫ --
Чтобы найти ответ на поставленный вопрос, нам надо найти последовательность, сумма членов которой равна половине суммы все членов массива. Или убедиться, что такой последовательности нет. Назовем эту половину суммы всех членов targetSum
Создаем массив dp, длиной targetSum + 1, где индекс i - это сумма подпоследовательности

Если существует подпоследовательность с суммой i, то в dp[i] записываем true

Далее идем двойным циклом. Во внешнем цикле проверяем:
Вычисляем разницу diff между текущим элементов и targetSum. Проверяем dp[diff]. Если есть подпоследовательность, которая в сумме дает diff, то сумма элементов этой подпоследовательности + текущий элемент дадут сумму, равную targetSum. Останавливаем программу

Если такой diff пока не был найден, то записываем в ячейку diif[current] true, т.к. подпоследовательность суммой current как минимум можно получить из суммы членов массива [current]

Далее вложеным циклом проходимся по массиву dp. Для j-ого элемента смотрим: если он равен true, значит ранее была найдена подпоследовательность элементов, которые в сумме дают j. Тогда мы можем утверждать, что будет существовать подпоследовательность, которая даст сумму j + текущий элемент. Если эта сумма меньше или равна targetSum (чтобы не хранить в массиве dp избыточные данные), записываем в соответствующую ячейку true

После окончания работы программы ответ будет храниться в ячейке dp[targetSum]

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Временная сложность составляет O(N^2)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
O(N) для хранения массива dp

*/

const _readline = require('readline');

const _reader = _readline.createInterface({
  input: process.stdin,
});

const _inputLines = [];

_reader.on('line', (line) => {
  _inputLines.push(line);
});

process.stdin.on('end', solve);

const TRUE = 'True';
const FALSE = 'False';

const checkSubsequenceExist = (targetSum, array) => {
  const dp = new Array(targetSum + 1).fill(false);

  for (let i = 0; i < array.length; i++) {
    const current = array[i];

    const diff = targetSum - current;

    if (dp[diff]) {
      return true;
    }

    if (!dp[current]) {
      dp[current] = true;
    }

    for (let j = 1; j < dp.length; j++) {
      if (j === current || !dp[j]) {
        continue;
      }

      const currentSum = j + current;

      if (currentSum <= targetSum) {
        dp[currentSum] = true;
      }
    }
  }

  return dp[targetSum];
};

function solve() {
  const points = _inputLines[1].split(' ').map(Number);

  const targetSum = points.reduce((acc, item) => acc + item) / 2;
  if (targetSum % 1 !== 0) {
    console.log(FALSE);

    return;
  }

  const result = checkSubsequenceExist(targetSum, points);

  console.log(result ? TRUE : FALSE);
}
