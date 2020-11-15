import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import Avatar from '../avatar/avatar.js';
import {
    SelectedUserComponentProps,
    ISelectedUserComponentExternalProps,
} from './interfaces.js';

export default class SelectedUserComponent extends Block<
    SelectedUserComponentProps
> {
    constructor(props: ISelectedUserComponentExternalProps) {
        const { handlers: { unselect } = {}, avatarSrc } = props;

        super({
            tagName: 'app-selected-user',
            props: {
                ...props,
                components: {
                    avatar: new Avatar({
                        avatarSrc,
                        canChangeAvatar: false,
                    }),
                },
                handlers: {
                    unselect: () => {
                        if (typeof unselect !== 'function') {
                            return;
                        }

                        unselect();
                    },
                },
            } as SelectedUserComponentProps,
        });
    }

    render() {
        return templator
            .getTemplate(
                '../app/components/selected-user/selected-user.tmpl.njk'
            )
            .render({
                ...this.props,
                avatarComponentId: this.props.components.avatar.getId(),
            });
    }
}
