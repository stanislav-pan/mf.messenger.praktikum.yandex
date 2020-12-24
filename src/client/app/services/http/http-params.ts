import { queryStringify } from '../../utils/query-string';
import { SecureMap } from '../../utils/secure-map';

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
