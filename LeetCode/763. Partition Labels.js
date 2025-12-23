// https://leetcode.com/problems/partition-labels/description/

const { test } = require('../test');

const partitionLabels = (str) => {
  const lastCharIndex = new Map();

  const result = [];

  for (let i = 0; i < str.length; i++) {
    lastCharIndex.set(str[i], i);
  }

  let largestIndex = Number.NEGATIVE_INFINITY;

  let part = '';

  for (let i = 0; i < str.length; i++) {
    largestIndex = Math.max(largestIndex, lastCharIndex.get(str[i]));

    part += str[i];

    if (largestIndex === i) {
      result.push(part.length);

      part = '';
      largestIndex = Number.NEGATIVE_INFINITY;
    }
  }

  return result;
};

test(partitionLabels, [
  {
    input: ['ababcbacadefegdehijhklij'],
    expected: [9, 7, 8].join('-'),
  },
  {
    input: ['eccbbbbdec'],
    expected: [10].join('-'),
  },
]);
