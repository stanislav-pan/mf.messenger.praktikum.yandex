import { Block } from '../block';
import { render } from '../renderDOM';

export class Route {
  private _pathname: string;
  private _blockClass: Block;
  private _block: Block | null;
  private _props: {
    rootQuery: string;
  };

  constructor(pathname: string, view: Block, props: { rootQuery: string }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  public navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  public leave(): void {
    if (this._block) {
      this._block.remove();
    }
  }

  public match = (pathname: string): boolean => pathname === this._pathname;

  public render(): void {
    const blockClass = this._blockClass as any;

    this._block = new blockClass() as Block;

    render(this._props.rootQuery, this._block);
  }
}
