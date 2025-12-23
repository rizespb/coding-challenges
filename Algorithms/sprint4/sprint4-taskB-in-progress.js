// const _readline = require('readline')

// const _reader = _readline.createInterface({
//   input: process.stdin,
// })

// const _inputLines = []

// _reader.on('line', (line) => {
//   _inputLines.push(line)
// })

// process.stdin.on('end', solve)

const _inputLines1 = [
  '15',
  'put 20 27',
  'get 20',
  'put 20 21',
  'get 20',
  'get 20',
  'get -1',
  'get 20',
  'get -3',
  'delete 20',
  'get -29',
  'get -33',
  'delete -29',
  'get 16',
  'get 14',
  'put 29 39',
]
// None
// 10
// 4
// 4
// None
// 5
// None

const _inputLines = [
  '10',
  'get 1',
  'put 1 10',
  'put 2 4',
  'get 1',
  'get 2',
  'delete 2',
  'get 2',
  'put 1 5',
  'get 1',
  'delete 2',
]
// None
// None
// 1
// 2
// 3

const NO_VALUE = 'None'

function getNearestPrime(n) {
  const numbers = new Array(n + 1).fill(true)

  numbers[0] = numbers[1] = false

  for (let num = 2; num < n; num++) {
    if (numbers[num]) {
      for (let j = num * num; j <= n; j += num) {
        numbers[j] = false
      }
    }
  }

  return numbers.lastIndexOf(true)
}

class Node {
  constructor(key, value) {
    this.key = key
    this.value = value

    this.next = null
  }
}

class LinkedList {
  static addNode(head, key, value) {
    const newNode = new Node(key, value)

    if (!head) {
      return newNode
    }

    let current = head
    let prev

    while (current) {
      if (current.key === key) {
        current.value = value

        return head
      }

      prev = current
      current = current.next
    }

    prev.next = newNode

    return head
  }

  static getValue(head, key) {
    let current = head

    while (current) {
      if (current.key === key) {
        return current.value
      }

      current = current.next
    }

    return null
  }

  static removeNode(head, key) {
    if (!head) {
      return {
        newHead: head,
        value: NO_VALUE,
      }
    }

    if (head.key === key) {
      return {
        newHead: head.next,
        value: head.value,
      }
    }

    let current = head.next
    let prev = head

    while (current) {
      if (current.key === key) {
        prev.next = current.next

        return {
          newHead: head,
          value: current.value,
        }
      }

      prev = current
      current = current.next
    }

    return {
      newHead: head,
      value: NO_VALUE,
    }
  }
}

class HashTable {
  constructor(elementsAmount) {
    this.size = getNearestPrime(elementsAmount)

    this.table = new Array(this.size).fill(null)

    this.results = []
  }

  get(key) {
    const index = this.calculateIndex(key)

    const head = this.table[index]

    const value = LinkedList.getValue(head, key) ?? NO_VALUE

    this.results.push(value)
  }

  put(key, value) {
    const index = this.calculateIndex(key)

    const head = this.table[index]
    this.table[index] = LinkedList.addNode(head, key, value)
  }

  delete(key) {
    const index = this.calculateIndex(key)

    const head = this.table[index]
    const { newHead, value } = LinkedList.removeNode(head, key)

    this.table[index] = newHead

    this.results.push(value)
  }

  calculateIndex(key) {
    return Math.abs(key % this.size)
  }

  printResults() {
    console.log(this.results.join('\n'))
  }
}

const executeCommand = (table) => (command) => {
  const [method, key, value] = command.split(' ')

  switch (method) {
    case 'put':
      table.put(key, value)
      break

    case 'get':
      table.get(key)
      break

    case 'delete':
      table.delete(key)
      break

    default:
      break
  }
}

function solve() {
  const commandsAmount = Number(_inputLines[0])
  const commands = _inputLines.slice(1)

  const table = new HashTable(commandsAmount)

  commands.forEach(executeCommand(table))

  table.printResults()
}

solve()
