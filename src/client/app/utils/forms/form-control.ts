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

  private _value: unknown;

  private _wasInitialValueSet = false;

  public parent: FormGroup;

  private _valid = true;

  public get valid(): boolean {
    return this._valid;
  }

  public get invalid(): boolean {
    return !this._valid;
  }

  protected _setValid(isValid: boolean): void {
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

  public get touched(): boolean {
    return this._touched;
  }

  public get untouched(): boolean {
    return this._touched;
  }

  private _setTouched(touched: boolean) {
    this._touched = touched;

    this._el.classList.toggle('touched');
  }

  private _dirty = false;

  public get dirty(): boolean {
    return this._dirty;
  }

  private _setDirty(dirty: boolean) {
    this._dirty = dirty;

    this._el.classList.toggle('dirty');
  }

  private set value(value: unknown) {
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

  public getValue(): unknown {
    return this._value;
  }

  private _blurHandler = () => {
    if (this.touched) {
      return;
    }

    this._setTouched(true);

    this._el.removeEventListener('blur', this._blurHandler);
  };

  public init(element: HTMLInputElement): void {
    this._el = element;
    this.value = this._value;

    element.addEventListener('input', (event: InputEvent) => {
      const value = (event.target as HTMLInputElement).value;

      this.value = value;

      this.markAsDirty();
    });

    element.addEventListener('blur', this._blurHandler);

    if (!this._wasInitialValueSet) {
      this._wasInitialValueSet = true;

      element.value = String(this._value);

      this._checkError();
    }
  }

  public subscribe(next: (value: unknown) => void): void {
    this._listeners.push(next);
  }

  public unsubscribe(next: (value: unknown) => void): void {
    this._listeners = this._listeners.filter((item) => item !== next);
  }

  public markAsDirty(): void {
    if (this._dirty) {
      return;
    }

    this._setDirty(true);
  }

  public markAsPristine(): void {
    if (!this._dirty) {
      return;
    }

    this._setDirty(false);
  }

  public setErrors(error: ValidationErrors): void {
    Object.assign(this.errors, error);
  }

  public deleteErrors(keys: string[]): void {
    for (const key of keys) {
      if (!(key in this.errors)) {
        continue;
      }

      delete this.errors[key];
    }
  }

  public resetErrors(): void {
    this.deleteErrors(Object.keys(this.errors));
  }

  public setValue(value: string): void {
    this._el.value = value;
  }

  public reset(needResetValue = true): void {
    if (needResetValue) {
      this.setValue('');
    }

    this.resetErrors();

    this._setTouched(true);
    this.markAsPristine();
  }
}
