// const callBack = (acc, el, index, array) => {
//   console.log(
//     `Element is ${el}, index is ${index}, array is ${array}, accumalator is ${acc}`
//   );

//   return acc + el;
// };

// Array.prototype.reduceNew = function (callBack, accInitialValue = 0) {
//   let acc = accInitialValue;

//   for (let i = 0; i < this.length; i++) {
//     acc = callBack(acc, this[i], i, this);
//   }

//   console.log(acc);
// };

// [1, 2, 3, 10].reduceNew(callBack, 0);

// const obj = {
//   name: 'Obj',

//   methodFunc() {
//     console.log(this);
//   },

//   methodFuncArrow: () => {
//     console.log(this);
//   },
// };

// obj.methodFunc();
// obj.methodFuncArrow();
// вместо response.json() и других методов
// Обработка сообщений, отправленных сервером.

'use strict';

// const a = new RegExp('a[fu]', 'g');
const a = /a[fu]/;

const str = 'afaauayana';

console.log(a.test(str));
console.log(a.exec(str));
console.log(a.exec(str));

console.log(str.match(a));
console.log(Array.from(str.matchAll(a)));
console.log(str.search(a));
console.log(str.match(a));

let string = 'Gogogo John!';

// ?: исключает go из запоминания
let regexp = /(?:go)+/i;

let result = string.match(regexp);

console.log(result);
