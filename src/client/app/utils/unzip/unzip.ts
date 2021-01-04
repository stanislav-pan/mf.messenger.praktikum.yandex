import { isArray } from '../is-array';

type arraysType = Array<Array<unknown>>;

const createUnion = (values: arraysType, indexOfItem: number) => {
  const item: Array<unknown> = [];

  for (const arr of values) {
    item.push(arr[indexOfItem]);
  }

  return item;
};

export const unzip = (...values: arraysType) => {
  let theMostLongArrayLength = 0;
  const res: arraysType = [];

  for (const arr of values) {
    if (!isArray(arr)) {
      throw new Error(`${arr} is not array`);
    }

    if (theMostLongArrayLength >= arr.length) {
      continue;
    }

    theMostLongArrayLength = arr.length;
  }

  for (let i = 0; i < theMostLongArrayLength; i++) {
    res.push(createUnion(values, i));
  }

  return res;
};
