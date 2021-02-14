export class BinaryHeap {
  private data: number[];

  constructor() {
    // Массив для хранения данных.
    this.data = [];
  }

  public getData(): number[] {
    return [...this.data];
  }

  // Добавление элемента.
  public insert(node: number): void {
    const length = this.data.push(node);

    this.bubbleUp(length - 1);
  }

  // Удаление корневого элемента.
  // Возвращает корневой элемент, если он есть, в противном случае –– undefined.
  public extract(): number | undefined {
    const length = this.data.length;

    if (length <= 1) {
      return this.data.pop();
    }

    this.swap(0, length - 1);
    const removedValue = this.data.pop();

    if (this.data.length !== 1) {
      this.sinkDown(0);
    }

    return removedValue;
  }

  private sinkDown(index: number) {
    const value = this.data[index];

    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);

    const leftChild = this.data[leftChildIndex];
    const rightChild = this.data[rightChildIndex];

    if (!Number.isInteger(leftChild) && !Number.isInteger(rightChild)) {
      return;
    }

    let nextIndex: number | null = null;

    if (leftChild > value && rightChild > value) {
      nextIndex = leftChild >= rightChild ? leftChildIndex : rightChildIndex;
    } else {
      nextIndex = leftChild > value ? leftChildIndex : rightChildIndex;
    }

    this.swap(index, nextIndex);

    this.sinkDown(nextIndex);
  }

  private bubbleUp(index: number) {
    const parentIndex = this.getParentIndex(index);

    if (parentIndex === null) {
      return;
    }

    const value = this.data[index];
    const parentValue = this.data[parentIndex];

    if (value > parentValue) {
      this.swap(index, parentIndex);
    }

    this.bubbleUp(parentIndex);
  }

  private swap(sourceIndex: number, targetIndex: number) {
    const temp = this.data[sourceIndex];

    this.data[sourceIndex] = this.data[targetIndex];
    this.data[targetIndex] = temp;
  }

  private getParentIndex(index: number): number | null {
    if (!index) {
      return null;
    }

    const parentIndex = Math.floor((index - 1) / 2);

    if (parentIndex < 0) {
      return null;
    }

    return parentIndex;
  }

  private getLeftChildIndex = (index: number) => 2 * index + 1;
  private getRightChildIndex = (index: number) => 2 * index + 2;
}
