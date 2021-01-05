import { User } from '../../../core/models/user';
import { HttpClientService } from '../../http/http.service';
import { BaseApiService } from '../base-api.service';
import {
  IChangePasswordRequest,
  IChangeProfileRequest,
} from '../interfaces/user.interfaces';

export class UsersApiService extends BaseApiService {
  constructor(private http: HttpClientService) {
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
        withCredentials: true,
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
