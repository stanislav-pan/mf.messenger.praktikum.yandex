import { User } from '../../../core/models/user.js';
import { HttpClientService } from '../../http/http.service.js';
import { BaseApiService } from '../base-api.service.js';
import { ISigninRequest } from '../interfaces/signin.interfaces.js';
import { ISignupRequest } from '../interfaces/signup.interfaces.js';

export class AuthApiService extends BaseApiService {
    constructor(private http: HttpClientService) {
        super('auth/');
    }

    public async signup(data: ISignupRequest) {
        return this.http
            .post(this.getUrl('signup'), data, this.commonOptions)
            .then((xhr) => xhr.response);
    }

    public async signin(data: ISigninRequest) {
        return this.http
            .post(this.getUrl('signin'), data, this.commonOptions)
            .then((xhr) => xhr.response);
    }

    public async logout() {
        return this.http
            .post(this.getUrl('logout'), {}, this.commonOptions)
            .then((xhr) => xhr.response);
    }

    public async fetchUser(): Promise<User> {
        return this.http
            .get(this.getUrl('user'), this.commonOptions)
            .then((xhr) => User.mapUserFromServer(JSON.parse(xhr.response)));
    }
}
