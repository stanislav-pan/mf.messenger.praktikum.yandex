import { METHODS } from './const';
import { HttpHeaders } from './http-headers';
import { HttpParams } from './http-params';
import { IHttpOptions, IHttpOptionsWithBody } from './interfaces';

export class HttpClientService {
  private _defaultHeaders = {
    'content-type': 'application/json',
  };

  public get = (
    url: string,
    options: IHttpOptions = {}
  ): Promise<XMLHttpRequest> => this.request(METHODS.GET, url, options);

  public put = (
    url: string,
    body: unknown,
    options: IHttpOptions = {}
  ): Promise<XMLHttpRequest> => {
    return this.request(METHODS.PUT, url, {
      ...options,
      body,
    });
  };

  public post = (
    url: string,
    body: unknown,
    options: IHttpOptions = {}
  ): Promise<XMLHttpRequest> => {
    return this.request(METHODS.POST, url, { ...options, body });
  };

  public delete = (
    url: string,
    body: unknown,
    options: IHttpOptions = {}
  ): Promise<XMLHttpRequest> => {
    return this.request(METHODS.DELETE, url, { ...options, body });
  };

  public request = (
    method: METHODS,
    url: string,
    options: IHttpOptionsWithBody
  ): Promise<XMLHttpRequest> => {
    const { body, params, headers, withCredentials, timeout = 5000 } = options;

    const xhr = new XMLHttpRequest();

    xhr.open(method, this._generateUrl(url, params));

    xhr.withCredentials = Boolean(withCredentials);
    xhr.timeout = timeout;

    this._setHeaders(xhr, headers);

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

  private _setHeaders(xhr: XMLHttpRequest, headers: HttpHeaders | undefined) {
    let externalHeaders: Map<string, string> | undefined;

    if (headers && headers instanceof HttpHeaders) {
      externalHeaders = headers.getValues();
    }

    const mergedHeaders: Record<string, string> = {
      ...this._defaultHeaders,
      ...(externalHeaders && Object.fromEntries(externalHeaders.entries())),
    };

    for (const [key, value] of Object.entries(mergedHeaders)) {
      xhr.setRequestHeader(key, value);
    }
  }
}

export const httpClientService = new HttpClientService();
