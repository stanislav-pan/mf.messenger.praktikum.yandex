import { tree } from '.';

describe('Тестирование функции tree', () => {
  it('Должна возвращать корректные значения', () => {
    const expected =
      '   *   \n' + '  ***  \n' + ' ***** \n' + '*******\n' + '   |   \n';

    expect(tree(5)).toStrictEqual(expected);
  });
});
