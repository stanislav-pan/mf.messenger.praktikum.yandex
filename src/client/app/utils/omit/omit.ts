import { isArray } from '../is-array';
import { isObject } from '../is-object';

export const omit = <T extends object>(obj: T, fields: (keyof T)[]) => {
    if (!isObject(obj)) {
        throw new Error(omit.errors.objIncorrect);
    }

    if (!isArray(fields)) {
        throw new Error(omit.errors.fieldsIncorrect);
    }

    const res = {};

    for (const [key, value] of Object.entries(obj)) {
        if (fields.includes(key as any)) {
            continue;
        }

        res[key] = value;
    }

    return res;
};

omit['errors'] = {
    objIncorrect: 'obj is not correct object',
    fieldsIncorrect: 'fields is not array',
};
