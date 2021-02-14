import { BinaryHeap } from '.';

describe('Тестирование класса HashTable', () => {
  let binaryHeap: BinaryHeap;
  const insertSet = [34, 17, 29, 72, 38, 42, 15, 25, 84, 97];

  const insertAll = () => {
    for (let i = 0; i < insertSet.length; i++) {
      binaryHeap.insert(insertSet[i]);
    }
  };

  beforeEach(() => {
    binaryHeap = new BinaryHeap();
  });

  it('Функция insert должна корректно добавлять элемент в кучу', () => {
    insertAll();
    const res = [97, 84, 42, 38, 72, 29, 15, 17, 25, 34];

    expect(binaryHeap.getData()).toEqual(res);
  });
});
