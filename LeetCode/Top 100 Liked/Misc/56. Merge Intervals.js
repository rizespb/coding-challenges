// https://leetcode.com/problems/merge-intervals/description/

// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

const merge = (intervals) => {
  if (!intervals.length) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);

  const result = [];

  let start = intervals[0][0];
  let end = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    let [currentStart, currentEnd] = intervals[i];

    if (currentStart > end) {
      result.push([start, end]);

      start = currentStart;
      end = currentEnd;
    } else {
      start = Math.min(start, currentStart);

      end = Math.max(end, currentEnd);
    }
  }

  result.push([start, end]);

  return result;
};

console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ])
); // [[1,6],[8,10],[15,18]]

console.log(
  merge([
    [1, 4],
    [4, 5],
  ])
); // [[1,5]]

console.log(
  merge([
    [1, 4],
    [0, 4],
  ])
); // [[0, 4]]
