type TraverseDomTreeCallback = {
  (element: Element): void;
};

/** Выполняет обход DOM дерева, вызывая callback на каждом элементе */
export const traverseDomTree = (
  root: HTMLElement,
  callback: TraverseDomTreeCallback
): void => {
  const stack: Array<HTMLElement> = [root];

  while (stack.length) {
    const current = stack.pop();

    if (!current) {
      break;
    }

    callback(current);

    stack.push(...(Array.from(current.children) as HTMLElement[]));
  }
};
