import BriefInformationComponent from '@components/brief-information';
import ListComponent from '@components/list';
import SearchComponent from '@components/search';
import SelectedUserComponent from '@components/selected-user';
import { SelectableUser } from '@core/models/selectable-user';
import { isArray } from '@my-lodash/is-array';
import { apiService } from '@services/chats-api/api.service';
import { Block } from '@utils/block';
import {
  EditChatUsersComponentProps,
  IEditChatUsersComponentExternalProps,
} from './interfaces';

import './edit-chat-users.scss';
import template from './edit-chat-users.tmpl.njk';

export default class EditChatUsersComponent extends Block<EditChatUsersComponentProps> {
  private _selectedUsers: SelectableUser[] = [];

  private get selectedUsers() {
    return this._selectedUsers;
  }

  private set selectedUsers(users: SelectableUser[]) {
    this._selectedUsers = users;
    setTimeout(() => {
      this.props.handlers.select(users);
    }, 0);
  }

  constructor(props: IEditChatUsersComponentExternalProps) {
    super({
      tagName: 'app-edit-chat-users',
      props: {
        ...props,
        components: {
          searchUser: new SearchComponent({
            handlers: {
              input: (_, query: string) => this._searchByLogin(query),
            },
          }),
          usersList: new ListComponent({
            components: {},
          }),
          selectedUsersList: new ListComponent({
            components: {},
            class: 'edit-chat-users__selected-users-list',
          }),
        },
      },
    });
  }

  componentDidMount(): void {
    this._searchByLogin('');
  }

  componentDidUpdate(): boolean {
    if (isArray(this.props.selectedUsers)) {
      this.selectedUsers = this.props.selectedUsers;
    }

    return true;
  }

  private _searchByLogin(login: string) {
    apiService.users.searchByLogin(login).then((users) => {
      const selectedUsers = users.map(
        (user) =>
          new SelectableUser(
            user.getData(),
            this.selectedUsers.some(
              (selectedUser) => selectedUser.id === user.id
            )
          )
      );

      this._setUsers(selectedUsers);
    });
  }

  private _setUsers(users: SelectableUser[]) {
    const usersComponents = users.reduce((acc, user) => {
      const component = new BriefInformationComponent({
        name: user.getDisplayName(),
        lastVisit: user.getLastVisit(),
        avatarSrc: user.avatar,
        selected: user.selected,

        canChangeName: false,
        canChangeAvatar: false,

        handlers: {
          click: () => {
            user.selected = !user.selected;
            const selected = user.selected;

            if (selected) {
              this.selectedUsers = [...this.selectedUsers, user];
            } else {
              this.selectedUsers = this.selectedUsers.filter(
                (selectedUser) => selectedUser.id !== user.id
              );
            }

            component.setProps({ selected });

            this._setSelectedUsers(users, this.selectedUsers);
          },
        },
      });

      acc[component.getId()] = component;

      return acc;
    }, {});

    this.props.components.usersList.setProps({
      components: usersComponents,
    });

    if (users.some((user) => user.selected) || this.selectedUsers.length) {
      this._setSelectedUsers(users, this.selectedUsers);
    }
  }

  private _setSelectedUsers(
    usersFromList: SelectableUser[],
    selectedUsers: SelectableUser[]
  ) {
    const selectedUsersComponents = selectedUsers.reduce((acc, user) => {
      const component = new SelectedUserComponent({
        name: user.getDisplayName(),
        avatarSrc: user.avatar,
        handlers: {
          unselect: () => {
            this.selectedUsers = this.selectedUsers.filter(
              (selectedUser) => selectedUser.id !== user.id
            );

            usersFromList = usersFromList.map((userFromList) =>
              userFromList.id === user.id
                ? new SelectableUser(userFromList.getData(), false)
                : userFromList
            );

            this._setSelectedUsers(usersFromList, this.selectedUsers);
            this._setUsers(usersFromList);
          },
        },
        class: 'edit-chat-users__selected-user',
      });

      acc[component.getId()] = component;

      return acc;
    }, {});

    this.props.components.selectedUsersList.setProps({
      components: selectedUsersComponents,
    });
  }

  render(): string {
    const { searchUser, usersList, selectedUsersList } = this.props.components;

    return template({
      ...this.props,
      searchUserId: searchUser.getId(),
      usersListId: usersList.getId(),
      selectedUsersListId: selectedUsersList.getId(),
    });
  }
}
