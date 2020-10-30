import { ICommonPropFields } from '../../utils/block';
import { IChat } from '../chat/interfaces';

export interface IChatsComponentExternalProps extends ICommonPropFields {
    chats: IChat[];
    handlers: {
        click: (event: MouseEvent, chat: IChat) => void;
    };
}

export interface IChatsComponentInnerProps {}

export type ChatsComponentProps = IChatsComponentExternalProps &
    IChatsComponentInnerProps;
