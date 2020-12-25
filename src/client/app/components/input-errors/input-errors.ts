import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import { isNode } from '../../utils/is-node';
import {
  InputErrorsComponentProps,
  IInputErrorsComponentExternalProps,
} from './interfaces';

export default class InputErrors extends Block<InputErrorsComponentProps> {
  constructor(props: IInputErrorsComponentExternalProps) {
    super({
      tagName: 'app-input-errors',
      props,
    });
  }

  render() {
    return templator
      .getTemplate('input-errors.tmpl.njk', isNode() && __dirname)
      .render({
        ...this.props,
      });
  }
}
