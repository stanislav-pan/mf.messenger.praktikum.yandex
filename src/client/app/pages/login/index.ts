import Button from '@components/button';
import FormComponent from '@components/form';
import Input from '@components/input';
import { SubmitEvent } from '@core/interfaces';
import { FormControl } from '@forms/form-control';
import { FormGroup } from '@forms/form-group';
import { userService } from '@services/user.service';
import { Block } from '@utils/block';
import { RequiredValidator } from '@validators/reguired.validator';
import { router } from '../../init-router';
import { LoginPageProps, ISigninData } from './interfaces';
import template from './login.tmpl.njk';

export default class LoginPage extends Block<LoginPageProps> {
  set loading(value: boolean) {
    (this.props.components.loginForm.props.components
      .submitButton as Button).setProps({
      loading: value,
    });
  }

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
                iconTemplate: 'static/icons/circle-login-icon.tmpl.njk',
                formControl: new FormControl('', [RequiredValidator]),
              }),
              password: new Input({
                type: 'password',
                label: 'Password',
                placeholder: 'Type your password',
                iconTemplate: 'static/icons/password-icon.tmpl.njk',
                withPaddingTop: true,
                formControl: new FormControl('', [RequiredValidator]),
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

            router.go('/sign-up');
          },
        },
      },
    });
  }

  private _login(event: SubmitEvent) {
    event.preventDefault();

    if (!this.loginFormGroup.valid) {
      this.loginFormGroup.markAsDirtyAllControls();

      return;
    }

    const value = this.loginFormGroup.value as ISigninData;

    this.loading = true;

    userService
      .auth(value)
      .then(() => router.go('/messenger'))
      .catch((xhr: XMLHttpRequest) => {
        if (xhr.status !== 401) {
          return;
        }

        this.loginFormGroup.markAsDirtyAllControls();

        this.loginFormGroup.get('password').setErrors({
          invalidCredentials: 'Credentials are invalid',
        });
      })
      .finally(() => (this.loading = false));
  }

  public render(): string {
    return template({
      ...this.props,
      loginFormId: this.props.components.loginForm.getId(),
    });
  }
}
