class LocalStorageService {
    private window: Window;

    constructor(window: Window) {
        this.window = window;
    }

    public set(key: string, value: any) {
        const storage = this.getLocalStorage();

        if (!storage) {
            return undefined;
        }

        storage.setItem(key, JSON.stringify(value));
    }

    public get(key: string) {
        const storage = this.getLocalStorage();

        if (!storage) {
            return undefined;
        }

        return JSON.parse(storage.getItem(key) as string);
    }

    public removeItem(key: string) {
        const storage = this.getLocalStorage();

        if (storage) {
            storage.removeItem(key);
        }
    }

    private getLocalStorage(): Storage | null {
        return this.window?.localStorage;
    }
}

export const localStorageService = new LocalStorageService(window);
