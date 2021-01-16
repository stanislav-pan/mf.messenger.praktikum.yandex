import { isObject } from '../is-object';
import { Indexed, merge } from '../merge';

/**
 * set({ foo: 5 }, 'bar.baz', 10); // { foo: 5, bar: { baz: 10 } }
 * set(3, 'foo.bar', 'baz'); // 3
 */
export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (!isObject(object)) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const keys = path.split('.');

  const obj = keys.reduceRight((acc, key, index) => {
    if (index === keys.length - 1) {
      acc[key] = value;

      return acc;
    }

    acc = { [key]: { ...acc } };

    return acc;
  }, {});

  return merge(object, obj);
}
