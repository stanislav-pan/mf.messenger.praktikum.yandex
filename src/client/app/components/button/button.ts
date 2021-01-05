import { Block } from '../../utils/block';
import {
  ButtonComponentProps,
  IButtonComponentExternalProps,
} from './interfaces';

import template from './button.tmpl.njk';

export default class Button extends Block<ButtonComponentProps> {
  constructor(props: IButtonComponentExternalProps) {
    super({
      tagName: 'app-button',
      props: {
        ...props,
      } as ButtonComponentProps,
    });
  }

  render(): string {
    return template({ ...this.props });
  }
}
