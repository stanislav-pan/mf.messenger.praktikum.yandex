import { Chat } from '../core/models/chat';
import { IListenerFn } from '../utils/forms/interfaces';
import { isArray } from '../utils/my-lodash/is-array';
import { ApiService, apiService } from './chats-api/api.service';

class ChatsService {
  private _chats: Chat[] = [];
  private _listeners: Array<IListenerFn<Chat[]>> = [];

  private set chats(chats: Chat[]) {
    this._chats = chats;

    this._listeners.forEach((listener) => {
      listener(chats);
    });
  }

  constructor(private apiService: ApiService) {}

  public fetchChats(currentUserId: number) {
    return this.apiService.chats
      .get(currentUserId)
      .then((chats) => (this.chats = chats));
  }

  public createChat(
    chatName: string,
    currentUserId: number,
    usersIds: number[]
  ) {
    return apiService.chats
      .createChat(chatName)
      .then((chat) => apiService.chats.addUsersToChat(chat.id, usersIds))
      .then(() => this.fetchChats(currentUserId));
  }

  public deleteChat(chatId: number) {
    return apiService.chats.deleteChat(chatId).then(() => {
      this.chats = this._chats.filter((chat) => chat.id !== chatId);
    });
  }

  public updateUsers(
    chatId: number,
    addToChatIds: number[] = [],
    removeFromChatIds: number[] = []
  ): Promise<unknown> {
    const needAdd = isArray(addToChatIds) && addToChatIds.length;
    const needRemove = isArray(removeFromChatIds) && removeFromChatIds.length;

    if (needAdd && needRemove) {
      return Promise.all([
        apiService.chats.addUsersToChat(chatId, addToChatIds),
        apiService.chats.deleteUsersFromChat(chatId, removeFromChatIds),
      ]);
    }

    if (needAdd) {
      return apiService.chats.addUsersToChat(chatId, addToChatIds);
    }

    if (needRemove) {
      return apiService.chats.deleteUsersFromChat(chatId, removeFromChatIds);
    }

    return Promise.resolve();
  }

  public getChats() {
    return this._chats;
  }

  public subscribe(func: IListenerFn<Chat[]>) {
    this._listeners.push(func);
  }

  public unsubscribe(func: IListenerFn<Chat[]>) {
    this._listeners = this._listeners.filter((item) => item !== func);
  }
}

export const chatsService = new ChatsService(apiService);
