import { User } from '../../core/models/user.js';
import { ICommonPropFields } from '../../utils/block';
import Button from '../button/button';
import EditChatUsersComponent from '../edit-chat-users/edit-chat-users.js';
import Input from '../input/input.js';

export type ChatManagementComponentType = 'edit' | 'create';

export interface IChatManagementComponentExternalProps
    extends ICommonPropFields {
    componentType: ChatManagementComponentType;
    currectChatId?: number | null;

    selectedUsers?: User[];
    handlers: {
        complete: () => void;
    };
}

export interface IChatManagementComponentInnerProps {
    components: {
        chatName: Input;
        editChatUsers: EditChatUsersComponent;
        createBtn: Button;
    };
}

export type ChatManagementComponentProps = IChatManagementComponentExternalProps &
    IChatManagementComponentInnerProps;
