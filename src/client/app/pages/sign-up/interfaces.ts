import FormComponent from '../../components/form/form';
import { ICommonPropFields } from '../../utils/block';

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
