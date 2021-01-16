export type StringIndexed = Record<string, unknown>;

const isPrimitive = (value: unknown) =>
  typeof value !== 'object' || value === null;

const generateTree = (obj: Record<string, unknown> | Array<unknown>) => {
  return Object.entries(obj).reduce((acc: unknown[], [key, item]) => {
    acc.push([
      key,
      isPrimitive(item)
        ? item
        : generateTree(item as Record<string, unknown> | Array<unknown>),
    ]);

    return acc;
  }, []);
};

const flatTree = (tree: Array<unknown>) => {
  const res: unknown[][] = [];

  const temp = (tree: Array<unknown>, res: Array<unknown>) =>
    tree.forEach(([key, value]) => {
      if (isPrimitive(value)) {
        res.push([key, value]);
      } else if (Array.isArray(value)) {
        value.forEach((arrValue) => {
          if (!Array.isArray(arrValue[1])) {
            res.push([key, ...arrValue]);

            return;
          }

          const test = [];
          temp(arrValue[1], test);

          test
            .map((val) => [key, arrValue[0], ...val])
            .forEach((temp) => {
              res.push(temp);
            });
        });
      }
    });

  temp(tree, res);

  return res;
};

const convertFlattenTreeToString = (flattenTree: Array<unknown[]>) => {
  const res: string[] = [];

  for (const item of flattenTree) {
    if (item.length === 2) {
      res.push(`${item[0]}=${item[1]}`);
    }

    if (item.length > 2) {
      let str = item[0];

      for (let index = 1; index < item.length; index++) {
        if (index !== item.length - 1) {
          str += `[${item[index]}]`;

          continue;
        }

        str += `=${item[index]}`;
      }

      res.push(String(str));
    }
  }

  return res.join('&');
};

export function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== 'object' || data === null) {
    throw new Error('data is not object');
  }

  return convertFlattenTreeToString(flatTree(generateTree(data)));
}
