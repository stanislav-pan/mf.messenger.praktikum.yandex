import { METHODS } from './const';
import { HttpHeaders } from './http-headers';
import { HttpParams } from './http-params';

export interface IHttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  withCredentials?: boolean;
  timeout?: number;
}

export interface IHttpOptionsWithBody extends IHttpOptions {
  body?: unknown;
}

export interface IHttpClient {
  get(url: string, options: IHttpOptions): Promise<XMLHttpRequest>;

  put(
    url: string,
    body: unknown,
    options: IHttpOptions
  ): Promise<XMLHttpRequest>;

  post(
    url: string,
    body: unknown,
    options: IHttpOptions
  ): Promise<XMLHttpRequest>;

  delete(
    url: string,
    body: unknown,
    options: IHttpOptions
  ): Promise<XMLHttpRequest>;

  request(
    method: METHODS,
    url: string,
    options: IHttpOptionsWithBody
  ): Promise<XMLHttpRequest>;
}
