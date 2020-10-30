import { ICommonPropFields } from '../../utils/block';

export interface IAvatarComponentExternalProps extends ICommonPropFields {
    avatarSrc: string;
    canChangeAvatar?: boolean;

    handlers?: {
        upload: (base64: string) => void;
    };
}

export interface IAvatarComponentInnerProps {}

export type AvatarComponentProps = IAvatarComponentExternalProps &
    IAvatarComponentInnerProps;
