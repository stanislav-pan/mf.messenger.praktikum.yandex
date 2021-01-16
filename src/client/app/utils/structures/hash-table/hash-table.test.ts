import { HashTable } from './hash-table';

describe('Тестирование класса HashTable', () => {
  let hashTable: HashTable;

  beforeEach(() => {
    hashTable = new HashTable(10);
  });

  it('Функция set должна корректно добавлять элемент в таблицу', () => {
    hashTable.set('foo', 1);
    hashTable.set('bar', 2);

    expect(hashTable.get('foo')).toBe(1);
    expect(hashTable.get('bar')).toBe(2);
  });

  it('Функция remove должна корректно удалять элемент из таблицы', () => {
    hashTable.set('foo', 1);
    hashTable.set('bar', 2);

    expect(hashTable.get('foo')).toBe(1);
    expect(hashTable.get('bar')).toBe(2);

    hashTable.remove('foo');
    expect(hashTable.get('foo')).toBe(undefined);
  });
});
