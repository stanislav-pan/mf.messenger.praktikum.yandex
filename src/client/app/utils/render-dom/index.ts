import { Block } from '../block';

export function render(rootQuery: string, block: Block): Element {
  const root = document.body.querySelector(rootQuery);

  if (!root) {
    throw Error('Root element was not found');
  }

  const content = block.getContent();
  root.appendChild(content);

  return root;
}
