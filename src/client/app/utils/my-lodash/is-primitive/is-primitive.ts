export const isPrimitive = (value: unknown): boolean => {
  let res = true;

  if (typeof value === 'object' || typeof value === 'function') {
    res = false;
  }

  return res;
};
