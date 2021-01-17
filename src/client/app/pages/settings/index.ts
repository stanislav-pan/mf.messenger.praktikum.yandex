import BriefInformationComponent from '@components/brief-information';
import Button from '@components/button';
import FormComponent from '@components/form';
import Input from '@components/input';
import SettingsHeader from '@components/settings-header';
import { isNode } from '@my-lodash/is-node';
import { Block } from '@utils/block';
import { FormControl } from '@forms/form-control';
import { FormGroup } from '@forms/form-group';
import { EmailValidator } from '@validators/email.validator';
import { minLengthValidator } from '@validators/min-length.validator';
import { OnlyNumberValidator } from '@validators/only-number.validator';
import { RequiredValidator } from '@validators/reguired.validator';
import { validatePasswordConfirm } from '@validators/valid-password.validator';

import { router } from '../../init-router';

import {
  SettingsPageProps,
  IEditProfileData,
  IChangePasswordData,
} from './interfaces';
import { apiService } from '@services/chats-api/api.service';
import { templator } from '@services/templator.service';
import { userService } from '@services/user.service';
import { MIN_PASSWORD_LENGTH } from '@const/common';
import { SETTINGS_VIEWING_TYPES } from './enums';
import { SubmitEvent } from '@core/interfaces';

import './settings.scss';

export default class SettingsPage extends Block<SettingsPageProps> {
  set changePasswordProcessing(value: boolean) {
    (this.props.components.changePasswordForm.props.components
      .submitButton as Button).setProps({
      loading: value,
    });
  }

  set editProfileProcessing(value: boolean) {
    (this.props.components.editingProfileForm.props.components
      .submitButton as Button).setProps({
      loading: value,
    });
  }

  get editingProfileFormGroup(): FormGroup {
    return this.props.components?.editingProfileForm?.props?.formGroup;
  }

  get changePasswordFormGroup(): FormGroup {
    return this.props.components?.changePasswordForm?.props?.formGroup;
  }

  constructor() {
    const {
      login,
      firstName,
      secondName,
      email,
      phone,
      avatar,
    } = userService.getUser();

    super({
      tagName: 'app-login-page',
      props: {
        settingsViewingTypes: SETTINGS_VIEWING_TYPES,
        currentBlock: SETTINGS_VIEWING_TYPES.SETTINGS_LIST,
        previousBlock: SETTINGS_VIEWING_TYPES.SETTINGS_LIST,

        renderingSettingsList: [
          {
            title: 'Edit profile',
            iconTemplate: 'static/icons/settings-edit-profile.tmpl.njk',
            onClick: 'SETTINGS.settingsAdapter.showEditInformationBlock()',
            value: SETTINGS_VIEWING_TYPES.EDIT_INFORMATION_BLOCK,
          },
          {
            title: 'Change password',
            iconTemplate: 'static/icons/settings-change-password.tmpl.njk',
            onClick: 'SETTINGS.settingsAdapter.showChangePasswordBlock()',
            value: SETTINGS_VIEWING_TYPES.CHANGE_PASSWORD_BLOCK,
          },
        ],
        components: {
          settingsheader: new SettingsHeader({
            header: 'Settings',
            canReturnBack: false,
            handlers: {
              back: () => {
                this._back();
              },
              close: () => {
                this._close();
              },
            },
          }),
          briefInformation: new BriefInformationComponent({
            name: userService.getUser().getDisplayName(),
            lastVisit: userService.getUser().getLastVisit(),

            avatarSrc: avatar,
            canChangeName: false,
            canChangeAvatar: false,
          }),

          editingProfileForm: new FormComponent({
            formGroup: new FormGroup(),
            components: {
              login: new Input({
                label: 'Username',
                placeholder: 'Type your username',
                iconTemplate: 'static/icons/circle-login-icon.tmpl.njk',
                formControl: new FormControl(login, [RequiredValidator]),
              }),
              firstName: new Input({
                label: 'First name',
                placeholder: 'Type your first name',
                iconTemplate: 'static/icons/login-icon.tmpl.njk',
                withPaddingTop: true,
                formControl: new FormControl(firstName, [RequiredValidator]),
              }),
              secondName: new Input({
                label: 'Second name',
                placeholder: 'Type your second name',
                iconTemplate: 'static/icons/login-icon.tmpl.njk',
                withPaddingTop: true,
                formControl: new FormControl(secondName, [RequiredValidator]),
              }),
              email: new Input({
                type: 'email',
                label: 'Email',
                placeholder: 'Type your email',
                iconTemplate: 'static/icons/email-icon.tmpl.njk',
                withPaddingTop: true,
                formControl: new FormControl(email, [
                  RequiredValidator,
                  EmailValidator,
                ]),
              }),
              phone: new Input({
                type: 'tel',
                label: 'Phone',
                placeholder: 'Type your phone',
                iconTemplate: 'static/icons/phone-icon.tmpl.njk',
                withPaddingTop: true,
                formControl: new FormControl(phone, [
                  RequiredValidator,
                  OnlyNumberValidator,
                ]),
              }),

              submitButton: new Button({
                text: 'Save',
                class: 'settings__form-btn-wrapper',
              }),
            },
            handlers: {
              submit: (event: SubmitEvent) => this._editProfile(event),
            },
          }),

          changePasswordForm: new FormComponent({
            formGroup: new FormGroup({}, [validatePasswordConfirm]),
            components: {
              oldPassword: new Input({
                type: 'password',
                label: 'Old password',
                placeholder: 'Type your old password',
                iconTemplate: 'static/icons/password-icon.tmpl.njk',
                formControl: new FormControl('', [
                  RequiredValidator,
                  minLengthValidator(MIN_PASSWORD_LENGTH),
                ]),
              }),
              newPassword: new Input({
                type: 'password',
                label: 'New password',
                placeholder: 'Type your new password',
                iconTemplate: 'static/icons/password-icon.tmpl.njk',
                withPaddingTop: true,
                formControl: new FormControl('', [
                  RequiredValidator,
                  minLengthValidator(MIN_PASSWORD_LENGTH),
                ]),
              }),
              newPasswordConfirm: new Input({
                type: 'password',
                label: 'Confirm your new password',
                placeholder: 'Type your new password again',
                iconTemplate: 'static/icons/password-icon.tmpl.njk',
                withPaddingTop: true,
                formControl: new FormControl('', [
                  RequiredValidator,
                  minLengthValidator(MIN_PASSWORD_LENGTH),
                ]),
              }),

              submitButton: new Button({
                text: 'Save',
                class: 'settings__form-btn-wrapper',
              }),
            },
            handlers: {
              submit: (event: SubmitEvent) => this._changePassword(event),
            },
          }),
        },
        handlers: {
          showBlock: (_, block: string) => this._showBlock(Number(block)),

          logout: () => {
            this._logout();
          },
        },
      } as SettingsPageProps,
    });
  }

  componentDidMount(): void {
    userService.subscribe((user) => {
      this.props.components.briefInformation.setProps({
        avatarSrc: user.avatar,
      });

      this.editingProfileFormGroup.patchValue({
        ...user,
      });
    });
  }

  private _editProfile(event: SubmitEvent) {
    event.preventDefault();

    const formGroup = this.editingProfileFormGroup;

    if (!formGroup.valid) {
      formGroup.markAsDirtyAllControls();

      return;
    }

    this.editProfileProcessing = true;

    userService
      .changeProfile({
        ...userService.getUser(),
        ...(this.editingProfileFormGroup.value as IEditProfileData),
      })
      .then(() => {
        this.editingProfileFormGroup.markAsPristineAllControls();
      })
      .finally(() => (this.editProfileProcessing = false));
  }

  private _changePassword(event: SubmitEvent) {
    event.preventDefault();

    const formGroup = this.changePasswordFormGroup;

    if (!formGroup.valid) {
      formGroup.markAsDirtyAllControls();

      return;
    }

    this.changePasswordProcessing = true;

    const { newPassword, oldPassword } = formGroup.value as IChangePasswordData;

    apiService.users
      .changePassword({ newPassword, oldPassword })
      .then(() => {
        this._back();
      })
      .finally(() => (this.changePasswordProcessing = false));
  }

  private _showBlock(block: SETTINGS_VIEWING_TYPES) {
    const prev = this.props.currentBlock;

    this.props.components.briefInformation.setProps({
      canChangeName: block === SETTINGS_VIEWING_TYPES.EDIT_INFORMATION_BLOCK,
      canChangeAvatar: block === SETTINGS_VIEWING_TYPES.EDIT_INFORMATION_BLOCK,
    });

    let headerText = 'Settings';

    if (block === SETTINGS_VIEWING_TYPES.EDIT_INFORMATION_BLOCK) {
      headerText = 'Edit Information';

      this.editingProfileFormGroup.patchValue({
        ...userService.getUser(),
      });
    } else if (block === SETTINGS_VIEWING_TYPES.CHANGE_PASSWORD_BLOCK) {
      headerText = 'Change password';
    }

    this.props.components.settingsheader.setProps({
      header: headerText,
      canReturnBack: block !== SETTINGS_VIEWING_TYPES.SETTINGS_LIST,
    });

    this.setProps({
      previousBlock: prev,
      currentBlock: block,
    });
  }

  private _logout() {
    userService.logout().then(() => {
      router.go('/login');
    });
  }

  private _back() {
    this.changePasswordFormGroup.reset();
    this.editingProfileFormGroup.reset();

    this._showBlock(SETTINGS_VIEWING_TYPES.SETTINGS_LIST);
  }

  private _close() {
    router.go('/messenger');
  }

  public render(): string {
    const {
      briefInformation,
      settingsheader,

      editingProfileForm,
      changePasswordForm,
    } = this.props.components;

    return templator
      .getTemplate('settings.tmpl.njk', isNode() && __dirname)
      .render({
        ...this.props,
        briefInformationComponentId: briefInformation.getId(),
        settingsHeaderId: settingsheader.getId(),
        editingProfileFormId: editingProfileForm.getId(),
        changePasswordFormId: changePasswordForm.getId(),
      });
  }
}
