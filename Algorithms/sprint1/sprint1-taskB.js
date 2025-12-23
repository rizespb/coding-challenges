// ID успешной посылки 94874844

const _readline = require('readline')

const _reader = _readline.createInterface({
  input: process.stdin,
})

const _inputLines = []

_reader.on('line', (line) => {
  _inputLines.push(line)
})

process.stdin.on('end', solve)

const getDictionary = (str) => {
  const dictionary = []

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '.') {
      continue
    }

    if (!dictionary[str[i]]) dictionary[str[i]] = 0

    dictionary[str[i]]++
  }

  return dictionary
}

function solve() {
  const buttons = Number(_inputLines[0]) * 2
  const str = _inputLines.slice(1).join('')

  const dictionary = getDictionary(str)

  let counter = 0

  for (let i = 0; i < dictionary.length; i++) {
    if (dictionary[i] <= buttons) {
      counter++
    }
  }

  console.log(counter + '')
}
