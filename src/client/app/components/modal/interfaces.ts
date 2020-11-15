import { Block, ICommonPropFields } from '../../utils/block';

export interface IModalComponentExternalProps extends ICommonPropFields {
    component: Block;
    handlers: {
        close: () => void;
    }
}

export interface IModalComponentInnerProps {}

export type ModalComponentProps = IModalComponentExternalProps &
    IModalComponentInnerProps;
