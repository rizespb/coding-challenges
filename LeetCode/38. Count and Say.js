// https://leetcode.com/problems/count-and-say/

// Если 1 - тогда, возвращаем 1
// Если больше - то каждый следующий шаг - это оборачивание в RTL результатов предыдущего шага.
// Например, num = 5
// На первом шаге: '1' -> '11'
// На втором шаге: '11' -> '21'
// На третьем шаге: '21' -> '1211'
// На четвертом шаге: '1211' -> '111221'

// хелпер для кодирования строки в RLE
const getRLE = (str) => {
  let count = 0;

  let result = '';

  for (let i = 0; i < str.length; i++) {
    const current = str[i];
    const next = str[i + 1];

    count++;

    if (current === next) {
      continue;
    }

    result = `${result}${count}${current}`;
    count = 0;
  }

  return result;
};

const countAndSay = (num) => {
  let result = '1';

  if (num === '1') {
    return result;
  }

  let count = 1;

  while (count < num) {
    result = getRLE(result);
    count++;
  }

  return result;
};

console.log(countAndSay(7));
