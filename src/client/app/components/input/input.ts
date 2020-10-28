import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { IInputProps } from './interfaces.js';

export default class Input extends Block<IInputProps> {
    constructor(props: IInputProps) {
        super({
            tagName: 'app-input',
            props,
        });
    }

    render() {
        return templator
            .getEnvironment()
            .render('../static/components/input.tmpl.njk', {
                ...this.props,
            });
    }
}
