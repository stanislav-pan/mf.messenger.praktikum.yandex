import Avatar from '@components/avatar';
import { Block } from '@utils/block';
import { IChatComponentExternalProps, ChatComponentProps } from './interfaces';

import './chat.scss';
import template from './chat.tmpl.njk';

export default class ChatComponent extends Block<ChatComponentProps> {
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
      },
    });
  }

  componentDidMount(): void {
    this.props.chat.subscribeOnMessages(() => {
      this.setProps({
        chat: this.props.chat,
      });
    });
  }

  render(): string {
    return template({
      ...this.props,
      avatarComponentId: this.props.components.avatar.getId(),
    });
  }
}
