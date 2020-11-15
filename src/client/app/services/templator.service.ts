import { Environment, Template } from 'nunjucks';
import { LoadScriptService } from './load-script.service.js';

declare var nunjucks;

class Templator {
    private _env: Environment;
    private _cachedTemplates: Record<string, Template> = {};

    constructor() {
        LoadScriptService.load(
            'https://cdnjs.cloudflare.com/ajax/libs/nunjucks/3.0.1/nunjucks.min.js'
        ).then(() => {
            this._env = new nunjucks.Environment(new nunjucks.WebLoader(''), {
                autoescape: false,
            });
        });
    }

    public getEnvironment(): Environment {
        return this._env;
    }

    public compile(template: string) {
        return nunjucks.compile(template);
    }

    public getTemplate(templatePath: string) {
        if (templatePath in this._cachedTemplates) {
            return this._cachedTemplates[templatePath];
        }

        const template = this.getEnvironment().getTemplate(templatePath, true);

        this._cachedTemplates[templatePath] = template;

        return template;
    }
}

export const templator = new Templator();
