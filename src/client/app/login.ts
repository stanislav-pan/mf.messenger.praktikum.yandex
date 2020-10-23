import { Environment } from 'nunjucks';

declare var nunjucks;

(() => {
    const env: Environment = new nunjucks.Environment(
        new nunjucks.WebLoader('')
    );
    document.body.innerHTML = env.render('pages/login.tmpl.njk');

    function login() {
        debugger
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

    window['login'] = login;
})();
