import { ValidationErrors } from './validator-interfaces';

export abstract class AbstractControl {
  public errors: ValidationErrors = {};

  constructor() {
    this._setErrorsProxy();
  }

  protected abstract _setValid(isValid: boolean): void;

  private _setErrorsProxy() {
    const self = this;

    this.errors = new Proxy(this.errors, {
      get(target: ValidationErrors, prop: string) {
        self._setValid(!Object.keys(target).length);

        return target[prop];
      },
      set(target: ValidationErrors, prop: string, value: any) {
        target[prop] = value;

        self._setValid(!Object.keys(target).length);
        return true;
      },
      deleteProperty(target: ValidationErrors, prop: string) {
        delete target[prop];

        self._setValid(!Object.keys(target).length);
        return true;
      },
    });
  }
}
