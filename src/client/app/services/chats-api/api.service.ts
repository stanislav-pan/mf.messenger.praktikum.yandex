import { HttpClientService, httpClientService } from '../http/http.service.js';
import { AuthApiService } from './api-groups/auth-api.service.js';
import { ChatsApiService } from './api-groups/chats-api.service.js';
import { UsersApiService } from './api-groups/users-api.service.js';

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
