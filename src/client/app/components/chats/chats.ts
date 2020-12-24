import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import { isEqual } from '../../utils/is-equal';
import { isNode } from '../../utils/is-node';
import ChatComponent from '../chat/chat';
import {
  ChatsComponentProps,
  IChatsComponentExternalProps,
} from './interfaces';

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

  componentDidUpdate(old: ChatsComponentProps, current: ChatsComponentProps) {
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

  render() {
    return templator
      .getTemplate(
        isNode()
          ? 'components/chats/chats.tmpl.njk'
          : 'static/templates/chats.tmpl.njk'
      )
      .render({
        ...this.props,
      });
  }
}
