import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import {
    IMenuComponentExternalProps,
    MenuComponentProps,
} from './interfaces.js';

export default class MenuComponent extends Block<MenuComponentProps> {
    constructor(props: IMenuComponentExternalProps) {
        const { select } = props.handlers;

        super({
            tagName: 'app-menu',
            props: {
                ...props,
                items: props.items.map((item, index) => ({ ...item, index })),

                handlers: {
                    ...props.handlers,
                    click: (_, index: number) => {
                        const item = this.props.items.find(
                            (item) => item.index === Number(index)
                        );

                        if (!item) {
                            return;
                        }

                        select(item);
                    },
                },
            },
        });
    }
    render() {
        return templator
            .getTemplate('../app/components/menu/menu.tmpl.njk')
            .render({
                ...this.props,
            });
    }
}
