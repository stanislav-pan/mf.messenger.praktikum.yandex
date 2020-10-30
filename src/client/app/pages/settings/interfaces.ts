import BriefInformationComponent from '../../components/brief-information/brief-information';
import FormComponent from '../../components/form/form';
import SettingsHeader from '../../components/settings-header/settings-header';
import { SETTINGS_VIEWING_TYPES } from '../../const/settings';
import { ICommonPropFields } from '../../utils/block';

export interface ISettingsPageExternalProps extends ICommonPropFields {}

export type SettingsPageProps = ISettingsPageExternalProps &
    ISettingsPageInnerProps;

export interface ISettingsPageInnerProps {
    settingsViewingTypes;
    currentBlock: SETTINGS_VIEWING_TYPES;
    previousBlock: SETTINGS_VIEWING_TYPES;

    components: {
        settingsheader: SettingsHeader;
        briefInformation: BriefInformationComponent;
        editingProfileForm: FormComponent;
        changePasswordForm: FormComponent;
    };
}
