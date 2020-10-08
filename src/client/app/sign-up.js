import { localStorageService } from './services/localstorage.service.js';
import { SIGN_UP_STEP_ONE } from './const/localstorage.keys.js';

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
    const firstNameEl = document.getElementById('firstNameInput');
    const secondNameEl = document.getElementById('secondNameInput');
    const emailEl = document.getElementById('emailInput');
    const phoneEl = document.getElementById('phoneInput');

    localStorageService.set(SIGN_UP_STEP_ONE, {
        firstName: firstNameEl.value,
        secondName: secondNameEl.value,
        email: emailEl.value,
        phone: phoneEl.value,
    });

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

    const loginEl = document.getElementById('loginInput');
    const passwordEl = document.getElementById('passwordInput');

    console.log({
        ...dataFromFistStep,
        login: loginEl.value,
        password: passwordEl.value,
    });

    // TODO: Navigate to chats list
}

window.signUp = signUp;
