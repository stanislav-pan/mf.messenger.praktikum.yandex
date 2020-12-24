export const isObject = (item: unknown): item is Object =>
  typeof item === 'object' && item !== null;
