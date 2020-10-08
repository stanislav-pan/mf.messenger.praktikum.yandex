function login() {
    const loginEl = document.getElementById('loginInput');
    const passwordEl = document.getElementById('passwordInput');

    const data = {
        login: loginEl.value,
        password: passwordEl.value,
    };

    console.log(data);

    // TODO: Navigate to chats list

    event.preventDefault();
}
