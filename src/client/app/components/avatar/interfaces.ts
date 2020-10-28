import { ICommonPropFields } from '../../utils/block';

export interface IAvatarProps extends ICommonPropFields {
    avatarSrc: string;
    handlers?: {
        upload?: (base64: string) => void;
    };
}
