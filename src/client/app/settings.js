import { SETTINGS_VIEWING_TYPES } from './const/settings.js';
import UploadService from './services/upload.service.js';
import FormDataPerserService from './services/form-data-parser.service.js';

const data = nunjucks.render('pages/settings.tmpl.njk', {
    renderingSettingsList: [
        {
            title: 'Edit profile',
            iconTemplate: 'icons/settings-edit-profile.tmpl.njk',
            onClick: 'SETTINGS.settingsAdapter.showEditInformationBlock()',
        },
        {
            title: 'Change password',
            iconTemplate: 'icons/settings-change-password.tmpl.njk',
            onClick: 'SETTINGS.settingsAdapter.showChangePasswordBlock()',
        },
    ],
});
document.body.innerHTML = data;

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

    const renderBlock = (setting) => {
        hideAll();

        if (setting === SETTINGS_VIEWING_TYPES.SETTINGS_LIST) {
            showBlock(settingsBlock);
        } else if (setting === SETTINGS_VIEWING_TYPES.EDIT_INFORMATION_BLOCK) {
            showBlock(editInformationBlock);
        } else if (setting === SETTINGS_VIEWING_TYPES.CHANGE_PASSWORD_BLOCK) {
            showBlock(changePasswordBlock);
        }
    };

    renderBlock(SETTINGS_VIEWING_TYPES.SETTINGS_LIST);

    return {
        showEditInformationBlock: () => {
            renderBlock(SETTINGS_VIEWING_TYPES.EDIT_INFORMATION_BLOCK);
        },
        showChangePasswordBlock: () => {
            renderBlock(SETTINGS_VIEWING_TYPES.CHANGE_PASSWORD_BLOCK);
        },
        showSettingsBlock: () => {
            renderBlock(SETTINGS_VIEWING_TYPES.SETTINGS_LIST);
        },
    };
})();

function editInformation() {
    event.preventDefault();

    const editForm = document.getElementById('editForm');
    const formValues = FormDataPerserService.getFormValues(editForm);

    console.log(formValues);
}

function changePassword() {
    event.preventDefault();

    const changePasswordForm = document.getElementById('changePasswordForm');
    const formValues = FormDataPerserService.getFormValues(changePasswordForm);

    console.log(formValues);
}

function uploadAvatar() {
    UploadService.upload()
        .then((fileList) => UploadService.getBase64(fileList[0]))
        .then((base64) => {
            const avatars = document.querySelectorAll('.avatar .avatar__image');

            for (const avatar of avatars) {
                avatar.src = base64;
            }

            console.log('avatar base64', base64);
        });
}

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

    for (const nameEl of document.querySelectorAll(
        '.brief-information__name'
    )) {
        nameEl.textContent = displayName;
    }

    console.log('displayName', displayName);

    changeDisplayName();
}

function goBack() {
    window.history.back();
}

window.SETTINGS = {
    settingsAdapter,
    editInformation,
    changePassword,
    uploadAvatar,
    goBack,
    changeDisplayName,
    applyNewDisplayName,
};
