const _readline = require('readline')

const _reader = _readline.createInterface({
  input: process.stdin,
})

const _inputLines = []

_reader.on('line', (line) => {
  _inputLines.push(line)
})

process.stdin.on('end', solve)

/** Класс создает экземпляры участник соревнований */
class Participant {
  /**
   * Создание участника соревнований
   * @param {string} participant - строка с данными об участнике соревнований, содарежая информацию об участнике: имя, количество решенных задач, количество штрафных баллов
   */
  constructor(participant) {
    const [name, solutions, penaltyPoints] = participant.split(' ')

    this.name = name
    this.solutions = Number(solutions)
    this.penaltyPoints = Number(penaltyPoints)
  }
}

const compare = (a, b) => {
  if (a.solutions !== b.solutions) {
    return a.solutions > b.solutions
  } else if (b.penaltyPoints !== a.penaltyPoints) {
    return b.penaltyPoints > a.penaltyPoints
  } else {
    return a.name < b.name
  }
}

function quickSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (arr.length < 2) return

  const index = partition(arr, left, right)

  if (left < index - 1) {
    quickSortInPlace(arr, left, index - 1)
  }
  if (right > index) {
    quickSortInPlace(arr, index, right)
  }
}

function partition(arr, left, right) {
  const pivotIndex = Math.floor((left + right) / 2)

  const pivot = arr[pivotIndex]

  while (left <= right) {
    while (compare(arr[left], pivot)) {
      left++
    }

    while (compare(pivot, arr[right])) {
      right--
    }

    if (left <= right) {
      ;[arr[left], arr[right]] = [arr[right], arr[left]]

      left++
      right--
    }
  }
  return left
}

function solve() {
  const arrayLength = Number(_inputLines[0])
  const input = _inputLines.slice(1, 1 + arrayLength).map((participant) => new Participant(participant))

  quickSortInPlace(input)

  input.forEach((participant) => console.log(participant.name))
}
