import { ICommonPropFields } from '../../utils/block';

export interface ISettingsHeaderExternalProps extends ICommonPropFields {
  header: string;
  canReturnBack: boolean;

  handlers: {
    close: () => void;
    back: () => void;
  };
}

export interface ISettingsHeaderInnerProps {}

export type SettingsHeaderProps = ISettingsHeaderExternalProps &
  ISettingsHeaderInnerProps;
