import { AbstractControl } from './abstractal-control';
import { FormGroup } from './form-group';
import { IListenerFn } from './interfaces';
import {
  Validator,
  ValidationErrors,
  ValidatorFn,
} from './validator-interfaces';

export class FormControl extends AbstractControl {
  private _el: HTMLInputElement;

  private _listeners: Array<IListenerFn> = [];
  private _validators: Validator[] = [];

  private _value: any;

  private _wasInitialValueSet = false;

  public parent: FormGroup;

  private _valid = true;

  public get valid() {
    return this._valid;
  }

  public get invalid() {
    return !this._valid;
  }

  protected _setValid(isValid: boolean) {
    this._valid = isValid;

    if (!this._el) {
      return;
    }

    if (isValid) {
      this._el.classList.remove('invalid');
      this._el.classList.add('valid');

      return;
    }

    this._el.classList.add('invalid');
    this._el.classList.remove('valid');
  }

  private _touched = false;

  public get touched() {
    return this._touched;
  }

  public get untouched() {
    return this._touched;
  }

  private _setTouched(touched: boolean) {
    this._touched = touched;

    this._el.classList.toggle('touched');
  }

  private _dirty = false;

  public get dirty() {
    return this._dirty;
  }

  private _setDirty(dirty: boolean) {
    this._dirty = dirty;

    this._el.classList.toggle('dirty');
  }

  private set value(value: any) {
    this._value = value;

    this.resetErrors();
    this._checkError();

    if (this._listeners) {
      for (const listener of this._listeners) {
        listener(value);
      }
    }
  }

  constructor(value: string, validators: ValidatorFn[] = []) {
    super();

    this.value = value;

    this._validators = validators.map((validator) => ({
      validatorFn: validator,
      keys: [],
    }));
  }

  private _checkError() {
    if (!this._validators?.length) {
      this._setValid(true);

      return;
    }

    for (const validator of this._validators) {
      const res = validator.validatorFn(this);

      if (res !== null) {
        validator.keys = Object.keys(res);
        Object.assign(this.errors, res);

        continue;
      }

      validator.keys.forEach((key) => {
        delete this.errors[key];
      });

      validator.keys = [];
    }
  }

  public getValue() {
    return this._value;
  }

  private _blurHandlerBind: () => void;

  private _blurHandler() {
    if (this.touched) {
      return;
    }

    this._setTouched(true);

    this._el.removeEventListener('blur', this._blurHandlerBind);
  }

  public init(element: HTMLInputElement) {
    this._el = element;
    this.value = this._value;

    element.addEventListener('input', (event: InputEvent) => {
      const value = (event.target as HTMLInputElement).value;

      this.value = value;

      this.markAsDirty();
    });

    this._blurHandlerBind = this._blurHandler.bind(this);

    element.addEventListener('blur', this._blurHandlerBind);

    if (!this._wasInitialValueSet) {
      this._wasInitialValueSet = true;

      element.value = this._value;

      this._checkError();
    }
  }

  public subscribe(next: (value: any) => void) {
    this._listeners.push(next);
  }

  public unsubscribe(next: (value: any) => void) {
    this._listeners = this._listeners.filter((item) => item !== next);
  }

  public markAsDirty() {
    if (this._dirty) {
      return;
    }

    this._setDirty(true);
  }

  public markAsPristine() {
    if (!this._dirty) {
      return;
    }

    this._setDirty(false);
  }

  public setErrors(error: ValidationErrors) {
    Object.assign(this.errors, error);

    if (this._listeners) {
      for (const listener of this._listeners) {
        listener(this._value);
      }
    }
  }

  public deleteErrors(keys: string[]) {
    for (const key of keys) {
      if (!(key in this.errors)) {
        continue;
      }

      delete this.errors[key];
    }
  }

  public resetErrors() {
    this.deleteErrors(Object.keys(this.errors));
  }

  public setValue(value: string) {
    this._el.value = value;
  }

  public reset(needResetValue: boolean = true) {
    if (needResetValue) {
      this.setValue('');
    }

    this.resetErrors();

    this._setTouched(true);
    this.markAsPristine();
  }
}
