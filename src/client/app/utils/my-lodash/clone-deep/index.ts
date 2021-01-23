import { isObject } from '@my-lodash/is-object';

export const cloneDeep = <T>(o: T): T => {
  if (!isObject(o)) {
    return o;
  }

  const r = o instanceof Array ? [] : {};

  for (const i in o) {
    if (Object.prototype.hasOwnProperty.call(o, i)) {
      r[i] = cloneDeep(o[i]);
    }
  }

  return r as T;
};
