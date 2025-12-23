// ID успешной посылки 97931065

/*
-- ПРИНЦИП РАБОТЫ --

Программа спроектирована на основе алгоритма пирамидальной сортировки. 
Пирамида (куча) реализована на основе массива. После вставки или удаления элемента пирамида "нарушается" и каждый раз происходит восстановление кучи с помощью "просеивания вверх" (для вставки элементов) и "просеивания вниз" (для удаления элементов)

За элемент с наибольшим приоритетом принимается участник, у которого больше решенных задач с меньшим количеством штрафных баллов, при равенстве этих двух показателей выше приоритет у участника, чьё имя идет раньше в лексографическом порядке.

Функция compare сравнивает двух участников и возвращает true, если первый участник имеет более высокий приоритет по сравнению со вторым участником.

Вначале мы создаем кучу, наполняя ее элементами из исходного массива согласно приоритету (самый приоритетный элемент будет в корне куче. Приоритет может быть разным: приоритетным может быть самый маленький (сортировка по возрастанию) или самый большой (сортировка по убыванию) элемент))

Добавляя элементы в кучу (heapAdd), мы каждый элемент помещаем в конец кучи и в общем случае этим вносим в кучу дисбаланс. А затем с помощью "просеивания вверх" (siftUp) мы восстанавливаем свойства кучи: мы поднимаем элемент с последнего места в куче до правильного согласно его приоритету положения

Затем мы начинаем извлекать элементы из кучи (popMax). Самый приоритетный элемент находится на вершине куче. Извлекаем его и помещаем в результирующий массив. На его место (в корень дерева) помещаем самый последний элемент из кучи (с наименьшим приоритетом). Теперь наша задача с помощью "просеивания вниз" переместить этот элемент из корня на правильную позицию в куче

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Пирамидальная сортировка имеет сложность O(n log n). Но в отличие от Быстрой сортировки, которая имеет сложность O(n log n) в среднем случае, а в худшем (при недачном выборе опорных элементов) - О (n**2), Пирамидальная сортировка всегда имеет сложность O(n log n)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
O(n) дополнительной памяти (для создания массива)

*/

const _readline = require('readline');

const _reader = _readline.createInterface({
  input: process.stdin,
});

const _inputLines = [];

_reader.on('line', (line) => {
  _inputLines.push(line);
});

process.stdin.on('end', solve);

/** Класс создает экземпляры участник соревнований */
class Participant {
  /**
   * Создание участника соревнований
   * @param {string} participant - строка с данными об участнике соревнований, содарежая информацию об участнике: имя, количество решенных задач, количество штрафных баллов
   */
  constructor(participant) {
    const [name, solutions, penaltyPoints] = participant.split(' ');

    this.name = name;
    this.solutions = Number(solutions);
    this.penaltyPoints = Number(penaltyPoints);
  }
}

const compare = (a, b) => {
  if (a.solutions !== b.solutions) {
    return a.solutions > b.solutions;
  } else if (b.penaltyPoints !== a.penaltyPoints) {
    return b.penaltyPoints > a.penaltyPoints;
  } else {
    return a.name < b.name;
  }
};

function siftUp(heap, index) {
  if (index === 1) {
    return;
  }

  const parentIndex = Math.floor(index / 2);

  if (compare(heap[index - 1], heap[parentIndex - 1])) {
    [heap[parentIndex - 1], heap[index - 1]] = [heap[index - 1], heap[parentIndex - 1]];

    siftUp(heap, parentIndex);
  }
}

function heapAdd(heap, key) {
  const index = heap.length + 1;
  heap.push(key);

  siftUp(heap, index);
}

function siftDown(heap, index) {
  const left = 2 * index + 1;
  const right = 2 * index + 2;

  if (left >= heap.length) {
    return;
  }

  let indexLargest = left;

  if (right < heap.length && compare(heap[right], heap[left])) {
    indexLargest = right;
  }

  if (compare(heap[indexLargest], heap[index])) {
    [heap[index], heap[indexLargest]] = [heap[indexLargest], heap[index]];
    siftDown(heap, indexLargest);
  }
}

function popMax(heap) {
  if (heap.length === 0) {
    throw new Error('Heap is empty');
  }

  const result = heap[0];

  heap[0] = heap[heap.length - 1];

  heap.pop();

  siftDown(heap, 0);

  return result;
}

function heapsort(array) {
  let heap = [];

  for (let item of array) {
    heapAdd(heap, item);
  }

  let sortedArray = [];

  while (heap.length > 0) {
    let max = popMax(heap);

    sortedArray.push(max);
  }
  return sortedArray;
}

function solve() {
  const arrayLength = Number(_inputLines[0]);
  const participants = _inputLines.slice(1, arrayLength + 1).map((participant) => new Participant(participant));

  const sortedParticipants = heapsort(participants);

  sortedParticipants.forEach((participant) => console.log(participant.name));
}
