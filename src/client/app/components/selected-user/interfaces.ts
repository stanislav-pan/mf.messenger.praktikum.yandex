import Avatar from '@components/avatar';
import { ICommonPropFields } from '@utils/block';

export interface ISelectedUserComponentExternalProps extends ICommonPropFields {
  avatarSrc: string;
  name: string;

  handlers: {
    unselect: () => void;
  };
}

export interface ISelectedUserComponentInnerProps {
  components: {
    avatar: Avatar;
  };
}

export type SelectedUserComponentProps = ISelectedUserComponentExternalProps &
  ISelectedUserComponentInnerProps;
