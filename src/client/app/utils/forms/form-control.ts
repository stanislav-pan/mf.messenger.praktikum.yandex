import { AbstractControl } from './abstract-control';
import { FormGroup } from './form-group';
import { ValidationErrors, ValidatorFn } from './validator-interfaces';

export class FormControl extends AbstractControl {
  private _el: HTMLInputElement;

  private _value: unknown;

  private _wasInitialValueSet = false;

  public parent: FormGroup;

  private _valid = true;

  public get valid(): boolean {
    return this._valid;
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
    this.setValue(String(value));

    this.resetErrors();
    this._checkError(this);

    this.notifyListeners(this._listeners, this._value);
  }

  constructor(value: string, validators: ValidatorFn[] = []) {
    super();

    this.initValidators(validators);
    this.value = value;
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

      if (this._value === String(value)) {
        return;
      }

      this.value = value;
      this.markAsDirty();
    });

    element.addEventListener('blur', this._blurHandler);

    if (!this._wasInitialValueSet) {
      this._wasInitialValueSet = true;

      element.value = String(this._value);
    }
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

    this.notifyListeners(this._errorsListeners, this._value);
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
    if (!this._el) {
      return;
    }

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
