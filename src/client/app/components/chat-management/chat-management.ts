import { SelectableUser } from '../../core/models/selectable-user.js';
import { chatsService } from '../../services/chats.service.js';
import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { FormControl } from '../../utils/forms/form-control.js';
import { RequiredValidator } from '../../utils/forms/validators/reguired.validator.js';
import { isArray } from '../../utils/is-array.js';
import Button from '../button/button.js';
import EditChatUsersComponent from '../edit-chat-users/edit-chat-users.js';
import Input from '../input/input.js';
import {
    ChatManagementComponentProps,
    IChatManagementComponentExternalProps,
} from './interfaces.js';

export default class ChatManagementComponent extends Block<ChatManagementComponentProps> {
    get chatNameFormControl(): FormControl {
        return this.props.components.chatName.props.formControl as FormControl;
    }

    private _selectedUsers: SelectableUser[] = [];

    private _defaultSelectedUsers: SelectableUser[] = [];

    public set defaultSelectedUsers(users: SelectableUser[]) {
        this._defaultSelectedUsers = users;
    }

    constructor(props: IChatManagementComponentExternalProps) {
        super({
            tagName: 'app-chat-management',
            props: { ...props } as ChatManagementComponentProps,
        });
    }

    componentDidMount() {
        this.setProps({
            components: {
                ...(this.props.componentType === 'create' && {
                    chatName: new Input({
                        label: 'Name of chat',
                        placeholder: 'Type the name of chat',
                        iconTemplate: 'static/icons/circle-login-icon.tmpl.njk',
                        formControl: new FormControl('', [RequiredValidator]),
                    }),
                }),
                editChatUsers: new EditChatUsersComponent({
                    handlers: {
                        select: (selectedUsers: SelectableUser[]) =>
                            (this._selectedUsers = selectedUsers),
                    },
                }),
                createBtn: new Button({
                    text:
                        this.props.componentType === 'create'
                            ? 'Create'
                            : 'Save',
                    handlers: {
                        click: () =>
                            this.props.componentType === 'create'
                                ? this._createChat()
                                : this._editChat(),
                    },
                }),
            },
        });

        if (
            !isArray(this.props.selectedUsers) ||
            !this.props.selectedUsers.length
        ) {
            return;
        }

        const selectedUsers = this.props.selectedUsers.map(
            (user) => new SelectableUser(user, true)
        );

        this.defaultSelectedUsers = selectedUsers;

        this.props.components.editChatUsers.setProps({
            selectedUsers: [...selectedUsers],
        });
    }

    private _createChat() {
        if (this.chatNameFormControl.invalid) {
            this.chatNameFormControl.markAsDirty();

            return;
        }

        if (!this._selectedUsers.length) {
            return;
        }

        const chatName: string = this.chatNameFormControl.getValue();

        chatsService
            .createChat(
                chatName,
                this._selectedUsers.map((user) => user.id)
            )
            .then(() => this.props.handlers.complete());
    }

    private _editChat() {
        if (!this.props.currectChatId) {
            return;
        }

        const defaultSelectedUsers: Record<string, SelectableUser> = {};

        this._defaultSelectedUsers.forEach((user) => {
            defaultSelectedUsers[user.id] = user;
        });

        const addToChat: SelectableUser[] = [];
        const removeFromChat: SelectableUser[] = [];

        this._selectedUsers.forEach((selectedUser) => {
            if (!(selectedUser.id in defaultSelectedUsers)) {
                addToChat.push(selectedUser);
            }

            delete defaultSelectedUsers[selectedUser.id];
        });

        Object.values(defaultSelectedUsers).forEach((user: SelectableUser) =>
            removeFromChat.push(user)
        );

        console.log('addToChat', addToChat);
        console.log('removeFromChat', removeFromChat);

        chatsService
            .updateUsers(
                this.props.currectChatId,
                addToChat.map((item) => item.id),
                removeFromChat.map((item) => item.id)
            )
            .then(() => this.props.handlers.complete());
    }

    render() {
        console.log(this._defaultSelectedUsers);

        const { chatName, createBtn, editChatUsers } = this.props.components;

        return templator
            .getTemplate(
                '../app/components/chat-management/chat-management.tmpl.njk'
            )
            .render({
                ...this.props,
                canChangeName: this.props.componentType === 'create',
                chatNameId: chatName?.getId(),
                editChatUsersId: editChatUsers.getId(),
                createBtnId: createBtn.getId(),
            });
    }
}
