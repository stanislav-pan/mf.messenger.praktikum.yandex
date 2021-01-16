import { Block } from '@utils/block';
import template from './error-500.tmpl.njk';

import { Error500PageProps } from './interfaces';

export default class Error500Page extends Block<Error500PageProps> {
  constructor() {
    super({
      tagName: 'app-error-500',
      props: {},
    });
  }

  public render(): string {
    return template({
      ...this.props,
    });
  }
}
