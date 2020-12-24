import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import MessageComponent from '../message/message';
import {
  IMessagesComponentExternalProps,
  MessagesComponentProps,
} from './interfaces';

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

  render() {
    return templator
      .getTemplate('../app/components/messages/messages.tmpl.njk')
      .render({
        ...this.props,
      });
  }
}
