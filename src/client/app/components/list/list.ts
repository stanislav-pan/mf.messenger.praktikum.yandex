import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import { isEqual } from '../../utils/is-equal';
import { isNode } from '../../utils/is-node';
import { ListComponentProps, IListComponentExternalProps } from './interfaces';

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

  componentDidUpdate(old: ListComponentProps, current: ListComponentProps) {
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

  render() {
    return templator
      .getTemplate('list.tmpl.njk', isNode() && __dirname)
      .render({
        ...this.props,
      });
  }
}
