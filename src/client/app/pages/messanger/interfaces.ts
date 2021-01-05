import BriefInformationComponent from '../../components/brief-information/brief-information';
import ChatsComponent from '../../components/chats/chats';
import MenuComponent from '../../components/menu/menu';
import MessagesComponent from '../../components/messages/messages';
import ModalComponent from '../../components/modal/modal';
import SearchComponent from '../../components/search/search';
import { ICommonPropFields } from '../../utils/block';

export type IMessangerPageExternalProps = ICommonPropFields

export type MessangerPageProps = IMessangerPageExternalProps &
  IMessangerPageInnerProps;

export interface IMessangerPageInnerProps {
  currectChatId: number | null;

  components: {
    search: SearchComponent;
    messages: MessagesComponent;
    briefInformation: BriefInformationComponent;
    chats: ChatsComponent;
    modal?: ModalComponent;
    chatMenu?: MenuComponent;
  };
}
