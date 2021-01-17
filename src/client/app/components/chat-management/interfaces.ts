import Button from '@components/button';
import EditChatUsersComponent from '@components/edit-chat-users';
import Input from '@components/input';
import { User } from '@core/models/user';
import { ICommonPropFields } from '@utils/block';

export type ChatManagementComponentType = 'edit' | 'create';

export interface IChatManagementComponentExternalProps
  extends ICommonPropFields {
  componentType: ChatManagementComponentType;
  currectChatId?: number | null;

  selectedUsers?: User[];
  handlers: {
    complete: () => void;
  };
}

export interface IChatManagementComponentInnerProps {
  components: {
    chatName: Input;
    editChatUsers: EditChatUsersComponent;
    submitButton: Button;
  };
}

export type ChatManagementComponentProps = IChatManagementComponentExternalProps &
  IChatManagementComponentInnerProps;
