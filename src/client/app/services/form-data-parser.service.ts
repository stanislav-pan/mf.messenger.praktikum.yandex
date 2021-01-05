export default class FormDataParserService {
  static getFormValues<T extends Record<string, unknown>>(
    form: HTMLFormElement
  ): T {
    const formData = new FormData(form);

    const result = {};

    formData.forEach((value, key) => {
      result[key] = value;
    });

    return result as T;
  }
}
