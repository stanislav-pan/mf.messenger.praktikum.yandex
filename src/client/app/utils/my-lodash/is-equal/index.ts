import { isObject } from '../is-object';

type argType = Record<string, unknown> | Array<unknown>;

export function isEqual(a: argType, b: argType): boolean {
  if (!isObject(a) || !isObject(b)) {
    throw new Error('Params should be objects');
  }

  let res = true;

  const comparator = (lhs: argType, rhs: argType) => {
    const mappedLhs = Object.entries(lhs);
    const mappedRhs = Object.entries(rhs);

    if (mappedLhs.length !== mappedRhs.length) {
      res = false;

      return;
    }

    for (const [key, value] of Object.entries(lhs)) {
      if (res === false) {
        return;
      }

      if (isObject(value) && isObject(rhs[key])) {
        comparator(value, rhs[key]);

        continue;
      }

      if (value !== rhs[key]) {
        res = false;
        return;
      }
    }
  };

  comparator(a, b);

  return res;
}
