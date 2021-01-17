import { isArray } from '@my-lodash/is-array';
import { apiService } from '@services/chats-api/api.service';
import { Message } from './message';

export type OnMessageCallback = {
  (event: { type: 'message'; data: Message[]; state: 'new' | 'old' }): void;
};

export interface IMessagesManager {
  sendMessage: (content: unknown) => void;
  getNextMessages: () => void;
  onMessage: (callback: OnMessageCallback) => void;
}

export interface IMessageResponse {
  id: number;
  user_id: number;
  chat_id: number;

  content: string;
  time: string;
}

export class MessagesManager {
  private _socket: WebSocket;
  private _messages: Array<{ id: number }> | null = null;
  private _listener: OnMessageCallback | null = null;

  static createConnection = (
    userId: number,
    chatId: number
  ): Promise<IMessagesManager> => {
    return new Promise((resolve, reject) => {
      apiService.chats.getChatToken(chatId).then((token) => {
        const messagesService = new MessagesManager(token, userId, chatId);

        messagesService._socket.onopen = () => {
          console.log('Соединение установлено');

          resolve({
            sendMessage: messagesService.sendMessage,
            getNextMessages: messagesService.getNextMessages,
            onMessage: messagesService.onMessage,
          });
        };

        messagesService._socket.onerror = (event: Event) => {
          console.log('Ошибка', event);

          reject(event);
        };
      });
    });
  };

  constructor(token: string, userId: number, chatId: number) {
    this._socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );
  }

  private onMessage = (callback: OnMessageCallback) => {
    if (this._listener) {
      return;
    }

    this._listener = callback;

    this._socket.addEventListener('message', (event) => {
      const parsedData = JSON.parse(event.data);

      if (isArray(parsedData) || parsedData.type === 'message') {
        this.onMessageHandler(parsedData, callback);
      }
    });
  };

  private onMessageHandler = (
    parsedData: Array<IMessageResponse> | IMessageResponse,
    callback: OnMessageCallback
  ) => {
    const state = isArray(parsedData) ? 'old' : 'new';
    const data = isArray(parsedData) ? parsedData : [parsedData];

    const mappedMessages = data.map((item) =>
      Message.mapMessageFromServer(item)
    );

    callback({
      type: 'message',
      data: mappedMessages,
      state,
    });
  };

  private getNextMessages = () => {
    if (!this._messages) {
      this.getMessages(0);

      return;
    }

    if (this._messages.length === 0) {
      return;
    }

    this.getMessages(this._messages.length - 1);
  };

  private getMessages = (start = 0) => {
    this._socket.send(
      JSON.stringify({
        content: String(start),
        type: 'get old',
      })
    );
  };

  private sendMessage = (content: unknown) => {
    this._socket.send(
      JSON.stringify({
        content,
        type: 'message',
      })
    );
  };
}
