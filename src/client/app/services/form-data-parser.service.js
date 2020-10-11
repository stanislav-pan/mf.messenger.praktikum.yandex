export default class FormDataPerserService {
    static getFormValues(form) {
        const formData = new FormData(form);

        const result = {};

        for (var [key, value] of formData.entries()) {
            result[key] = value;
        }

        return result;
    }
}
