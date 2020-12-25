import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import { isNode } from '../../utils/is-node';
import { Error500PageProps } from './interfaces';

export default class Error500Page extends Block<Error500PageProps> {
  constructor() {
    super({
      tagName: 'app-error-500',
      props: {},
    });
  }

  public render() {
    return templator
      .getTemplate('error-500.tmpl.njk', isNode() && __dirname)
      .render({
        ...this.props,
      });
  }
}
