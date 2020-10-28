export interface IUploadConfig {
    multiple?: boolean;
}

export default class UploadService {
    static upload(config: IUploadConfig = {}): Promise<FileList> {
        let fileInput: HTMLInputElement = document.createElement('input');
        fileInput.type = 'file';

        if (config.multiple) {
            fileInput.multiple = true;
        }

        fileInput.click();

        return new Promise<FileList>((resolve) => {
            fileInput.addEventListener('change', (event) => {
                resolve((event.composedPath()[0] as HTMLInputElement).files);
            });
        }).finally(() => (fileInput = null));
    }

    static getBase64(file: File): Promise<string> {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        return new Promise<string>((resolve) => {
            fileReader.addEventListener('load', (event) => {
                resolve((event.currentTarget as FileReader).result.toString());
            });
        }).finally(() => (fileReader = null));
    }
}
