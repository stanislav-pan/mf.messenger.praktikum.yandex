import Button from '../../components/button/button.js';
import Input from '../../components/input/input.js';
import { SIGN_UP_STEP_ONE } from '../../const/localstorage.keys.js';
import FormDataPerserService from '../../services/form-data-parser.service.js';
import { localStorageService } from '../../services/localstorage.service.js';
import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { ComponentsRenderer } from '../../utils/components-renderer.js';
import { ISignUpPageProps, SignUpPageSteps } from './interfaces.js';

export default class SignUpPage extends Block<ISignUpPageProps> {
    constructor() {
        super({
            tagName: 'app-sign-up-page',
            props: {
                currentStep: SignUpPageSteps.FIRST,
                components: {
                    fistNameInput: new Input({
                        name: 'firstName',
                        label: 'First name',
                        placeholder: 'Type your first name',
                        iconTemplate: 'icons/login-icon.tmpl.njk',
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
                    nextButton: new Button({
                        text: 'Next step',
                    }),
                    loginInput: new Input({
                        name: 'login',
                        label: 'Username',
                        placeholder: 'Type your username',
                        iconTemplate: 'icons/circle-login-icon.tmpl.njk',
                    }),
                    passwordInput: new Input({
                        name: 'password',
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Type your password',
                        iconTemplate: 'icons/password-icon.tmpl.njk',
                        withPaddingTop: true,
                    }),
                    submitButton: new Button({
                        text: 'Sign up',
                    }),
                },
            },
        });
    }

    public signUp(event: Event) {
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
        const signUpStepOneForm = document.getElementById(
            'signUpStepOneForm'
        ) as HTMLFormElement;

        const formValues = FormDataPerserService.getFormValues(
            signUpStepOneForm
        );

        localStorageService.set(SIGN_UP_STEP_ONE, formValues);

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

        const signUpStepTwoForm = document.getElementById(
            'signUpStepTwoForm'
        ) as HTMLFormElement;
        const formValues = FormDataPerserService.getFormValues(
            signUpStepTwoForm
        );

        console.log({
            ...dataFromFistStep,
            ...formValues,
        });

        localStorageService.removeItem(SIGN_UP_STEP_ONE);

        window.location.href = `${window.location.origin}/static/messanger.html`;
    }

    public componentDidMount() {
        this.setProps({
            handlers: {
                signUp: this.signUp.bind(this),
            },
        });
    }

    public render() {
        if (this.props.currentStep === SignUpPageSteps.FIRST) {
            return this._renderFirstStep();
        }

        return this._renderSecondStep();
    }

    private _renderFirstStep() {
        const {
            fistNameInput,
            secondNameInput,
            emailInput,
            phoneInput,
            nextButton,
        } = this.props.components;

        return templator
            .getEnvironment()
            .render('pages/sign-up-step-one.tmpl.njk', {
                ...this.props,
                ...ComponentsRenderer.render({
                    fistNameInput,
                    secondNameInput,
                    emailInput,
                    phoneInput,
                    nextButton,
                }),
            });
    }

    private _renderSecondStep() {
        const {
            loginInput,
            passwordInput,
            submitButton,
        } = this.props.components;

        return templator
            .getEnvironment()
            .render('pages/sign-up-step-two.tmpl.njk', {
                ...this.props,
                ...ComponentsRenderer.render({
                    loginInput,
                    passwordInput,
                    submitButton,
                }),
            });
    }
}
