import { METHODS } from './const.js';
import { HttpHeaders, HttpParams } from './http-headers.js';

export interface IHttpOptions {
    headers?: HttpHeaders;
    params?: HttpParams;
    withCredentials?: boolean;
    timeout?: number;
}

export interface IHttpOptionsWithBody extends IHttpOptions {
    body?: unknown;
}

export class HttpClient {
    public get = (url: string, options: IHttpOptions = {}) =>
        this.request(METHODS.GET, url, options);

    public put = (url: string, body: unknown, options: IHttpOptions = {}) => {
        return this.request(METHODS.PUT, url, {
            ...options,
            body,
        });
    };

    public post = (url: string, body: unknown, options: IHttpOptions = {}) => {
        return this.request(METHODS.POST, url, { ...options, body });
    };

    public delete = (url: string, options: IHttpOptions = {}) => {
        return this.request(METHODS.DELETE, url, { ...options });
    };

    public request = (
        method: METHODS,
        url: string,
        options: IHttpOptionsWithBody
    ) => {
        const {
            body,
            params,
            headers,
            withCredentials,
            timeout = 5000,
        } = options;

        const xhr = new XMLHttpRequest();

        xhr.open(method, this._generateUrl(url, params));

        xhr.withCredentials = Boolean(withCredentials);
        xhr.timeout = timeout;

        if (headers && headers instanceof HttpHeaders) {
            this._setHeaders(xhr, headers);
        }

        if (method === METHODS.GET || method === METHODS.HEAD) {
            xhr.send();
        } else {
            xhr.send(JSON.stringify(body));
        }

        return new Promise((resolve, reject) => {
            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
        });
    };

    private _generateUrl(url: string, params: HttpParams | undefined) {
        if (!params || !(params instanceof HttpParams)) {
            return url;
        }

        return `${url}?${params.toString()}`;
    }

    private _setHeaders(xhr, headers: HttpHeaders) {
        const mappedHeaders = Object.entries(headers);

        if (!mappedHeaders.length) {
            return;
        }

        mappedHeaders.forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
        });
    }
}
