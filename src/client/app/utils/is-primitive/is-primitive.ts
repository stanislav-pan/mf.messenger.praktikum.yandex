export const isPrimitive = (value: unknown) => {
  let res = true;

  if (typeof value === 'object' || typeof value === 'function') {
    res = false;
  }

  return res;
};
