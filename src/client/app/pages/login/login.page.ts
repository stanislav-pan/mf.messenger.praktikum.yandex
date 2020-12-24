import Button from '../../components/button/button';
import FormComponent from '../../components/form/form';
import Input from '../../components/input/input';
import { SubmitEvent } from '../../core/interfaces';
import { router } from '../../init-router';
import { templator } from '../../services/templator.service';
import { userService } from '../../services/user.service';
import { Block } from '../../utils/block';
import { FormControl } from '../../utils/forms/form-control';
import { FormGroup } from '../../utils/forms/form-group';
import { RequiredValidator } from '../../utils/forms/validators/reguired.validator';
import { ISigninData, LoginPageProps } from './interfaces';

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
    return templator.getEnvironment().render('app/pages/login/login.tmpl.njk', {
      ...this.props,
      loginFormId: this.props.components.loginForm.getId(),
    });
  }
}
