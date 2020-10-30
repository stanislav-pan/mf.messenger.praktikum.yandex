import BriefInformationComponent from '../../components/brief-information/brief-information';
import ChatsComponent from '../../components/chats/chats';
import MessagesComponent from '../../components/messages/messages';
import SearchComponent from '../../components/search/search';
import { ICommonPropFields } from '../../utils/block';

export interface IMessangerPageExternalProps extends ICommonPropFields {}

export type MessangerPageProps = IMessangerPageExternalProps &
    IMessangerPageInnerProps;

export interface IMessangerPageInnerProps {
    components: {
        search: SearchComponent;
        messages: MessagesComponent;
        briefInformation: BriefInformationComponent;
        chats: ChatsComponent;
    };
}
