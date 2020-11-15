import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { isEqual } from '../../utils/is-equal.js';
import {
    ListComponentProps,
    IListComponentExternalProps,
} from './interfaces.js';

export default class ListComponent extends Block<ListComponentProps> {
    constructor(props: IListComponentExternalProps) {
        super({
            tagName: 'app-list',
            props: {
                ...props,
                componentsIds: [],
            },
        });
    }

    componentDidUpdate(old: ListComponentProps, current: ListComponentProps) {
        if (isEqual(old.components, current.components)) {
            return false;
        }

        const componentsIds = Object.values(current.components).reduce(
            (acc: string[], component) => {
                acc.push(component.getId());

                return acc;
            },
            []
        );

        this.setProps({
            componentsIds,
        });

        return true;
    }

    render() {
        return templator
            .getTemplate('../app/components/list/list.tmpl.njk')
            .render({
                ...this.props,
            });
    }
}
