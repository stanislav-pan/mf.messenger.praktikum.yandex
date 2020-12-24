import { IChatResponse } from '../../services/chats-api/interfaces/chat.interfaces';
import { objToCamelCase } from '../../utils/to-camel-case';

export interface IChat {
  id: number;
  avatar: string;
  createdBy: number;
  title: string;
}

export class Chat implements IChat {
  public id: number;
  public avatar: string;
  public createdBy: number;
  public title: string;

  static mapChatFromServer(chat: IChatResponse) {
    const transformedChat = objToCamelCase(chat) as IChat;

    return new Chat(transformedChat);
  }

  constructor(chat: IChat) {
    Object.assign(this, {
      ...chat,
      ...(chat.avatar && { avatar: 'https://ya-praktikum.tech' + chat.avatar }),
    });
  }

  public getData(): IChat {
    const { id, avatar, createdBy, title } = this;

    return { id, avatar, createdBy, title };
  }
}
