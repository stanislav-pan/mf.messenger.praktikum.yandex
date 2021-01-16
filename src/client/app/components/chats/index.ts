import ChatComponent from '@components/chat';
import { isEqual } from '@my-lodash/is-equal';
import { Block } from '@utils/block';
import {
  ChatsComponentProps,
  IChatsComponentExternalProps,
} from './interfaces';

import template from './chats.tmpl.njk';

export default class ChatsComponent extends Block<ChatsComponentProps> {
  constructor(props: IChatsComponentExternalProps) {
    super({
      tagName: 'app-chats',
      props: {
        ...props,
        chatsComponentsIds: [],
        components: {},
      } as ChatsComponentProps,
    });
  }

  componentDidUpdate(
    old: ChatsComponentProps,
    current: ChatsComponentProps
  ): boolean {
    if (!isEqual(old.chats, current.chats)) {
      this._setChats();
    }

    return true;
  }

  private _setChats() {
    const click = this.props.handlers.click;
    const chatsComponentsIds: string[] = [];

    const chats = this.props.chats.reduce((acc, chat) => {
      const chatComponent = new ChatComponent({
        chat,
        handlers: { click },
      });

      const id: string = chatComponent.getId();
      acc[id] = chatComponent;

      chatsComponentsIds.push(id);

      return acc;
    }, {});

    this.setProps({
      components: {
        ...chats,
      },
      chatsComponentsIds,
    });
  }

  render(): string {
    return template({
      ...this.props,
    });
  }
}
