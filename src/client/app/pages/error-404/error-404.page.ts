import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import { isNode } from '../../utils/is-node';
import { Error404PageProps } from './interfaces';

export default class Error404Page extends Block<Error404PageProps> {
  constructor() {
    super({
      tagName: 'app-error-404',
      props: {},
    });
  }

  public render() {
    return templator
      .getTemplate(
        isNode()
          ? 'pages/error-404/error-404.tmpl.njk'
          : 'static/templates/error-404.tmpl.njk'
      )
      .render({
        ...this.props,
      });
  }
}