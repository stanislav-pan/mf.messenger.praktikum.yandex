import FormComponent from '../../components/form/form';
import { ICommonPropFields } from '../../utils/block';

export type ISignUpPageExternalProps = ICommonPropFields

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

export interface IFirstStepFormGroup {
  firstName: string;
  secondName: string;
  email: string;
  phone: string;
}

export interface ISecondStepFormGroup {
  login: string;
  password: string;
}

export interface ISignupData
  extends IFirstStepFormGroup,
    ISecondStepFormGroup {}
