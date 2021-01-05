import { isObject } from './is-object';

export type Indexed<T = unknown> = {
  [key in string]: T;
};

const getKeys = (target: Record<string, unknown>) => {
  return Object.keys(target);
};

const propertyIsOnObject = (
  object: Record<string, unknown>,
  property: string
) => {
  try {
    return property in object;
  } catch (_) {
    return false;
  }
};

export function merge(
  lhs: Indexed<unknown>,
  rhs: Indexed<unknown>
): Indexed<unknown> {
  if (isObject(rhs)) {
    getKeys(rhs).forEach((key) => {
      if (propertyIsOnObject(lhs, key) && isObject(rhs[key])) {
        lhs[key] = merge(
          lhs[key] as Indexed<unknown>,
          rhs[key] as Indexed<unknown>
        );
      } else {
        lhs[key] = rhs[key];
      }
    });
  }

  return lhs;
}
