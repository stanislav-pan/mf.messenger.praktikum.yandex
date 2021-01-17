import { Block } from '@utils/block';
import {
  ModalComponentProps,
  IModalComponentExternalProps,
} from './interfaces';

import template from './modal.tmpl.njk';

export default class ModalComponent extends Block<ModalComponentProps> {
  private _bindedEscapeHandler: (event: KeyboardEvent) => void;

  constructor(props: IModalComponentExternalProps) {
    const close = props.handlers?.close;

    super({
      tagName: 'app-modal',
      props: {
        ...props,
        handlers: {
          close: () => {
            this.remove();

            if (!close) {
              return;
            }

            this.setProps({
              component: null,
              handlers: null,
            });

            close();
          },
        },
      },
    });
  }

  private _escapeHandler(event: KeyboardEvent) {
    if (!this.props.handlers || !('close' in this.props.handlers)) {
      return;
    }

    if (event.keyCode == 27) {
      this.props.handlers.close();
    }
  }

  componentDidUpdate(
    old: ModalComponentProps,
    current: ModalComponentProps
  ): boolean {
    if (old.component !== current.component) {
      this.setProps({
        component: current.component,
        components: {
          contentComponent: current.component,
        },
      });
    }

    return true;
  }

  componentDidMount(): void {
    const bindedEscapeHandler = (this._bindedEscapeHandler = this._escapeHandler.bind(
      this
    ));

    window.addEventListener('keydown', bindedEscapeHandler);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this._bindedEscapeHandler);
  }

  render(): string {
    return template({ componentId: this.props.component?.getId() });
  }
}
