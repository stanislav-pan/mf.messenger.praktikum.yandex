import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import Avatar from '../avatar/avatar';
import {
  SelectedUserComponentProps,
  ISelectedUserComponentExternalProps,
} from './interfaces';

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

  render() {
    return templator
      .getTemplate('selected-user.tmpl.njk')
      .render({
        ...this.props,
        avatarComponentId: this.props.components.avatar.getId(),
      });
  }
}
