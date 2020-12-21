import Button from '../../components/button/button.js';
import FormComponent from '../../components/form/form.js';
import Input from '../../components/input/input.js';
import { SubmitEvent } from '../../core/interfaces.js';
import { router } from '../../init-router.js';
import { templator } from '../../services/templator.service.js';
import { userService } from '../../services/user.service.js';
import { Block } from '../../utils/block.js';
import { FormControl } from '../../utils/forms/form-control.js';
import { FormGroup } from '../../utils/forms/form-group.js';
import { RequiredValidator } from '../../utils/forms/validators/reguired.validator.js';
import { ISigninData, LoginPageProps } from './interfaces.js';

export default class LoginPage extends Block<LoginPageProps> {
    get loginFormGroup(): FormGroup {
        return this.props.components?.loginForm?.props?.formGroup;
    }

    constructor() {
        super({
            tagName: 'app-login-page',
            props: {
                components: {
                    loginForm: new FormComponent({
                        formGroup: new FormGroup(),
                        components: {
                            login: new Input({
                                label: 'Username',
                                placeholder: 'Type your username',
                                iconTemplate:
                                    'static/icons/circle-login-icon.tmpl.njk',
                                formControl: new FormControl('', [
                                    RequiredValidator,
                                ]),
                            }),
                            password: new Input({
                                type: 'password',
                                label: 'Password',
                                placeholder: 'Type your password',
                                iconTemplate:
                                    'static/icons/password-icon.tmpl.njk',
                                withPaddingTop: true,
                                formControl: new FormControl('', [
                                    RequiredValidator,
                                ]),
                            }),
                            submitButton: new Button({
                                text: 'Sign in',
                                class: 'auth-b__btn',
                            }),
                        },
                        handlers: {
                            submit: (event: SubmitEvent) => this._login(event),
                        },
                    }),
                },
                handlers: {
                    goToSignUpPage: (event: Event) => {
                        event.preventDefault();
                        
                        router.go('/sign-up')
                    }
                }
            },
        });
    }

    private _login(event: SubmitEvent) {
        event.preventDefault();

        if (this.loginFormGroup.invalid) {
            this.loginFormGroup.markAsDirtyAllControls();

            return;
        }

        const value: ISigninData = this.loginFormGroup.value;

        userService
            .auth(value)
            .then(() => router.go('/messanger'))
            .catch((xhr: XMLHttpRequest) => {
                if (xhr.status !== 401) {
                    return;
                }

                this.loginFormGroup.markAsDirtyAllControls();

                this.loginFormGroup.get('login').setErrors({
                    invalidCredentials: '',
                });

                this.loginFormGroup.get('password').setErrors({
                    invalidCredentials: 'Credentials are invalid',
                });
            });
    }

    public render() {
        return templator
            .getEnvironment()
            .render('app/pages/login/login.tmpl.njk', {
                ...this.props,
                loginFormId: this.props.components.loginForm.getId(),
            });
    }
}
