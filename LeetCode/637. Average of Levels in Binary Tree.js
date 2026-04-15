// https://leetcode.com/problems/average-of-levels-in-binary-tree/description

// Более очевидное решение
// const averageOfLevels = (root) => {
//   if (!root) return [];

//   const result = [];

//   let stack = [root];

//   while (stack.length) {
//     const temp = [];

//     const count = stack.length;

//     let currentSum = 0;

//     while (stack.length) {
//       const { val, left, right } = stack.pop();
//       currentSum += val;

//       left && temp.push(left);
//       right && temp.push(right);
//     }

//     stack = temp;

//     result.push(currentSum / count);
//   }

//   return result;
// };

const averageOfLevels = (root) => {
  if (!root) return [];

  const result = [];
  const stack = [root];

  let index = 0;

  let count = 1;

  while (index < stack.length) {
    const currentLevelLength = count;
    let currentLevelEnd = index + count;

    let currentSum = 0;

    count = 0;

    while (index < currentLevelEnd) {
      const { val, left, right } = stack[index];
      currentSum += val;

      if (left) {
        stack.push(left);
        count++;
      }
      if (right) {
        stack.push(right);
        count++;
      }

      index++;
    }

    result.push(currentSum / currentLevelLength);
  }

  return result;
};
