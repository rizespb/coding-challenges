// https://leetcode.com/problems/word-search-ii/

const { test } = require('../test');

class WordDictionary {
  constructor(value = '.') {
    this.value = value;

    this.children = {};
    this.isEnd = false;
  }

  addWord(word) {
    let current = this;

    for (const char of word) {
      if (!current.children[char]) current.children[char] = new WordDictionary(char);

      current = current.children[char];
    }

    current.isEnd = true;
  }
}

const findWords = (board, words) => {
  const dict = new WordDictionary();

  const maxX = board[0].length - 1;
  const maxY = board.length - 1;

  for (const word of words) {
    dict.addWord(word);
  }

  const result = new Set();

  const traverse = (x, y, node, word) => {
    const char = board[y][x];

    if (node.isEnd) {
      result.add(word + char);
    }

    board[y][x] = 0;

    if (x - 1 >= 0) {
      const left = board[y][x - 1];

      left in node.children && traverse(x - 1, y, node.children[left], word + char);
    }

    if (x + 1 <= maxX) {
      const right = board[y][x + 1];

      right in node.children && traverse(x + 1, y, node.children[right], word + char);
    }

    if (y - 1 >= 0) {
      const up = board[y - 1][x];

      up in node.children && traverse(x, y - 1, node.children[up], word + char);
    }

    if (y + 1 <= maxY) {
      const down = board[y + 1][x];

      down in node.children && traverse(x, y + 1, node.children[down], word + char);
    }

    board[y][x] = char;
  };

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      if (board[y][x] in dict.children) {
        traverse(x, y, dict.children[board[y][x]], '');
      }
    }
  }

  return [...result];
};

test(findWords, [
  {
    input: [
      [
        ['o', 'a', 'a', 'n'],
        ['e', 't', 'a', 'e'],
        ['i', 'h', 'k', 'r'],
        ['i', 'f', 'l', 'v'],
      ],
      ['oath', 'pea', 'oach', 'eat', 'rain'],
    ],
    expected: ['eat', 'oath'].toString(),
  },
  {
    input: [
      [
        ['a', 'b'],
        ['c', 'd'],
      ],
      ['abcb'],
    ],
    expected: [].toString(),
  },
]);
