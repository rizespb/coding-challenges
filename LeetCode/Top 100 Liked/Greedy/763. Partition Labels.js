// https://leetcode.com/problems/partition-labels/description/

// You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

// Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.

// Return a list of integers representing the size of these parts.

const partitionLabels = (str) => {
  const map = {};

  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    map[char] = i;
  }

  let start = 0;
  let end = 0;

  let partionsLength = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const charLastIndex = map[char];

    if (charLastIndex > end) {
      end = charLastIndex;
    }

    if (i === end) {
      partionsLength.push(end - start + 1);
      start = i + 1;
      end = i + 1;
    }
  }

  return partionsLength;
};
