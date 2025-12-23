// https://leetcode.com/problems/longest-substring-without-repeating-characters/description/

// Given a string s, find the length of the longest substring without repeating characters.

const lengthOfLongestSubstring = (str) => {
  let max = 0;

  let left = 0;
  let right = 0;

  const set = new Set();

  while (left < str.length && right < str.length) {
    const current = str[right];

    if (set.has(current)) {
      set.delete(str[left]);
      left++;
    } else {
      set.add(current);
      right++;
    }

    max = Math.max(max, set.size);
  }

  return max;
};
