export function get(obj, path = '', defaulValue = undefined) {
    const keys = path.split('.');
    let res = obj;

    for (const key of keys) {
        const value = res[key];

        if (value === undefined) {
            return defaulValue;
        }

        res = value;
    }

    return res;
}
