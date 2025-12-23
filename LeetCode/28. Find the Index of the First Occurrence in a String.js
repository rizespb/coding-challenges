// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/

const strStr = (haystack, needle) => {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] !== needle[0]) {
      continue;
    }

    let haystackIndex = i;
    let needleIndex = 0;

    while (needleIndex < needle.length) {
      if (haystack[haystackIndex] === needle[needleIndex]) {
        haystackIndex++;
        needleIndex++;

        continue;
      }

      break;
    }

    if (needleIndex === needle.length) {
      return i;
    }
  }

  return -1;
};

console.log(strStr('sadbutsad', 'sad')); // 0
console.log(strStr('leetcode', 'leeto')); // -1
console.log(strStr('mississippi', 'issip')); // 4
