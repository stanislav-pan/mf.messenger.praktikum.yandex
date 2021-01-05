import { Block } from '../../utils/block';
import { Error404PageProps } from './interfaces';

import template from './error-404.tmpl.njk';

export default class Error404Page extends Block<Error404PageProps> {
  constructor() {
    super({
      tagName: 'app-error-404',
      props: {},
    });
  }

  public render(): string {
    return template({
      ...this.props,
    });
  }
}
