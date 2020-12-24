import { HttpClientService, httpClientService } from '../http/http.service';
import { AuthApiService } from './api-groups/auth-api.service';
import { ChatsApiService } from './api-groups/chats-api.service';
import { UsersApiService } from './api-groups/users-api.service';

export class ApiService {
  public host = 'https://ya-praktikum.tech';
  public auth: AuthApiService;
  public users: UsersApiService;
  public chats: ChatsApiService;

  constructor(private http: HttpClientService) {
    this.auth = new AuthApiService(this.http);
    this.users = new UsersApiService(this.http);
    this.chats = new ChatsApiService(this.http);
  }
}

export const apiService = new ApiService(httpClientService);
