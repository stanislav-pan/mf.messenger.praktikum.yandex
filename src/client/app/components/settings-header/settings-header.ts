import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import { isNode } from '../../utils/is-node';
import {
  ISettingsHeaderExternalProps,
  SettingsHeaderProps,
} from './interfaces';

export default class SettingsHeader extends Block<SettingsHeaderProps> {
  constructor(props: ISettingsHeaderExternalProps) {
    const close = props.handlers.close;
    const back = props.handlers.back;

    super({
      tagName: 'app-settings-header',
      props: {
        ...props,
        handlers: {
          close,
          back,
        },
      } as SettingsHeaderProps,
    });
  }

  render() {
    return templator
      .getTemplate('settings-header.tmpl.njk', isNode() && __dirname)
      .render({
        ...this.props,
      });
  }
}
