import { IListenerFn } from './interfaces';
import {
  ValidationErrors,
  Validator,
  ValidatorFn,
} from './validator-interfaces';

export abstract class AbstractControl {
  public errors: ValidationErrors = {};

  protected _validators: Validator[] = [];
  protected _listeners: Array<IListenerFn> = [];
  protected _errorsListeners: Array<IListenerFn> = [];

  constructor() {
    this._setErrorsProxy();
  }

  public subscribe(next: IListenerFn): void {
    this._listeners.push(next);
  }

  public unsubscribe(next: IListenerFn): void {
    this._listeners = this._listeners.filter((item) => item !== next);
  }

  public subscribeOnErrors(next: IListenerFn): void {
    this._errorsListeners.push(next);
  }

  public unsubscribeFromErrors(next: IListenerFn): void {
    this._errorsListeners = this._listeners.filter((item) => item !== next);
  }

  protected abstract _setValid(isValid: boolean): void;

  protected notifyListeners(listeners: IListenerFn[], value: unknown): void {
    if (!listeners?.length) {
      return;
    }

    for (const listener of listeners) {
      listener(value);
    }
  }

  protected _checkError(abstractControl: AbstractControl): void {
    if (!this._validators?.length) {
      this._setValid(true);
    } else {
      for (const validator of this._validators) {
        const res = validator.validatorFn(abstractControl as any);

        if (res !== null) {
          validator.keys = Object.keys(res);
          Object.assign(this.errors, res);

          continue;
        }

        if (validator.keys?.length) {
          validator.keys.forEach((key) => {
            delete this.errors[key];
          });

          validator.keys = [];
        } else {
          this._setValid(true);
        }
      }
    }

    this.notifyListeners(this._errorsListeners, this.errors);
  }

  protected initValidators(validators: ValidatorFn[]): void {
    this._validators = validators.map((validator) => ({
      validatorFn: validator,
      keys: [],
    }));
  }

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
