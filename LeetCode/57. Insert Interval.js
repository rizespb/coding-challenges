// https://leetcode.com/problems/insert-interval/description/

const insert = (intervals, newInterval) => {
  const [newStart, newEnd] = newInterval;

  if (intervals.length === 0) return [newInterval];

  const result = [];

  let start;
  let end;
  let wasIntersected = false;

  for (let i = 0; i < intervals.length; i++) {
    const current = intervals[i];
    const prev = result.at(-1);

    const [currentStart, currentEnd] = current;
    const [prevStart, prevEnd] = prev || [-Infinity, -Infinity];

    if (currentStart <= prevEnd) {
      prev[1] = Math.max(prevEnd, currentEnd);
      continue;
    }

    // Проверяем, пересекается ли текущий интервал с newInterval
    const isIntersecting =
      (newStart >= currentStart && newStart <= currentEnd) ||
      (newEnd >= currentStart && newEnd <= currentEnd) ||
      (currentStart >= newStart && currentEnd <= newEnd);

    if (!isIntersecting) {
      result.push(current);
      continue;
    }

    // Устаннавливаем флаг, если было пересечение
    wasIntersected = true;

    start = Math.min(currentStart, newStart);
    end = Math.max(currentEnd, newEnd);

    result.push([start, end]);
  }

  // Если пересечения не было, значит newInterval должен стать или в самое начало intervals, или в конец intervals, или newInterval должен быть добавлен между имеющимися элементами
  if (!wasIntersected) {
    let index = -1;

    for (let i = 0; i < intervals.length; i++) {
      if (newEnd > intervals[i][1]) {
        index = i;
      }
    }

    result.splice(index + 1, 0, newInterval);
  }

  return result;
};

console.log(
  insert(
    [
      [1, 3],
      [6, 9],
    ],
    [2, 5]
  )
); // [[1,5],[6,9]]

console.log(
  insert(
    [
      [1, 2],
      [3, 5],
      [6, 7],
      [8, 10],
      [12, 16],
    ],
    [4, 8]
  )
); // [[1,2],[3,10],[12,16]]

console.log(
  insert(
    [
      [2, 3],
      [5, 7],
    ],
    [0, 6]
  )
); // [[0, 7]]
