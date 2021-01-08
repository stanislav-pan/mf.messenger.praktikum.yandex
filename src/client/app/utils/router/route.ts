import { Block } from '../block';
import { render } from '../renderDOM';

export class Route {
  private _pathname: string;
  private _blockClass: () => Promise<Block>;
  private _block: Block | null;
  private _props: {
    rootQuery: string;
  };

  constructor(
    pathname: string,
    view: () => Promise<Block>,
    props: { rootQuery: string }
  ) {
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
    this._blockClass().then((block) => {
      this._block = block;

      render(this._props.rootQuery, this._block);
    });
  }
}
