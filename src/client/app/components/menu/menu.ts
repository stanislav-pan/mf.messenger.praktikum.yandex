import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import { isNode } from '../../utils/is-node';
import { IMenuComponentExternalProps, MenuComponentProps } from './interfaces';

import './menu.scss';
export default class MenuComponent extends Block<MenuComponentProps> {
  private _bindedClickHandler: (event: Event) => void;

  constructor(props: IMenuComponentExternalProps) {
    const { select } = props.handlers;

    super({
      tagName: 'app-menu',
      props: {
        ...props,
        items: props.items.map((item, index) => ({ ...item, index })),

        handlers: {
          ...props.handlers,
          click: (_, index: number) => {
            const item = this.props.items.find(
              (item) => item.index === Number(index)
            );

            if (!item) {
              return;
            }

            select(item);
          },
        },
      },
    });
  }

  componentDidMount(): void {
    this._bindedClickHandler = this._clickHandler.bind(this);

    document.addEventListener('click', this._bindedClickHandler);
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this._bindedClickHandler);
  }

  private _clickHandler(event: Event) {
    if (this.element.contains(event.target as HTMLElement)) {
      return;
    }

    if (!(typeof this.props.handlers.close === 'function')) {
      return;
    }

    this.props.handlers.close();
  }

  render(): string {
    return templator
      .getTemplate('menu.tmpl.njk', isNode() && __dirname)
      .render({
        ...this.props,
      });
  }
}
