import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import { Error500PageProps } from './interfaces';

export default class Error500Page extends Block<Error500PageProps> {
    constructor() {
        super({
            tagName: 'app-error-500',
            props: {},
        });
    }

    public render() {
        return templator
            .getTemplate('app/pages/error-500/error-500.tmpl.njk')
            .render({
                ...this.props,
            });
    }
}
