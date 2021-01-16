import { ICommonPropFields } from '../../utils/block';
import Avatar from '../avatar';

export interface IBriefInformationExternalProps extends ICommonPropFields {
  name: string;
  lastVisit: string;

  avatarSrc: string;
  canChangeName?: boolean;
  canChangeAvatar?: boolean;

  handlers?: {
    click?: () => void;
  };

  selected?: boolean;
}

export type BriefInformationProps = IBriefInformationExternalProps &
  IBriefInformationInnerProps;

export interface IBriefInformationInnerProps {
  displayedNameInput: boolean;

  components: {
    avatar: Avatar;
  };

  handlers: {
    showNameInput: () => void;
  };
}
