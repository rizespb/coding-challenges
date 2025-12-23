// const _readline = require('readline')

// const _reader = _readline.createInterface({
//   input: process.stdin,
// })

// const _inputLines = []

// _reader.on('line', (line) => {
//   _inputLines.push(line)
// })

// process.stdin.on('end', solve)

const _inputLines = ['10 2', 'gggggooooogggggoooooogggggssshaa']

const findSubStrings = (str, length, repeats) => {
  const map = {}

  let subStr

  for (let i = 0; i < str.length - length; i++) {
    if (i === 0) {
      subStr = str.substr(i, length)
    } else {
      subStr = subStr.slice(1) + str[i + length - 1]
    }

    if (!map[subStr]) map[subStr] = 0

    map[subStr]++
  }

  const result = Object.entries(map)
    .filter(([_, count]) => count >= repeats)
    .map(([key]) => str.indexOf(key))
    .join(' ')

  console.log(result)
}

function solve() {
  const [length, repeats] = _inputLines[0].split(' ').map(Number)

  const str = _inputLines[1]

  findSubStrings(str, length, repeats)
}

solve()
