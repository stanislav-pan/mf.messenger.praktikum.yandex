import { Chat } from '../../core/models/chat.js';
import { ICommonPropFields } from '../../utils/block';

export interface IChatsComponentExternalProps extends ICommonPropFields {
    chats: Chat[];
    handlers: {
        click: (event: MouseEvent, chat: Chat) => void;
    };
}

export interface IChatsComponentInnerProps {}

export type ChatsComponentProps = IChatsComponentExternalProps &
    IChatsComponentInnerProps;
