const getRanges = (sortedList: number[]) => {
  let prevItem = sortedList[0];
  const ranges: Array<number[]> = [[prevItem]];

  for (let i = 1; i < sortedList.length; i++) {
    const item = sortedList[i];
    if (item - prevItem === 1) {
      ranges[ranges.length - 1].push(item);
    } else {
      ranges[ranges.length] = [item];
    }

    prevItem = item;
  }

  return ranges;
};

export const compress = (list: number[]): string | undefined => {
  if (!Array.isArray(list) || !list.length) {
    return undefined;
  }

  const sortedList = list.sort((a, b) => (a >= b ? 1 : -1));

  const ranges = getRanges(sortedList);

  const setOfRanges: string[] = [];

  for (const range of ranges) {
    const mappedRange = (range.length > 1
      ? [range[0], range[range.length - 1]]
      : [range[0]]
    ).join('-');

    setOfRanges.push(mappedRange);
  }

  return setOfRanges.join(',');
};
