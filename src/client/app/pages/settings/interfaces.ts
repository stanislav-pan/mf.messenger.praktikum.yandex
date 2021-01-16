import BriefInformationComponent from '@components/brief-information';
import FormComponent from '@components/form';
import SettingsHeader from '@components/settings-header';
import { ICommonPropFields } from '@utils/block';
import { SETTINGS_VIEWING_TYPES } from './enums';

export type ISettingsPageExternalProps = ICommonPropFields;

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

export interface IEditProfileData {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  phone: string;
}

export interface IChangePasswordData {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}
