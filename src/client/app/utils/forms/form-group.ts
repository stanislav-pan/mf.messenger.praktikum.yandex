import { AbstractControl } from './abstractal-control.js';
import { FormControl } from './form-control';
import { IListenerFn } from './interfaces.js';
import {
    Validator,
    ValidationErrors,
    ValidatorFn,
} from './validator-interfaces';

export class FormGroup extends AbstractControl {
    public controls: { [key: string]: FormControl };
    private _listeners: Array<IListenerFn> = [];
    private _validators: Validator[] = [];

    public get value() {
        return Object.entries(this.controls).reduce((acc, [key, control]) => {
            acc[key] = control.getValue();

            return acc;
        }, {});
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
            isValid &&
            Object.values(this.controls).every((control) => control.valid);
    }

    get invalid() {
        return !this._valid;
    }

    public errors: ValidationErrors = {};

    constructor(
        controls: { [key: string]: FormControl } = {},
        validators: ValidatorFn[] = []
    ) {
        super();
        this.controls = controls;

        this._validators = validators.map((validator) => ({
            validatorFn: validator,
            keys: [],
        }));

        Object.values(this.controls).forEach((control) => {
            control.subscribe(() => {
                this.value = this.value;

                this._checkError();
            });
        });
    }

    public addControl(key: string, control: FormControl) {
        this.controls[key] = control;

        control.subscribe(() => {
            this.value = this.value;

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

    private _checkError() {
        this._setValid(true);

        if (this._validators?.length) {
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
            }

            return;
        }
    }

    public markAsDirtyAllControls() {
        Object.values(this.controls).forEach((control) => {
            control.markAsDirty();
        });
    }
}
