import { User } from '../core/models/user';
import { ISigninData } from '../pages/login/interfaces';
import { ISignupData } from '../pages/sign-up/interfaces';
import { IListenerFn } from '../utils/forms/interfaces';
import { objToSnakeCase } from '../utils/to-snake-case';
import { ApiService, apiService } from './chats-api/api.service';
import { IUser } from './chats-api/interfaces/user.interfaces';

class UserService {
  private _user: User | null;
  private _listeners: Array<IListenerFn<IUser | null>> = [];

  private set user(user: User | null) {
    this._user = user;

    this._listeners.forEach((listener) => {
      listener(user);
    });
  }

  constructor(private apiService: ApiService) {}

  public async initUser() {
    return this.apiService.auth.fetchUser().then((user) => (this.user = user));
  }

  public async auth(data: ISigninData) {
    return apiService.auth.signin(data).then(() => userService.initUser());
  }

  public async signUp(data: ISignupData) {
    return apiService.auth
      .signup(objToSnakeCase(data))
      .then(() => userService.initUser());
  }

  public async logout() {
    return apiService.auth.logout().then(() => {
      this._listeners = [];

      this.user = null;
    });
  }

  public getUser(): User {
    return this._user as User;
  }

  public async changeAvatar(file: File) {
    return apiService.users.changeAvatar(file).then((user) => {
      this.user = user;
    });
  }

  public async changeProfile(user: IUser) {
    const { firstName, secondName, displayName, login, email, phone } = user;

    const req = {
      firstName,
      secondName,
      login,
      email,
      phone,
      displayName: displayName || this.getUser().getDisplayName(),
    };

    return apiService.users
      .changeProfile(objToSnakeCase(req))
      .then((userData) => (this.user = userData));
  }

  public subscribe(func: IListenerFn<IUser>) {
    this._listeners.push(func);
  }
}

export const userService = new UserService(apiService);
