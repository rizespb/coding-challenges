// https://leetcode.com/problems/string-compression/description/

const compress = (chars) => {
  let index = 0;

  let currentCount = 0;

  for (let i = 0; i < chars.length; i++) {
    currentCount++;

    if (chars[i] === chars[i + 1]) {
      continue;
    }

    chars[index] = chars[i];

    if (currentCount !== 1) {
      console.log(chars[i], currentCount.toString());
      countStr = currentCount.toString();

      for (const digit of countStr) {
        index++;
        chars[index] = digit;
      }
    }

    currentCount = 0;
    index++;
  }

  chars.splice(index);

  return chars.length;
};

compress(['a', 'a', 'b', 'b', 'c', 'c', 'c']); // 6 -> [ 'a', '2', 'b', '2', 'c', '3' ]
compress(['a']); // 1 -> [ 'a' ]
compress(['a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']); // 4 -> [ 'a', 'b', '1', '2' ]
