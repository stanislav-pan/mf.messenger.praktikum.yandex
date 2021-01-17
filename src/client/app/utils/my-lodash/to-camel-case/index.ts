import { isObject } from '../is-object';

const toCamelCase = (str: string) =>
  str &&
  str
    // .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase());

export const objToCamelCase = <T>(o: Record<string, unknown> | unknown): T => {
  if (!isObject(o)) {
    return o as T;
  }

  const n: T = {} as T;

  Object.keys(o).forEach((k) => {
    n[toCamelCase(k)] = objToCamelCase(o[k]);
  });

  return n;
};
