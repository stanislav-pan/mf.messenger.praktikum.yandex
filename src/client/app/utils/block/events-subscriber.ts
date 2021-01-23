import { HandlersType, HandlerType } from './index';

type EventsSubscriberController = {
  gatherListeners: (current: HTMLElement) => void;
  attachListeners: () => void;
};

export class EventsSubscriber {
  private _subscriptions: Map<HTMLElement, Record<string, HandlerType>>;
  private _handlers: HandlersType;

  public init(handlers: HandlersType): EventsSubscriberController {
    this._subscriptions = new Map();
    this._handlers = handlers;

    return {
      gatherListeners: this.gatherListeners.bind(this),
      attachListeners: this.attachListeners.bind(this),
    };
  }

  private attachListeners(): void {
    for (const [elem, events] of this._subscriptions.entries()) {
      Object.keys(events).forEach((eventName) => {
        elem.addEventListener(eventName, events[eventName]);
      });
    }
  }

  private gatherListeners(current: HTMLElement) {
    const subscriptions = this._subscriptions;

    const attrs = this.getEventAttrs(current.attributes);

    if (!attrs.length) {
      return;
    }

    if (!subscriptions.get(current)) {
      subscriptions.set(current, {});
    }

    const events = subscriptions.get(current) as Record<string, HandlerType>;

    attrs.forEach((attr) => {
      const { eventName, funcName, args } = this.parseEventAttr(attr);

      const handler = this._handlers[funcName];

      if (handler) {
        events[eventName] = (event: unknown) => {
          handler(
            event,
            ...(args?.length ? this.getArgsValues(args, current.dataset) : [])
          );
        };
      }

      current.removeAttribute(attr.name);
    });
  }

  private getArgsValues = (argsNames: string[], argsDataset: DOMStringMap) =>
    argsNames.map((arg) => argsDataset[arg] || arg);

  private getEventAttrs = (attributes: NamedNodeMap) =>
    Array.from(attributes).filter((attr) => attr.name.startsWith('on'));

  private getEventName = (attr: Attr) =>
    attr.name.substring(2).toLocaleLowerCase();

  private parseEventAttr = (attr: Attr) => {
    const eventName = this.getEventName(attr);
    const regExp = new RegExp(`[a-zA-Z0-9_]+(?<args>([a-zA-Z0-9, ]+)?)`, 'g');

    const [funcName, ...args] = attr.value.match(regExp) as string[];

    return { eventName, funcName, args };
  };
}
