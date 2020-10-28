import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { ICommonPropFields } from '../../utils/block';

export interface ISignUpPageProps extends ICommonPropFields {
    currentStep: SignUpPageSteps;

    components: {
        fistNameInput: Input;
        secondNameInput: Input;
        emailInput: Input;
        phoneInput: Input;
        nextButton: Button;

        loginInput: Input;
        passwordInput: Input;
        submitButton: Button;
    };
}

export enum SignUpPageSteps {
    FIRST,
    SECOND,
}
