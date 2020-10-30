export function get<T, K>(
    obj: Object,
    path: string = '',
    defaulValue: K
): T | K {
    const keys = path.split('.');
    let res = obj;

    for (const key of keys) {
        const value = res[key];

        if (value === undefined) {
            return defaulValue;
        }

        res = value;
    }

    return res as T;
}
