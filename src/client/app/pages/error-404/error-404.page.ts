import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { Error404PageProps } from './interfaces.js';

export default class Error404Page extends Block<Error404PageProps> {
    constructor() {
        super({
            tagName: 'app-error-404',
            props: {},
        });
    }

    public render() {
        return templator.getEnvironment().render('app/pages/error-404/error-404.tmpl.njk', {
            ...this.props,
        });
    }
}
