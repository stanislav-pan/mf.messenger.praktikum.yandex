import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { Error500PageProps } from './interfaces.js';

export default class Error500Page extends Block<Error500PageProps> {
    constructor() {
        super({
            tagName: 'app-error-500',
            props: {},
        });
    }

    public render() {
        return templator.getEnvironment().render('app/pages/error-500/error-500.tmpl.njk', {
            ...this.props,
        });
    }
}
