import { apiService } from '../../services/chats-api/api.service.js';
import {
    IUser,
    IUserRequest,
} from '../../services/chats-api/interfaces/user.interfaces';
import { objToCamelCase } from '../../utils/to-camel-case.js';

export class User implements IUser {
    public id: number;
    public firstName: string;
    public secondName: string;
    public displayName: string;
    public login: string;
    public email: string;
    public phone: string;
    public avatar: string;

    static mapUserFromServer(user: IUserRequest) {
        const transformedUser = objToCamelCase(user) as IUser;

        return new User({
            ...transformedUser,
            avatar: transformedUser.avatar && apiService.host + user.avatar,
        });
    }

    constructor(user: IUser) {
        Object.assign(this, user);
    }

    public getDisplayName() {
        return (
            this.displayName ||
            `${this.firstName || ''} ${this.secondName || ''}`
        );
    }

    public getLastVisit() {
        return 'was last seen today at 21:37';
    }

    public getData(): IUser {
        const { id, firstName, secondName, login, email, phone, avatar } = this;

        return {
            id,
            firstName,
            secondName,
            login,
            email,
            phone,
            avatar,
            displayName: this.getDisplayName(),
        };
    }
}
