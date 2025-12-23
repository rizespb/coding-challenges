// ID успешной посылки 95195638

/*
-- ПРИНЦИП РАБОТЫ --

Я реализовал дек на основе кольцевого буфера.

Конструктор класса принимает максимальный размер дека. В качесттве хранилища в классе используется массив. Интерфейс класса не допускает переполнения массива. Поэтому, несмотря на то что массивы в JS являются динамическими, для нашего хранилища не будет выполняться релокация. Это экономит используемую память.

Указатели head и tail указывают на позицию, куда будет вставлен следующий элемент при добавлении в конец или в начало соответственно

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Добавление или удаление элементов происходят со сложностью О(1)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Пустые элементы в массиве - это null.
Поэтому в хранилище всегда будет maxSize элементов. Пространственная сложность O(1)
*/

const _readline = require('readline')

const _reader = _readline.createInterface({
  input: process.stdin,
})

const _inputLines = []

_reader.on('line', (line) => {
  _inputLines.push(line)
})

process.stdin.on('end', solve)

const ERROR_TEXT = 'error'

/** Класс создает экземпляры дек */
class Deque {
  /**
   * Создание дека
   * @param {number} maxSize - максимально возможное количество элементов в деке
   */
  constructor(maxSize) {
    this.deque = new Array(maxSize).fill(null)
    this.head = 0
    this.tail = 1
    this.maxSize = maxSize
    this.size = 0
  }

  /**
   * Дек пустой или нет
   * @type {boolean}
   */
  get isEmpty() {
    return this.size === 0
  }

  /**
   * Заполнен ли дек полностью
   * @type {boolean}
   */
  get isFull() {
    return this.size === this.maxSize
  }

  /**
   * Вставка нового элемента в начало дека
   * @param {*} value - добавляемый элемент
   */
  pushFront(value) {
    if (this.isFull) {
      console.log(ERROR_TEXT)
      return
    }

    this.deque[this.head] = value
    this.head = this.head === 0 ? this.maxSize - 1 : this.head - 1

    this.size += 1
  }

  /**
   * Вставка нового элемента в конец дека
   * @param {*} value - добавляемый элемент
   */
  pushBack(value) {
    if (this.isFull) {
      console.log(ERROR_TEXT)
      return
    }

    this.deque[this.tail] = value
    this.tail = (this.tail + 1) % this.maxSize
    this.size += 1
  }

  /**
   * Удаление первого элемента
   */
  popFront() {
    if (this.isEmpty) {
      console.log(ERROR_TEXT)
      return
    }

    this.head = (this.head + 1) % this.maxSize

    const value = this.deque[this.head]

    this.deque[this.head] = null

    this.size -= 1

    console.log(value)
  }

  /**
   * Удаление последнего элемента
   */
  popBack() {
    if (this.isEmpty) {
      console.log(ERROR_TEXT)
      return
    }

    this.tail = this.tail === 0 ? this.maxSize - 1 : this.tail - 1

    const value = this.deque[this.tail]

    this.deque[this.tail] = null

    this.size -= 1

    console.log(value)
  }
}

const executeCommand = (deque) => (command) => {
  let method
  let value

  if (command[1] === 'u') {
    ;[method, value] = command.split(' ')
  } else {
    method = command
  }

  switch (method) {
    case 'push_back':
      deque.pushBack(value)
      break

    case 'push_front':
      deque.pushFront(value)
      break

    case 'pop_back':
      deque.popBack()
      break

    case 'pop_front':
      deque.popFront()
      break

    default:
      break
  }
}

function solve() {
  const maxSize = Number(_inputLines[1])
  const commands = _inputLines.slice(2)

  const deque = new Deque(maxSize)

  commands.forEach(executeCommand(deque))
}
