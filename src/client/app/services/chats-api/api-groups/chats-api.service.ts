import { User } from '../../../core/models/user';
import { Chat } from '../../../core/models/chat';
import { HttpClientService } from '../../http/http.service';
import { BaseApiService } from '../base-api.service';

export class ChatsApiService extends BaseApiService {
    constructor(private http: HttpClientService) {
        super('chats/');
    }

    public async createChat(title: string) {
        return this.http
            .post(this.getUrl(), { title }, this.commonOptions)
            .then((xhr) => Chat.mapChatFromServer(JSON.parse(xhr.response)));
    }

    public async deleteChat(chatId: number) {
        return this.http
            .delete(
                this.getUrl(),
                {
                    chatId: String(chatId),
                },
                this.commonOptions
            );
    }

    public async get(): Promise<Array<Chat>> {
        return this.http
            .get(this.getUrl(), this.commonOptions)
            .then((xhr) =>
                JSON.parse(xhr.response).map((chat) =>
                    Chat.mapChatFromServer(chat)
                )
            );
    }

    public async addUsersToChat(chatId: number, usersIds: number[]) {
        return this.http
            .put(
                this.getUrl('users'),
                {
                    chatId,
                    users: usersIds,
                },
                this.commonOptions
            )
            .then((xhr) => xhr);
    }

    public async deleteUsersFromChat(chatId: number, usersIds: number[]) {
        return this.http
            .delete(
                this.getUrl('users'),
                {
                    chatId,
                    users: usersIds,
                },
                this.commonOptions
            )
            .then((xhr) => xhr);
    }

    public async getChatUsers(chatId: number): Promise<User[]> {
        return this.http
            .get(this.getUrl(`${chatId}/users`), this.commonOptions)
            .then((xhr) =>
                JSON.parse(xhr.response).map((user) =>
                    User.mapUserFromServer(user)
                )
            );
    }
}
