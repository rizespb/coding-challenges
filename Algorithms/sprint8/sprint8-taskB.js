// ID успешной посылки 104052742

/*
-- ПРИНЦИП РАБОТЫ --
Вначале строим префиксное дерево. Для этого проходимся по каждому слову в словаре и перебираем символы этого слова. В каждой вершине указываем, является ли она терминаьной и список ребер из этой вершины. Соответственно, вершина, соответствующая последнему символу в слове, является терминальной

Далее нам надо проверить, можно ли из текущую строку составить из словаря. Для этого мы используем массив dp, в котором будем хранить значения true или false, указывающие на то, можно ли составить из словаря соответствующую подстроку от 0 до i. То есть, в эту ячейку мы записываем true, если нода, на которой закончили обходить предыдущую подстроку была терминальной. И дальше построку можно начать обходить из корневой ноды

Мы проходимся двойным циклом. Если на очередной итерации соответствующая ячейка массива dp содержит true, значит при обходе дерева по предыдущей подстроке мы дошли до терминальной ноды и можем продолжить обход из корня
При этом самый первый обход мы осуществляем «в глубину», пытаясь составить стоку из самых длинных слов

В последней ячейке массива dp будет указано, можно ли составить из словаря строку целиком

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Для построения дерева сложность составит O(N ⋅ M), где
N - число слов в словаре
M - средняя длинна слова в словаре

Для проверки валидности строки сложность составляет O(K^2), где K - длина строки

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Для хранения префиксного дерева используем O(N ⋅ M) памяти, где
N - число слов в словаре
M - средняя длинна слова в словаре

Для хранения массива промежуточных результатов dp используется O(K+1) памяти, где K - длина строки, или просто O(K)
*/

const _readline = require('readline');

const _reader = _readline.createInterface({
  input: process.stdin,
});

const _inputLines = [];

_reader.on('line', (line) => {
  _inputLines.push(line);
});

process.stdin.on('end', solve);

const YES = 'YES';
const NO = 'NO';

class Node {
  constructor(char) {
    this.isTerminal = false;
    this.value = char;
    this.children = {};
  }
}

const createPrefixTree = (dictionary) => {
  const root = new Node('root');

  for (let i = 0; i < dictionary.length; i++) {
    const word = dictionary[i];

    addPrefix(root, word);
  }

  return root;
};

const addPrefix = (root, word) => {
  let current = root;

  for (let i = 0; i < word.length; i++) {
    const char = word[i];

    if (!current.children[char]) {
      current.children[char] = new Node(char);
    }

    current = current.children[char];

    if (i === word.length - 1) {
      current.isTerminal = true;
    }
  }
};

const isValidStr = (str, root) => {
  const dp = new Array(str.length + 1).fill(false);
  dp[0] = true;

  for (let i = 0; i < str.length; i++) {
    if (!dp[i]) {
      continue;
    }

    let currentNode = root;

    for (let k = i; k <= str.length; k++) {
      const char = str[k];

      if (currentNode.isTerminal) {
        dp[k] = true;
      }

      if (k === str.length || !currentNode.children[char]) {
        break;
      }

      currentNode = currentNode.children[char];
    }
  }

  return dp[str.length];
};

function solve() {
  const str = _inputLines[0];
  const dictionary = _inputLines.slice(2);

  const root = createPrefixTree(dictionary);

  const result = isValidStr(str, root);

  console.log(result ? YES : NO);
}
