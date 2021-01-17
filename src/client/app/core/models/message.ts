import { objToCamelCase } from '@my-lodash/to-camel-case';
import { IMessageResponse } from './messages-manager';

export interface IMessage {
  id: number;
  chatId: number;
  userId: number;
  content: string;
  time: Date;
}

export class Message {
  public id: number;
  public chatId: number;
  public userId: number;
  public content: string;
  public time: Date;

  static mapMessageFromServer(message: IMessageResponse): Message {
    const transformedMessage = objToCamelCase(message) as IMessage & {
      time: string;
    };

    return new Message({
      ...transformedMessage,
      time: new Date(transformedMessage.time),
    });
  }

  constructor(message: IMessage) {
    Object.assign(this, { ...message });
  }

  public getData(): IMessage {
    const { id, chatId, userId, content, time } = this;

    return { id, chatId, userId, content, time };
  }

  public getMappedTime(): string {
    const addZeroIfNecessary = (number: number) =>
      String(number).length > 1 ? `${number}` : `0${number}`;

    return `${addZeroIfNecessary(this.time.getHours())}:${addZeroIfNecessary(
      this.time.getMinutes()
    )}`;
  }
}
