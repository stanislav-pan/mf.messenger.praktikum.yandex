import { ICommonPropFields } from '../../utils/block';
import Avatar from '../avatar/avatar.js';

export interface IChatComponentExternalProps extends ICommonPropFields {
    chat: IChat;
    handlers: {
        click: (event: MouseEvent, chat: IChat) => void;
    };
}

export interface IChatComponentInnerProps {
    components: {
        avatar: Avatar;
    };
}

export type ChatComponentProps = IChatComponentExternalProps &
    IChatComponentInnerProps;

export interface IChat {
    avatarSrc: string;
    name: string;
    text: string;
    date: string;
    numberOfUnreadMessages: number;
}
