import Button from '../../components/button/button.js';
import FormComponent from '../../components/form/form.js';
import Input from '../../components/input/input.js';
import { MIN_PASSWORD_LENGTH } from '../../const/common.js';
import { SIGN_UP_STEP_ONE } from '../../const/localstorage.keys.js';
import { SubmitEvent } from '../../core/interfaces.js';
import { router } from '../../init-router.js';
import { apiService } from '../../services/chats-api/api.service.js';
import { localStorageService } from '../../services/localstorage.service.js';
import { templator } from '../../services/templator.service.js';
import { userService } from '../../services/user.service.js';
import { Block } from '../../utils/block.js';
import { FormControl } from '../../utils/forms/form-control.js';
import { FormGroup } from '../../utils/forms/form-group.js';
import { EmailValidator } from '../../utils/forms/validators/email.validator.js';
import { minLengthValidator } from '../../utils/forms/validators/min-length.validator.js';
import { OnlyNumberValidator } from '../../utils/forms/validators/only-number.validator.js';
import { RequiredValidator } from '../../utils/forms/validators/reguired.validator.js';
import { objToSnakeCase } from '../../utils/to-snake-case.js';
import { ISignupData, SignUpPageProps, SignUpPageSteps } from './interfaces.js';

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
                            firstName: new Input({
                                label: 'First name',
                                placeholder: 'Type your first name',
                                iconTemplate:
                                    'static/icons/login-icon.tmpl.njk',
                                formControl: new FormControl('', [
                                    RequiredValidator,
                                ]),
                            }),
                            secondName: new Input({
                                label: 'Second name',
                                placeholder: 'Type your second name',
                                iconTemplate:
                                    'static/icons/login-icon.tmpl.njk',
                                withPaddingTop: true,
                                formControl: new FormControl('', [
                                    RequiredValidator,
                                ]),
                            }),
                            email: new Input({
                                type: 'email',
                                label: 'Email',
                                placeholder: 'Type your email',
                                iconTemplate:
                                    'static/icons/email-icon.tmpl.njk',
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
                                iconTemplate:
                                    'static/icons/phone-icon.tmpl.njk',
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
            router.go('/sign-up');

            return;
        }

        const firstStepFormGroup = this.firstStepFormGroup;
        const secondStepFormGroup = this.secondStepFormGroup;

        if (secondStepFormGroup.invalid) {
            secondStepFormGroup.markAsDirtyAllControls();

            return;
        }

        const data: ISignupData = {
            ...firstStepFormGroup.value,
            ...secondStepFormGroup.value,
        };

        localStorageService.removeItem(SIGN_UP_STEP_ONE);

        this._signUpReq(data);
    }

    private _signUpReq(data: ISignupData) {
        apiService.auth.signup(objToSnakeCase(data)).then(() => {
            userService.initUser();

            router.go('/messanger');
        });
    }

    componentDidMount() {
        if (localStorageService.get(SIGN_UP_STEP_ONE)) {
            this.setProps({
                currentStep: SignUpPageSteps.SECOND,
            });
        }
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
            .getTemplate('app/pages/sign-up/sign-up-step-one.tmpl.njk')
            .render({
                ...this.props,
                fistStepFormId: fistStepForm.getId(),
            });
    }

    private _renderSecondStep() {
        const { secondStepForm } = this.props.components;

        return templator
            .getTemplate('app/pages/sign-up/sign-up-step-two.tmpl.njk')
            .render({
                ...this.props,
                secondStepFormId: secondStepForm.getId(),
            });
    }
}
