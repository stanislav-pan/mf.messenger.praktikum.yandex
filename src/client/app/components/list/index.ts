import { isEqual } from '@my-lodash/is-equal';
import { Block } from '@utils/block';
import { ListComponentProps, IListComponentExternalProps } from './interfaces';

import template from './list.tmpl.njk';

export default class ListComponent extends Block<ListComponentProps> {
  constructor(props: IListComponentExternalProps) {
    super({
      tagName: 'app-list',
      props: {
        ...props,
        componentsIds: [],
      },
    });
  }

  componentDidUpdate(
    old: ListComponentProps,
    current: ListComponentProps
  ): boolean {
    if (isEqual(old.components, current.components)) {
      return false;
    }

    const componentsIds = Object.values(current.components).reduce(
      (acc: string[], component) => {
        acc.push(component.getId());

        return acc;
      },
      []
    );

    this.setProps({
      componentsIds,
    });

    return true;
  }

  render(): string {
    return template({
      ...this.props,
    });
  }
}
