import { User } from '../../../core/models/user.js';
import { HttpHeaders } from '../../http/http-headers.js';
import { HttpClientService } from '../../http/http.service.js';
import { BaseApiService } from '../base-api.service.js';
import { ISigninRequest } from '../interfaces/signin.interfaces.js';
import { ISignupRequest } from '../interfaces/signup.interfaces.js';

export class AuthApiService extends BaseApiService {
    constructor(private http: HttpClientService) {
        super('auth/');
    }

    public signup(data: ISignupRequest) {
        return this.http
            .post(this.getUrl('signup'), data, {
                headers: new HttpHeaders({
                    'content-type': 'application/json',
                }),
                withCredentials: true,
            })
            .then((xhr) => xhr.response);
    }

    public signin(data: ISigninRequest) {
        return this.http
            .post(this.getUrl('signin'), data, {
                headers: new HttpHeaders({
                    'content-type': 'application/json',
                }),
                withCredentials: true,
            })
            .then((xhr) => xhr.response);
    }

    public logout() {
        return this.http
            .post(
                this.getUrl('logout'),
                {},
                {
                    headers: new HttpHeaders({
                        'content-type': 'application/json',
                    }),
                    withCredentials: true,
                }
            )
            .then((xhr) => xhr.response);
    }

    public fetchUser(): Promise<User> {
        return this.http
            .get(this.getUrl('user'), {
                headers: new HttpHeaders({
                    'content-type': 'application/json',
                }),
                withCredentials: true,
            })
            .then((xhr) => User.mapUserFromServer(JSON.parse(xhr.response)));
    }
}
