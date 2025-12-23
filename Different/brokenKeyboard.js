// У Пети сломалась клавиатура. Когда он вводит b, то вместо этого стирается последняя введенная строчная буква. Когда вводит B (большая английская бэ), то стирается последняя введенная заглавная буква. Остальные работают нормально. Дана строка из больших и маленьких английских букв, показывающая последовательность нажатия клавиш. Нужно вывести, что будет введено по факту.

const isUpper = (char) => {
  return char === char.toUpperCase();
};

const brokenKeyboard = (str) => {
  let prevLower = null;
  let prevUpper = null;

  const result = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === 'b' && prevLower !== null) {
      const newPrevLower = result[prevLower].prev;

      result[prevLower] = undefined;
      prevLower = newPrevLower;
    }

    if (char === 'B' && prevUpper !== null) {
      const newPrevUpper = result[prevUpper].prev;
      result[prevUpper] = undefined;
      prevUpper = newPrevUpper;
    }

    if (char === 'b' || char === 'B') {
      result.push(undefined);
      continue;
    }

    const isUpperChar = isUpper(char);

    result.push({
      char,
      prev: isUpperChar ? prevUpper : prevLower,
    });

    isUpperChar ? (prevUpper = i) : (prevLower = i);
  }

  return result
    .filter(Boolean)
    .map(({ char }) => char)
    .join('');
};

const test = (cases) => {
  for (const [input, expected] of cases) {
    const result = brokenKeyboard(input);
    console.log('input', input);
    console.log('result', result);
    console.log('expected', expected);

    console.log(expected === result ? '\x1b[32mTrue\x1b[0m' : '\x1b[31mFalse\x1b[0m');
    console.log('-----------------------------------');
  }
};

test([
  ['abcdeffgbbFEDbb', 'cdFED'],
  ['iPpBBb', 'i'],
  ['PbBBA', 'A'],
  ['abcd', 'cd'],
  ['ABCD', 'CD'],
  ['abba', 'a'],
  ['ABBA', 'A'],
  ['aAbB', ''],
  ['xXyYzZbB', 'xXyY'],
  ['xXyYBbzZ', 'xXzZ'],
  ['abcdefgijklmnopqrstuvwxyz', 'cdefgijklmnopqrstuvwxyz'],
  ['ABCDEFGIJKLMNOPQRSTUVWXYZ', 'CDEFGIJKLMNOPQRSTUVWXYZ'],
]);
