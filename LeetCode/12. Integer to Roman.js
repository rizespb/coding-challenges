// https://leetcode.com/problems/integer-to-roman/description/

const map = {
  0: {
    min: 'I',
    mid: 'V',
  },
  1: {
    min: 'X',
    mid: 'L',
  },
  2: {
    min: 'C',
    mid: 'D',
  },
  3: {
    min: 'M',
  },
};

const intToRoman = (num) => {
  if (num > 3999) {
    return -1;
  }

  const numStr = String(num).split('').reverse().join('');

  let result = '';

  for (let i = 0; i < numStr.length; i++) {
    const current = Number(numStr[i]);

    if (current === 0) {
      continue;
    }

    const { min, mid } = map[i];
    const { min: max } = map[i + 1] || {};

    if (current <= 3) {
      result = min.repeat(current) + result;
    } else if (current === 4) {
      result = `${min}${mid}` + result;
    } else if (current === 5) {
      result = mid + result;
    } else if (current <= 8) {
      result = `${mid}${min.repeat(current - 5)}` + result;
    } else {
      result = `${min}${max}` + result;
    }
  }
  return result;
};
