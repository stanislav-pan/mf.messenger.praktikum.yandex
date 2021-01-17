import BriefInformationComponent from '@components/brief-information';
import ChatsComponent from '@components/chats';
import MenuComponent from '@components/menu';
import MessagesComponent from '@components/messages/messages';
import ModalComponent from '@components/modal';
import SearchComponent from '@components/search';
import { Chat } from '@core/models/chat';
import { FormControl } from '@forms/form-control';
import { ICommonPropFields } from '@utils/block';

export type IMessengerPageExternalProps = ICommonPropFields;

export type MessengerPageProps = IMessengerPageExternalProps &
  IMessengerPageInnerProps;

export interface IMessengerPageInnerProps {
  selectedChat: Chat | null;
  messageInput: FormControl;

  components: {
    search: SearchComponent;
    messages: MessagesComponent;
    briefInformation: BriefInformationComponent;
    chats: ChatsComponent;
    modal?: ModalComponent;
    chatMenu?: MenuComponent;
  };
}
