// https://leetcode.com/problems/number-of-recent-calls/description/
const { test } = require('./test');

class RecentCounter {
  constructor() {
    this.requests = [];
  }

  ping = (t) => {
    this.requests.push(t);
    console.log(this.requests);

    while (t - this.requests[0] > 3000) {
      this.requests.shift();
    }

    return this.requests.length;
  };
}

const recentCounter = new RecentCounter();

test(recentCounter.ping, [
  {
    input: [1],
    expected: 1,
  },
  {
    input: [100],
    expected: 2,
  },
  {
    input: [3001],
    expected: 3,
  },
  {
    input: [3002],
    expected: 3,
  },
]);
