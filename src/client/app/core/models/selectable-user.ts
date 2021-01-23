import {
  ISelectableUser,
  IUser,
} from '@services/chats-api/interfaces/user.interfaces';
import { User } from './user';

export class SelectableUser extends User implements ISelectableUser {
  public selected: boolean;

  constructor(user: IUser, selected: boolean) {
    super(user);

    this.selected = selected;
  }
}
