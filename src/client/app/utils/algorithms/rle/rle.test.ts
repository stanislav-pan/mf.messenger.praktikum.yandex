import { rle } from './rle';

describe('Тестирование функции rle', () => {
  it('Должна возвращать корректное значение', () => {
    expect(
      rle('AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB')
    ).toBe('A4B3C2XYZD4E3F3A6B28');

    expect(
      rle('AAB')
    ).toBe('A2B');
  });

  it('Должна генерировать ошибку в случае, если аргумент не состоит из букв A-Z', () => {
    const testCase = ['21', 'a', 'true'];

    for (const i in testCase) {
      try {
        rle(testCase[i]);
      } catch (error) {
        expect(error.message).toBe('Argument is not correct');
      }
    }
  });
});
