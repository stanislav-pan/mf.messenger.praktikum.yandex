import { SubmitEvent } from '../../core/interfaces.js';
import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { IFormComponentProps } from './interfaces.js';

export default class FormComponent extends Block<IFormComponentProps> {
    constructor(props: IFormComponentProps) {
        const submit = props.handlers?.submit;
        
        super({
            tagName: 'app-form',
            props: {
                ...props,
                handlers: {
                    submit: (event: SubmitEvent) => submit(event)
                }
            },
        });
    }

    componentDidMount() {
        Object.entries(this.props.components).forEach(([key, component]) => {
            if (component.props.formControl) {
                this.props.formGroup.addControl(
                    key,
                    component.props.formControl
                );
            }
        });
    }

    render() {
        const controlsComponentsIds = Object.values(
            this.props.components
        ).map((component) => component.getId());

        return templator
            .getEnvironment()
            .render('../static/components/form.tmpl.njk', {
                ...this.props,
                controlsComponentsIds,
            });
    }
}
