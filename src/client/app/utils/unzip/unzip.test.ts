import { unzip } from './unzip';

describe('Тестирование функции unzip', () => {
  it('Должна возвращать корректное значение', () => {
    expect(unzip([1, 2, 3], [4], [5, 6])).toEqual([
      [1, 4, 5],
      [2, undefined, 6],
      [3, undefined, undefined],
    ]);

    expect(unzip([1, 2, 3])).toEqual([[1], [2], [3]]);

    expect(unzip([1], [1, 2, 3], [4, 6, 7, 8, 9])).toEqual([
      [1, 1, 4],
      [undefined, 2, 6],
      [undefined, 3, 7],
      [undefined, undefined, 8],
      [undefined, undefined, 9],
    ]);

    expect(unzip()).toEqual([]);
  });
});
