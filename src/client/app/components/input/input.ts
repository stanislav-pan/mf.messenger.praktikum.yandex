import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { FormControl } from '../../utils/forms/form-control.js';
import { FormGroup } from '../../utils/forms/form-group.js';
import InputErrors from '../input-errors/input-errors.js';
import {
    IInputComponentExternalProps,
    InputComponentProps,
} from './interfaces.js';

export type AbstractalControl = FormControl | FormGroup;

export default class Input extends Block<InputComponentProps> {
    constructor(props: IInputComponentExternalProps) {
        super({
            tagName: 'app-input',
            props: {
                ...props,
                components: {
                    errors: new InputErrors({
                        errors: [],
                    }),
                },
            },
        });
    }

    componentDidMount() {
        const fc = this.props?.formControl as FormControl;

        if (!fc) {
            return;
        }

        fc.subscribe(() => {
            this.props.components.errors.setProps({
                errors: Object.keys(fc.errors),
            });
        });
    }

    render() {
        return templator
            .getEnvironment()
            .render('../static/components/input.tmpl.njk', {
                ...this.props,
                errorsComponentId: this.props.components.errors.getId(),
            });
    }
}
