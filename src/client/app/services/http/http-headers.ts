import { SecureMap } from '../../utils/secure-map.js';

export class HttpHeaders extends SecureMap {
    constructor(headers: Record<string, string | string[]> = {}) {
        super(headers);
    }
}
