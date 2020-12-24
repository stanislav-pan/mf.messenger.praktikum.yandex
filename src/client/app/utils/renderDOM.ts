import { Block } from './block';

export function render(rootQuery: string, block: Block): Element {
  const root = document.querySelector(rootQuery);

  if (!root) {
    throw Error('Root element was not found');
  }

  root.appendChild(block.getContent());

  return root;
}
