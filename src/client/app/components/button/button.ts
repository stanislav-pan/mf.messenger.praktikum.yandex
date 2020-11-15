import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import {
    ButtonComponentProps,
    IButtonComponentExternalProps,
} from './interfaces.js';

export default class Button extends Block<ButtonComponentProps> {
    constructor(props: IButtonComponentExternalProps) {
        super({
            tagName: 'app-button',
            props: {
                ...props,
            } as ButtonComponentProps,
        });
    }

    render() {
        return templator
            .getTemplate('../app/components/button/btn.tmpl.njk')
            .render({
                ...this.props,
            });
    }
}
