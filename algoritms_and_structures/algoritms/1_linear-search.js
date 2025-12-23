// Алгоритм линейного поиска

"use strict";

const arr = [3, 4, 5, 8, 1, 4, 9, 11, 13];
let count = 0; // количество итераций

function linearSearch(array, item) {
  for (let i = 0; i < array.length; i++) {
    count++;
    if (array[i] === item) {
      return i;
    }
  }

  return null;
}

console.log(linearSearch(arr, 1)); // выведет 4
console.log(count); // выведет 5
