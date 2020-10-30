import { ICommonPropFields } from '../../utils/block';
import Avatar from '../avatar/avatar';

export interface IBriefInformationExternalProps extends ICommonPropFields {
    name: string;
    lastVisit: string;

    avatarSrc: string;
    canChangeName?: boolean;
    canChangeAvatar?: boolean;
}

export type BriefInformationProps = IBriefInformationExternalProps &
    IBriefInformationInnerProps;

export interface IBriefInformationInnerProps {
    displayedNameInput: boolean;

    components: {
        avatar: Avatar;
    };
}
