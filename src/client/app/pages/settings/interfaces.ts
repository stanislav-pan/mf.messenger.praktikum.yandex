import { SETTINGS_VIEWING_TYPES } from '../../const/settings';
import { ICommonPropFields } from '../../utils/block';

export interface ISettingsPageExternalProps extends ICommonPropFields {}

export type SettingsPageProps = ISettingsPageExternalProps &
    ISettingsPageInnerProps;

export interface ISettingsPageInnerProps {
    settingsViewingTypes;
    currentBlock: SETTINGS_VIEWING_TYPES;
    previousBlock: SETTINGS_VIEWING_TYPES;
}
