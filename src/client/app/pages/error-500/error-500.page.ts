import { Block } from '../../utils/block';
import { Error500PageProps } from './interfaces';

import template from './error-500.tmpl.njk';

export default class Error500Page extends Block<Error500PageProps> {
  constructor() {
    super({
      tagName: 'app-error-500',
      props: {},
    });
  }

  public render() {
    return template({
      ...this.props,
    });
  }
}
