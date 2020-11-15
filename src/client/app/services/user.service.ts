import { User } from '../core/models/user.js';
import { IListenerFn } from '../utils/forms/interfaces.js';
import { objToSnakeCase } from '../utils/to-snake-case.js';
import { ApiService, apiService } from './chats-api/api.service.js';
import { IUser } from './chats-api/interfaces/user.interfaces.js';

class UserService {
    private _user: User;
    private _listeners: Array<IListenerFn<IUser>> = [];

    private set user(user: User) {
        this._user = user;

        this._listeners.forEach((listener) => {
            listener(user);
        });
    }

    constructor(private apiService: ApiService) {}

    public initUser() {
        return this.apiService.auth
            .fetchUser()
            .then((user) => (this.user = user));
    }

    public getUser() {
        return this._user || {};
    }

    public changeAvatar(file: File) {
        return apiService.users.changeAvatar(file).then((user) => {
            this.user = user;
        });
    }

    public changeProfile(user: IUser) {
        const {
            firstName,
            secondName,
            displayName,
            login,
            email,
            phone,
        } = user;

        const req = {
            firstName,
            secondName,
            login,
            email,
            phone,
            displayName: displayName || this.user.getDisplayName(),
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
