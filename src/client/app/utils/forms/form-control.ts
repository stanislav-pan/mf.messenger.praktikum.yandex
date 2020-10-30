import { AbstractControl } from './abstractal-control.js';
import { FormGroup } from './form-group';
import {
    Validator,
    ValidationErrors,
    ValidatorFn,
} from './validator-interfaces';

export class FormControl extends AbstractControl {
    private _el: HTMLInputElement;

    private _listeners = [];
    private _validators: Validator[] = [];

    private _value: any;

    private _wasInitialValueSet = false;

    public parent: FormGroup;

    private _valid = true;

    public get valid() {
        return this._valid;
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

    private setTouched() {
        this._touched = true;

        this._el.classList.toggle('touched');
    }

    private _dirty = false;

    public get dirty() {
        return this._dirty;
    }

    private setDirty() {
        this._dirty = true;

        this._el.classList.toggle('dirty');
    }

    private set value(value: any) {
        this._value = value;

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

        this.setTouched();

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

    public markAsDirty() {
        if (this._dirty) {
            return;
        }

        this.setDirty();
    }

    public setErrors(error: ValidationErrors) {
        Object.assign(this.errors, error);
    }

    public deleteErrors(keys: string[]) {
        for (const key of keys) {
            if (!(key in this.errors)) {
                continue;
            }

            delete this.errors[key];
        }
    }
}
