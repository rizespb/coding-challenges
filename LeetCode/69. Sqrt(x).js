// https://leetcode.com/problems/sqrtx/description/

// const mySqrt = (x) => {
//   if (x <= 3) return x == 0 ? 0 : 1;

//   let prev;

//   for (let i = 1; i < x; i++) {
//     const sqrt = i * i;

//     if (sqrt === x) {
//       return i;
//     }

//     if (prev && sqrt > x) {
//       return prev;
//     }

//     prev = i;
//   }
// };

// Более быстрое решение на основе бинарного поиска
const mySqrt = (x) => {
  if (x <= 3) return x == 0 ? 0 : 1;

  let left = 0;
  let right = Math.ceil(x / 2);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const midSqrt = mid * mid;
    const nextSqrt = (mid + 1) * (mid + 1);

    if (midSqrt === x) {
      return mid;
    }

    if (midSqrt <= x && nextSqrt > x) {
      return mid;
    }

    if (midSqrt > x) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
};

console.log(mySqrt(0)); // 0
console.log(mySqrt(2)); // 1
console.log(mySqrt(4)); // 2
console.log(mySqrt(8)); // 2
console.log(mySqrt(9)); // 3
console.log(mySqrt(15)); // 3
console.log(mySqrt(16)); // 4
