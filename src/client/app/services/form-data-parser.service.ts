export default class FormDataPerserService {
  static getFormValues<T extends Object>(form: HTMLFormElement) {
    const formData = new FormData(form);

    const result = {};

    formData.forEach((value, key) => {
      result[key] = value;
    });

    return result as T;
  }
}
