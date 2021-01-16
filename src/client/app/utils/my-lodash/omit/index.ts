import { isArray } from '../is-array';
import { isObject } from '../is-object';

interface Omit {
  <T extends Record<string, unknown>, K extends (keyof T)[]>(
    obj: T,
    fields: K
  ): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };

  errors: {
    objIncorrect: string;
    fieldsIncorrect: string;
  };
}

export const omit: Omit = (obj, fields) => {
  if (!isObject(obj)) {
    throw new Error(omit.errors.objIncorrect);
  }

  if (!isArray(fields)) {
    throw new Error(omit.errors.fieldsIncorrect);
  }

  const res = {} as {
    [K in keyof typeof obj]: typeof obj[K];
  };

  let key: keyof typeof obj;
  for (key in obj) {
    if (!fields.includes(key)) {
      res[key] = obj[key];
    }
  }

  return res;
};

omit['errors'] = {
  objIncorrect: 'obj is not correct object',
  fieldsIncorrect: 'fields is not array',
};
