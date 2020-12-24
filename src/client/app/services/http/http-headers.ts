import { SecureMap } from '../../utils/secure-map';

export class HttpHeaders extends SecureMap {
  constructor(headers: Record<string, string | string[]> = {}) {
    super(headers);
  }
}
