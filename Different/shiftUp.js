function siftUp(heap, idx) {
  function innerSiftUp(heap, index) {
    if (index === 1) {
      return index
    }

    const parentIndex = Math.floor(index / 2)

    if (heap[parentIndex] < heap[index]) {
      ;[heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]]

      siftUp(heap, parentIndex)
    }

    return index
  }

  const index = innerSiftUp(heap, idx)

  return index
}

function test() {
  var sample = [-1, 12, 6, 8, 3, 15, 7]
  console.assert(siftUp(sample, 5) == 1)
}
