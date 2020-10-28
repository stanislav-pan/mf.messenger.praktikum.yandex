import { ICommonPropFields } from '../../utils/block';

export interface IBriefInformationExternalProps extends ICommonPropFields {
    name: string;
    lastVisit: string;

    avatarSrc: string;
    canChangeName: boolean;
}

export type BriefInformationProps = IBriefInformationExternalProps &
    IBriefInformationInnerProps;

export interface IBriefInformationInnerProps {
    displayedNameInput: boolean;
}
