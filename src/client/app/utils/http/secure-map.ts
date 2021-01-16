import { isObject } from '../my-lodash/is-object';

export interface ISecureMap {
  has(name: string): boolean;
  keys(): IterableIterator<string>;

  get(name: string): string | undefined;

  set(name: string, value: string | string[]): ISecureMap;
  delete(name: string): ISecureMap;
}

export class SecureMap implements ISecureMap {
  protected _items: Map<string, string>;

  constructor(items: Record<string, string | string[]> = {}) {
    if (!isObject(items)) {
      return;
    }

    this._items = new Map(
      Object.entries(items).map(([key, value]) => [key, value.toString()])
    );
  }

  public has = (name: string): boolean => this._items.has(name);
  public keys = (): IterableIterator<string> => this._items.keys();
  public get = (name: string): string | undefined => this._items.get(name);

  public set = (name: string, value: string | string[]): this =>
    this._items.set(name, value.toString()) && this;

  public delete = (name: string): this => {
    this._items.delete(name);

    return this;
  };

  public getValues = (): Map<string, string> => this._items;
}
