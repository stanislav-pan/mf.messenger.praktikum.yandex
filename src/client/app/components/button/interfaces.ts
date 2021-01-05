import { ICommonPropFields } from '../../utils/block';

export interface IButtonComponentExternalProps extends ICommonPropFields {
  /** Текст кнопки */
  text: string;
  class?: string;

  handlers?: {
    click?: (event?: Event) => void;
  };
}

export type ButtonComponentProps = IButtonComponentExternalProps;
