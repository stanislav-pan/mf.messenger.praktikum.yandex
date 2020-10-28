class LocalStorageService {
    private window: Window;

    constructor(window: Window) {
        this.window = window;
    }

    public set(key: string, value: any) {
        if (!this.window.localStorage) {
            return undefined;
        }

        this.window.localStorage.setItem(key, JSON.stringify(value));
    }

    public get(key: string) {
        if (!this.window.localStorage) {
            return undefined;
        }

        return JSON.parse(this.window.localStorage.getItem(key));
    }

    public removeItem(key: string) {
        this.window.localStorage.removeItem(key);
    }
}

export const localStorageService = new LocalStorageService(window);
