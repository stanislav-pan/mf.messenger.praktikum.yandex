class LocalStorageService {
    constructor(window) {
        this.window = window;
    }

    set(key, value) {
        if (!this.window.localStorage) {
            return undefined;
        }

        this.window.localStorage.setItem(key, JSON.stringify(value));
    }

    get(key) {
        if (!this.window.localStorage) {
            return undefined;
        }

        return JSON.parse(this.window.localStorage.getItem(key));
    }
}

export const localStorageService = new LocalStorageService(window);
