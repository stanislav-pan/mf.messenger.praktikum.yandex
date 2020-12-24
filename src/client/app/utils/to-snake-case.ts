import { isObject } from './is-object';

const toSnakeCase = (str: string) =>
  (str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      ?.map((x) => x.toLowerCase())
      .join('_')) ||
  str;

export const objToSnakeCase = <T>(o: object): T => {
  if (isObject(o)) {
    const n: T = {} as T;

    Object.keys(o).forEach((k) => {
      n[toSnakeCase(k)] = objToSnakeCase(o[k]);
    });

    return n;
  }

  return o;
};
