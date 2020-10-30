import Button from '../../components/button/button.js';
import FormComponent from '../../components/form/form.js';
import Input from '../../components/input/input.js';
import { MIN_PASSWORD_LENGTH } from '../../const/common.js';
import { SIGN_UP_STEP_ONE } from '../../const/localstorage.keys.js';
import { SubmitEvent } from '../../core/interfaces.js';
import { localStorageService } from '../../services/localstorage.service.js';
import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { FormControl } from '../../utils/forms/form-control.js';
import { FormGroup } from '../../utils/forms/form-group.js';
import { EmailValidator } from '../../utils/forms/validators/email.validator.js';
import { minLengthValidator } from '../../utils/forms/validators/min-length.validator.js';
import { RequiredValidator } from '../../utils/forms/validators/reguired.validator.js';
import { SignUpPageProps, SignUpPageSteps } from './interfaces.js';

export default class SignUpPage extends Block<SignUpPageProps> {
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
                            fistNameInput: new Input({
                                name: 'firstName',
                                label: 'First name',
                                placeholder: 'Type your first name',
                                iconTemplate: 'icons/login-icon.tmpl.njk',
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
                            passwordInput: new Input({
                                name: 'password',
                                type: 'password',
                                label: 'Password',
                                placeholder: 'Type your password',
                                iconTemplate: 'icons/password-icon.tmpl.njk',
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

        if (formGroup.invalid) {
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
            window.location.href = `${window.location.origin}/static/sign-up.html`;

            return;
        }

        const firstStepFormGroup = this.firstStepFormGroup;
        const secondStepFormGroup = this.secondStepFormGroup;

        if (secondStepFormGroup.invalid) {
            secondStepFormGroup.markAsDirtyAllControls();

            return;
        }

        console.log({
            ...firstStepFormGroup.value,
            ...secondStepFormGroup.value,
        });

        localStorageService.removeItem(SIGN_UP_STEP_ONE);

        window.location.href = `${window.location.origin}/static/messanger.html`;
    }

    public render() {
        if (this.props.currentStep === SignUpPageSteps.FIRST) {
            return this._renderFirstStep();
        }

        return this._renderSecondStep();
    }

    private _renderFirstStep() {
        const { fistStepForm } = this.props.components;

        return templator
            .getEnvironment()
            .render('pages/sign-up-step-one.tmpl.njk', {
                ...this.props,
                fistStepFormId: fistStepForm.getId(),
            });
    }

    private _renderSecondStep() {
        const { secondStepForm } = this.props.components;

        return templator
            .getEnvironment()
            .render('pages/sign-up-step-two.tmpl.njk', {
                ...this.props,
                secondStepFormId: secondStepForm.getId(),
            });
    }
}
