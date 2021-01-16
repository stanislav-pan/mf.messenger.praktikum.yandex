import { compress } from '.';

describe('Тестирование функции compress (Свёртка в диапазоны)', () => {
  it('Должна возвращать корректное значение', () => {
    expect(compress([1, 4, 5, 2, 3, 9, 8, 11, 0])).toBe('0-5,8-9,11');

    expect(compress([1, 4, 3, 2])).toBe('1-4');
    expect(compress([1, 4])).toBe('1,4');

    expect(compress([1])).toBe('1');
  });
});
