import MessageComponent from '@components/message';
import { Block } from '@utils/block';
import {
  MessagesComponentProps,
  IMessagesComponentExternalProps,
} from './interfaces';

import './messages.scss';
import template from './messages.tmpl.njk';

export default class MessagesComponent extends Block<MessagesComponentProps> {
  constructor(props: IMessagesComponentExternalProps) {
    const messagesComponentsIds: string[] = [];

    const messages = props.messages.reduce((acc, message) => {
      const messageComponent = new MessageComponent({
        message,
      });

      const id = messageComponent.getId();
      acc[id] = messageComponent;
      messagesComponentsIds.push(messageComponent.getId());

      return acc;
    }, {});

    super({
      tagName: 'app-messages',
      props: {
        ...props,
        messagesComponentsIds,
        components: {
          ...messages,
        },
      },
    });
  }

  render(): string {
    return template({
      ...this.props,
    });
  }
}
