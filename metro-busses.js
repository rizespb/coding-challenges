// const _readline = require('readline')

// const _reader = _readline.createInterface({
//   input: process.stdin,
// })

// const _inputLines = []

// _reader.on('line', (line) => {
//   _inputLines.push(line)
// })

// process.stdin.on('end', solve)

// const _inputLines = ['3', '-1 0', '1 0', '2 5', '3', '10 0', '20 0', '22 5']
// const _inputLines = ['3', '-1 0', '1 0', '0 5', '3', '10 0', '20 0', '20 5']
const _inputLines = [
  '10',
  '-54 -23',
  '-63 -26',
  '15 -47',
  '-12 -29',
  '-60 -21',
  '67 -106',
  '66 -99',
  '48 -96',
  '9 -60',
  '-51 -60',
  '15',
  '-32 -40',
  '57 -114',
  '58 -99',
  '10 -26',
  '64 -82',
  '-44 -34',
  '62 -80',
  '62 -113',
  '56 -112',
  '6 -20',
  '60 -119',
  '29 -91',
  '12 -47',
  '25 -88',
  '-6 -50',
]

const DISTANCE = 20

const isBusNearMetro = (metro, bus) => (metro[0] - bus[0]) ** 2 + (metro[1] - bus[1]) ** 2 <= DISTANCE ** 2

const getMap = (metros, busses) => {
  const map = new Map()

  for (let i = 0; i < metros.length; i++) {
    const currentMetro = metros[i]

    for (let j = 0; j < busses.length; j++) {
      const currentBus = busses[j]

      if (!map.get(currentMetro)) map.set(currentMetro, [])

      if (isBusNearMetro(currentMetro, currentBus)) {
        map.get(currentMetro).push(currentBus)
      }
    }
  }

  return map
}

function solve() {
  const metroStationsAmount = Number(_inputLines[0])
  const metros = _inputLines.slice(1, metroStationsAmount + 1).map((el) => el.split(' '))

  const busses = _inputLines.slice(metroStationsAmount + 2).map((el) => el.split(' '))

  const map = getMap(metros, busses)
  const entries = Array.from(map.entries())

  let metroNum
  let maxLength = 0

  for (let i = 0; i < entries.length; i++) {
    const current = entries[i]

    if (current[1].length > maxLength) {
      maxLength = current[1].length
      metroNum = i + 1
    }
  }

  console.log(metroNum)
}

solve()
