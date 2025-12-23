// https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/

const removeDuplicates = (arr) => {
  let index = 0;

  while (index < arr.length) {
    if (arr[index] === arr[index + 2]) {
      let nextIndex = index + 2;

      while (arr[index] === arr[nextIndex]) {
        nextIndex++;
      }

      arr.splice(index + 2, nextIndex - (index + 2));
    }

    index++;
  }

  return arr;
};

console.log(removeDuplicates([1, 1, 1, 2, 2, 3])); // [1, 1, 2, 2, 3]
console.log(removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3])); // [0, 0, 1, 1, 2, 3, 3]
