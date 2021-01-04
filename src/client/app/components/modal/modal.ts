import { Block } from '../../utils/block';
import {
  IModalComponentExternalProps,
  ModalComponentProps,
} from './interfaces';

import './modal.scss';
import template from './modal.tmpl.njk';

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
    return template({
      componentId: this.props.component.getId(),
    });
  }
}
