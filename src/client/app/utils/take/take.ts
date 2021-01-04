import { isArray } from '../is-array';

class ValidationError extends Error {
  constructor(m: string = 'bad value') {
    super(m);

    this.name = 'ValidationError';
  }
}

export const take = (list: number[], num: number = 1): number[] => {
  if (!isArray(list)) {
    throw new ValidationError();
  }

  if (!(typeof num === 'number') || Number.isNaN(num) || num < 0) {
    throw new ValidationError();
  }

  let res: Array<number> = [];
  const clonedList = [...list];

  if (num >= list.length) {
    return [...list];
  }

  while (num && clonedList.length) {
    const firstItem = clonedList.shift();

    if (firstItem) {
      res.push(firstItem);
    }

    num -= 1;
  }

  return res;
};
