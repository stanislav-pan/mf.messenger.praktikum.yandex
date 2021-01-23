import { cloneDeep } from '.';

describe('Тестирование функции cloneDeep', () => {
  it('Должна корректно клонировать чистый объект', () => {
    const obj = {
      a: 1,
      b: '2',
      c: {
        a: 1,
        b: {
          a: 1,
        },
      },
    };

    expect(cloneDeep(obj)).toEqual(obj);
  });

  it('Должна корректно клонировать массив', () => {
    const obj = [
      {
        a: 1,
        b: {
          a: 1,
        },
      },
    ];

    expect(cloneDeep(obj)).toEqual(obj);
  });

  it('Должна корректно обрабатывать примитивы', () => {
    const value = 1;

    expect(cloneDeep(value)).toBe(value);
  });
});
