export class EventBus {
    public listeners: { [key: string]: Array<Function> };

    constructor() {
        this.listeners = this._getListenersProxy();
    }

    private _getListenersProxy() {
        return new Proxy(
            {},
            {
                get: (target: {}, p: string) => {
                    if (p in target) {
                        return target[p];
                    }

                    target[p] = [];

                    return target[p];
                },
            }
        );
    }

    public on(event: string, callback) {
        this.listeners[event].push(callback);
    }

    public off(event: string, callback) {
        this.isEventHandling(event);

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback
        );
    }

    public emit(event: string, ...args) {
        this.isEventHandling(event);

        for (let listener of this.listeners[event]) {
            listener.apply({}, args);
        }
    }

    isEventHandling(event) {
        if (!this.listeners[event].length) {
            throw new Error(`Нет события: ${event}`);
        }
    }
}
