// https://leetcode.com/problems/flatten-nested-list-iterator/description/

class NestedIterator {
  constructor(list) {
    this.list = this.flatten(list);
    this.index = 0;
  }

  hasNext() {
    return this.index < this.list.length;
  }

  next() {
    return this.list[this.index++];
  }

  flatten(list) {
    const result = [];

    const inner = (list) => {
      for (const item of list) {
        if (item.isInteger()) {
          result.push(item.getInteger());
        } else {
          inner(item.getList());
        }
      }
    };

    inner(list);

    return result;
  }
}
