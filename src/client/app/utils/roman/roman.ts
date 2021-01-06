/**
 * @description error codes
 * @type {string}
 */
const TYPE_ERROR = 'Unsupported input value type';
const RANGE_ERROR = 'Input value must be [1; 3999]';
const UNKNOWN_SYMBOLS = 'Unknown input symbols';

export const ERRORS = {
  TYPE_ERROR,
  RANGE_ERROR,
  UNKNOWN_SYMBOLS,
};

type RomanDigitsType = 'I' | 'V' | 'X' | 'L' | 'C' | 'D' | 'M';

const digits = new Map<RomanDigitsType, number>([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000],
]);

/** варианты использования правила вычитания */
const useСasesForTheSubtractionRule = new Map<string, number>([
  ['IV', 4],
  ['IX', 9],
  ['XL', 40],
  ['XC', 90],
  ['CD', 400],
  ['CM', 900],
]);

const allNecessaryRomanDigits = [
  ...Array.from(digits.entries()),
  ...Array.from(useСasesForTheSubtractionRule.entries()),
].sort((a, b) => {
  const value1 = a[1];
  const value2 = b[1];

  return value1 > value2 ? -1 : 1;
});

/**
 * @description validate input values and determinate needed convert solution
 * @param {string|number} number
 * @returns {string|number}
 */
export const roman = (number: number | string): number | string => {
  if (!(typeof number === 'string') && !(typeof number === 'number') || number === 'true') {
    throw new Error(TYPE_ERROR);
  }

  let res: number | string;

  if (isArabic(number)) {
    res = arabic2roman(
      typeof number === 'string' ? parseInt(number, 10) : number
    );
  } else if (isRoman(number)) {
    res = roman2arabic((number as string).toUpperCase());

    checkRangeError(res);
  } else {
    throw new Error(UNKNOWN_SYMBOLS);
  }

  return res;
};

function roman2arabic(number: string): number {
  const numbers = number.split('') as RomanDigitsType[];
  let res = 0;

  const notRepeat = ['V', 'L', 'D'];

  const numberOfMatches: Record<string, number> = {};
  let numberOfRepeatLastNumber = 0;

  const increaseNumberOfMatches = (item: string) => {
    if (numberOfRepeatLastNumber > 3) {
      throw new Error(
        'The same number should not be repeated more than 3 times in a row'
      );
    }

    if (increaseNumberOfMatches['lastIncreasedNumber'] !== item) {
      numberOfRepeatLastNumber = 0;
    }

    increaseNumberOfMatches['lastIncreasedNumber'] = item;

    numberOfMatches[item] =
      numberOfMatches[item] === undefined ? 1 : numberOfMatches[item] + 1;

    numberOfRepeatLastNumber += 1;

    for (const item of notRepeat) {
      if (numberOfMatches[item] > 1) {
        throw new Error('V, L, D digits shoudn`t repeat more 1 time');
      }
    }
  };

  try {
    for (let i = 0; i < numbers.length; i++) {
      const curRomanValue = numbers[i];
      const nextRomanValue = numbers[i + 1];

      const curArabicValue = digits.get(curRomanValue) as number;
      const nextArabicValue = digits.get(nextRomanValue) as number;

      increaseNumberOfMatches(curRomanValue);

      // если меньшая цифра стоит перед большей, то меньшая вычитается из большей
      if (curArabicValue < nextArabicValue) {
        const romanExpression = curRomanValue + nextRomanValue;

        // вычитаться могут только цифры,обозначающие 1 или степени 10;
        // уменьшаемым может быть только цифра, ближайшая в числовом ряду к вычитаемой.
        if (
          !Array.from(useСasesForTheSubtractionRule.keys()).includes(
            romanExpression
          )
        ) {
          return NaN;
        }

        res += nextArabicValue - curArabicValue;

        increaseNumberOfMatches(nextRomanValue);

        i += 1;
      } else {
        // если большая цифра стоит перед меньшей, они складываются
        res += curArabicValue;
      }
    }
  } catch (error) {
    return NaN;
  }

  return res;
}

function arabic2roman(number: number): string {
  checkRangeError(number);

  let tempNumber = number;
  const res: Array<string> = [];

  while (tempNumber) {
    for (const [key, value] of allNecessaryRomanDigits) {
      if (value > tempNumber) {
        continue;
      }

      tempNumber -= value;
      res.push(key);
      break;
    }
  }

  return res.join('');
}

function checkRangeError(number: number) {
  if (number < 1 || number > 3999) {
    throw new Error(RANGE_ERROR);
  }
}

function isArabic(number: number | string) {
  if (typeof number === 'string') {
    const parsedNumber = parseInt(number, 10);

    return (
      !Number.isNaN(parsedNumber) &&
      parsedNumber.toString().length === number.length
    );
  }

  if (typeof number === 'number' && !Number.isNaN(number)) {
    return true;
  }

  return false;
}

function isRoman(number: number | string) {
  const romanDigits = Array.from(digits.keys()).join('');

  const reg = new RegExp(`^[${romanDigits}]+$`, 'i');

  return reg.test(String(number));
}
