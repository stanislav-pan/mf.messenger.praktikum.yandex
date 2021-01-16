import { isArray } from '../is-array';
import { isPlainObject } from '../is-plain-object';
import { isPrimitive } from '../is-primitive/is-primitive';

type objType = Record<string, unknown>;

const handleObject = (obj: objType): Array<string> => {
  const res: Array<string> = [];

  for (const [key, value] of Object.entries(obj)) {
    if (!value) {
      continue;
    }

    res.push(key);
  }

  return res;
};

const buildClassesArray = (args: Array<unknown>): Array<string> => {
  let res: Array<string> = [];

  for (const arg of args) {
    if (isPrimitive(arg) && !!arg) {
      res.push(String(arg));
    }

    if (isPlainObject(arg)) {
      res = [...res, ...handleObject(arg)];
    }

    if (isArray(arg)) {
      res = [...res, ...buildClassesArray(arg)];
    }
  }

  return res;
};

export const classNames = (...args: Array<unknown>): string =>
  buildClassesArray(args).join(' ');
