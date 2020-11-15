export class BaseApiService {
    public host = 'https://ya-praktikum.tech';

    constructor(private prefix: string) {}

    protected getUrl(path: string = '') {
        return `${this.host}/api/v2/${this.prefix}${path}`;
    }
}
