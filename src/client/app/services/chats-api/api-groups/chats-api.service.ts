import { User } from '../../../core/models/user.js';
import { Chat } from '../../../core/models/chat.js';
import { HttpHeaders } from '../../http/http-headers.js';
import { HttpClientService } from '../../http/http.service.js';
import { BaseApiService } from '../base-api.service.js';

export class ChatsApiService extends BaseApiService {
    constructor(private http: HttpClientService) {
        super('chats/');
    }

    public createChat(title: string) {
        return this.http
            .post(
                this.getUrl(),
                { title },
                {
                    headers: new HttpHeaders({
                        'content-type': 'application/json',
                    }),
                    withCredentials: true,
                }
            )
            .then((xhr) => Chat.mapChatFromServer(JSON.parse(xhr.response)));
    }

    public deleteChat(chatId: number) {
        return this.http
            .delete(
                this.getUrl(),
                {
                    chatId: String(chatId),
                },
                {
                    headers: new HttpHeaders({
                        'content-type': 'application/json',
                    }),
                    withCredentials: true,
                }
            )
            .then((xhr) => {
                console.log(xhr.response);
            });
    }

    public get(): Promise<Array<Chat>> {
        return this.http
            .get(this.getUrl(), {
                headers: new HttpHeaders({
                    'content-type': 'application/json',
                }),
                withCredentials: true,
            })
            .then((xhr) =>
                JSON.parse(xhr.response).map((chat) =>
                    Chat.mapChatFromServer(chat)
                )
            );
    }

    public addUsersToChat(chatId: number, usersIds: number[]) {
        return this.http
            .put(
                this.getUrl('users'),
                {
                    chatId,
                    users: usersIds,
                },
                {
                    headers: new HttpHeaders({
                        'content-type': 'application/json',
                    }),
                    withCredentials: true,
                }
            )
            .then((xhr) => xhr);
    }

    public deleteUsersFromChat(chatId: number, usersIds: number[]) {
        return this.http
            .delete(
                this.getUrl('users'),
                {
                    chatId,
                    users: usersIds,
                },
                {
                    headers: new HttpHeaders({
                        'content-type': 'application/json',
                    }),
                    withCredentials: true,
                }
            )
            .then((xhr) => xhr);
    }

    public getChatUsers(chatId: number): Promise<User[]> {
        return this.http
            .get(this.getUrl(`${chatId}/users`), {
                headers: new HttpHeaders({
                    'content-type': 'application/json',
                }),
                withCredentials: true,
            })
            .then((xhr) =>
                JSON.parse(xhr.response).map((user) =>
                    User.mapUserFromServer(user)
                )
            );
    }
}
