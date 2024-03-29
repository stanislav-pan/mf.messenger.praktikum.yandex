import { User } from '@core/models/user';
import { HttpHeaders } from '@utils/http/http-headers';
import { BaseApiService } from '../base-api.service';
import { IApiHttpClient } from '../interfaces/http.interfaces';
import {
  IChangePasswordRequest,
  IChangeProfileRequest,
} from '../interfaces/user.interfaces';

export class UsersApiService extends BaseApiService {
  constructor(private http: IApiHttpClient) {
    super('user/');
  }

  public async changePassword(data: IChangePasswordRequest): Promise<unknown> {
    return this.http
      .put(this.getUrl('password'), data, this.commonOptions)
      .then((xhr) => xhr.response);
  }

  public async changeAvatar(file: File): Promise<User> {
    const data = new FormData();
    data.append('avatar', file);

    return this.http
      .put(this.getUrl('profile/avatar'), data, {
        ...this.commonOptions,
        headers: new HttpHeaders({
          'content-type': '',
        }),
      })
      .then((xhr) => User.mapUserFromServer(JSON.parse(xhr.response)));
  }

  public async changeProfile(data: IChangeProfileRequest): Promise<User> {
    return this.http
      .put(this.getUrl('profile'), data, this.commonOptions)
      .then((xhr) => User.mapUserFromServer(JSON.parse(xhr.response)));
  }

  public async searchByLogin(login: string): Promise<User[]> {
    return this.http
      .post(this.getUrl('search'), { login }, this.commonOptions)
      .then((xhr) =>
        JSON.parse(xhr.response).map((user) => User.mapUserFromServer(user))
      );
  }
}
