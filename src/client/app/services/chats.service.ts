import { Chat } from '../core/models/chat';
import { IListenerFn } from '../utils/forms/interfaces';
import { ApiService, apiService } from './chats-api/api.service.js';

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

    public fetchChats() {
        return this.apiService.chats
            .get()
            .then((chats) => (this.chats = chats));
    }

    public createChat(chatName: string, usersIds: number[]) {
        return apiService.chats
            .createChat(chatName)
            .then((chat) => apiService.chats.addUsersToChat(chat.id, usersIds))
            .then(() => this.fetchChats());
    }

    public getChats() {
        return this._chats;
    }

    public subscribe(func: IListenerFn<Chat[]>) {
        this._listeners.push(func);
    }
}

export const chatsService = new ChatsService(apiService);
