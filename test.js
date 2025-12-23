const test = (callBack, cases) => {
  for (const { input, expected } of cases) {
    const result = callBack(...input);

    console.log('input', input);
    console.log('result', result);
    console.log('expected', expected);

    console.log(expected === result ? '\x1b[32mPassed\x1b[0m' : '\x1b[31mFailed\x1b[0m');

    console.log('-----------------------------------');
  }
};

module.exports = {
  test,
};
