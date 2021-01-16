import { omit } from '.';

describe('Тестирование функции omit', () => {
  it('Должна корректно убирать заданные поля из объекта', () => {
    const res = omit({ name: 'Benjy', age: 18 }, ['name']);

    expect(res).toEqual({ age: 18 });
  });

  it('Должна возвращать ошибку в случае, если первый аргумент не является объектом', () => {
    try {
      omit('' as any, ['name']);
    } catch (error) {
      expect(error['message']).toBe(omit.errors.objIncorrect);
    }
  });

  it('Должна возвращать ошибку в случае, если аргумент fields не является массивом', () => {
    try {
      omit({ name: 'Benjy', age: 18 }, 1 as any);
    } catch (error) {
      expect(error['message']).toBe(omit.errors.fieldsIncorrect);
    }
  });
});
