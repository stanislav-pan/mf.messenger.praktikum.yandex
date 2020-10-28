import { Environment } from 'nunjucks';
import { LoadScriptService } from './load-script.service.js';

declare var nunjucks;

class Templator {
    private _env: Environment;

    constructor() {
        LoadScriptService.load(
            'https://cdnjs.cloudflare.com/ajax/libs/nunjucks/3.0.1/nunjucks.min.js'
        ).then(() => {
            this._env = new nunjucks.Environment(new nunjucks.WebLoader(''), {
                autoescape: false
            });
        });
    }

    public getEnvironment(): Environment {
        return this._env;
    }
}

export const templator = new Templator();
