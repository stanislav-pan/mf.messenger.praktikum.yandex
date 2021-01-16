type StackItem = {
  value: unknown;
  next: StackItem | null;
  prev: StackItem | null;
};

export class Stack {
  public size: number;
  private head: StackItem | null;
  private tail: StackItem | null;

  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  /**
   * Кладёт элемент на стек.
   * @returns Возвращает новый размер стека.
   */
  public push(value: unknown): number {
    const node: StackItem = { value, next: null, prev: null };

    if (this.isEmpty() || !this.head || !this.tail) {
      this.head = this.tail = node;

      this.size += 1;

      return this.size;
    }

    node.prev = this.tail;
    this.tail.next = node;

    this.tail = node;

    this.size += 1;

    return this.size;
  }

  // Убирает элемент со стека.
  // Если стек пустой, кидает ошибку.
  // Возвращает удалённый элемент.
  public pop<T>(): T {
    if (this.isEmpty() || !this.head || !this.tail) {
      throw new Error('stack is empty');
    }

    const removedValue = this.tail.value;

    if (this.size === 1 || !this.tail.prev) {
      this.head = this.tail = null;
    } else {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    }

    this.size -= 1;

    return removedValue as T;
  }

  /** Возвращает верхний элемент стека без его удаления. */
  public peek = (): StackItem | null => this.tail;

  /** Если стек пуст, возвращает true. В противном случае –– false. */
  public isEmpty = (): boolean => this.size === 0;
}
