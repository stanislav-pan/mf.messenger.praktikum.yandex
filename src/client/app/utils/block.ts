import { EventBus } from './event-bus.js';
import { FormControl } from './forms/form-control.js';

export type MapOfBlockLike = { [key: string]: Block<any> };

export interface ICommonPropFields {
    handlers?: Record<
        string,
        (event: any, arg1?: any, arg2?: any, arg3?: any) => void
    >;
    components?: MapOfBlockLike;
    class?: string;
    formControl?: FormControl;
}

export interface IBlockMeta<T> {
    tagName: string;
    props: T;
}

// Нельзя создавать экземпляр данного класса
export abstract class Block<T extends Record<string, any> | ICommonPropFields> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    static componentsCount = 0;

    private _element: HTMLElement = null;
    private _meta: IBlockMeta<T> = null;

    private eventBus: () => EventBus;
    public props: T;

    private _subscriptions: Map<any, any>;
    private _id: string;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(meta: IBlockMeta<T>) {
        const eventBus = new EventBus();
        this._meta = meta;

        this.props = this._makePropsProxy(meta.props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    public getId() {
        return this._id;
    }

    private _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    private _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    public componentDidMount(oldProps?) {}

    private _componentDidUpdate(oldProps: T, newProps: T) {
        this.componentDidUpdate(oldProps, newProps);
    }

    public componentDidUpdate(oldProps: T, newProps: T) {
        return JSON.stringify(oldProps) !== JSON.stringify(newProps);
    }

    public setProps = (nextProps: T | {}) => {
        if (!nextProps) {
            return;
        }

        const oldProps = { ...this.props };

        Object.assign(this.props, nextProps);

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
    };

    get element() {
        return this._element;
    }

    private _render() {
        const block = this.render();
        // Это небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно компилировать не в строку (или делать это правильно),
        // либо сразу в превращать DOM-элементы и возвращать из compile DOM-ноду
        if (this._element) {
            this._element.innerHTML = block;

            if (this.props.formControl) {
                const stack: Array<HTMLElement | Element> = [this.element];

                while (stack.length) {
                    const current = stack.pop();

                    if (!current) {
                        break;
                    }

                    const attr = Array.from(current.attributes).find(
                        (attr) => attr.name === 'formcontrol'
                    );

                    if (attr) {
                        this.props.formControl.init(current);

                        break;
                    }

                    const children = Array.from(current.children);
                    stack.push(...children);
                }
            }

            if (this.props.handlers) {
                this._attachListeners(); // добавили
            }

            if (
                this.props.components &&
                Object.values(this.props.components).length
            ) {
                this._renderComponents();
            }
        }
    }

    private _renderComponents() {
        if (
            !this.props.components ||
            !Object.values(this.props.components).length
        ) {
            return this.element;
        }

        const stack: Array<HTMLElement | Element> = [this.element];

        while (stack.length) {
            const current = stack.pop();
            const dataset = (current as HTMLElement).dataset;

            if (!current) {
                break;
            }

            const componentsIds = dataset.componentsids?.split(',')?.reverse();

            if (!componentsIds?.length) {
                const children = Array.from(current.children);
                stack.push(...children);

                continue;
            }

            for (const componentId of componentsIds) {
                const component = Object.values(
                    this.props.components || {}
                ).find(
                    (component: Block<any>) => component._id === componentId
                ) as Block<any>;

                if (!component) {
                    continue;
                }

                current.parentNode.insertBefore(
                    component.getContent(),
                    current.nextSibling
                );
            }

            current.remove();
        }
    }

    // Переопределяется пользователем. Необходимо вернуть разметку
    public abstract render(): string;

    public getContent() {
        return this.element;
    }

    private _makePropsProxy(props: T): T {
        // Еще один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

        props = new Proxy(props, {
            get(target: T, p: string): boolean | never {
                if (p.toString().startsWith('_')) {
                    throw new Error('нет доступа');
                }

                const value = target[p];

                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(taget: T, p: string, value: any): boolean | never {
                if (p.toString().startsWith('_')) {
                    throw new Error('нет доступа');
                }

                taget[p] = value;

                self._render();
                return true;
            },
            deleteProperty(target, p) {
                throw new Error('нет доступа');
            },
        });

        return props;
    }

    private _createDocumentElement(tagName: string) {
        const el = document.createElement(tagName);
        const attr = (this._id = `block-c${Block.componentsCount}`);
        el.setAttribute(attr, '');
        el.style.display = 'contents';

        Block.componentsCount += 1;

        if (this.props.class) {
            el.classList.add(...(this.props.class as string).split(' '));
        }

        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return el;
    }

    public show() {
        this.getContent().style.display = 'block';
    }

    public hide() {
        this.getContent().style.display = 'none';
    }

    private _attachListeners() {
        this._gatherListeners();

        const iterator = this._subscriptions.entries();
        let item = iterator.next();
        while (!item.done) {
            const [elem, events] = item.value;

            Object.keys(events).forEach((eventName) => {
                elem.addEventListener(eventName, events[eventName]);
            });

            item = iterator.next();
        }
    }

    private _gatherListeners() {
        const block = this._element;
        const stack: Array<Element> = [block];
        const subscriptions = new Map();

        while (stack.length) {
            const current = stack.pop();
            if (!current) {
                break;
            }

            const attrs = Array.from(current.attributes).filter((attr) =>
                attr.name.startsWith('on')
            );

            if (!attrs.length) {
                const children = Array.from(current.children);
                stack.push(...children);
                continue;
            }

            if (!subscriptions.get(current)) {
                subscriptions.set(current, {});
            }

            const events = subscriptions.get(current);

            attrs.forEach((attr) => {
                const eventName = attr.name.substring(2).toLocaleLowerCase();

                const regExp = new RegExp(
                    `[a-zA-Z0-9_]+(?<args>\([a-zA-Z0-9, ]+\)?)`,
                    'g'
                );

                const [funcName, ...args] = attr.value.match(regExp);

                const handler = this.props.handlers[funcName];

                if (handler) {
                    if (args && args.length) {
                        const dataset = (current as HTMLElement).dataset;
                        const mappedArgs = [];

                        for (const arg of args) {
                            if (arg in dataset) {
                                mappedArgs.push(dataset[arg]);
                                continue;
                            }

                            mappedArgs.push(arg);
                        }

                        events[eventName] = (event: any) => {
                            handler(event, ...mappedArgs);
                        };
                    } else {
                        events[eventName] = handler;
                    }
                }

                const test = attr.name.charAt(2);
                const temp = attr.name;

                temp.replace(test, test.toUpperCase());

                current.removeAttribute(temp.replace(test, test.toUpperCase()));
            });

            const children = Array.from(current.children);
            stack.push(...children);
        }

        this._subscriptions = subscriptions;
    }
}
