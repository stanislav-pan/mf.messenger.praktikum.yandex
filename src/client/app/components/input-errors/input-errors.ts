import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import {
    InputErrorsComponentProps,
    IInputErrorsComponentExternalProps,
} from './interfaces.js';

export default class InputErrors extends Block<InputErrorsComponentProps> {
    constructor(props: IInputErrorsComponentExternalProps) {
        super({
            tagName: 'app-input-errors',
            props,
        });
    }

    render() {
        return templator
            .getEnvironment()
            .render('../static/components/input-errors.tmpl.njk', {
                ...this.props,
            });
    }
}
