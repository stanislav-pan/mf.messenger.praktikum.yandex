import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import { isNode } from '../../utils/is-node';
import Avatar from '../avatar/avatar';
import {
  IChatComponentExternalProps,
  IChatComponentInnerProps,
} from './interfaces';

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
    return templator
      .getTemplate('chat.tmpl.njk', isNode() && __dirname)
      .render({
        ...this.props,
        avatarComponentId: this.props.components.avatar.getId(),
      });
  }
}
