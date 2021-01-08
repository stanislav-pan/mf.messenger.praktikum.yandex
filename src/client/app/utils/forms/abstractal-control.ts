import { ValidationErrors } from './validator-interfaces';

export abstract class AbstractControl {
  public errors: ValidationErrors = {};

  constructor() {
    this._setErrorsProxy();
  }

  protected abstract _setValid(isValid: boolean): void;

  private _setErrorsProxy() {
    this.errors = new Proxy(this.errors, {
      get: (target: ValidationErrors, prop: string) => {
        this._setValid(!Object.keys(target).length);

        return target[prop];
      },
      set: (target: ValidationErrors, prop: string, value: unknown) => {
        target[prop] = value;

        this._setValid(!Object.keys(target).length);
        return true;
      },
      deleteProperty: (target: ValidationErrors, prop: string) => {
        delete target[prop];

        this._setValid(!Object.keys(target).length);
        return true;
      },
    });
  }
}
