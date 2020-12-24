import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import { isNode } from '../../utils/is-node';
import {
  IModalComponentExternalProps,
  ModalComponentProps,
} from './interfaces';

export default class ModalComponent extends Block<ModalComponentProps> {
  private _bindedEscapeHandler: (event: KeyboardEvent) => void;

  constructor(props: IModalComponentExternalProps) {
    const { close } = props.handlers;

    super({
      tagName: 'app-modal',
      props: {
        ...props,
        components: {
          contentComponent: props.component,
        },
        handlers: {
          close: () => {
            this.remove();

            close();
          },
        },
      },
    });
  }

  private _escapeHandler(event: KeyboardEvent) {
    if (event.keyCode == 27) {
      this.props.handlers.close();
    }
  }

  componentDidMount() {
    const bindedEscapeHandler = (this._bindedEscapeHandler = this._escapeHandler.bind(
      this
    ));

    window.addEventListener('keydown', bindedEscapeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._bindedEscapeHandler);
  }

  render() {
    return templator
      .getTemplate(
        isNode()
          ? 'components/modal/modal.tmpl.njk'
          : 'static/templates/modal.tmpl.njk'
      )
      .render({
        componentId: this.props.component.getId(),
      });
  }
}
