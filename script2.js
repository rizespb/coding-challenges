const fetch = () => {
  const a = 1;

  return;
};

const fn = () => {
  const a = 1;

  return () => {
    console.log('a', a);
  };
};

module.exports = {
  fn: fn(),
};
