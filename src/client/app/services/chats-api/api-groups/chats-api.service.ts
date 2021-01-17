import { User } from '../../../core/models/user';
import { Chat } from '../../../core/models/chat';
import { BaseApiService } from '../base-api.service';
import { IApiHttpClient } from '../interfaces/http.interfaces';
import { IGetChatTokenResponse } from '../interfaces/chat.interfaces';

export class ChatsApiService extends BaseApiService {
  constructor(private http: IApiHttpClient) {
    super('chats/');
  }

  public async createChat(title: string): Promise<Chat> {
    return this.http
      .post(this.getUrl(), { title }, this.commonOptions)
      .then((xhr) => Chat.mapChatFromServer(JSON.parse(xhr.response)));
  }

  public async deleteChat(chatId: number): Promise<unknown> {
    return this.http
      .delete(
        this.getUrl(),
        {
          chatId: String(chatId),
        },
        this.commonOptions
      )
      .then((xhr) => xhr.response);
  }

  public async get(currentUserId: number): Promise<Array<Chat>> {
    return this.http
      .get(this.getUrl(), this.commonOptions)
      .then((xhr) =>
        JSON.parse(xhr.response).map((chat) =>
          Chat.mapChatFromServer(chat, currentUserId)
        )
      );
  }

  public async addUsersToChat(
    chatId: number,
    usersIds: number[]
  ): Promise<unknown> {
    return this.http
      .put(
        this.getUrl('users'),
        {
          chatId,
          users: usersIds,
        },
        this.commonOptions
      )
      .then((xhr) => xhr.response);
  }

  public async deleteUsersFromChat(
    chatId: number,
    usersIds: number[]
  ): Promise<unknown> {
    return this.http
      .delete(
        this.getUrl('users'),
        {
          chatId,
          users: usersIds,
        },
        this.commonOptions
      )
      .then((xhr) => xhr.response);
  }

  public async getChatUsers(chatId: number): Promise<User[]> {
    return this.http
      .get(this.getUrl(`${chatId}/users`), this.commonOptions)
      .then((xhr) =>
        JSON.parse(xhr.response).map((user) => User.mapUserFromServer(user))
      );
  }

  public async getChatToken(chatId: number): Promise<string> {
    return this.http
      .post(this.getUrl(`token/${chatId}`), null, this.commonOptions)
      .then((xhr) => JSON.parse(xhr.response))
      .then((response: IGetChatTokenResponse) => response.token);
  }
}
