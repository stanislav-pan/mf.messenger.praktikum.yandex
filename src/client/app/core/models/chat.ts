import { objToCamelCase } from '@my-lodash/to-camel-case';
import { IChatResponse } from '@services/chats-api/interfaces/chat.interfaces';
import { Message } from './message';
import { IMessagesManager, MessagesManager } from './messages-manager';

export interface IChat {
  id: number;
  avatar: string;
  createdBy: number;
  title: string;
  currentUserId?: number;
}

export type OnChangeMessageCallback = {
  (messages: Message[]): void;
};

export class Chat implements IChat {
  public id: number;
  public avatar: string;
  public createdBy: number;
  public title: string;
  public currentUserId?: number;

  public lastMessage: Message | null;

  public messages: Message[] = [];
  private messagesManager: IMessagesManager;
  private _messagesListeners: OnChangeMessageCallback[] = [];

  static mapChatFromServer(chat: IChatResponse, currentUserId?: number): Chat {
    const transformedChat = objToCamelCase(chat) as IChat;

    return new Chat(transformedChat, currentUserId);
  }

  constructor(chat: IChat, currentUserId: number | undefined) {
    if (currentUserId) {
      MessagesManager.createConnection(currentUserId, chat.id).then((data) => {
        this.messagesManager = data;

        this.messagesManager.onMessage((response) => {
          if (response.type === 'message') {
            if (response.state === 'new') {
              this.messages = [...response.data, ...this.messages];
            } else {
              this.messages = [...this.messages, ...response.data];
            }
          }

          this.lastMessage = this.messages.length ? this.messages[0] : null;

          this._messagesListeners.forEach((callback) =>
            callback(this.messages)
          );
        });

        this.getNextMessages();
      });
    }

    Object.assign(this, {
      ...chat,
      ...(chat.avatar && { avatar: 'https://ya-praktikum.tech' + chat.avatar }),
      currentUserId,
    });
  }

  public getData(): IChat {
    const { id, avatar, createdBy, title, currentUserId } = this;

    return { id, avatar, createdBy, title, currentUserId };
  }

  public subscribeOnMessages(callback: OnChangeMessageCallback): void {
    if (this._messagesListeners.some((item) => item === callback)) {
      return;
    }

    this._messagesListeners.push(callback);

    callback(this.messages);
  }

  public unsubscribeFromMessages(callback: OnChangeMessageCallback): void {
    this._messagesListeners = this._messagesListeners.filter(
      (item) => item !== callback
    );
  }

  public getNextMessages(): void {
    this.messagesManager.getNextMessages();
  }

  public sendMessage(content: unknown): void {
    this.messagesManager.sendMessage(content);
  }

  public isMessageOfCurrentUser(message: Message): boolean {
    return this.currentUserId === message?.userId;
  }
}
