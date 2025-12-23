// https://leetcode.com/problems/lru-cache/description/

// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

// Implement the LRUCache class:

// LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
// int get(int key) Return the value of the key if the key exists, otherwise return -1.
// void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
// The functions get and put must each run in O(1) average time complexity.

/**
 * @param {number} capacity
 */
const LRUCache = function (capacity) {
  this.maxSize = capacity;
  this.cache = new Map();
  this.size = 0;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const value = this.cache.get(key);

  if (value === undefined) {
    return -1;
  }

  this.cache.delete(key);
  this.cache.set(key, value);

  return value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.cache.get(key) !== undefined) {
    this.cache.delete(key);
    this.cache.set(key, value);

    return;
  }

  this.size++;

  if (this.size > this.maxSize) {
    const firstKey = this.cache.keys().next().value;

    this.cache.delete(firstKey);
    this.size--;
  }

  this.cache.set(key, value);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
