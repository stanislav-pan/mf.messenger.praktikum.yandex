import { User } from '../../../core/models/user.js';
import { HttpHeaders } from '../../http/http-headers.js';
import { HttpClientService } from '../../http/http.service.js';
import { BaseApiService } from '../base-api.service.js';
import {
    IChangePasswordRequest,
    IChangeProfileRequest,
} from '../interfaces/user.interfaces.js';

export class UsersApiService extends BaseApiService {
    constructor(private http: HttpClientService) {
        super('user/');
    }

    public changePassword(data: IChangePasswordRequest) {
        return this.http
            .put(this.getUrl('password'), data, {
                headers: new HttpHeaders({
                    'content-type': 'application/json',
                }),
                withCredentials: true,
            })
            .then((xhr) => xhr.response);
    }

    public changeAvatar(file: File) {
        const data = new FormData();
        data.append('avatar', file);

        return this.http
            .put(this.getUrl('profile/avatar'), data, {
                withCredentials: true,
            })
            .then((xhr) => User.mapUserFromServer(JSON.parse(xhr.response)));
    }

    public changeProfile(data: IChangeProfileRequest) {
        return this.http
            .put(this.getUrl('profile'), data, {
                headers: new HttpHeaders({
                    'content-type': 'application/json',
                }),
                withCredentials: true,
            })
            .then((xhr) => User.mapUserFromServer(JSON.parse(xhr.response)));
    }

    public searchByLogin(login: string): Promise<User[]> {
        return this.http
            .post(
                this.getUrl('search'),
                { login },
                {
                    headers: new HttpHeaders({
                        'content-type': 'application/json',
                    }),
                    withCredentials: true,
                }
            )
            .then((xhr) =>
                JSON.parse(xhr.response).map((user) =>
                    User.mapUserFromServer(user)
                )
            );
    }
}
