// https://leetcode.com/problems/summary-ranges/description/

const summaryRanges = (arr) => {
  let start = null;

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (start === null) {
      start = i;
    }

    if (arr[i] + 1 === arr[i + 1]) {
      continue;
    }

    if (start === i) {
      result.push(`${arr[i]}`);
    } else {
      result.push(`${arr[start]}->${arr[i]}`);
    }

    start = i + 1;
  }

  return result;
};

console.log(summaryRanges([0, 1, 2, 4, 5, 7])); // ["0->2","4->5","7"]
console.log(summaryRanges([0, 2, 3, 4, 6, 8, 9])); // ["0","2->4","6","8->9"]
