export default class UploadService {
    /**
     * @param {*} config
     * {
     *  multiple: boolean - false by default
     * }
     * @returns Возвращает список выбранных файлов - FileList
     */
    static upload(config = {}) {
        let fileInput = document.createElement('input');
        fileInput.type = 'file';

        if (config.multiple) {
            fileInput.multiple = 'multiple';
        }

        fileInput.click();

        return new Promise((resolve) => {
            fileInput.addEventListener('change', (event) => {
                resolve(event.composedPath()[0].files);
            });
        }).finally((_) => (fileInput = null));
    }

    static getBase64(file) {
        let fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        return new Promise((resolve) => {
            fileReader.addEventListener('load', (event) => {
                resolve(event.currentTarget.result.toString());
            });
        }).finally((_) => (fileReader = null));
    }
}
