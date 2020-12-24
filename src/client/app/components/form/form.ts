import { SubmitEvent } from '../../core/interfaces';
import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import { isNode } from '../../utils/is-node';
import { FormComponentProps, IFormComponentExternalProps } from './interfaces';

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

    return templator
      .getTemplate(
        isNode()
          ? 'components/form/form.tmpl.njk'
          : 'static/templates/form.tmpl.njk'
      )
      .render({
        ...this.props,
        controlsComponentsIds,
      });
  }
}
