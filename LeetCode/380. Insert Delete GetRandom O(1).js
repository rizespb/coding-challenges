// https://leetcode.com/problems/insert-delete-getrandom-o1/description/

class RandomizedSet {
  constructor() {
    this.map = new Map();
    this.list = [];
  }

  insert(val) {
    if (this.map.has(val)) return false;

    this.list.push(val);
    this.map.set(val, this.list.length - 1);

    return true;
  }

  remove(val) {
    if (!this.map.has(val)) return false;

    const index = this.map.get(val);

    this.list[index] = this.list[this.list.length - 1];
    this.map.set(this.list[index], index);

    this.map.delete(val);
    this.list.pop();
    return true;
  }

  getRandom() {
    const size = this.list.length;
    const randomIndex = Math.floor(Math.random() * size);

    return this.list[randomIndex];
  }
}
