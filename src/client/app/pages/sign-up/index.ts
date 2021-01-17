import Button from '@components/button';
import FormComponent from '@components/form';
import Input from '@components/input';
import { MIN_PASSWORD_LENGTH } from '@const/common';
import { SIGN_UP_STEP_ONE } from '@const/localstorage.keys';
import { SubmitEvent } from '@core/interfaces';
import { FormControl } from '@forms/form-control';
import { FormGroup } from '@forms/form-group';
import { isNode } from '@my-lodash/is-node';
import { localStorageService } from '@services/localstorage.service';
import { templator } from '@services/templator.service';
import { userService } from '@services/user.service';
import { Block } from '@utils/block';
import { EmailValidator } from '@validators/email.validator';
import { minLengthValidator } from '@validators/min-length.validator';
import { OnlyNumberValidator } from '@validators/only-number.validator';
import { RequiredValidator } from '@validators/reguired.validator';
import { router } from '../../init-router';
import {
  SignUpPageProps,
  SignUpPageSteps,
  ISignupData,
  IFirstStepFormGroup,
  ISecondStepFormGroup,
} from './interfaces';

export default class SignUpPage extends Block<SignUpPageProps> {
  set loading(value: boolean) {
    (this.props.components.secondStepForm.props.components
      .submitButton as Button).setProps({
      loading: value,
    });
  }

  get firstStepFormGroup(): FormGroup {
    return this.props.components?.fistStepForm?.props?.formGroup;
  }

  get secondStepFormGroup(): FormGroup {
    return this.props.components?.secondStepForm?.props?.formGroup;
  }

  constructor() {
    super({
      tagName: 'app-sign-up-page',
      props: {
        currentStep: SignUpPageSteps.FIRST,
        components: {
          fistStepForm: new FormComponent({
            formGroup: new FormGroup(),
            components: {
              firstName: new Input({
                label: 'First name',
                placeholder: 'Type your first name',
                iconTemplate: 'static/icons/login-icon.tmpl.njk',
                formControl: new FormControl('', [RequiredValidator]),
              }),
              secondName: new Input({
                label: 'Second name',
                placeholder: 'Type your second name',
                iconTemplate: 'static/icons/login-icon.tmpl.njk',
                withPaddingTop: true,
                formControl: new FormControl('', [RequiredValidator]),
              }),
              email: new Input({
                type: 'email',
                label: 'Email',
                placeholder: 'Type your email',
                iconTemplate: 'static/icons/email-icon.tmpl.njk',
                withPaddingTop: true,
                formControl: new FormControl('', [
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
                formControl: new FormControl('', [
                  RequiredValidator,
                  OnlyNumberValidator,
                ]),
              }),
              nextButton: new Button({
                text: 'Next step',
                class: 'auth-b__btn auth-b__btn_mt_42',
              }),
            },
            handlers: {
              submit: (event: SubmitEvent) => this._signUp(event),
            },
          }),

          secondStepForm: new FormComponent({
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
                formControl: new FormControl('', [
                  RequiredValidator,
                  minLengthValidator(MIN_PASSWORD_LENGTH),
                ]),
              }),
              submitButton: new Button({
                text: 'Sign up',
                class: 'auth-b__btn auth-b__btn_mt_42',
              }),
            },
            handlers: {
              submit: (event: SubmitEvent) => this._signUp(event),
            },
          }),
        },
        handlers: {
          goToLoginPage: (event: Event) => {
            event.preventDefault();

            router.go('/login');
          },
        },
      },
    });
  }

  private _signUp(event: Event) {
    event.preventDefault();

    if (this.props.currentStep === SignUpPageSteps.FIRST) {
      this._signUpFirstStep();

      return;
    }

    this._signUpSecondStep();
  }

  private _setCurrentStep(step: SignUpPageSteps) {
    this.setProps({
      currentStep: step,
    });
  }

  private _signUpFirstStep() {
    const formGroup = this.firstStepFormGroup;

    if (!formGroup.valid) {
      formGroup.markAsDirtyAllControls();

      return;
    }

    localStorageService.set(SIGN_UP_STEP_ONE, formGroup.value);

    this._setCurrentStep(SignUpPageSteps.SECOND);
  }

  private _signUpSecondStep() {
    const dataFromFistStep = localStorageService.get(SIGN_UP_STEP_ONE);

    // TODO: Добавить проверку на время создания информации с первого шага
    // Через 15 минут чистить localStorage
    if (!dataFromFistStep) {
      router.go('/sign-up');

      return;
    }

    const firstStepFormGroup = this.firstStepFormGroup;
    const secondStepFormGroup = this.secondStepFormGroup;

    if (!secondStepFormGroup.valid) {
      secondStepFormGroup.markAsDirtyAllControls();

      return;
    }

    const data: ISignupData = {
      ...(firstStepFormGroup.value as IFirstStepFormGroup),
      ...(secondStepFormGroup.value as ISecondStepFormGroup),
    };

    localStorageService.removeItem(SIGN_UP_STEP_ONE);

    this._signUpReq(data);
  }

  private _signUpReq(data: ISignupData) {
    this.loading = true;

    userService
      .signUp(data)
      .then(() => {
        router.go('/messenger');
      })
      .finally(() => (this.loading = false));
  }

  componentDidMount(): void {
    if (localStorageService.get(SIGN_UP_STEP_ONE)) {
      this.setProps({
        currentStep: SignUpPageSteps.SECOND,
      });
    }
  }

  public render(): string {
    if (this.props.currentStep === SignUpPageSteps.FIRST) {
      return this._renderFirstStep();
    }

    return this._renderSecondStep();
  }

  private _renderFirstStep() {
    const { fistStepForm } = this.props.components;

    return templator
      .getTemplate('sign-up-step-one.tmpl.njk', isNode() && __dirname)
      .render({
        ...this.props,
        fistStepFormId: fistStepForm.getId(),
      });
  }

  private _renderSecondStep() {
    const { secondStepForm } = this.props.components;

    return templator
      .getTemplate('sign-up-step-two.tmpl.njk', isNode() && __dirname)
      .render({
        ...this.props,
        secondStepFormId: secondStepForm.getId(),
      });
  }
}
