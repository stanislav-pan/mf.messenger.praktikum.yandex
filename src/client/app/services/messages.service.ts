export class MessagesService {
  private _socket: WebSocket;

  static createConnection = (
    token: string,
    userId: string,
    chatId: string
  ): Promise<MessagesService> => {
    const messagesService = new MessagesService(token, userId, chatId);

    return new Promise((resolve, reject) => {
      messagesService._socket.onopen = () => {
        resolve(messagesService);
      };

      messagesService._socket.onerror = (event: Event) => {
        reject(event);
      };
    });
  };

  constructor(token: string, userId: string, chatId: string) {
    this._socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );
  }
}
