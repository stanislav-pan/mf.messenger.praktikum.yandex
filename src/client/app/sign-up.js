import { localStorageService } from './services/localstorage.service.js';
import { SIGN_UP_STEP_ONE } from './const/localstorage.keys.js';
import FormDataPerserService from './services/form-data-parser.service.js';

if (location.pathname.includes('sign-up-step-one')) {
    const data = nunjucks.render('pages/sign-up-step-one.tmpl.njk');

    document.body.innerHTML = data;
}

if (location.pathname.includes('sign-up-step-two')) {
    const data = nunjucks.render('pages/sign-up-step-two.tmpl.njk');

    document.body.innerHTML = data;
}

/**
 * @param step Шаг регистрации: `1` или `2`
 */
function signUp(step) {
    event.preventDefault();

    if (step === 1) {
        signUpFirstStep();

        return;
    }

    signUpSecondStep();
}

function signUpFirstStep() {
    const signUpStepOneForm = document.getElementById('signUpStepOneForm');
    const formValues = FormDataPerserService.getFormValues(signUpStepOneForm);

    localStorageService.set(SIGN_UP_STEP_ONE, formValues);

    window.location.href = `${window.location.origin}/static/sign-up-step-two.html`;
}

function signUpSecondStep() {
    const dataFromFistStep = localStorageService.get(SIGN_UP_STEP_ONE);

    // TODO: Добавить проверку на время создания информации с первого шага
    // Через 15 минут чистить localStorage
    if (!dataFromFistStep) {
        window.location.href = `${window.location.origin}/static/sign-up-step-one.html`;

        return;
    }

    const signUpStepTwoForm = document.getElementById('signUpStepTwoForm');
    const formValues = FormDataPerserService.getFormValues(signUpStepTwoForm);

    console.log({
        ...dataFromFistStep,
        ...formValues,
    });

    // TODO: Navigate to chats list
}

window.signUp = signUp;
