import { SelectableUser } from '../../core/models/selectable-user.js';
import { chatsService } from '../../services/chats.service.js';
import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { FormControl } from '../../utils/forms/form-control.js';
import { RequiredValidator } from '../../utils/forms/validators/reguired.validator.js';
import Button from '../button/button.js';
import EditChatUsersComponent from '../edit-chat-users/edit-chat-users.js';
import Input from '../input/input.js';
import {
    CreateChatComponentProps,
    ICreateChatComponentExternalProps,
} from './interfaces.js';

export default class CreateChatComponent extends Block<
    CreateChatComponentProps
> {
    get chatNameFormControl(): FormControl {
        return this.props.components.chatName.props.formControl as FormControl;
    }
    private _selectedUsers: SelectableUser[] = [];

    constructor(props: ICreateChatComponentExternalProps) {
        super({
            tagName: 'app-create-chat',
            props: {
                ...props,
                components: {
                    chatName: new Input({
                        label: 'Name of chat',
                        placeholder: 'Type the name of chat',
                        iconTemplate: 'static/icons/circle-login-icon.tmpl.njk',
                        formControl: new FormControl('', [RequiredValidator]),
                    }),
                    editChatUsers: new EditChatUsersComponent({
                        handlers: {
                            select: (selectedUsers: SelectableUser[]) =>
                                (this._selectedUsers = selectedUsers),
                        },
                    }),
                    createBtn: new Button({
                        text: 'Create',
                        handlers: {
                            click: () => this._createChat(),
                        },
                    }),
                },
            },
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

    render() {
        const { chatName, createBtn, editChatUsers } = this.props.components;

        return templator
            .getTemplate('../app/components/create-chat/create-chat.tmpl.njk')
            .render({
                ...this.props,
                chatNameId: chatName.getId(),
                editChatUsersId: editChatUsers.getId(),
                createBtnId: createBtn.getId(),
            });
    }
}
