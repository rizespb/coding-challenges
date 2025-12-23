class LinkedList {
  constructor() {
    this.size = 0;

    // Корневой элемент
    this.root = null;
  }

  add(value) {
    // Если элементов в списке нет, то в корневой элемент помещаем новый элемент со значение value
    if (this.size === 0) {
      this.root = new Node(value);
      this.size += 1;
      return true;
    }

    // Перебираем ноды в списке, пока у перебираемой ноды есть next, чтобы получит ьпоследнюю ноду в списке
    let node = this.root;
    while (node.next) {
      node = node.next;
    }

    // Создаем новую ноуд и помещаем ссылку на нее в next предыдущей ноды
    let newNode = new Node(value);
    node.next = newNode;
    this.size += 1;
  }

  // Возвращаем размер списка
  getSize() {
    return this.size;
  }

  // Вывод списка в логи
  print() {
    let result = [];
    let node = this.root;
    while (node) {
      result.push(node.value);
      node = node.next;
    }
    console.log(result);
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const list = new LinkedList();
list.add(5);
list.add(3);
list.add(2);
list.add(5);
list.add(7);

list.print();
