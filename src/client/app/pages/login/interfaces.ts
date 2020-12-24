import FormComponent from '../../components/form/form';
import { ICommonPropFields } from '../../utils/block';

export interface ILoginPageExternalProps extends ICommonPropFields {}

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
