// https://leetcode.com/problems/permutation-sequence/description/

// Данное решение основано на следующем подходе
// Допустим, total равен 4
// Число возможных комбинаций равно факториал 4! = 1*2*3*4 = 24
// Нам надо найти комбинацию под номером num
// Например, для getPermutation(4, 15)
// При этом, если последовательность начинается с 1, 2, 3 или 4 остается ти незаполненные позиции. Три цифры деает по 6 комбинаций
// 1: 234, 243, 324, 342, 423, 324 - с 1 по 6
// 2: 134, 143, 314, 341, 413, 314 - с 7 по 12
// 3: 214, 241, 124, 142, 421, 124 - с 13 по 18
// 4: 231, 213, 321, 312, 123, 321 - с 19 по 24
// Значит, нужная комбинация (под номер 15) находится в диапазоне с 13 по 18, то есть комбинация начинает с 3

const getPermutation = (total, num) => {
  const factorials = {
    0: 1,
  };

  // Массив содержит все числа от 1 до num
  const array = [];

  // Получаем факториалы всех чисел от 1 до num
  for (let i = 1; i <= total; i++) {
    factorials[i] = factorials[i - 1] * i;

    array.push(i);
  }

  let result = '';

  // Переменная currentNum хранит текущий остаток после очередной итерации
  // Например, для getPermutation(4, 15)
  // На первой итерации currentNum = 15
  // На второй итерации currentNum = 15 - 2 *6 = 3 - то есть, комбинация является третьей в группе, которая начинается с 3
  // И т.д.
  let currentNum = num;

  // Постепенно будем удалять из array элементы, которые "нашли свое место"
  while (array.length > 0) {
    const totalVariants = factorials[array.length];

    // Количество доступных комбинаций, если первым будет идти любое из чисел массива
    // 24 / 4 = 6 или 6 / 3 = 2
    const variatsPerDigit = totalVariants / array.length;

    // Вычисляем текущий диапазон, в котором находится комбинация под номером currentNum
    // Math.ceil(15 / 6) = 3, то есть среди диапазонов 1-6 / 7-12 / 13-18 / 19-24 наша комбинация находится в третьем 13-18
    const current = Math.ceil(currentNum / variatsPerDigit);

    const currentIndex = current - 1;

    result += array[currentIndex];

    // const currentIndex = array.findIndex((item) => item === current);

    // Удаляем из массива использованный элемент
    array.splice(currentIndex, 1);

    // Вычисляем новый currentNum в контексте уже нового массива (например, после первой итерации останется массив [1,2,4])
    currentNum = currentNum - currentIndex * variatsPerDigit;
  }

  return result;
};

// console.log(getPermutation(9, 296662));
getPermutation(3, 3); // 213
console.log(getPermutation(4, 9)); // 2314
console.log(getPermutation(4, 15)); // 3214

// Решение не проходит тесты по времени
// Основная идея состоит в том, что мы создаем массив от 1 до total и последовательно перебираем возможные комабинации
// 3 -> [1, 2, 3] => '123', '132', '213', '231', '312, '321'
// При этом мы считаем count - порядковый номер текущей комбинации. Когда count достигает значения num - мы нашли нужную комбинацию

// const getPermutation = (total, num) => {
//   const arr = [];

//   for (let i = 1; i <= total; i++) {
//     arr.push(i);
//   }

//   const permutations = [];

//   const tempArr = [];

//   const set = new Set();

//   let count = 0;

//   const inner = () => {
//     if (tempArr.length === total) {
//       permutations.push([...tempArr]);
//       count++;

//       return;
//     }

//     for (let i = 0; i < arr.length; i++) {
//       if (set.has(i)) {
//         continue;
//       }

//       set.add(i);
//       tempArr.push(arr[i]);

//       inner();

//       tempArr.pop(arr[i]);
//       set.delete(i);

//       if (count === num) {
//         return;
//       }
//     }
//   };

//   inner(0);

//   return permutations[count - 1].join('');
// };
