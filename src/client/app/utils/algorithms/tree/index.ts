type Nullable<T> = T | null;

const TYPE_ERROR = 'Something wrong with type of input param';

const isPlainNumber = (value: unknown): value is number =>
  typeof value === 'number' && !Number.isNaN(value);

const generateTypeError = () => {
  throw new Error(TYPE_ERROR);
};

const transformLevel = (level: number | string): number => {
  let transformedLevel = 0;

  if (typeof level === 'string') {
    const parsedLvl = parseInt(level, 10);

    if (Number.isNaN(parsedLvl)) {
      generateTypeError();
    }

    transformedLevel = parsedLvl;
  }

  if (isPlainNumber(level)) {
    transformedLevel = level;
  }

  return transformedLevel;
};

const getNumberOfAsterisksOnLvl = (lvl: number) => {
  return 1 + 2 * (lvl - 1);
};

const repeatSymbol = (symbol: string, numberOfRepetitions: number) => {
  let res = '';

  for (let i = 0; i < numberOfRepetitions; i++) {
    res += symbol;
  }

  return res;
};

export const tree = (lvl: number | string): Nullable<string> => {
  if (typeof lvl !== 'string' && !isPlainNumber(lvl)) {
    generateTypeError();
  }

  const transformedLevel = transformLevel(lvl);

  if (transformedLevel < 3) {
    return null;
  }

  let res = '';
  const maxNumberOfAsterisks = getNumberOfAsterisksOnLvl(transformedLevel - 1);
  for (let i = 1; i <= transformedLevel; i++) {
    let line = '';

    if (i === transformedLevel) {
      const numberOfSpacesAroundEdges = (maxNumberOfAsterisks - 1) / 2;

      line += repeatSymbol(' ', numberOfSpacesAroundEdges);
      line += repeatSymbol('|', 1);
      line += repeatSymbol(' ', numberOfSpacesAroundEdges);
      line += repeatSymbol('\n', 1);
    } else {
      const numberOfAstericks = getNumberOfAsterisksOnLvl(i);
      const numberOfSpacesAroundEdges =
        (maxNumberOfAsterisks - numberOfAstericks) / 2;

      line += repeatSymbol(' ', numberOfSpacesAroundEdges);
      line += repeatSymbol('*', numberOfAstericks);
      line += repeatSymbol(' ', numberOfSpacesAroundEdges);
      line += repeatSymbol('\n', 1);
    }

    res += line;
  }

  return res;
};
