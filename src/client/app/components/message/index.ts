import { Block } from '@utils/block';
import {
  MessageComponentProps,
  IMessageComponentExternalProps,
  IMessage,
} from './interfaces';

import template from './message.tmpl.njk';

export default class MessageComponent extends Block<MessageComponentProps> {
  constructor(props: IMessageComponentExternalProps) {
    super({
      tagName: 'app-messages',
      props: {
        ...props,
      },
    });
  }

  componentDidMount(): void {
    this.setProps({
      class: this._getClasses(this.props.message),
    });
  }

  private _getClasses(message: IMessage) {
    const element = 'message-list__item';

    const res: string[] = [];

    if (message.isMyMessage) {
      res.push(`${element}_my`);
    }

    if (message.type === 'text') {
      res.push(`${element}_text`);
    }

    if (message.type === 'image') {
      res.push(`${element}_image`);
    }

    return res.join(' ');
  }

  render(): string {
    return template({
      ...this.props,
    });
  }
}
