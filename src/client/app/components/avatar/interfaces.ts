import { ICommonPropFields } from '../../utils/block';

export interface IAvatarComponentExternalProps extends ICommonPropFields {
  avatarSrc: string;
  canChangeAvatar?: boolean;

  handlers?: {
    upload: (file: File) => void;
  };
}

export type AvatarComponentProps = IAvatarComponentExternalProps;
