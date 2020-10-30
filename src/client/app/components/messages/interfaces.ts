import { ICommonPropFields } from '../../utils/block';
import { IMessage } from '../message/interfaces';

export interface IMessagesComponentExternalProps extends ICommonPropFields {
    messages: IMessage[];
}

export interface IMessagesComponentInnerProps {
    messagesComponentsIds: string[];
}

export type MessagesComponentProps = IMessagesComponentExternalProps &
    IMessagesComponentInnerProps;
