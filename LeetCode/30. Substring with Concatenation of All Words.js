// https://leetcode.com/problems/substring-with-concatenation-of-all-words/description/

const isTarget = (substring, map, wordLength) => {
  const currentMap = {};

  for (let i = 0; i < substring.length; i += wordLength) {
    const current = substring.slice(i, i + wordLength);

    if (!map[current]) {
      return false;
    }

    currentMap[current] = (currentMap[current] || 0) + 1;

    if (currentMap[current] > map[current]) {
      return false;
    }
  }

  return true;
};

const findSubstring = (str, words) => {
  const wordLength = words[0].length;
  const substringLength = wordLength * words.length;

  const map = {};

  for (const word of words) {
    map[word] = (map[word] || 0) + 1;
  }

  const result = [];

  for (let i = 0; i < str.length - substringLength + 1; i++) {
    const substring = str.slice(i, i + substringLength);

    if (isTarget(substring, map, wordLength)) {
      result.push(i);
    }
  }

  return result;
};

findSubstring('barfoothefoobarman', ['foo', 'bar']); // [ 0, 9 ]
findSubstring('wordgoodgoodgoodbestword', ['word', 'good', 'best', 'word']); // []
findSubstring('barfoofoobarthefoobarman', ['bar', 'foo', 'the']); // [ 6, 9, 12 ]
findSubstring('wordgoodgoodgoodbestword', ['word', 'good', 'best', 'good']); // [8]

// Другое решение (не проходит тесты по времени)

// const getPermutations = (words) => {
//   const result = [];

//   const inner = (arr, str) => {
//     if (arr.length === 0) {
//       result.push(str);

//       return;
//     }

//     for (let i = 0; i < arr.length; i++) {
//       const current = str + arr[i];

//       inner(
//         arr.filter((_, index) => index !== i),
//         current
//       );
//     }
//   };

//   inner(words, '');

//   return new Set(result);
// };

// const findSubstring = (str, words) => {
//   const set = getPermutations(words);

//   const length = words.reduce((acc, str) => acc + str.length, 0);

//   const result = [];

//   for (let i = 0; i < str.length - length + 1; i++) {
//     const current = str.slice(i, i + length);

//     if (set.has(current)) {
//       result.push(i);
//     }
//   }

//   return result;
// };
