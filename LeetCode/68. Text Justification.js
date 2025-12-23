// https://leetcode.com/problems/text-justification/description/

const fullJustify = (words, maxWidth) => {
  const result = [];

  let index = 0;

  // Длина текущей строки
  let lineLength = 0;
  // Массив со словами, которые пойдут в текущую строку
  let temp = [];

  while (index < words.length) {
    const current = words[index];
    const next = words[index + 1];

    lineLength += current.length;

    // Проверяем, будет ли текущее слово будет последним в текущей строке
    const isLastWordInLine = !next || lineLength + 1 + next.length > maxWidth;

    // Если слово последнее (больше слов в строку не влезет)
    if (isLastWordInLine) {
      temp.push(current);

      // Вычисляем, сколько пробелов нам надо распределить
      const diff = maxWidth - lineLength;

      // Если в строке получилось одно слово, то оставшиеся позиции заполняем нулями
      if (temp.length === 1) {
        temp[0] = temp[0].padEnd(maxWidth, ' ');
      } else {
        // Сколько пробелов надо добавить каждому непоследнему элементу
        const addToEveryone = Math.floor(diff / (temp.length - 1));

        // Если остаток не делится равномерно между всеми словаим, то начиная с начала массива temp добавим еще по 1 пробелу каждому элементу с индексом не более addOneMaxIndex
        const addOneMaxIndex = diff % (temp.length - 1);

        // Проходимся по всем элементам, кроме последнего
        for (let i = 0; i < temp.length - 1; i++) {
          temp[i] = temp[i] + ' '.repeat(addToEveryone);

          if (i < addOneMaxIndex) {
            temp[i] = temp[i] + ' ';
          }
        }
      }

      result.push(temp.join(''));

      temp = [];
      lineLength = 0;

      // Если текущее слово с текущей строке не последнее, то просто добавляем его вместе с пробелом (после каждого НЕпоследнего слова в строке идет пробел)
    } else {
      temp.push(current + ' ');

      lineLength++;
    }

    index++;
  }

  // Форматируем последнюю строку (максимум олин пробел между словами, остаток строки заполняем пробелами)
  const lastLine = result[result.length - 1].replace(/\s+/g, ' ').padEnd(maxWidth, ' ');

  result[result.length - 1] = lastLine;

  return result;
};

const words1 = ['This', 'is', 'an', 'example', 'of', 'text', 'justification.'];
const maxWidth1 = 16;
// fullJustify(words1, maxWidth1);

const words2 = ['What', 'must', 'be', 'acknowledgment', 'shall', 'be'];
const maxWidth2 = 16;
// fullJustify(words2, maxWidth2);

const words3 = [
  'Science',
  'is',
  'what',
  'we',
  'understand',
  'well',
  'enough',
  'to',
  'explain',
  'to',
  'a',
  'computer.',
  'Art',
  'is',
  'everything',
  'else',
  'we',
  'do',
];
const maxWidth3 = 20;
fullJustify(words3, maxWidth3);
