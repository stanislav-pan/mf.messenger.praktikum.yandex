import { queryStringify } from '../my-lodash/query-string';
import { SecureMap } from './secure-map';

export class HttpParams extends SecureMap {
  constructor(params: Record<string, string | string[]> = {}) {
    super(params);
  }

  public toString(): string {
    return queryStringify(
      Object.fromEntries(this._items.entries()) as Record<string, unknown>
    );
  }
}
