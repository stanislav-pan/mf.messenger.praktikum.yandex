// import { HttpHeaders } from '../http/http-headers';

export class BaseApiService {
  public host = 'https://ya-praktikum.tech';

  protected commonOptions = {
    withCredentials: true,
  };

  constructor(private prefix: string) {}

  protected getUrl(path: string = '') {
    return `${this.host}/api/v2/${this.prefix}${path}`;
  }
}
