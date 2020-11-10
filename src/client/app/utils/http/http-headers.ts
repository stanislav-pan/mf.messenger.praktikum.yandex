import { queryStringify } from '../query-string.js';
import { SecureMap } from '../secure-map.js';

export class HttpHeaders extends SecureMap {
    constructor(headers: Record<string, string | string[]> = {}) {
        super(headers);
    }
}

export class HttpParams extends SecureMap {
    constructor(params: Record<string, string | string[]> = {}) {
        super(params);
    }

    public toString() {
        return queryStringify(
            Object.fromEntries(this._items.entries()) as Record<string, unknown>
        );
    }
}
