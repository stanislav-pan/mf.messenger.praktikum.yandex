export type Indexed<T = unknown> = {
    [key in string]: T;
};

const getKeys = (target: Object) => {
    return Object.keys(target);
};

const isMergeableObject = (value: any) => {
    return !!value && typeof value === 'object';
};

const propertyIsOnObject = (object: Object, property: string) => {
    try {
        return property in object;
    } catch (_) {
        return false;
    }
};

export function merge(lhs: Indexed<any>, rhs: Indexed<any>) {
    if (isMergeableObject(rhs)) {
        getKeys(rhs).forEach((key) => {
            if (propertyIsOnObject(lhs, key) && isMergeableObject(rhs[key])) {
                lhs[key] = merge(lhs[key], rhs[key]);
            } else {
                lhs[key] = rhs[key];
            }
        });
    }

    return lhs;
}
