export interface IUploadConfig {
  multiple?: boolean;
}

export default class UploadService {
  static upload(config: IUploadConfig = {}): Promise<FileList> {
    const fileInput: HTMLInputElement = document.createElement('input');
    fileInput.type = 'file';

    if (config.multiple) {
      fileInput.multiple = true;
    }

    fileInput.click();

    return new Promise<FileList>((resolve, reject) => {
      fileInput.addEventListener('change', (event) => {
        const inputEl = event.composedPath()[0] as HTMLInputElement;

        if (!inputEl) {
          reject();
        }

        const res = inputEl.files as FileList;

        resolve(res);
      });
    });
  }

  static getBase64(file: File): Promise<string> {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    return new Promise<string>((resolve) => {
      fileReader.addEventListener('load', (event) => {
        resolve((event.currentTarget as FileReader).result?.toString());
      });
    });
  }
}
