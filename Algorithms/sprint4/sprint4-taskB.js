// ID успешной посылки 96306820

/*
-- ПРИНЦИП РАБОТЫ --

В программе реализован алгоритм создания хеш-таблицы, которая поддерживает операции вставки, чтения, удаления данных. Хеш-таблица реализована на основе массива, в которой индекс - это номер корзины. Приблизительное количество хранимых элементов определяем из общего количества запросов (т.к. потенциально у нас все запросы могут быть вида put x y). Далее с помощью функции getNearestPrime определяем билжайшее простое число (Решето Эратосфена). Это и будет размер таблицы. Простое число берем, чтобы снизить вероятность коллизий.

Экземпляр хеш-таблицы создается с помощью класса HashTable, который на входе принимает приблизительно количество элементов, которые будут хранится в таблице.

Коллизии разрешаются методом цепочек: для хранения данных используем структуру связный список (классы Node и LinkedList)

Номер коризны (индекс в массиве) получаем путем взятия остатка от деления ключа (который является целым числом по условию) и размера таблицы

Нюансом работы программы является необходимость выводиить значения элементов в консоль при добавлении или чтении. Эти операции занимают довольно много времени. Для экономии времени программа накапливает результаты таких операций в свойстве results и в конце работы выводит накопленные результаты за один раз.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Т.к. мы постарались снизить вероятность коллизий, в среднем в одной корзине будет хранится один элемент. Чтение, добавление и удаление данных осуществляется по ключу, на основе которого вычисляется индекс. Средняя сложность работы с таблицей составляет O(1)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Размер используемой памяти составляет O(n), где n - количество добавляемых элементов

*/
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

/** Класс создает экземпляр ноды связного списка */
class Node {
  /**
   * Создание ноды
   * @param {number} key - ключ - целое число
   * @param {number} value - значение - целое число
   */
  constructor(key, value) {
    this.key = key
    this.value = value

    this.next = null
  }
}

/** Класс хранит методы для работы со связным списокм */
class LinkedList {
  /**
   * Добавление новой ноды в связный список. Если в списке уже есть нода с переданным ключом, то обновляется значение value в имеющейся ноде
   * @param {Node | null} head - первый элемент списка, в который надо добавить новую (или обновить имеющуюся) ноду
   * @param {number} key - ключ - целое число
   * @param {number} value - значение - целое число
   */
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

  /**
   * Чтение значения из ноды по ключу: находит ноду, в которой хранится key, эквивалентный переданному значению, и возвращает значение value
   * @param {Node | null} head - первый элемент списка, в который надо добавить новую (или обновить имеющуюся) ноду
   * @param {number} key - ключ - целое число
   */
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

  /**
   * Удаление ноды по ключу: находит ноду, в которой хранится key, эквивалентный переданному значению, и удаляет эту ноду. Возвращает значени, которое хранилось в удаляемой ноде
   * @param {Node | null} head - первый элемент списка, в который надо добавить новую (или обновить имеющуюся) ноду
   * @param {number} key - ключ - целое число
   */
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

/** Класс создает экземпляр хеш-таблицы */
class HashTable {
  /**
   * Создание хеш-таблицы
   * @param {number} elementsAmount - приблизительное количество элементов, которые будут хранится в таблице
   */
  constructor(elementsAmount) {
    this.size = getNearestPrime(elementsAmount)

    this.table = new Array(this.size).fill(null)

    this.results = []
  }

  /**
   * Получение значения по ключу
   * @param {number} key - ключ
   */
  get(key) {
    const index = this.calculateIndex(key)

    const head = this.table[index]

    const value = LinkedList.getValue(head, key) ?? NO_VALUE

    this.results.push(value)
  }

  /**
   * Добавление значения по ключу
   * @param {number} key - ключ
   * @param {number} value - ключ
   */
  put(key, value) {
    const index = this.calculateIndex(key)

    const head = this.table[index]
    this.table[index] = LinkedList.addNode(head, key, value)
  }

  /**
   * Удаление значения по ключу
   * @param {number} key - ключ
   */
  delete(key) {
    const index = this.calculateIndex(key)

    const head = this.table[index]
    const { newHead, value } = LinkedList.removeNode(head, key)

    this.table[index] = newHead

    this.results.push(value)
  }

  /**
   * Вычиление номера корзины по ключу
   * @param {number} key - ключ
   */
  calculateIndex(key) {
    return Math.abs(key % this.size)
  }

  /**
   * Вывод накопленных результатов операций
   */
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
