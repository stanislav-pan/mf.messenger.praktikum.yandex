import { SelectableUser } from '../../core/models/selectable-user';
import { ICommonPropFields } from '../../utils/block';
import ListComponent from '../list/list';
import SearchComponent from '../search/search';

export interface IEditChatUsersComponentExternalProps
    extends ICommonPropFields {
    handlers: {
        select: (selectedUsers: SelectableUser[]) => void;
    };

    selectedUsers?: SelectableUser[];
}

export interface IEditChatUsersComponentInnerProps {
    components: {
        searchUser: SearchComponent;
        usersList: ListComponent;
        selectedUsersList: ListComponent;
    };
}

export type EditChatUsersComponentProps = IEditChatUsersComponentExternalProps &
    IEditChatUsersComponentInnerProps;
