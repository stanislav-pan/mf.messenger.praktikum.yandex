import { roman, ERRORS } from './roman';

describe('Тестирование функции преобразования арабских чисел в римские и наоборот', () => {
  it('Должна корректно преобразовывать римские числа в арабские', () => {
    expect(roman('mcmxc')).toBe(1990);
    expect(roman('MMMCMXCIX')).toBe(3999);

    expect(roman(2400)).toBe('MMCD');
    expect(roman(1904)).toBe('MCMIV');
  });

  it('Должна корректно преобразовывать арабские числа в римские', () => {
    expect(roman(2400)).toBe('MMCD');
    expect(roman(1904)).toBe('MCMIV');
    expect(roman(2017)).toBe('MMXVII');
  });

  it('Должна возвращать ошибку UNKNOWN_SYMBOLS в случае, если в аргументе присутсвуют не римские символы', () => {
    try {
      roman('19a04');
    } catch (error) {
      expect(error.message).toBe(ERRORS.UNKNOWN_SYMBOLS);
    }

    const testCaseUnknown = ['19a04', 'MXP', '2017.13', NaN];

    for (let i in testCaseUnknown) {
      try {
        roman(testCaseUnknown[i]);
      } catch (error) {
        expect(error.message).toBe(ERRORS.UNKNOWN_SYMBOLS);
      }
    }
  });

  it('Должна возвращать ошибку TYPE_ERROR в случае, если аргумент имеет не обрабатываемый тип', () => {
    const testCaseType = ['true', true, null];

    for (let i in testCaseType) {
      try {
        roman(testCaseType[i] as any);
      } catch (error) {
        expect(error.message).toBe(ERRORS.TYPE_ERROR);
      }
    }
  });

  it(`Должна возвращать ошибку RANGE_ERROR в случае, если аргумент 
  или возвращаемое значение выходит за диаазон от 0 до 3999`, () => {
    const testCaseRange = [0, 'MMMDM', -1, 4000];

    for (let i in testCaseRange) {
      try {
        roman(testCaseRange[i]);
      } catch (error) {
        expect(error.message).toBe(ERRORS.RANGE_ERROR);
      }
    }
  });

  it(`Должна возвращать NaN в случае невозможности преобразования`, () => {
    expect(roman('xxxxx')).toBeNaN();
  });
});
