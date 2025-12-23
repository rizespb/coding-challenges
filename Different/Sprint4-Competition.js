// const _readline = require('readline')

// const _reader = _readline.createInterface({
//   input: process.stdin,
// })

// const _inputLines = []

// _reader.on('line', (line) => {
//   _inputLines.push(line)
// })

// process.stdin.on('end', solve)

const _inputLines = ['10', '0 0 1 0 0 0 1 0 0 1'] // 4

const getLength = (arr) => {
  let maxLength = 0

  let zeros = 0
  let ones = 0

  const diffsMap = {}

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      zeros++
    } else {
      ones++
    }

    // Считаем разницу между количеством 0 и 1 от начала массива до текущей позиции
    const diff = zeros - ones

    // Если такая разница уже встречалась
    if (diffsMap[diff] !== undefined) {
      const start = diffsMap[diff]
      const length = i - start

      maxLength = Math.max(maxLength, length)
    } else {
      // Сохраняем в словарь индекс элемента, которому соответствует эта разница
      diffsMap[diff] = i
    }
  }

  return maxLength || arr.length
}

function solve() {
  const arr = _inputLines[1].split(' ').map(Number)

  const length = getLength(arr)

  console.log(length)
}

solve()
