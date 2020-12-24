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
