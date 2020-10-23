const data = nunjucks.render('pages/login.tmpl.njk');

document.body.innerHTML = data;

function login() {
    event.preventDefault();

    const loginEl = document.getElementById('loginInput');
    const passwordEl = document.getElementById('passwordInput');

    const data = {
        login: loginEl.value,
        password: passwordEl.value,
    };

    console.log(data);

    window.location.href = `${window.location.origin}/static/messanger.html`;
}
