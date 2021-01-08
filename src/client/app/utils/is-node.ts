export const isNode = (): boolean => {
  if (isNode['result'] !== undefined) {
    return isNode['result'];
  }

  let result = false;

  if (typeof process === 'object') {
    if (typeof process.versions === 'object') {
      if (typeof process.versions.node !== 'undefined') {
        result = true;
      }
    }
  }

  isNode['result'] = result;

  return result;
};
