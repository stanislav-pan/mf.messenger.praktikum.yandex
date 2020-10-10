const settingsAdapter = (() => {
    const settingsBlock = document.getElementById('settingsBlock');
    const editInformationBlock = document.getElementById(
        'editInformationBlock'
    );
    const changePasswordBlock = document.getElementById('changePasswordBlock');

    const hideAll = () => {
        settingsBlock.style.display = 'none';
        editInformationBlock.style.display = 'none';
        changePasswordBlock.style.display = 'none';
    };

    const showBlock = (el) => {
        el.style.display = 'block';
    };

    // Отображаемая настройка
    // 0 - Edit Information
    // 1 - Change password
    // null - Список настроек
    const renderBlock = (setting) => {
        hideAll();

        if (setting === null) {
            showBlock(settingsBlock);
        } else if (setting === 0) {
            showBlock(editInformationBlock);
        } else if (setting === 1) {
            showBlock(changePasswordBlock);
        }
    };

    renderBlock(null);

    return {
        showEditInformationBlock: function () {
            renderBlock(0);
        },
        showChangePasswordBlock: function () {
            renderBlock(1);
        },
        showSettingsBlock: function () {
            renderBlock(null);
        },
    };
})();

function editInformation() {
    event.preventDefault();

    const loginEl = document.getElementById('loginInput');
    const firstNameEl = document.getElementById('firstNameInput');
    const secondNameEl = document.getElementById('secondNameInput');
    const emailEl = document.getElementById('emailInput');
    const phoneEl = document.getElementById('phoneInput');

    console.log({
        login: loginEl.value,
        firstName: firstNameEl.value,
        secondName: secondNameEl.value,
        email: emailEl.value,
        phone: phoneEl.value,
    });
}

function changePassword() {
    event.preventDefault();

    const passwordEl = document.getElementById('passwordInput');
    const confirmedPasswordEl = document.getElementById('confirmPasswordInput');

    const data = {
        password: passwordEl.value,
        confirmedPassword: confirmedPasswordEl.value,
    };

    console.log(data);
}

function uploadAvatar() {
    let fileInput = document.createElement('input');
    fileInput.type = 'file';

    fileInput.addEventListener('change', uploadAvatar.prototype.uploadImage);

    fileInput.click();
}

uploadAvatar.prototype.uploadImage = (event) => {
    const file = event.composedPath()[0].files[0];
    const fileReader = new FileReader();

    fileReader.addEventListener('load', uploadAvatar.prototype.convertToBase64);

    fileReader.readAsDataURL(file);
};

uploadAvatar.prototype.convertToBase64 = (event) => {
    const base64 = event.currentTarget.result.toString();

    const avatars = document.querySelectorAll('.avatar .avatar__image');

    for (const avatar of avatars) {
        avatar.src = base64;
    }

    console.log('avatar base64', base64);
};

function changeDisplayName() {
    document
        .querySelector('.brief-information__edit-btn')
        .classList.toggle('hidden');

    document
        .querySelector('.brief-information__apply-btn')
        .classList.toggle('hidden');

    document
        .querySelector('.brief-information__name')
        .classList.toggle('hidden');

    const displayNameInput = document.getElementById('displayNameInput');
    displayNameInput.classList.toggle('hidden');
    displayNameInput.focus();
    displayNameInput.selectionStart = displayNameInput.value.length;
}

function applyNewDisplayName() {
    const displayName = document.getElementById('displayNameInput').value;

    for (const nameEl of document.querySelectorAll('.brief-information__name')) {
        nameEl.textContent = displayName;
    }

    console.log('displayName', displayName);

    changeDisplayName();
}

function goBack() {
    window.history.back();
}