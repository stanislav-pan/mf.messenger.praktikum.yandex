import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import {
    InputErrorsComponentProps,
    IInputErrorsComponentExternalProps,
} from './interfaces';

export default class InputErrors extends Block<InputErrorsComponentProps> {
    constructor(props: IInputErrorsComponentExternalProps) {
        super({
            tagName: 'app-input-errors',
            props,
        });
    }

    render() {
        return templator
            .getTemplate('../app/components/input-errors/input-errors.tmpl.njk')
            .render({
                ...this.props,
            });
    }
}
