function login() {
    const loginEl = document.getElementById('loginInput');
    const passwordEl = document.getElementById('passwordInput');

    const data = {
        login: loginEl.value,
        password: passwordEl.value,
    };

    console.log(data);

    window.location.href = `${window.location.origin}/static/messanger.html`;

    // TODO: Navigate to chats list

    event.preventDefault();
}
