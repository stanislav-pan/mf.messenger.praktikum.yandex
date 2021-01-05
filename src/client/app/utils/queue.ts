type QueueItem = {
  value: unknown;
  next: QueueItem | null;
  prev: QueueItem | null;
};

export class Queue {
  public size: number;
  private head: QueueItem | null;
  private tail: QueueItem | null;

  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  // Ставит элемент в очередь.
  // Возвращает новый размер очереди.
  public enqueue(value: unknown): number {
    const node: QueueItem = { value, next: null, prev: null };

    if (this.isEmpty() || !this.head || !this.tail) {
      this.head = this.tail = node;

      return (this.size += 1);
    }

    node.prev = this.tail;
    this.tail.next = node;

    this.tail = node;

    return (this.size += 1);
  }

  // Убирает элемент из очереди.
  // Если очередь пустая, кидает ошибку.
  // Возвращает удалённый элемент.
  public dequeue(): unknown {
    if (this.isEmpty() || !this.head || !this.tail) {
      throw new Error('stack is empty');
    }

    const removedValue = this.tail.value;

    if (this.size === 1 || !this.head.next) {
      this.head = this.tail = null;
    } else {
      this.head.next.prev = null;
      this.head = this.head.next;
    }

    this.size -= 1;

    return removedValue;
  }

  // Возвращает элемент в начале очереди.
  public peek = (): QueueItem | null => this.head;

  // Если очередь пустая, возвращает true. В противном случае –– false.
  public isEmpty = (): boolean => this.size === 0;
}
