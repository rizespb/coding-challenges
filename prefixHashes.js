// const _readline = require('readline')

// const _reader = _readline.createInterface({
//   input: process.stdin,
// })

// const _inputLines = []

// _reader.on('line', (line) => {
//   _inputLines.push(line)
// })

// process.stdin.on('end', solve)

let PRIME_BASE
let PRIME_MOD

const _inputLines = ['1000', '1000009', 'abcdefgh', '7', '1 1', '1 5', '2 3', '3 4', '4 4', '1 8', '5 8']

function polynomialHash(s, start, end) {
  let hash = 0

  for (let i = start; i < end; i++) {
    hash = hash * PRIME_BASE + s.charCodeAt(i)
    hash %= PRIME_MOD //don't overflow
  }

  return hash
}

const calculatePrefixHashes = (str) => {
  const prefixHashes = []

  for (let i = 0; i <= str.length; i++) {
    const prefixHash = polynomialHash(str, 0, i)
    prefixHashes[i] = prefixHash
  }

  return prefixHashes
}

function getSubstringHash(prefixHashes, startIndex, endIndex) {
  const power = [] // Массив для предварительного вычисления степеней простого числа

  power[0] = 1

  for (let i = 1; i <= endIndex; i++) {
    power[i] = (power[i - 1] * PRIME_BASE) % PRIME_MOD
  }

  let substringHash =
    (prefixHashes[endIndex] -
      ((prefixHashes[startIndex - 1] * power[endIndex - startIndex + 1]) % PRIME_MOD) +
      PRIME_MOD) %
    PRIME_MOD

  return substringHash
}

function solve() {
  PRIME_BASE = Number(_inputLines[0])
  PRIME_MOD = Number(_inputLines[1])
  const str = _inputLines[2]

  const prefixHashes = calculatePrefixHashes(str)

  const indexes = _inputLines.slice(4)

  indexes.forEach((item) => {
    const [start, end] = item.split(' ').map(Number)

    const substringHash = getSubstringHash(prefixHashes, start, end)
    console.log(substringHash)
  })

  indexes.for
}

solve()
