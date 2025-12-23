// https://leetcode.com/problems/powx-n/description/

const myPow = (x, pow) => {
  const positivePow = (x, pow) => {
    if (x === 0) {
      return 0;
    }

    if (x === 1) {
      return 1;
    }

    if (pow === 0) {
      return 1;
    }

    if (pow % 2 === 0) {
      const halfPow = myPow(x, pow / 2);

      return halfPow * halfPow;
    }

    return x * myPow(x, pow - 1);
  };

  return pow >= 0 ? positivePow(x, pow) : 1 / positivePow(x, Math.abs(pow));
};

console.log(myPow(2, 10)); // 1024
console.log(myPow(2.1, 3)); // 9.261
console.log(myPow(2, -2)); // 1/4 = 0.25
