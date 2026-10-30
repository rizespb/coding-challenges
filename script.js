const { test } = require('./test');

const permute = (nums) => {
  const visited = Array(nums.length).fill(false);

  const result = [];

  const currentArray = [];

  const inner = () => {
    if (currentArray.length === nums.length) {
      result.push([...currentArray]);

      return;
    }

    for (let index = 0; index < nums.length; index++) {
      if (visited[index]) continue;

      visited[index] = true;
      currentArray.push(nums[index]);

      inner(currentArray);

      currentArray.pop();

      visited[index] = false;
    }
  };

  inner();

  return result;
};

test(permute, [
  {
    input: [[1, 2, 3]],
    expected: [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ],
  },
  {
    input: [[0, 1]],
    expected: [
      [0, 1],
      [1, 0],
    ],
  },
  {
    input: [[1]],
    expected: [[1]],
  },
]);
