import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import {
    ButtonComponentProps,
    IButtonComponentExternalProps,
} from './interfaces';

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
