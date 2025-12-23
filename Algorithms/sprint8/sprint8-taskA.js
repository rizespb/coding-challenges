// ID успешной посылки 104024056

/*
-- ПРИНЦИП РАБОТЫ --

Вначале распакуем строки. Для этого используем структуру данных стэк (переменная stack). Перебираем каждую строку посимвольно. Если символ не равен закрывающей скобке, то помещаем символ в стэк. Как только встречаем закрывающую скобку, начинаем извлекать символы из стэка и сохранять их в подстроку (каждый извлеченный из стэка символ добавляем в начало подстроки, чтобы сохранить порядок символов). Как только извлеченный символ является открывающей скобкой, еще раз извлекаем из стека последний элемент - коэффециент умножения - и умножаем накопленную подстроку на этот коэффециент (функция getRepeatedStr).
После этого помещаем результат на вершину стэка и продолжаем перебирать исходную строку. Такой подход позволяет нас распаковывать в том числе и запакованные подстроки.

После этого ищем максимальный префикс у полученных строк. Для этого итерируемся по любой полученной строке. И сравниваем соответствующий символ с символом на такой же позиции в остальных строках. Если символ во всех строках одинаковый, добавляем его в префикс prefix. Если нет - останавливаем перебор.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Временная сложность составляет O(N ⋅ M), где
N - число запаковынных строк
M - средняя длинна запакованной строки

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Временная сложность составляет O(N ⋅ M), для хранения стека символов

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

const OPEN = '[';
const CLOSE = ']';

const getRepeatedStr = (str, num) => {
  let result = '';

  for (let i = 1; i <= num; i++) {
    result += str;
  }

  return result;
};

const unpackStr = (str) => {
  const stack = [];

  let tail;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char !== CLOSE) {
      stack.push(char);
      continue;
    }

    let substring = '';

    if (char === CLOSE) {
      tail = stack.pop();

      while (tail !== OPEN) {
        substring = tail + substring;
        tail = stack.pop();
      }
      const coefficient = stack.pop();

      stack.push(getRepeatedStr(substring, coefficient));
    }
  }

  return stack.join('');
};

function solve() {
  const packedStrs = _inputLines.slice(1);

  const unpackedStrs = packedStrs.map(unpackStr);

  let prefix = '';

  for (let i = 0; i < unpackedStrs[0].length; i++) {
    let char = unpackedStrs[0][i];

    if (unpackedStrs.every((str) => str[i] === char)) {
      prefix += char;
    } else {
      break;
    }
  }

  console.log(prefix);
}
