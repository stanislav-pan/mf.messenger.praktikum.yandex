export class Stack {
  size;
  head;
  tail;

  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  // Кладёт элемент на стек.
  // Возвращает новый размер стека.
  push(value) {
    const node = { value, next: null, prev: null };

    if (this.isEmpty()) {
      this.head = this.tail = node;

      this.size += 1;
      return;
    }

    node.prev = this.tail;
    this.tail.next = node;

    this.tail = node;

    this.size += 1;
  }

  // Убирает элемент со стека.
  // Если стек пустой, кидает ошибку.
  // Возвращает удалённый элемент.
  pop() {
    if (this.isEmpty()) {
      throw new Error('stack is empty');
    }

    const removedValue = this.tail.value;

    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    }

    this.size -= 1;

    return removedValue;
  }

  // Возвращает верхний элемент стека без его удаления.
  peek() {
    return this.tail;
  }

  // Если стек пуст, возвращает true. В противном случае –– false.
  isEmpty() {
    return this.size === 0;
  }
}
