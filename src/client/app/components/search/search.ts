import { SubmitEvent } from '../../core/interfaces';
import FormDataParserService from '../../services/form-data-parser.service';
import { Block } from '../../utils/block';
import {
  SearchComponentProps,
  ISearchComponentExternalProps,
} from './interfaces';

import './search.scss';
import template from './search.tmpl.njk';

export default class SearchComponent extends Block<SearchComponentProps> {
  constructor(props: ISearchComponentExternalProps) {
    const submit = props.handlers.submit;
    const input = props.handlers.input;

    super({
      tagName: 'app-search',
      props: {
        ...props,
        handlers: {
          submit: (event: SubmitEvent) => {
            event.preventDefault();

            if (typeof submit !== 'function') {
              return;
            }

            const form = event.target as HTMLFormElement;

            const { search } = FormDataParserService.getFormValues(form);

            submit(event, search as string);
          },
          change: (event: InputEvent) => {
            if (typeof input !== 'function') {
              return;
            }

            input(event, (event.currentTarget as HTMLInputElement).value);
          },
        },
      } as SearchComponentProps,
    });
  }

  render(): string {
    return template({
      ...this.props,
    });
  }
}
