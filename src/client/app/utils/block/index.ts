import { EventBus } from '../event-bus';
import { FormControl } from '../forms/form-control';
import { isEqual } from '../is-equal';
import { traverseDomTree } from '../traverse-dom-tree';
import { EventsSubscriber } from './events-subscriber';

export type MapOfBlockLike = { [key: string]: Block };
export type HandlerType = {
  (...args: unknown[]): unknown | void;
};

export type HandlersType = Partial<Record<string, HandlerType>>;

export interface ICommonPropFields {
  handlers?: HandlersType;
  components?: MapOfBlockLike;
  class?: string;
  formControl?: FormControl;
}

export interface IBlockMeta<T> {
  tagName: string;
  props: T;
}

export interface BlockLike {
  render: () => string;
}

export abstract class Block<T extends ICommonPropFields = ICommonPropFields>
  implements BlockLike {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_CWU: 'flow:component-will-unmount',
  };

  static componentsCount = 0;

  private _element: HTMLElement;
  private _meta: IBlockMeta<T>;

  private eventBus: () => EventBus;
  public props: T;

  private _id: string;

  private eventsSubscriber: EventsSubscriber;

  constructor(meta: IBlockMeta<T>) {
    const eventBus = new EventBus();
    this._meta = meta;
    this.eventsSubscriber = new EventsSubscriber();

    this.props = this._makePropsProxy(meta.props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  public getId(): string {
    return this._id;
  }

  private _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public componentDidMount(): void {}

  private _componentDidUpdate(oldProps: T, newProps: T) {
    this.componentDidUpdate(oldProps, newProps);
  }

  public componentDidUpdate(oldProps: T, newProps: T): boolean {
    return !isEqual(
      oldProps as Record<string, unknown>,
      newProps as Record<string, unknown>
    );
  }

  private _componentWillUnmount() {
    this.componentWillUnmount();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public componentWillUnmount(): void {}

  public setProps = (nextProps: Partial<T> | Record<string, unknown>): void => {
    if (!nextProps) {
      return;
    }

    const oldProps = { ...this.props };

    Object.assign(this.props, nextProps);

    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
  };

  get element(): HTMLElement {
    return this._element;
  }

  private _render() {
    const block = this.render();

    if (!this._element) {
      return;
    }

    this._element.innerHTML = block;

    const eventsSubscriberController = this.eventsSubscriber.init(
      this.props.handlers || {}
    );

    traverseDomTree(this._element, (current: HTMLElement) => {
      if (this.props.formControl) {
        const attr = Array.from(current.attributes).find(
          (attr) => attr.name === 'formcontrol'
        );

        if (attr) {
          this.props.formControl.init(current as HTMLInputElement);
        }
      }

      if (this.props.handlers) {
        eventsSubscriberController.gatherListeners(current);
      }

      if (this._hasChildComponents(current)) {
        this._renderComponents(current);
      }
    });

    if (this.props.handlers) {
      eventsSubscriberController.attachListeners();
    }
  }

  private _hasChildComponents(element: HTMLElement) {
    return (
      this.props.components &&
      Object.values(this.props.components).length &&
      element.tagName === 'NG-CONTAINER'
    );
  }

  private _renderComponents(current: HTMLElement) {
    const dataset = (current as HTMLElement).dataset;

    const componentsIds = dataset.componentsids?.split(',')?.reverse();

    if (!componentsIds?.length) {
      current.remove();

      return;
    }

    for (const componentId of componentsIds) {
      const component = Object.values(this.props.components || {}).find(
        (component: Block) => component?._id === componentId
      );

      if (!component) {
        continue;
      }

      if (current.parentNode) {
        current.parentNode.insertBefore(
          component.getContent(),
          current.nextSibling
        );
      }
    }

    current.remove();
  }

  public abstract render(): string;

  public getContent(): HTMLElement {
    return this.element;
  }

  private _makePropsProxy(props: T): T {
    return new Proxy(props, {
      get: (target: T, p: string): boolean | never => {
        if (p.toString().startsWith('_')) {
          this.throwAccessError();
        }

        const value = target[p];

        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (taget: T, p: string, value: unknown): boolean | never => {
        if (p.toString().startsWith('_')) {
          this.throwAccessError();
        }

        taget[p] = value;

        this._render();
        return true;
      },
      deleteProperty: () => {
        this.throwAccessError();

        return false;
      },
    });
  }

  private throwAccessError = () => {
    throw new Error('нет доступа');
  };

  private _createDocumentElement(tagName: string) {
    const el = document.createElement(tagName);
    const id = (this._id = this._getUniqId());

    el.setAttribute(id, '');
    el.style.display = 'contents';

    if (this.props.class) {
      this._setClasses(el, this.props.class);
    }

    return el;
  }

  private _getUniqId(): string {
    const id = `block-c${Block.componentsCount}`;

    Block.componentsCount += 1;

    return id;
  }

  private _setClasses(el: HTMLElement, classes: string) {
    el.classList.add(...classes.split(' '));
  }

  public show(): void {
    this.getContent().style.display = 'block';
  }

  public hide(): void {
    this.getContent().style.display = 'none';
  }

  public remove(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CWU);

    this.getContent().remove();
  }
}
