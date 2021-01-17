import { AbstractControl } from './abstractal-control';
import { FormControl } from './form-control';
import { ValidatorFn } from './validator-interfaces';

export class FormGroup extends AbstractControl {
  public controls: { [key: string]: FormControl } = {};

  public get value(): unknown {
    return this._getValue();
  }

  public set value(value: unknown) {
    this.notifyListeners(this._listeners, value);
  }

  private _valid = true;

  public get valid(): boolean {
    return this._valid;
  }

  protected _setValid(isValid: boolean): void {
    this._valid =
      isValid && Object.values(this.controls).every((control) => control.valid);
  }

  constructor(
    controls: { [key: string]: FormControl } = {},
    validators: ValidatorFn[] = []
  ) {
    super();
    Object.entries(controls).forEach(([key, control]) => {
      this.addControl(key, control);
    });

    this.initValidators(validators);
  }

  public addControl(key: string, control: FormControl): void {
    this.controls[key] = control;

    control.subscribe(() => {
      this.value = this._getValue();
      this._checkError(this);
    });

    this._checkError(this);
  }

  public get(key: string): FormControl {
    return this.controls[key];
  }

  public markAsDirtyAllControls(): void {
    Object.values(this.controls).forEach((control) => {
      control.markAsDirty();
    });
  }

  public markAsPristineAllControls(): void {
    Object.values(this.controls).forEach((control) => {
      control.markAsPristine();
    });
  }

  public reset(needResetValues = true): void {
    Object.values(this.controls).forEach((control) => {
      control.reset(needResetValues);
    });
  }

  public patchValue(obj: Record<string, unknown>): void {
    for (const [key, value] of Object.entries(obj)) {
      if (!this.controls[key]) {
        continue;
      }

      this.controls[key].setValue(value as string);
    }
  }

  private _getValue() {
    return Object.entries(this.controls).reduce((acc, [key, control]) => {
      acc[key] = control.getValue();

      return acc;
    }, {});
  }
}
