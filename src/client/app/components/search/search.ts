import { SubmitEvent } from '../../core/interfaces.js';
import FormDataPerserService from '../../services/form-data-parser.service.js';
import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import {
    SearchComponentProps,
    ISearchComponentExternalProps,
} from './interfaces.js';

export default class SearchComponent extends Block<SearchComponentProps> {
    constructor(props: ISearchComponentExternalProps) {
        const submit = props.handlers.submit;

        super({
            tagName: 'app-search',
            props: {
                ...props,
                handlers: {
                    submit: (event: SubmitEvent) => {
                        event.preventDefault();

                        const form = event.target as HTMLFormElement;

                        const { search } = FormDataPerserService.getFormValues(
                            form
                        );

                        submit(event, search);
                    },
                },
            } as SearchComponentProps,
        });
    }

    render() {
        return templator
            .getEnvironment()
            .render('../app/components/search/search.tmpl.njk', {
                ...this.props,
            });
    }
}
