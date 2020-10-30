import BriefInformationComponent from '../../components/brief-information/brief-information.js';
import Button from '../../components/button/button.js';
import FormComponent from '../../components/form/form.js';
import Input from '../../components/input/input.js';
import SettingsHeader from '../../components/settings-header/settings-header.js';
import { MIN_PASSWORD_LENGTH } from '../../const/common.js';
import { SETTINGS_VIEWING_TYPES } from '../../const/settings.js';
import { SubmitEvent } from '../../core/interfaces.js';
import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { FormControl } from '../../utils/forms/form-control.js';
import { FormGroup } from '../../utils/forms/form-group.js';
import { EmailValidator } from '../../utils/forms/validators/email.validator.js';
import { minLengthValidator } from '../../utils/forms/validators/min-length.validator.js';
import { RequiredValidator } from '../../utils/forms/validators/reguired.validator.js';
import { validatePasswordConfirm } from '../../utils/forms/validators/valid-password.validator.js';
import { SettingsPageProps } from './interfaces.js';

export default class SettingsPage extends Block<SettingsPageProps> {
    get editingProfileFormGroup(): FormGroup {
        return this.props.components?.editingProfileForm?.props?.formGroup;
    }

    get changePasswordFormGroup(): FormGroup {
        return this.props.components?.changePasswordForm?.props?.formGroup;
    }

    constructor() {
        super({
            tagName: 'app-login-page',
            props: {
                settingsViewingTypes: SETTINGS_VIEWING_TYPES,
                currentBlock: SETTINGS_VIEWING_TYPES.SETTINGS_LIST,
                previousBlock: SETTINGS_VIEWING_TYPES.SETTINGS_LIST,

                renderingSettingsList: [
                    {
                        title: 'Edit profile',
                        iconTemplate: 'icons/settings-edit-profile.tmpl.njk',
                        onClick:
                            'SETTINGS.settingsAdapter.showEditInformationBlock()',
                        value: SETTINGS_VIEWING_TYPES.EDIT_INFORMATION_BLOCK,
                    },
                    {
                        title: 'Change password',
                        iconTemplate: 'icons/settings-change-password.tmpl.njk',
                        onClick:
                            'SETTINGS.settingsAdapter.showChangePasswordBlock()',
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
                        name: 'Stanislav',
                        lastVisit: 'was last seen today at 21:37',

                        avatarSrc: '/assets/images/my-avatar.png',
                        canChangeName: false,
                        canChangeAvatar: false,
                    }),

                    editingProfileForm: new FormComponent({
                        formGroup: new FormGroup(),
                        components: {
                            loginInput: new Input({
                                name: 'login',
                                label: 'Username',
                                placeholder: 'Type your username',
                                iconTemplate:
                                    'icons/circle-login-icon.tmpl.njk',
                                formControl: new FormControl('', [
                                    RequiredValidator,
                                ]),
                            }),
                            fistNameInput: new Input({
                                name: 'firstName',
                                label: 'First name',
                                placeholder: 'Type your first name',
                                iconTemplate: 'icons/login-icon.tmpl.njk',
                                withPaddingTop: true,
                                formControl: new FormControl('', [
                                    RequiredValidator,
                                ]),
                            }),
                            secondNameInput: new Input({
                                name: 'secondName',
                                label: 'Second name',
                                placeholder: 'Type your second name',
                                iconTemplate: 'icons/login-icon.tmpl.njk',
                                withPaddingTop: true,
                                formControl: new FormControl('', [
                                    RequiredValidator,
                                ]),
                            }),
                            emailInput: new Input({
                                name: 'email',
                                type: 'email',
                                label: 'Email',
                                placeholder: 'Type your email',
                                iconTemplate: 'icons/email-icon.tmpl.njk',
                                withPaddingTop: true,
                                formControl: new FormControl('', [
                                    RequiredValidator,
                                    EmailValidator,
                                ]),
                            }),
                            phoneInput: new Input({
                                name: 'phone',
                                type: 'tel',
                                label: 'Phone',
                                placeholder: 'Type your phone',
                                iconTemplate: 'icons/phone-icon.tmpl.njk',
                                withPaddingTop: true,
                                formControl: new FormControl('', [
                                    RequiredValidator,
                                ]),
                            }),

                            editProfileButton: new Button({
                                text: 'Save',
                                class: 'settings__form-btn-wrapper',
                            }),
                        },
                        handlers: {
                            submit: (event: SubmitEvent) =>
                                this._editProfile(event),
                        },
                    }),

                    changePasswordForm: new FormComponent({
                        formGroup: new FormGroup({}, [validatePasswordConfirm]),
                        components: {
                            passwordInput: new Input({
                                name: 'password',
                                type: 'password',
                                label: 'New password',
                                placeholder: 'Type your password',
                                iconTemplate: 'icons/password-icon.tmpl.njk',
                                formControl: new FormControl('', [
                                    RequiredValidator,
                                    minLengthValidator(MIN_PASSWORD_LENGTH),
                                ]),
                            }),
                            confirmPasswordInput: new Input({
                                name: 'confirmPassword',
                                type: 'password',
                                label: 'Confirm password',
                                placeholder: 'Type your password again',
                                iconTemplate: 'icons/password-icon.tmpl.njk',
                                withPaddingTop: true,
                                formControl: new FormControl('', [
                                    RequiredValidator,
                                    minLengthValidator(MIN_PASSWORD_LENGTH),
                                ]),
                            }),

                            editProfileButton: new Button({
                                text: 'Save',
                                class: 'settings__form-btn-wrapper',
                            }),
                        },
                        handlers: {
                            submit: (event: SubmitEvent) =>
                                this._changePassword(event),
                        },
                    }),
                },
                handlers: {
                    showBlock: (_, block: string) =>
                        this._showBlock(Number(block)),
                },
            } as SettingsPageProps,
        });
    }

    private _editProfile(event: SubmitEvent) {
        event.preventDefault();

        const formGroup = this.editingProfileFormGroup;

        if (formGroup.invalid) {
            formGroup.markAsDirtyAllControls();

            return;
        }

        console.log(formGroup.value);
    }

    private _changePassword(event: SubmitEvent) {
        event.preventDefault();

        const formGroup = this.changePasswordFormGroup;

        if (formGroup.invalid) {
            formGroup.markAsDirtyAllControls();

            return;
        }
    }

    private _showBlock(block: SETTINGS_VIEWING_TYPES) {
        const prev = this.props.currentBlock;

        this.props.components.briefInformation.setProps({
            canChangeName:
                block === SETTINGS_VIEWING_TYPES.EDIT_INFORMATION_BLOCK,
            canChangeAvatar:
                block === SETTINGS_VIEWING_TYPES.EDIT_INFORMATION_BLOCK,
        });

        let headerText = 'Settings';

        if (block === SETTINGS_VIEWING_TYPES.EDIT_INFORMATION_BLOCK) {
            headerText = 'Edit Information';
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

    private _back() {
        this._showBlock(SETTINGS_VIEWING_TYPES.SETTINGS_LIST);
    }

    private _close() {
        window.location.href = `${window.location.origin}/static/messanger.html`;
    }

    public render() {
        const {
            briefInformation,
            settingsheader,

            editingProfileForm,
            changePasswordForm,
        } = this.props.components;

        return templator.getEnvironment().render('pages/settings.tmpl.njk', {
            ...this.props,
            briefInformationComponentId: briefInformation.getId(),
            settingsHeaderId: settingsheader.getId(),
            editingProfileFormId: editingProfileForm.getId(),
            changePasswordFormId: changePasswordForm.getId(),
        });
    }
}
