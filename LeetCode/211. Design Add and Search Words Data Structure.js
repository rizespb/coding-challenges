// https://leetcode.com/problems/design-add-and-search-words-data-structure/description/

// В Питон более быстрое решение

class WordDictionary {
  constructor(value = '.') {
    this.value = value;

    this.children = {};
    this.childrenAsArray = [];
    this.isEnd = false;
  }

  addWord(word, index = 0, currentNode = this) {
    const node = currentNode.children[word[index]] ?? new WordDictionary(word[index]);

    if (!currentNode.children[word[index]]) {
      currentNode.children[word[index]] = node;
      currentNode.childrenAsArray.push(node);
    }

    index++;

    if (index < word.length) {
      this.addWord(word, index, node);
    } else {
      node.isEnd = true;
    }
  }

  search(word, index = 0, currentNode = this) {
    if (index === word.length) {
      return currentNode.isEnd;
    }

    const char = word[index];

    if (char === '.') {
      for (const child of currentNode.childrenAsArray) {
        const result = this.search(word, index + 1, child);

        if (result) {
          return true;
        }
      }

      return false;
    }

    if (!(char in currentNode.children)) {
      return false;
    }

    return this.search(word, index + 1, currentNode.children[char]);
  }
}
