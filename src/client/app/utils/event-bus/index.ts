type callbackSignature = {
  (...args: unknown[]): void;
};

export class EventBus {
  public listeners: Record<string, Array<callbackSignature>>;

  constructor() {
    this.listeners = this._getListenersProxy();
  }

  private _getListenersProxy() {
    return new Proxy(
      {},
      {
        get: (target: Record<string, Array<callbackSignature>>, p: string) => {
          if (p in target) {
            return target[p];
          }

          target[p] = [];

          return target[p];
        },
      }
    );
  }

  public on(event: string, callback: callbackSignature): void {
    this.listeners[event].push(callback);
  }

  public off(event: string, callback: callbackSignature): void {
    this.isEventHandling(event);

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  public emit(event: string, ...args: unknown[]): void {
    this.isEventHandling(event);

    for (const listener of this.listeners[event]) {
      listener.apply({}, args);
    }
  }

  private isEventHandling(event: string): never | void {
    if (!this.listeners[event].length) {
      throw new Error(`Нет события: ${event}`);
    }
  }
}
