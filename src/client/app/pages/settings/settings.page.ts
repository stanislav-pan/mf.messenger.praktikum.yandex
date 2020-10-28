import BriefInformationComponent from '../../components/brief-information/brief-information.js';
import { Button } from '../../components/button/index.js';
import Input from '../../components/input/input.js';
import SettingsHeader from '../../components/settings-header/settings-header.js';
import { SETTINGS_VIEWING_TYPES } from '../../const/settings.js';
import { SubmitEvent } from '../../core/interfaces.js';
import FormDataPerserService from '../../services/form-data-parser.service.js';
import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { SettingsPageProps } from './interfaces.js';

export default class SettingsPage extends Block<SettingsPageProps> {
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
                        canChangeName: true,
                    }),

                    loginInput: new Input({
                        name: 'login',
                        label: 'Username',
                        placeholder: 'Type your username',
                        iconTemplate: 'icons/circle-login-icon.tmpl.njk',
                    }),
                    fistNameInput: new Input({
                        name: 'firstName',
                        label: 'First name',
                        placeholder: 'Type your first name',
                        iconTemplate: 'icons/login-icon.tmpl.njk',
                        withPaddingTop: true,
                    }),
                    secondNameInput: new Input({
                        name: 'secondName',
                        label: 'Second name',
                        placeholder: 'Type your second name',
                        iconTemplate: 'icons/login-icon.tmpl.njk',
                        withPaddingTop: true,
                    }),
                    emailInput: new Input({
                        name: 'email',
                        type: 'email',
                        label: 'Email',
                        placeholder: 'Type your email',
                        iconTemplate: 'icons/email-icon.tmpl.njk',
                        withPaddingTop: true,
                    }),
                    phoneInput: new Input({
                        name: 'phone',
                        type: 'tel',
                        label: 'Phone',
                        placeholder: 'Type your phone',
                        iconTemplate: 'icons/phone-icon.tmpl.njk',
                        withPaddingTop: true,
                    }),
                    editProfileButton: new Button({
                        text: 'Save',
                    }),

                    passwordInput: new Input({
                        name: 'password',
                        type: 'password',
                        label: 'New password',
                        placeholder: 'Type your password',
                        iconTemplate: 'icons/password-icon.tmpl.njk',
                    }),
                    confirmPasswordInput: new Input({
                        name: 'confirmPassword',
                        type: 'password',
                        label: 'Confirm password',
                        placeholder: 'Type your password again',
                        iconTemplate: 'icons/password-icon.tmpl.njk',
                        withPaddingTop: true,
                    }),
                },
                handlers: {
                    showBlock: (_, block: string) =>
                        this._showBlock(Number(block)),
                    editProfile: (event: SubmitEvent) => {
                        this._editProfile(event);
                    },
                    changePassword: (event: SubmitEvent) => {
                        this._changePassword(event);
                    },
                },
            } as SettingsPageProps,
        });
    }

    private _editProfile(event: SubmitEvent) {
        event.preventDefault();

        const editForm = event.target as HTMLFormElement;
        const formValues = FormDataPerserService.getFormValues(editForm);

        console.log(formValues);
    }

    private _changePassword(event: SubmitEvent) {
        event.preventDefault();

        const changePasswordForm = event.target as HTMLFormElement;
        const formValues = FormDataPerserService.getFormValues(
            changePasswordForm
        );

        console.log(formValues);
    }

    private _showBlock(block: SETTINGS_VIEWING_TYPES) {
        const prev = this.props.currentBlock;

        this.props.components.briefInformation.setProps({
            canChangeName:
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
    }

    public render() {
        const editProfileComponentsIds = [
            this.props.components.loginInput.getId(),
            this.props.components.fistNameInput.getId(),
            this.props.components.fistNameInput.getId(),
            this.props.components.emailInput.getId(),
            this.props.components.phoneInput.getId(),
        ];

        const changePasswordComponentsIds = [
            this.props.components.passwordInput.getId(),
            this.props.components.confirmPasswordInput.getId(),
        ];

        return templator.getEnvironment().render('pages/settings.tmpl.njk', {
            ...this.props,
            briefInformationComponentId: this.props.components.briefInformation.getId(),
            editProfileComponentsIds,
            editProfileButtonId: this.props.components.editProfileButton.getId(),
            changePasswordComponentsIds,
            settingsHeaderId: this.props.components.settingsheader.getId(),
        });
    }
}
