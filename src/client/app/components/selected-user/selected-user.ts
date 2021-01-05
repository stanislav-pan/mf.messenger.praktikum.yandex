import { Block } from '../../utils/block';
import Avatar from '../avatar/avatar';
import {
  SelectedUserComponentProps,
  ISelectedUserComponentExternalProps,
} from './interfaces';

import './selected-user.scss';
import template from './selected-user.tmpl.njk';

export default class SelectedUserComponent extends Block<SelectedUserComponentProps> {
  constructor(props: ISelectedUserComponentExternalProps) {
    const { handlers: { unselect } = {}, avatarSrc } = props;

    super({
      tagName: 'app-selected-user',
      props: {
        ...props,
        components: {
          avatar: new Avatar({
            avatarSrc,
            canChangeAvatar: false,
          }),
        },
        handlers: {
          unselect: () => {
            if (typeof unselect !== 'function') {
              return;
            }

            unselect();
          },
        },
      } as SelectedUserComponentProps,
    });
  }

  render(): string {
    return template({
      ...this.props,
      avatarComponentId: this.props.components.avatar.getId(),
    });
  }
}
