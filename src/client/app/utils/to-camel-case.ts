import { isObject } from './is-object';

const toCamelCase = (str: string) =>
  str &&
  str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase());

export const objToCamelCase = <T>(o: object): T => {
  if (isObject(o)) {
    const n: T = {} as T;

    Object.keys(o).forEach((k) => {
      n[toCamelCase(k)] = objToCamelCase(o[k]);
    });

    return n;
  }

  return o;
};
