import { ICommonPropFields } from '@utils/block';

export interface IMessageComponentExternalProps extends ICommonPropFields {
  message: IMessage;
}

export type MessageComponentProps = IMessageComponentExternalProps;

export interface IMessage {
  type: 'text' | 'image' | 'dateDivider';

  isMyMessage?: boolean;

  /** Текст сообщения */
  text?: string;
  /** Время отправления сообщения */
  time?: string;
  date?: string;
}
