const calculateSum = (arr: number[]) =>
  arr.reduce((acc, index) => acc + index, 0);

export function allSentences(words: string[][]): () => string | undefined {
  const counter: number[] = [];
  const resultArray: number[] = [];

  let isStart = true;
  let isEnd = false;

  words.forEach((item) => {
    counter.push(0);
    resultArray.push(item.length - 1);
  });

  const resultSum = calculateSum(resultArray);

  const add = (index: number) => {
    if (index < 0) {
      return;
    }

    const value = counter[index] + 1;

    if (value === words[index].length) {
      counter[index] = 0;

      add(index - 1);
      return;
    }

    counter[index] = value;
  };

  const getSentenceByIndexes = () => {
    const resWords: string[] = [];

    counter.forEach((value, index) => {
      resWords.push(words[index][value]);
    });

    return resWords.join(' ');
  };

  return () => {
    if (isEnd) {
      return undefined;
    }

    if (isStart) {
      isStart = false;

      return getSentenceByIndexes();
    }

    add(counter.length - 1);

    if (calculateSum(counter) === resultSum) {
      isEnd = true;
    }

    return getSentenceByIndexes();
  };
}
