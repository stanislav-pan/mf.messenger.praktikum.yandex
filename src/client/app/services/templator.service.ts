import { Environment, FileSystemLoader, Template } from 'nunjucks';
import { isNode } from '../utils/is-node';

let nunjucks;
let path;

if (isNode()) {
  nunjucks = require('nunjucks');
  path = require('path');
} else {
  nunjucks = window['nunjucks'];
}

class Templator {
  private _env: Environment;
  private _cachedTemplates: Record<string, Template> = {};

  constructor() {
    const loader: FileSystemLoader = path
      ? new nunjucks.FileSystemLoader(path.resolve(__dirname, '../'))
      : new nunjucks.WebLoader('');

    this._env = new nunjucks.Environment(loader, {
      autoescape: false,
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
