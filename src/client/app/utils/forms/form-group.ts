import { AbstractControl } from './abstractal-control';
import { FormControl } from './form-control';
import { IListenerFn } from './interfaces';
import { Validator, ValidatorFn } from './validator-interfaces';

export class FormGroup extends AbstractControl {
  public controls: { [key: string]: FormControl } = {};
  private _listeners: Array<IListenerFn> = [];
  private _validators: Validator[] = [];

  public get value() {
    return this._getValue();
  }

  public set value(value: any) {
    if (this._listeners?.length) {
      for (const listener of this._listeners) {
        listener(value);
      }
    }
  }

  private _valid = true;

  public get valid() {
    return this._valid;
  }

  protected _setValid(isValid: boolean) {
    this._valid =
      isValid && Object.values(this.controls).every((control) => control.valid);
  }

  get invalid() {
    return !this._valid;
  }

  constructor(
    controls: { [key: string]: FormControl } = {},
    validators: ValidatorFn[] = []
  ) {
    super();
    Object.entries(controls).forEach(([key, control]) => {
      this.addControl(key, control);
    });

    this._validators = validators.map((validator) => ({
      validatorFn: validator,
      keys: [],
    }));
  }

  public addControl(key: string, control: FormControl) {
    this.controls[key] = control;

    control.subscribe(() => {
      this.value = this._getValue();
      this._checkError();
    });

    this._checkError();
  }

  public subscribe(next: (value: any) => void) {
    this._listeners.push(next);
  }

  public get(key: string) {
    return this.controls[key];
  }

  public markAsDirtyAllControls() {
    Object.values(this.controls).forEach((control) => {
      control.markAsDirty();
    });
  }

  public markAsPristineAllControls() {
    Object.values(this.controls).forEach((control) => {
      control.markAsPristine();
    });
  }

  public reset(needResetValues: boolean = true) {
    Object.values(this.controls).forEach((control) => {
      control.reset(needResetValues);
    });
  }

  public patchValue(obj: Record<string, unknown>) {
    for (const [key, value] of Object.entries(obj)) {
      if (!this.controls[key]) {
        continue;
      }

      this.controls[key].setValue(value as any);
    }
  }

  private _getValue() {
    return Object.entries(this.controls).reduce((acc, [key, control]) => {
      acc[key] = control.getValue();

      return acc;
    }, {});
  }

  private _checkError() {
    this._setValid(true);

    if (!this._validators?.length) {
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
}
