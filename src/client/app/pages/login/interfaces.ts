import FormComponent from '../../components/form/form';
import { ICommonPropFields } from '../../utils/block';

export type ILoginPageExternalProps = ICommonPropFields

export type LoginPageProps = ILoginPageExternalProps & ILoginPageInnerProps;

export interface ILoginPageInnerProps {
  components: {
    loginForm: FormComponent;
  };
}

export interface ISigninData {
  login: string;
  password: string;
}
