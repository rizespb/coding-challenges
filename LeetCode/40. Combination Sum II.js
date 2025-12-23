// https://leetcode.com/problems/combination-sum-ii/description/

const combinationSum2 = (candidates, target) => {
  const result = [];

  // Сортировка потребуется для того, чтобы в дальнейшем избежать дубликатов в result
  candidates.sort((a, b) => a - b);

  const innerFn = (combination, currentSum, nextIndex) => {
    if (currentSum === target) {
      result.push([...combination]);
      return;
    }

    if (currentSum > target) {
      return;
    }

    for (let i = nextIndex; i < candidates.length; i++) {
      const current = candidates[i];
      const prev = candidates[i - 1];

      // Если текущий элемент не первый при переборе и он равен предыдущему, то пропускаем его, чтобы не создавать дубли комбинаций
      if (i > nextIndex && current === prev) {
        continue;
      }

      // Добавляем текущий элемент в массив
      combination.push(current);
      // И проверяем, начиная со следующего элемента
      innerFn(combination, currentSum + current, i + 1);

      // извлекаем текущий элемент из массива
      combination.pop(current);
    }
  };

  innerFn([], 0, 0);

  return result;
};

console.log(combinationSum2([2, 3, 6, 7], 7)); // [[7]]
console.log(combinationSum2([2, 3, 5], 8)); // [[3,5]]
