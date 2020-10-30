export class EventBus {
    constructor() {
        this.listeners = this.getListenersProxy();
    }

    getListenersProxy() {
        return new Proxy(
            {},
            {
                get: (target, p) => {
                    if (p in target) {
                        return target[p];
                    }

                    target[p] = [];

                    return target[p];
                },
            }
        );
    }

    on(event, callback) {
        this.listeners[event].push(callback);
    }

    off(event, callback) {
        this.isEventHandling(event);

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback
        );
    }

    emit(event, ...args) {
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
