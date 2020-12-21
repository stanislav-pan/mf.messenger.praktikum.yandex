import { isObject } from './is-object';

export function isEqual(a: object, b: object): boolean {
    if (!isObject(a) || !isObject(b)) {
        throw new Error('Params should be objects');
    }

    let res = true;

    const comparator = (lhs: object, rhs: object) => {
        const mappedLhs = Object.entries(lhs);
        const mappedRhs = Object.entries(rhs);

        if (mappedLhs.length !== mappedRhs.length) {
            res = false;

            return;
        }

        for (const [key, value] of Object.entries(lhs)) {
            if (res === false) {
                return;
            }

            if (isObject(value) && isObject(rhs[key])) {
                comparator(value, rhs[key]);

                continue;
            }

            if (value !== rhs[key]) {
                res = false;
                return;
            }
        }
    };

    comparator(a, b);

    return res;
}
