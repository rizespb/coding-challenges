// ID успешной посылки 94872499

const _readline = require('readline')

const _reader = _readline.createInterface({
  input: process.stdin,
})

const _inputLines = []

_reader.on('line', (line) => {
  _inputLines.push(line)
})

process.stdin.on('end', solve)

const getEpmtiesPositions = (areas) => {
  const epmtiesPositions = []

  for (let i = 0; i < areas.length; i++) {
    if (areas[i] === 0) {
      epmtiesPositions.push(i)
    }
  }

  return epmtiesPositions
}

const getDiffs = (areas, epmtiesPositions) => {
  const result = []
  let emptiesIndex = 0

  for (let i = 0; i < areas.length; i++) {
    const currentDiff = Math.abs(i - epmtiesPositions[emptiesIndex])

    if (epmtiesPositions[emptiesIndex + 1] === undefined) {
      result.push(currentDiff)
      continue
    }

    const nextDiff = Math.abs(i - epmtiesPositions[emptiesIndex + 1])

    if (currentDiff > nextDiff) {
      result.push(nextDiff)
      emptiesIndex++
    } else {
      result.push(currentDiff)
    }
  }

  return result
}

function solve() {
  const areas = _inputLines[1].split(' ').map(Number)

  const epmtiesPositions = getEpmtiesPositions(areas)

  const result = getDiffs(areas, epmtiesPositions)

  console.log(result.join(' '))
}
