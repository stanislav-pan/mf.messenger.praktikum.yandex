const isValidStr = (str: string) => {
  if (typeof str === 'string' && str.length === 0) {
    return true;
  }

  const regExp = new RegExp('^[A-Z]+$');

  return regExp.test(str);
};

/**
 * Кодирование длин серий или кодирование повторов — алгоритм сжатия данных,
 * заменяющий повторяющиеся символы на один символ и число его повторов.
 */
export const rle = (str: string): string => {
  if (!isValidStr(str)) {
    throw new Error('Argument is not correct');
  }

  let res: Array<string> = [];
  let repeatableSybmol: string = str[0];
  let repeatableSybmolCount = 1;

  const addValue = () => {
    res = [
      ...res,
      `${repeatableSybmol}${
        repeatableSybmolCount === 1 ? '' : repeatableSybmolCount
      }`,
    ];
  };

  for (let i = 1; i < str.length + 1; i++) {
    const curSymbol = str[i];

    if (repeatableSybmol === curSymbol) {
      repeatableSybmolCount += 1;
    } else {
      addValue();

      repeatableSybmol = curSymbol;
      repeatableSybmolCount = 1;
    }
  }

  return res.join('');
};

// Вы решили непростую задачу!
// Эту задачу можно решить многими способами, но самый интересный — с помощью метода  ```String.prototype.replace```
//  в пару строк. Он может принимать вторым аргументом функцию, которая вызывается для создания новой подстроки,
// помещаемой вместо подстроки из первого параметра. А первый параметр может быть регулярным выражением, который
// в данном случае должен искать группы букв.
