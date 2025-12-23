const arr = [
  0, 3, 2, 5, 6, 8, 23, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23, 6, 2, 35, 6,
  3, 32, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7,
  -1, -5, 23,
];
let count = 0;

function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }

  // Находим опорный элемент
  let pivotIndex = Math.floor(array.length / 2);

  // Получаем опорный элемент
  let pivot = array[pivotIndex];

  // Массивы для чисел больше и меньше опорного
  let less = [];
  let greater = [];

  // Проходим по массиву и раскидываем элементы по подмассивам
  for (let i = 0; i < array.length; i++) {
    count += 1;

    // Если индекс текущего равен индексу опорного элемента, то пропускаем итерацию
    if (i === pivotIndex) continue;
    if (array[i] < pivot) {
      less.push(array[i]);
    } else {
      greater.push(array[i]);
    }
  }

  // Разворачиваем в массив результат быстрой сортировки для правого массива, опорного числа и левого массива
  return [...quickSort(less), pivot, ...quickSort(greater)];
}

console.log(quickSort(arr));
console.log("count", count);
