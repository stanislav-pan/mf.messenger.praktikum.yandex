import { HttpHeaders } from '../http/http-headers.js';

export class BaseApiService {
    public host = 'https://ya-praktikum.tech';

    protected commonOptions = {
        headers: new HttpHeaders({
            'content-type': 'application/json',
        }),
        withCredentials: true,
    };

    constructor(private prefix: string) {}

    protected getUrl(path: string = '') {
        return `${this.host}/api/v2/${this.prefix}${path}`;
    }
}
