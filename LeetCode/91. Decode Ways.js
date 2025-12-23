// https://leetcode.com/problems/decode-ways/description/

const numDecodings = (str) => {
  if (!str || str[0] === '0') {
    return 0;
  }

  if (str.length === 1) {
    return 1;
  }

  const length = str.length;

  // Каждый элемент dp содержит количество комбинаций для того, чтобы декодировать строку длиной i
  // Пустая строка - 0 = 1 способ
  // Строка из 1 символа - 1 = 1 способ
  const dp = Array.from({ length: length + 1 }).fill(0);

  dp[0] = 1;
  dp[1] = 1;

  // i - количество символов в подстроке
  for (let i = 2; i <= length; i++) {
    const oneDigit = parseInt(str[i - 1]);
    // "Делаем шаг назад" и рассматриваем также комбинацию из двух цифр - текущая и предыдущая
    const twoDigits = parseInt(str.substring(i - 2, i));

    // Если текущая цифра не 0, значит подстрока может быть декодирована как минимум одним способом
    if (oneDigit !== 0) {
      dp[i] = dp[i - 1];
    }

    if (twoDigits >= 10 && twoDigits <= 26) {
      dp[i] = dp[i - 2] + dp[i];
    }
  }

  return dp[length];
};

console.log(numDecodings('11106')); // 2 - AAJF (1, 1, 10, 6) - KJF (11, 10, 6)
