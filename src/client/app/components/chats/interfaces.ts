import { Chat } from '@core/models/chat';
import { ICommonPropFields } from '@utils/block';

export interface IChatsComponentExternalProps extends ICommonPropFields {
  chats: Chat[];
  handlers: {
    click: (event: MouseEvent, chat: Chat) => void;
  };
}

export interface IChatsComponentInnerProps {
  chatsComponentsIds: string[];
}

export type ChatsComponentProps = IChatsComponentExternalProps &
  IChatsComponentInnerProps;
