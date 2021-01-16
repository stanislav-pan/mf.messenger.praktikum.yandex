import {
  Environment,
  FileSystemLoader,
  WebLoader,
  Template,
  ILoader,
} from 'nunjucks';
import { isNode } from '../utils/my-lodash/is-node';

let path;

if (isNode()) {
  path = require('path');
}

class Templator {
  private _env: Environment;
  private _cachedTemplates: Record<string, Template> = {};

  constructor() {
    const loader: ILoader = path
      ? new FileSystemLoader(path.resolve(__dirname, '../'))
      : new WebLoader('', {
          useCache: true,
        });

    this._env = new Environment(loader, {
      autoescape: false,
    });
  }

  public getEnvironment(): Environment {
    return this._env;
  }

  public getTemplate(templateName: string, dirName?: string | false) {
    const templatePath = this.getTemplatePath(templateName, dirName || null);

    if (templatePath in this._cachedTemplates) {
      return this._cachedTemplates[templatePath];
    }

    const template = this.getEnvironment().getTemplate(templatePath, true);

    this._cachedTemplates[templatePath] = template;

    return template;
  }

  private getTemplatePath(templateName: string, dirName?: string | null) {
    let res: string;

    if (dirName) {
      res = `${dirName}\\${templateName}`;
    } else {
      res = `static/templates/${templateName}`;
    }

    return res;
  }
}

export const templator = new Templator();
