// https://leetcode.com/problems/restore-ip-addresses/description/

const restoreIpAddresses = (str) => {
  if (str.length < 4 || str.length > 12) return [];

  const result = [];

  const inner = (start, arr) => {
    if (arr.length === 4) {
      start === str.length && result.push(arr.join('.'));

      return;
    }

    let segment = '';

    for (let i = start; i < start + 3 && i < str.length; i++) {
      segment += str[i];

      if (Number(segment) < 0 || Number(segment) > 255) {
        return;
      }

      inner(i + 1, [...arr, segment]);

      // Если первая цифра в тройке 0, то нет смысла проверять остальные комбинации. Проверяем только 0
      if (i === start && str[i] === '0') {
        return;
      }
    }
  };

  inner(0, []);

  console.log(result);
  return result;
};

restoreIpAddresses('25525511135'); // ["255.255.11.135","255.255.111.35"]
restoreIpAddresses('0000'); // ["0.0.0.0"]
restoreIpAddresses('101023'); // ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
