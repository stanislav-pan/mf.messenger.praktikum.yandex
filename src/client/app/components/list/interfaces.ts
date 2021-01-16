import { ICommonPropFields, MapOfBlockLike } from '@utils/block';

export interface IListComponentExternalProps extends ICommonPropFields {
  components: MapOfBlockLike;
}

export interface IListComponentInnerProps {
  componentsIds: string[];
}

export type ListComponentProps = IListComponentExternalProps &
  IListComponentInnerProps;
