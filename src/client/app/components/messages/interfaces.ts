import { IMessage } from '@components/message/interfaces';
import { ICommonPropFields } from '@utils/block';

export interface IMessagesComponentExternalProps extends ICommonPropFields {
  messages: IMessage[];
}

export interface IMessagesComponentInnerProps {
  messagesComponentsIds: string[];
}

export type MessagesComponentProps = IMessagesComponentExternalProps &
  IMessagesComponentInnerProps;
