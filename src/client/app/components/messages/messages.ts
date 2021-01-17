import MessageComponent from '@components/message';
import { isEqual } from '@my-lodash/is-equal';
import { Block } from '@utils/block';
import {
  MessagesComponentProps,
  IMessagesComponentExternalProps,
} from './interfaces';

import './messages.scss';
import template from './messages.tmpl.njk';

export default class MessagesComponent extends Block<MessagesComponentProps> {
  constructor(props: IMessagesComponentExternalProps) {
    super({
      tagName: 'app-messages',
      props: {
        ...props,
        messagesComponentsIds: [],
        components: {},
      },
    });
  }

  componentDidUpdate(
    old: MessagesComponentProps,
    current: MessagesComponentProps
  ): boolean {
    if (!isEqual(old.messages, current.messages)) {
      this._setMessages();
    }

    const scrollbar: HTMLElement | null = document.getElementById(
      'messagesScrollbar'
    );

    if (scrollbar) {
      scrollbar.scrollTop = scrollbar.scrollHeight - scrollbar.clientHeight;
    }

    return true;
  }

  private _setMessages() {
    const messagesComponentsIds: string[] = [];

    const messages = this.props.messages.reduce((acc, message) => {
      const messageComponent = new MessageComponent({
        message,
      });

      const id = messageComponent.getId();
      acc[id] = messageComponent;
      messagesComponentsIds.push(messageComponent.getId());

      return acc;
    }, {});

    this.setProps({
      components: {
        ...messages,
      },
      messagesComponentsIds,
    });
  }

  render(): string {
    return template({
      ...this.props,
    });
  }
}
