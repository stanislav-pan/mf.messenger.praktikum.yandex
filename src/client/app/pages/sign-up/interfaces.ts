import { Button } from '../../components/button';
import FormComponent from '../../components/form/form';
import { Input } from '../../components/input';
import { ICommonPropFields } from '../../utils/block';
import { FormGroup } from '../../utils/forms/form-group';

export interface ISignUpPageExternalProps extends ICommonPropFields {}

export type SignUpPageProps = ISignUpPageExternalProps & ISignUpPageInnerProps;

export interface ISignUpPageInnerProps {
    currentStep: SignUpPageSteps;

    components: {
        fistStepForm: FormComponent;
        secondStepForm: FormComponent;
    };
}

export enum SignUpPageSteps {
    FIRST,
    SECOND,
}
