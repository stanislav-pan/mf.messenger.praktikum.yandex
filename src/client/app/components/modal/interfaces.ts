import { Block, ICommonPropFields } from '../../utils/block';

export interface IModalComponentExternalProps extends ICommonPropFields {
  component: Block;
  handlers: {
    close: () => void;
  };
}

export type ModalComponentProps = IModalComponentExternalProps;
