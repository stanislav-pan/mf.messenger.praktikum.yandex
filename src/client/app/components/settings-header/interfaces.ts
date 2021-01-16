import { ICommonPropFields } from '@utils/block';

export interface ISettingsHeaderExternalProps extends ICommonPropFields {
  header: string;
  canReturnBack: boolean;

  handlers: {
    close: () => void;
    back: () => void;
  };
}

export type SettingsHeaderProps = ISettingsHeaderExternalProps;
