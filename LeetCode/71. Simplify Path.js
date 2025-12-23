// https://leetcode.com/problems/simplify-path/description/

const SKIP = '.';
const UP = '..';

const simplifyPath = (path) => {
  const formattedPath = path.replace(/\/+/g, '/');

  const arr = formattedPath.split('/').filter(Boolean);

  const result = [];

  for (const segment of arr) {
    if (segment === SKIP) {
      continue;
    }

    if (segment === UP) {
      result.pop();
      continue;
    }

    result.push(segment);
  }

  return '/' + result.join('/');
};

console.log(simplifyPath('/home/')); // /home
console.log(simplifyPath('/home//foo/')); // /home/foo
console.log(simplifyPath('/home/user/Documents/../Pictures')); // /home/user/Pictures
console.log(simplifyPath('/../')); // /
console.log(simplifyPath('/.../a/../b/c/../d/./')); // /.../b/d
