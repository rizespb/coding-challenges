// https://leetcode.com/problems/add-binary/

const addBinary = (num1, num2) => {
  let result = '';

  let index1 = num1.length - 1;
  let index2 = num2.length - 1;

  let rest = 0;

  while (index1 >= 0 || index2 >= 0) {
    const current1 = num1[index1] || 0;
    const current2 = num2[index2] || 0;

    const sum = Number(current1) + Number(current2) + rest;

    if (sum <= 1) {
      result = sum + result;
      rest = 0;
    }

    if (sum === 2) {
      result = 0 + result;
      rest = 1;
    }

    if (sum === 3) {
      result = 1 + result;
      rest = 1;
    }

    index1--;
    index2--;
  }

  result = rest ? rest + result : result;

  return result;
};

addBinary('11', '1'); // 100
addBinary('1010', '1011'); // 10101
