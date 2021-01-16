import { Block } from '@utils/block';
import template from './error-404.tmpl.njk';

import { Error404PageProps } from './interfaces';

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
