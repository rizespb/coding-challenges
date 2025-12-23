// ID успешной посылки 95196860

/*
-- ПРИНЦИП РАБОТЫ --

Я реализовал калькулятор на основе стека.

Если поступает число, оно идет в стек. Если поступает нечисло, значит это оператор. Из стека извлекается два элемента, к которым применяется текущий оператор

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Добавление или извлечение элементов в стеке происходит с сложностью O(1).
Временная сложность алгоритма линейно зависит от количества входных данных - О(n)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Каждый новый элемент будет увеличивать количество занятой стеком памяти. Пространственная сложность O(n)
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

/** Класс создает экземпляры стек */
class Stack {
  /**
   * Создание стека
   */
  constructor() {
    this.items = []
  }

  /**
   * Вставка нового элемента в конец стека
   * @param {*} item - добавляемый элемент
   */
  push(item) {
    this.items.push(item)
  }

  /**
   * Удаление последнего элемента
   */
  pop() {
    return this.items.pop()
  }
}

const executeCommand = (a, b, operator) => {
  switch (operator) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
    case '/':
      return Math.floor(a / b)
  }
}

function solve() {
  const input = _inputLines[0].split(' ')

  const stack = new Stack()

  input.forEach((item) => {
    const num = Number(item)

    if (isNaN(num)) {
      const b = stack.pop()
      const a = stack.pop()

      const result = executeCommand(a, b, item)
      stack.push(result)
    } else {
      stack.push(num)
    }
  })

  console.log(stack.pop())
}
