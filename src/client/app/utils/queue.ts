export class Queue {
  size;
  head;
  tail;

  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  // Ставит элемент в очередь.
  // Возвращает новый размер очереди.
  enqueue(value) {
    const node = { value, next: null, prev: null };

    if (this.isEmpty()) {
      this.head = this.tail = node;

      this.size += 1;
      return;
    }

    node.prev = this.tail;
    this.tail.next = node;

    this.tail = node;

    return (this.size += 1);
  }

  // Убирает элемент из очереди.
  // Если очередь пустая, кидает ошибку.
  // Возвращает удалённый элемент.
  dequeue() {
    if (this.isEmpty()) {
      throw new Error('stack is empty');
    }

    const removedValue = this.tail.value;

    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.head.next.prev = null;
      this.head = this.head.next;
    }

    this.size -= 1;

    return removedValue;
  }

  // Возвращает элемент в начале очереди.
  peek = () => this.head;

  // Если очередь пустая, возвращает true. В противном случае –– false.
  isEmpty = () => this.size === 0;
}
