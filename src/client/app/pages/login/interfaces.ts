import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { ICommonPropFields } from '../../utils/block';

export interface ILoginPageProps extends ICommonPropFields {
    components: {
        loginInput: Input;
        passwordInput: Input;
        submitButton: Button;
    };
}
