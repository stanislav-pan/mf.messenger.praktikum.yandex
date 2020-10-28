import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { IButtonProps } from './interfaces.js';

export default class Button extends Block<IButtonProps> {
    constructor(props: IButtonProps) {
        super({
            tagName: 'app-button',
            props,
        });
    }

    render() {
        return templator
            .getEnvironment()
            .render('../static/components/btn.tmpl.njk', {
                ...this.props,
            });
    }
}
