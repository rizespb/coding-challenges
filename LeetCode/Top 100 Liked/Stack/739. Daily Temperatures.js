// https://leetcode.com/problems/daily-temperatures/description/

// Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

// Интуитивное решение, но долгое по времени
// const dailyTemperatures = (temperatures) => {
//   const results = [];

//   for (let i = 0; i < temperatures.length; i++) {
//     const current = temperatures[i];

//     let diff = 0;

//     let inner = i + 1;

//     while (inner < temperatures.length) {
//       if (temperatures[inner] > current) {
//         diff = inner - i;
//         break;
//       }

//       inner++;
//     }

//     results.push(diff);
//   }

//   return results;
// };

const dailyTemperatures = (temperatures) => {
  const results = new Array(temperatures.length).fill(0);

  const stack = [];

  for (let i = 0; i < temperatures.length; i++) {
    const current = temperatures[i];

    // Если текущий элемент больше элемента, индекс которого находится в конце стэка, то для этого элемента значение равно индекс текущего элемента минус индекс этого элемента
    while (stack.length > 0 && current > temperatures[stack[stack.length - 1]]) {
      const lastIndex = stack.pop();

      results[lastIndex] = i - lastIndex;
    }

    // Индекс каждого эелмента попадает в стэк
    stack.push(i);
  }

  return results;
};

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // [1,1,4,2,1,1,0,0]
console.log(dailyTemperatures([73, 74, 75, 71, 72, 69, 76, 73])); // [  1, 1, 4, 1, 2, 1, 0, 0 ]
console.log(dailyTemperatures([30, 40, 50, 60])); // [1,1,1,0]
console.log(dailyTemperatures([30, 60, 90])); // [1,1,0]
