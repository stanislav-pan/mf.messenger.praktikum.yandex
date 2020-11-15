import { ICommonPropFields } from '../../utils/block';
import Button from '../button/button';
import EditChatUsersComponent from '../edit-chat-users/edit-chat-users.js';
import Input from '../input/input.js';

export interface ICreateChatComponentExternalProps extends ICommonPropFields {
    handlers: {
        complete: () => void;
    };
}

export interface ICreateChatComponentInnerProps {
    components: {
        chatName: Input;
        editChatUsers: EditChatUsersComponent;
        createBtn: Button;
    };
}

export type CreateChatComponentProps = ICreateChatComponentExternalProps &
    ICreateChatComponentInnerProps;
