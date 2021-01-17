import { isEqual } from '@my-lodash/is-equal';
import { isNode } from '@my-lodash/is-node';
import { templator } from '@services/templator.service';
import { Block } from '@utils/block';
import {
  MenuComponentProps,
  IMenuComponentExternalProps,
  IMenuItem,
} from './interfaces';

import './menu.scss';

export default class MenuComponent extends Block<MenuComponentProps> {
  private _bindedClickHandler: (event: Event) => void;

  constructor(props: IMenuComponentExternalProps) {
    const { select } = props.handlers;

    super({
      tagName: 'app-menu',
      props: {
        ...props,

        handlers: {
          ...props.handlers,
          click: (_, index: number) => {
            const item = this.props.mappedItems?.find(
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

  componentDidUpdate(
    old: MenuComponentProps,
    current: MenuComponentProps
  ): boolean {
    if (
      !old.items ||
      !isEqual(old.items as IMenuItem[], current.items as IMenuItem[])
    ) {
      this.setProps({
        mappedItems: current.items?.length
          ? current.items.map((item, index) => ({ ...item, index }))
          : [],
      });
    }

    return true;
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
