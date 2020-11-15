import { ICommonPropFields } from '../../utils/block';
import Avatar from '../avatar/avatar.js';

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
