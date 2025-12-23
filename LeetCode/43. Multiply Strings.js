// https://leetcode.com/problems/multiply-strings/description/

// Алгоритм является отображением в коде алгоритма умножения в столбик

// хелпер, который умножает число (в виде строки) на множитель, состоящий из одной цифры (например, '333' * '3')
const multiplyBySingleNumber = (str, singleNum) => {
  const factor = Number(singleNum);

  // Переменная для хранения промежуточного остатка от умножения
  // Например, 7 * 5 = 35. В rest помещаем 3
  let rest = 0;

  let result = '';

  // Перебираем число str, начиная с последней цифры
  for (let i = str.length - 1; i >= 0; i--) {
    const current = Number(str[i]);

    // на каждой итерации добаляем к произведению то, что осталось от предыдущего произведения в rest
    const currentProduct = factor * current + rest;

    // currentResult добавляется к результирующей строке
    // 7 * 5 = 35 - в currentResult помещаем 5
    const currentResult = currentProduct % 10;

    // в rest помещаем "остаток" от умножения
    // 7 * 5 = 35 - в rest помещаем 3
    rest = Math.floor(currentProduct / 10);

    result = currentResult + result;
  }

  // Если rest !== 0, то в начало надо добавить то, что хранится в rest
  return rest ? rest + result : result;
};

// После умножения получаем массив строк-чисел
// Умножение 140 на 721 получаем [ '140', '2800', '98000' ]
// Функция складывает переданные строки
const sumStrings = (strs) => {
  let maxIndex = Math.max(...strs.map((str) => str.length - 1));

  let currentDiff = 0;

  let rest = 0;

  let result = '';

  while (currentDiff <= maxIndex) {
    const currents = strs.map((str) => str[str.length - 1 - currentDiff]);

    const currentSum = currents.reduce((acc, item) => (Number(item) || 0) + acc, 0) + rest;

    rest = Math.floor(currentSum / 10);

    result = (currentSum % 10) + result;

    currentDiff++;
  }

  return rest ? rest + result : result;
};

const multiply = (num1, num2) => {
  if ([num1, num2].includes('0')) {
    return '0';
  }

  const results = [];

  for (let i = num2.length - 1; i >= 0; i--) {
    const factor = num2[i];

    const result = multiplyBySingleNumber(num1, factor);

    results.push(result);
  }

  // При умножении в столбик первое число посимвольно умножается на каждый символ (цифру) второго числа. И при умножении на каждую следующую цифру второго числа получается строка, у которой надо добавить 0 в конце
  // 140 * 721
  // 140 * 1 = 140
  // 140 * 2 = 280
  // 140 * 7 = 980
  // Сумма:
  //    140
  //   2800
  //  98000
  // 100940
  const mappedResults = results.map((item, index) => item + '0'.repeat(index));

  console.log(mappedResults);

  return sumStrings(mappedResults);
};

console.log(multiply('11', '12')); // 132
console.log(multiply('123456789', '987654321')); // 121932631112635269
console.log(multiply('140', '721')); // 100940
