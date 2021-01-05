import { User } from '../../../core/models/user';
import { HttpClientService } from '../../http/http.service';
import { BaseApiService } from '../base-api.service';
import { ISigninRequest } from '../interfaces/signin.interfaces';
import { ISignupRequest } from '../interfaces/signup.interfaces';

export class AuthApiService extends BaseApiService {
  constructor(private http: HttpClientService) {
    super('auth/');
  }

  public async signup(data: ISignupRequest): Promise<unknown> {
    return this.http
      .post(this.getUrl('signup'), data, this.commonOptions)
      .then((xhr) => xhr.response);
  }

  public async signin(data: ISigninRequest): Promise<unknown> {
    return this.http
      .post(this.getUrl('signin'), data, this.commonOptions)
      .then((xhr) => xhr.response);
  }

  public async logout(): Promise<unknown> {
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
