import { METHODS } from './const.js';
import { HttpHeaders } from './http-headers.js';
import { HttpParams } from './http-params.js';
import { IHttpOptions, IHttpOptionsWithBody } from './interfaces.js';

export class HttpClientService {
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

    public delete = (url: string, body: unknown, options: IHttpOptions = {}) => {
        return this.request(METHODS.DELETE, url, { ...options, body });
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
            if (body instanceof FormData) {
                xhr.send(body);
            } else {
                xhr.send(JSON.stringify(body));
            }
        }

        return new Promise<XMLHttpRequest>((resolve, reject) => {
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(xhr);
                } else {
                    reject(xhr);
                }
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

    private _setHeaders(xhr: XMLHttpRequest, headers: HttpHeaders) {
        const mappedHeaders = headers.getValues();
        if (!mappedHeaders.size) {
            return;
        }

        for (const [key, value] of mappedHeaders.entries()) {
            xhr.setRequestHeader(key, value);
        }
    }
}

export const httpClientService = new HttpClientService();
