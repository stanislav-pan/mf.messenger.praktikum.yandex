import { Chat } from '../../core/models/chat';
import { ICommonPropFields } from '../../utils/block';
import Avatar from '../avatar/avatar';

export interface IChatComponentExternalProps extends ICommonPropFields {
    chat: Chat;
    handlers: {
        click: (event: MouseEvent, chat: Chat) => void;
    };
}

export interface IChatComponentInnerProps {
    components: {
        avatar: Avatar;
    };
}

export type ChatComponentProps = IChatComponentExternalProps &
    IChatComponentInnerProps;