import Button from '../../components/button/button.js';
import Input from '../../components/input/input.js';
import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { ComponentsRenderer } from '../../utils/components-renderer.js';
import { ILoginPageProps } from './interfaces.js';

export default class LoginPage extends Block<ILoginPageProps> {
    constructor() {
        super({
            tagName: 'app-login-page',
            props: {
                components: {
                    loginInput: new Input({
                        id: 'loginInput',
                        label: 'Username',
                        placeholder: 'Type your username',
                        iconTemplate: 'icons/circle-login-icon.tmpl.njk',
                    }),
                    passwordInput: new Input({
                        id: 'passwordInput',
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Type your password',
                        iconTemplate: 'icons/password-icon.tmpl.njk',
                        withPaddingTop: true,
                    }),
                    submitButton: new Button({
                        text: 'Sign in',
                    }),
                },
            },
        });
    }

    private login(event: Event) {
        event.preventDefault();

        const loginEl = document.getElementById(
            'loginInput'
        ) as HTMLInputElement;
        const passwordEl = document.getElementById(
            'passwordInput'
        ) as HTMLInputElement;

        const data = {
            login: loginEl.value,
            password: passwordEl.value,
        };

        window.location.href = `${window.location.origin}/static/messanger.html`;
    }

    public componentDidMount() {
        this.setProps({
            handlers: {
                login: this.login,
            },
        });
    }

    public render() {
        return templator.getEnvironment().render('pages/login.tmpl.njk', {
            ...this.props,
            ...ComponentsRenderer.render(this.props.components),
        });
    }
}
