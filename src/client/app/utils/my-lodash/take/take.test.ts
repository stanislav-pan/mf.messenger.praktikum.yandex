import { take } from '.';

describe('Тестирование функции take', () => {
  it('Должна возвращать корректные значения', () => {
    expect(take([1, 2, 3])).toEqual([1]);
    expect(take([1, 2, 3], 2)).toEqual([1, 2]);
    expect(take([1, 2, 3], 5)).toEqual([1, 2, 3]);
  });

  it('Должна валидировать входные значения', () => {
    try {
      take(1 as any);
    } catch (error) {
      if (error instanceof Error) {
        expect(
          error.name === 'ValidationError' && error.message === 'bad value'
        ).toBeTruthy();
      }
    }
  });
});
