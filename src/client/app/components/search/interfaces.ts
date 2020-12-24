import { SubmitEvent } from '../../core/interfaces';
import { ICommonPropFields } from '../../utils/block';

export interface ISearchComponentExternalProps extends ICommonPropFields {
  handlers: {
    submit?: (event: SubmitEvent, value: string) => void;
    input?: (event: InputEvent, value: string) => void;
  };
}

export interface ISearchComponentInnerProps {}

export type SearchComponentProps = ISearchComponentExternalProps &
  ISearchComponentInnerProps;
