import { isPlainObject } from '../is-plain-object';

export function get<T, K>(
  obj: Record<string, unknown>,
  path = '',
  defaulValue: K
): T | K {
  const keys = path.split('.');
  let res = obj;

  for (const key of keys) {
    const value = res[key];

    if (value === undefined) {
      return defaulValue;
    }

    if (isPlainObject(value)) {
      res = value;
    }
  }

  return res as T;
}
