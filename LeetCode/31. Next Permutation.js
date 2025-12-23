// https://leetcode.com/problems/next-permutation/description/

// Общая логика решения
// 3124 -> 3142
// 3412 -> 3421
// 4312 -> 4321
// 4321 -> 1234
// 3421 -> 4321
// 3142 -> 3214
// 2431 -> 3124
// 7165432 -> 7213456
// 71985642 -> 71986245

// [7, 1, 6, 5, 4, 3, 2] -> 7165432 -> 7213456
// Начинаем перебирать числа в массиве с конца. Пока числа возрастают, мы добавляем их в список.
// Делаем это до тех пор, пока не найдем число меньше, чем хотя бы одно из списка
// В этот момент мы меняем текущий элемент с ближайшим большим элементом (ближайшее большее число помещаем на место текущего элемента в массив, а число из массива помещаем на место ближайшего большего в список)
// После этого мы берем числа из списка (они там отсортированы по возрастанию). В исходном массиве удаляем элементы от текущего до конца и заменяем их на отсортированные элементы из списка

// Если мы перебрали исходный массив и дошли до самого первого элемента (то есть все элементы в массиве расположены в порядке убывания), значит нам надо просто развернуть исходный массив

class SortedList {
  constructor() {
    this.list = [];
    this.head = null;
    this.tail = null;
  }

  // Добавляем числа в список, пока числа ворзрастают.
  // Как только встретим число меньше, чем самое большое в списке (оно всегда в хвосте tail), значит надо остановится - возвращаем null
  add(value) {
    const obj = {
      value,
      next: null,
    };

    if (!this.head) {
      this.head = obj;
      this.tail = obj;

      return true;
    }

    if (value >= this.tail.value) {
      this.tail.next = obj;

      this.tail = obj;

      return true;
    }

    return null;
  }

  // Возвращает список в ввиде массива
  log() {
    let next = this.head;

    let result = [];

    while (next) {
      result.push(next.value);
      next = next.next;
    }

    return result;
  }

  // Принимает значение и возвращает первый элемент, который больше переданного значения
  change(value) {
    let next = this.head;

    while (next) {
      if (value < next.value) {
        const changed = next.value;
        next.value = value;

        return changed;
      }

      next = next.next;
    }
  }
}

const nextPermutation = (nums) => {
  const list = new SortedList();

  let i = nums.length - 1;

  // Перебираем элементы массива с конца
  for (i; i >= 0; i--) {
    const current = nums[i];

    // Как только метод add вернет null, значит current меньше хотя бы одного из элементов списка list
    const result = list.add(current, i);

    // Значит нам надо заменить current в nums на ближайший к нему больший элемент из list
    if (!result) {
      const value = list.change(current, i);

      // Проверка if нужна для nums на подобии [1, 1]
      if (value !== undefined) {
        // Заменяем текущий элемент
        nums[i] = value;

        // Оставшуюся часть массива заменяем на эти же элементы, но в отсортированные в порядке возрастания
        nums.splice(i + 1, Infinity, ...list.log());
      }

      break;
    }
  }

  // Если в массиве nums все числа идут по убыванию, нам надо просто развернуть массив nums
  if (i === -1) {
    nums.reverse();
  }

  return nums;
};

nextPermutation([1, 2, 3]); // [1,3,2]
nextPermutation([3, 2, 1]); // [1,2,3]
nextPermutation([1, 1, 5]); // [1,5,1]
nextPermutation([7, 1, 9, 8, 5, 6, 4, 2]); // [7,1,9,8,6,2,4,5]
nextPermutation([7, 1, 6, 5, 4, 3, 2]); // [7,2,1,3,4,5,6]
nextPermutation([1, 1]); // [1,1]
nextPermutation([5, 1, 1]); // [1,1,5]
