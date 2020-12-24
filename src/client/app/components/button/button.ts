import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import { isNode } from '../../utils/is-node';
import {
  ButtonComponentProps,
  IButtonComponentExternalProps,
} from './interfaces';

export default class Button extends Block<ButtonComponentProps> {
  constructor(props: IButtonComponentExternalProps) {
    super({
      tagName: 'app-button',
      props: {
        ...props,
      } as ButtonComponentProps,
    });
  }

  render() {
    return templator
      .getTemplate(isNode() ? 'components/button/btn.tmpl.njk' : 'static/templates/btn.tmpl.njk')
      .render({
        ...this.props,
      });
  }
}
