import { ICommonPropFields } from '../../utils/block';

export interface IAvatarComponentExternalProps extends ICommonPropFields {
  avatarSrc: string;
  canChangeAvatar?: boolean;

  handlers?: {
    upload: (file: File) => void;
  };
}

export interface IAvatarComponentInnerProps {}

export type AvatarComponentProps = IAvatarComponentExternalProps &
  IAvatarComponentInnerProps;
