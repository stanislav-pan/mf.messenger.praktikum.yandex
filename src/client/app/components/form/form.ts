import { SubmitEvent } from '../../core/interfaces';
import { Block } from '../../utils/block';
import { FormComponentProps, IFormComponentExternalProps } from './interfaces';

import template from './form.tmpl.njk';
export default class FormComponent extends Block<FormComponentProps> {
  constructor(props: IFormComponentExternalProps) {
    const submit = props.handlers?.submit;

    super({
      tagName: 'app-form',
      props: {
        ...props,
        handlers: {
          submit: (event: SubmitEvent) => submit(event),
        },
      } as FormComponentProps,
    });
  }

  componentDidMount() {
    Object.entries(this.props.components).forEach(([key, component]) => {
      if (component.props.formControl) {
        this.props.formGroup.addControl(key, component.props.formControl);

        component.setProps({
          name: key,
        });
      }
    });
  }

  render() {
    const controlsComponentsIds = Object.values(
      this.props.components
    ).map((component) => component.getId());

    return template({
      ...this.props,
      controlsComponentsIds,
    });
  }
}
