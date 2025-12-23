// https://leetcode.com/problems/product-of-array-except-self/description/

// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

// You must write an algorithm that runs in O(n) time and without using the division operation.

const productExceptSelf = (nums) => {
  let left = 0;
  let right = nums.length - 1;

  // Массив, в котором будет хранится произведение чисел от 0 элемента до i-го включительно
  const fromStartToEnd = [];
  // Массив, в котором будет хранится произведение чисел в обратном порядке: от последнего элемента до i-го включительно
  const fromEndToStart = [];

  while (left < nums.length) {
    const leftProduction = nums[left] * (fromStartToEnd[left - 1] ?? 1);

    const rightProduction = nums[right] * (fromEndToStart[right + 1] ?? 1);

    fromStartToEnd[left] = leftProduction;
    fromEndToStart[right] = rightProduction;

    left++;
    right--;
  }

  // Произведение всех элементов кроме i-го равно произведения всех чисел до i-го элемента на произведение всех числе после этого элемента
  for (let i = 0; i < nums.length; i++) {
    const productionExceptCurrent = (fromStartToEnd[i - 1] ?? 1) * (fromEndToStart[i + 1] ?? 1);

    result.push(productionExceptCurrent);
  }

  return result;
};

console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6];
console.log(productExceptSelf([-1, 1, 0, -3, 3])); // [0, 0, 9, 0, 0];

// Более декларативное решение, но сложность O(4n) - 4 прохода
// const productExceptSelf = (nums) => {
// 	const fromStartToEnd = nums.reduce((acc, value) => {
// 	  const product = (acc[acc.length - 1] ?? 1) * value;
// 	  acc.push(product);

// 	  return acc;
// 	}, []);

// 	const fromEndToStart = nums.reduceRight((acc, value) => {
// 	  const product = (acc[acc.length - 1] ?? 1) * value;
// 	  acc.push(product);

// 	  return acc;
// 	}, []);

// 	fromEndToStart.reverse();

// 	const result = [];

// 	for (let i = 0; i < nums.length; i++) {
// 	  const productionExceptCurrent = (fromStartToEnd[i - 1] ?? 1) * (fromEndToStart[i + 1] ?? 1);

// 	  result.push(productionExceptCurrent);
// 	}

// 	return result;
//   };
