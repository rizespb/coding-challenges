// https://leetcode.com/problems/minimum-genetic-mutation/description/

const { test } = require('../test');

//  В решении Python представлен итеративный подход
const chars = ['A', 'C', 'G', 'T'];

const minMutation = (startGene, endGene, bank) => {
  const bankSet = new Set(bank);
  let result = Number.POSITIVE_INFINITY;

  const visited = {};

  const traverse = (start, end, mutations) => {
    if (start === end) {
      result = Math.min(result, mutations);

      return;
    }

    for (let i = 0; i < start.length; i++) {
      for (const char of chars) {
        const mutated = start.slice(0, i) + char + start.slice(i + 1);

        if (visited[mutated] && visited[mutated] <= mutations) {
          continue;
        }

        if (bankSet.has(mutated)) {
          visited[mutated] = mutations + 1;
          traverse(mutated, end, mutations + 1);
        }
      }
    }
  };

  traverse(startGene, endGene, 0);

  return result === Number.POSITIVE_INFINITY ? -1 : result;
};

test(minMutation, [
  {
    input: ['AACCGGTT', 'AACCGGTA', ['AACCGGTA']],
    expected: 1,
  },
  {
    input: ['AACCGGTT', 'AAACGGTA', ['AACCGGTA', 'AACCGCTA', 'AAACGGTA']],
    expected: 2,
  },
  {
    input: ['AACCGGTT', 'AAACGGTA', ['AACCGATT', 'AACCGATA', 'AAACGATA', 'AAACGGTA']],
    expected: 4,
  },
  {
    input: ['AAAAAAAA', 'ACAAAAAA', ['CAAAAAAA', 'CCAAAAAA', 'ACAAAAAA']],
    expected: 1,
  },
]);
