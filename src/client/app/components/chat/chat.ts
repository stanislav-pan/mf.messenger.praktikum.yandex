import { Block } from '../../utils/block';
import Avatar from '../avatar/avatar';
import {
  IChatComponentExternalProps,
  IChatComponentInnerProps,
} from './interfaces';

import template from './chat.tmpl.njk';

export default class ChatComponent extends Block<IChatComponentInnerProps> {
  constructor(props: IChatComponentExternalProps) {
    const click = props.handlers.click;
    const avatarSrc = props.chat.avatar;

    super({
      tagName: 'app-chat',
      props: {
        ...props,
        handlers: {
          click: (event: MouseEvent) => click(event, props.chat),
        },
        components: {
          avatar: new Avatar({
            avatarSrc,
          }),
        },
      } as IChatComponentInnerProps,
    });
  }

  render() {
    return template({
      ...this.props,
      avatarComponentId: this.props.components.avatar.getId(),
    });
  }
}
