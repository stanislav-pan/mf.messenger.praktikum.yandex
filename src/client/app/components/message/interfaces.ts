import { ICommonPropFields } from '../../utils/block';

export interface IMessageComponentExternalProps extends ICommonPropFields {
    message: IMessage;
}

export interface IMessageComponentInnerProps {}

export type MessageComponentProps = IMessageComponentExternalProps &
    IMessageComponentInnerProps;

export interface IMessage {
    type: 'text' | 'image' | 'dateDivider';

    isMyMessage?: boolean;

    /** Текст сообщения */
    text?: string;
    /** Время отправления сообщения */
    time?: string;
    date?: string;
}
