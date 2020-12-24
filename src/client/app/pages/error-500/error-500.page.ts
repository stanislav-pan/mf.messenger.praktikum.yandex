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
      .getTemplate(
        isNode()
          ? 'pages/error-500/error-500.tmpl.njk'
          : 'static/templates/error-500.tmpl.njk'
      )
      .render({
        ...this.props,
      });
  }
}
