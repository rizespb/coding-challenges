// https://leetcode.com/problems/combinations/description/

const combine = (n, k) => {
  const result = [];

  const arr = [];

  const inner = (start) => {
    if (arr.length === k) {
      result.push([...arr]);

      return;
    }

    for (let i = start; i <= n; i++) {
      arr.push(i);

      inner(i + 1);

      arr.pop();
    }
  };

  inner(1);

  return result;
};

console.log(combine(4, 2)); // [ [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ] ]
console.log(combine(1, 1)); // [ [ 1 ] ]
