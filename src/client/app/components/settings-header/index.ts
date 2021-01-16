import { Block } from '@utils/block';
import {
  SettingsHeaderProps,
  ISettingsHeaderExternalProps,
} from './interfaces';

import './settings-header.scss';
import template from './settings-header.tmpl.njk';

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

  render(): string {
    return template({
      ...this.props,
    });
  }
}
